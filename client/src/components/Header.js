import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import NavBar from "../components/NavBar/NavBar"

class Header extends Component {
  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const description = this.props.data.description;

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
     

        {/* <nav id="nav-wrap">
      

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#create">
                Create fund
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#donate">
                Donate
              </a>
            </li>

           
          </ul>
        </nav> */}

        <NavBar/>

        {/* <div className="row banner"  style={{ align:"center" }}> */}
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh' ,fontSize:'150px'}}>

          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h4>{description}</h4>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
