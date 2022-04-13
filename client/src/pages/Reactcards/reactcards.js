import Card from 'react-bootstrap/Card'
import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup'
import Navbar from "./../../components/NavBar/NavBar";
//import {Row,Col} from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Card'
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
//import Navbar from "./../../components/NavBar/NavBar";
class reactcards extends React.Component {
  state = {
    tableData: null
};

constructor(props) {
    super(props);
    this.state = {
        tableData: [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '', 'descr': '', 'action': '' }]
    }
}
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
      let currentComponent = this;
      console.log("Hello");
      const hash = await instance.methods.getall().call();
      const data1 = [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '', 'descr': '', 'action': '' }];
      const numrows = hash.length;
      for (var i = 0; i < numrows; i++) {
          var template = "https://ipfs.io/ipfs/";
          var link = template + hash[i];
          let response = await fetch(link);
          let responseJson = await response.json();
          data1.push(responseJson);
      };
      console.log(data1);
      currentComponent.setState({ tableData: data1 })
      console.log("Table", currentComponent.state.tableData)
  } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
  }
};
  render() {
    return (
      <div>
      <Navbar />
    <Card>
    <Card.Img variant="top" src="https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
     
    <h1>Donate Fund:</h1>
    <p>FirstName :{ this.state.tableData.firstname}</p>
    <p>LastName : {this.state.tableData.lastname} </p>
    <p>Goal Amount : {this.state.tableData.goalamount}</p>
     <p>Minimum Amount : {this.state.tableData.minimumamount} </p>
     <p>Date: {this.state.tableData.date1}</p>
      <p>Description : {this.state.tableData.descr}</p>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
      )
  </div>
    )}
}
export default reactcards;