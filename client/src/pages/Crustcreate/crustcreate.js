import React from 'react';
import './../../styles/createfund.css';
import getWeb3 from "./../../getWeb3";
import { create } from 'ipfs-http-client'
import FundRaiserContract from "./../../contracts/fundraiser.json";
import Navbar from "./../../components/NavBar/NavBar";
import dataInfo from "../Crustcreate/data.txt";
import fs from 'browserify-fs';

class crustcreate extends React.Component{
  constructor(props){
    super(props);
  }

  
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundRaiserContract.networks[networkId];
      const instance = new web3.eth.Contract(
        FundRaiserContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  addnewfundraiser = async(ipfshash) =>{
    const metamaskAddr = this.state.accounts[0];
    const contract = this.state.contract;
    console.log(metamaskAddr)
    await contract.methods.createfundraiser(ipfshash).send({ from: metamaskAddr });
  }

  handlesignUp = async (event) => {
    event.preventDefault();
    const fName = event.target[1].value;
    const lName = event.target[2].value;
    const goal = event.target[3].value;
    const minimum = event.target[4].value;
    const address = event.target[5].value;
    const date = event.target[6].value;
    const description = event.target[7].value;
    const data = {firstname: fName,lastname:lName,goalamount:goal,minimumamount:minimum,recipient:address,date1:date,descr:description};
    console.log(JSON.stringify(data));
    var ipfshash;
    //fetching details
      const ipfs = create({host: "localhost",
      port: "5001",
      protocol: "http",});
    //   const ipfs = create("http://localhost:5001");
      console.log(ipfs);
      const jsonString = JSON.stringify(data);

      fs.writeFile("./data.txt", jsonString, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("file saved!");
      }); 
      const cid = await ipfs.add(dataInfo);
    //  //const { cid } = await ipfs.add(data);

    // const fs = require('fs');
    // const jsonData= {"name":"John", "age":30, "car":null};



       console.log('ifpsHash', cid)
     this.addnewfundraiser(cid);
  } 
  render(){
    return(
      <div>
      <Navbar />
        <div id="formContainer">
          <form id="form" onSubmit={this.handlesignUp} >
            <fieldset>
              <h1>Create Fund</h1>
              <div id="fullName">
                <input type="text" name="fName" id="fName" placeholder="First Name" required />
                <input type="text" name="lName" id="lName" placeholder="Last Name" required />
              </div>
              <div id="otherInputs">
                <input type="number" name="goal" id="goal" placeholder="goal amount" required />
                <input type="number" name="minimum" id="minimum" placeholder="minimum donation" required />
                <input type="text" name="address" id="address" placeholder="Recipient address" required />
                <input type="date" name="date" id="date" placeholder="expiry date" required />
                <input type="text" name="description" id="description" placeholder="description" required />
              </div>
              <br /><br />
              <input type="submit" name="submit" id="submit" />
            </fieldset>
          </form>
        </div>
        </div>
    )
  }
}

export default crustcreate;