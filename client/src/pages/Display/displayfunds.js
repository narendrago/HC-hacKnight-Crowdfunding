import React from "react";
import Table from "./table";
import Button from 'react-bootstrap/Button'
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
import Navbar from "./../../components/NavBar/NavBar";
import Donate from "../Donate/donate";
import { Navigate  } from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from "styled-components";


class displayfunds extends React.Component {

    state = {
        tableData: null
    };

    constructor(props) {
        super(props);
        this.state = {
            tableData: [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date': '', 'descr': '','action':'' }]
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
            const data1 = [{ 'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '', 'descr': '','action':'' }];
            const numrows = hash.length;
            const clickHandler = () => {
                return <Navigate to={'/donate'} />
           }
            for (var i = 0; i < numrows; i++) {
                var template = "https://ipfs.io/ipfs/";
                var link = template + hash[i];
                let response = await fetch(link);
                let responseJson = await response.json();
                responseJson['action'] = <div>
                    {/* <Button size="primary" className="btn-hover" type="primary" onClick={clickHandler}>Donate</Button> */}
                    <Link size="primary" className="btn-hover" type="primary" to={'/donate'} onClick={() => this.forceUpdate}>
                    {/* {item.icon} */}
                    <span>Donate</span>
                  </Link>
                </div>
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
            <div style={{ 
                backgroundImage: `url("https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-_Tcjok-d9b4.jpg")`,height:'100vh', backgroundSize:"cover"
               
              }}>
            
            <div className="StoreHouse">
                <Navbar />
                {/*<h1 className="StoreHouse">Uploaded Files</h1>*/}
                <br /><br />
                <div className="FileTable">
                    <Table data={this.state.tableData} />
                </div>

                <br /><br />

            </div>
</div>
        );
    }
}

export default displayfunds;