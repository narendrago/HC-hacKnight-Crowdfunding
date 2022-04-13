import React from "react";
import Table from "./table";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
import Navbar from "./../../components/NavBar/NavBar";
import "./Dashboard.css";
class dashboard extends React.Component {

    state = {
        tableData: null,
        table1: null
    };

    constructor(props) {
        super(props);
        this.state = {
            table1: [{'firstname':'','amount':'','date':'','metamaskAddr':''}],
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
            const hash1 = await instance.methods.getfund().call();
            const data1 = [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '', 'descr': '' }];
            const data2 = [{'firstname':'','amount':'','date':'','metamaskAddr':''}]
            const numrows1=hash1.length;
            const numrows = hash.length;
            for (var i = 0; i < numrows; i++) {
                var template = "https://ipfs.io/ipfs/";
                var link = template + hash[i];
                let response = await fetch(link);
                let responseJson = await response.json();
                const metamaskAddr = this.state.accounts[0];
                const contract = this.state.contract;
                if (responseJson.recipient==metamaskAddr) {
                    data1.push(responseJson);
                }
            };
            for (var i = 0; i < numrows1; i++) {
                var template = "https://ipfs.io/ipfs/";
                var link = template + hash1[i];
                let response = await fetch(link);
                let responseJson = await response.json();
                const metamaskAddr = this.state.accounts[0];
                const contract = this.state.contract;
                if (responseJson.metamaskAddr==metamaskAddr) {
                    data2.push(responseJson);
                }
                console.log(data2);
            currentComponent.setState({ Data1: data2 })
            console.log("Table", currentComponent.state.Data1)
            };
            console.log(data1);
            console.log(data2);
            currentComponent.setState({ tableData: data1 })
            currentComponent.setState({ table1: data2 })
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
              
                <div className="image">
                <br /><br />
                <br></br><h1>Funds Created by the User</h1><br></br>
                <div className="FileTable">
                    <Table data={this.state.tableData} />
                </div>
                <br></br><h1>Funds Donated by the User</h1><br></br>
                <div className="FileTable">
                    <Table data={this.state.table1} />
                </div>
                <br></br><h1>User Activity Summary</h1><br></br>
                <div class="left">
                <center><Card border="success" style={{width: '500px',height: '180px' }}>
                <Card.Header>Funds Created</Card.Header>
                <Card.Body>
                < Card.Title>Number of Funds created</Card.Title>
                <Card.Text>{this.state.tableData.length-1}</Card.Text>
                </Card.Body>
                </Card>
                </center>
                <br />
                </div>
                <div class="right">
                <center><Card border="success" style={{width: '500px',height: '180px' }}>
                <Card.Header>Funds Donated</Card.Header>
                <Card.Body>
                < Card.Title>Number of Funds Donated</Card.Title>
                <Card.Text>{this.state.table1.length-1}</Card.Text>
                </Card.Body>
                </Card>
                </center>
                <br />
                </div>
                </div>
                </div>

        );
    }
}

export default dashboard;