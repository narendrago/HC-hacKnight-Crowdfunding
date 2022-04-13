import React from 'react';
import ipfs from './../ipfs';
import './../../styles/createfund.css';
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
import Navbar from "./../../components/NavBar/NavBar";
import styled from "styled-components";

const Styles = styled.div`
// background: lavender;
 padding: 30px;
 background: url('https://www.readz.com/image/8359264.1620928269000/gradient-backgrounds.webp');
 background-repeat: no-repeat;
 background-size: cover;
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
   background-image: url('http://www.designshock.com/wp-content/uploads/2014/08/16_thumb1.jpg');
   background-repeat: no-repeat;
   background-size: cover;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 50px;
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



class createfund extends React.Component{
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

  addnewfundraiser = async(ipfshash,goal) =>{
    const metamaskAddr = this.state.accounts[0];
    const contract = this.state.contract;
    console.log(metamaskAddr)
    await contract.methods.createfundraiser(ipfshash,goal).send({ from: metamaskAddr });
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
    ipfs.files.get("QmdW5C6a5bLfGsTo6WAg9ZfcuxK69JQBXxZGQgwfac9pMn", function (err, files) {
      console.log(files);
      // files.forEach(function callback(file) {
      //   console.log(file.path)
      //   console.log("File content >> ", file.content.toString('utf8'))})
      console.log("filecontent",files[0].content.toString('utf8'))
      })
    ipfs.files.add(Buffer(JSON.stringify(data)), (error, result) => {
      if(error) {
            console.error(error)
            return
          }
      
       ipfshash = result[0].hash
       console.log('ifpsHash', result[0].hash)
       this.addnewfundraiser(ipfshash,goal);
    })
  } 
  render(){
    return(
      <div>
      <Navbar />
      <Styles>
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
      </Styles>
      </div>
        
    )
  }
}

export default createfund;