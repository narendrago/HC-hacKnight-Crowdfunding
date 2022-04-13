import React from 'react';
import ReactTable from "react-table";  
import ipfs from './../ipfs';
import './../../styles/display.css';
import Navbar from "./../../components/NavBar/NavBar";
import getWeb3 from "./../../getWeb3";
import FundRaiserContract from "./../../contracts/fundraiser.json";
class display extends React.Component{ 
  state = { Tabledata: null };

  getjsonfromlink=async(link,data1) =>{
    let response = await fetch(link);
    let responseJson = await response.json();
    data1.push(responseJson);
  }
  constructor(props) {
    super(props);
    this.state = {
      Tabledata: [{'firstname': '', 'lastname': '', 'goalamount': '', 'minimumamount': '', 'date1': '','descr':'' }]
    }
  }
  componentDidMount = async () => {
  console.log("Hello");
    const hash = ["QmeWbjHYbSJeQrbLoKxeHQDbv9F6qz1nj4xBUA9pcQskex","QmdW5C6a5bLfGsTo6WAg9ZfcuxK69JQBXxZGQgwfac9pMn"]
    const data1=[];  
    const numrows= hash.length;
    for (var i = 0; i < numrows; i++) {
     var template="https://ipfs.io/ipfs/";
     var link=template+hash[i];
     this.getjsonfromlink(link,data1);
    };
    console.log(data1);
    this.setState({Tabledata: data1 }, () => {
      console.log(this.state.Tabledata, 'Table Data State');
    }); 
    //this.setState({Tabledata:data1})
    //this.setState({data})
    //console.log(this.state.Tabledata);
    //const data1 = (this.props.data);
  }
    render() { 
      const tabledata=this.state.Tabledata;
       return ( 
        <div>
        
        <div className="App">
        <Navbar />
        <table>
          <tr>
            <th>firstname</th>
            <th>lastname</th>
            <th>goalamount</th>
            <th>minimumamount</th>
            <th>date</th>
            <th>descr</th>
          </tr>
          {
          tabledata.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.goalamount}</td>
                <td>{val.minimumamount}</td>
                <td>{val.date1}</td>
                <td>{val.descr}</td>
              </tr>
            )
          })}
        </table>
      </div> 
      </div>     
       ) ; 
     }  
}

export default display;