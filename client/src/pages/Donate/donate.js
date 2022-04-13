import React from 'react';
//import './../../styles/createfund.css';
import Navbar from "./../../components/NavBar/NavBar";
import ipfs from './../ipfs';
import { ethers } from "ethers";
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
import styled from "styled-components";

const Styles = styled.div`
background: lavender;
 padding: 20px;

 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   margin-top: 100px;
   max-width: 500px;
   padding: 10px 50px;
 }

 input {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
   box-sizing: border-box;
   padding: 10px;
   width: 100%;
 }

 label {
   color: #3d3d3d;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .submitButton {
   background-color: #6976d9;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
 }
`;


class donate extends React.Component {
    state = {
        Data: null,
        Data2:null
    };
    constructor(props) {
        super(props);
        this.state = {
            Data2: [{'firstname':'','amount':'','date':'','metamaskAddr':''}],
            Data: [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '', 'descr': '', 'recipient': '','action':'' }]
        }
    }
    addnewfundraiser = async(ipfshash) =>{
        const metamaskAddr = this.state.accounts[0];
        const contract = this.state.contract;
        console.log(metamaskAddr)
        await contract.methods.transfer(ipfshash).send({ from: metamaskAddr });
      }
    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FundRaiserContract.networks[networkId];
            const instance = new web3.eth.Contract(
                FundRaiserContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            this.setState({ web3, accounts, contract: instance });
            let currentComponent = this;
            console.log("Donate");
            const hash = "QmWKfhioCr2GT9eLmA9NrMrJm8XuUjWAXTBbREsqL4DWAR"
            var template = "https://ipfs.io/ipfs/";
            var link = template + hash;
            let response = await fetch(link);
            let responseJson = await response.json();
            const data1 = responseJson;
            console.log(data1.firstname);
            currentComponent.setState({ Data: data1 })
            console.log("Table", currentComponent.state.Data)
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };
    startPayment = async ({ ether, addr }) => {
        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether)
            });
            console.log({ ether, addr });
            console.log("tx", tx);
            alert("Transaction successful");
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let ndate=date+"/"+month+"/"+year;
            var ipfshash;
            const data2 = {firstname:this.state.Data.firstname,amount:ether,date:ndate,metamaskAddr:this.state.accounts[0]};
            this.setState({ Data2: data2 })
            console.log(data2);
            ipfs.files.add(Buffer(JSON.stringify(data2)), (error, result) => {
                if(error) {
                      console.error(error)
                      return
                    }
                    ipfshash = result[0].hash
                    console.log('ifpsHash', result[0].hash)
                    this.addnewfundraiser(ipfshash);
        })
            const metamaskAddr = this.state.accounts[0];
            const contract = this.state.contract;
            const value= ethers.utils.parseEther(ether)
            await contract.methods.transfer(ipfshash).send({ from: metamaskAddr });
        } catch (err) {
            alert(err.message);
        }
    };

    donateAmt = async (event) => {
        event.preventDefault();
        const addr = this.state.Data.recipient;
        const amt = event.target[1].value;
        if(parseInt(amt,10)<parseInt(this.state.Data.minimumamount,10)){
        alert("The amount to be transmitted should be greater than minimum amount");
        return
    }
    if(Date.now()>this.state.Data.date1){
        alert("The Fund has expired");
        return;
    }
        await this.startPayment({ ether: amt, addr: addr });

    }
    render() {
        return (
            <div>
                <Navbar />
                <div id="formContainer">
                    <Styles>
                        <form id="form" onSubmit={this.donateAmt} >
                            <fieldset>
                                <h1>Donate Fund</h1>
                                <p>FirstName : {this.state.Data.firstname}</p>
                                <p>LastName : {this.state.Data.lastname}</p>
                                <p>Goal Amount : {this.state.Data.goalamount}</p>
                                <p>Minimum Amount : {this.state.Data.minimumamount}</p>
                                <p>Date: {this.state.Data.date1}</p>
                                <p>Description : {this.state.Data.descr}</p>
                                <div id="otherInputs"><br /><br />
                                    <h3>Donate Amount</h3>
                                    <input type="text" name="donate" id="donate" placeholder="donate amount" required />
                                </div>
                                <br /><br />
                                <input type="submit" name="submit" id="submit" />
                            </fieldset>
                        </form>

                    </Styles>

                </div>
            </div>
        );
    }
}
export default donate;