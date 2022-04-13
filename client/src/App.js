import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import Createfund from "./pages/createfund/createfund";
import Display from "./pages/Display/displayfunds";
import Authenticate from "./pages/Authenticate/Authenticate";
import Donate from "./pages/Donate/donate";
import Reactcards from "./pages/Reactcards/reactcards";
import Crustcreate from "./pages/Crustcreate/crustcreate";
import ReactGA from "react-ga";
import $ from "jquery";
import Header from "./components/Header"
import Navbar from "./components/NavBar/NavBar";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render(){
   
    return (
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header data={this.state.resumeData.main}/>}></Route>
            <Route path="/createfund" element={<Createfund />}></Route>
            <Route path="/displayfunds" element={<Display />}></Route>
            <Route path="/donate" element={<Donate />}></Route>
            <Route path="/reactcards" element={<Reactcards />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route> 
            <Route path="/crustcreate" element={<Crustcreate />}></Route> 
            <Route path="/Authenticate" element={<Authenticate />}></Route> 
          </Routes>
        </BrowserRouter>
    );
  }
  
}
export default App;