import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar , Button } from "react-bootstrap";
import { useSelector ,useDispatch} from "react-redux";
import { mailactions } from "../store/mailreducers";

const NavbarComponent = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const dispatch = useDispatch()
  const history = useHistory()
  const clickHandler = () =>{
    localStorage.removeItem('token')
    dispatch(mailactions.logout)
    alert('user successfully logged out')
    history.replace('/login')
  }
  return (
    <Navbar
      style={{
        height: "4rem",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "black",
        zIndex: "100",
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
          fontSize:'1.6rem'
        }}
      >
        Mail Box
      </Navbar.Brand>
      {isLoggedIn && <Button style={{marginRight:'3rem',width:'100px'}} variant='light' onClick={clickHandler}>Logout</Button>}
    </Navbar>
  );
};

export default NavbarComponent;