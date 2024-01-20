import React from "react";
import { Navbar} from "react-bootstrap";

const NavbarComponent = () =>{
    return (
        <Navbar
        style={{
          height: "4rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "black",
          zIndex: "10",
          position: "fixed",
          left: "0",
          top: "0",
          width: "100%",
        }}
      >
        <Navbar.Brand
          style={{
            fontWeight: "800",
            marginLeft: "2rem",
            color: "white",
          }}
        >
          Mail Box
        </Navbar.Brand>
      </Navbar>
    )
}

export default NavbarComponent