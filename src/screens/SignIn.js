import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./Signin.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const emailref = useRef();
  const passwordref = useRef();
  const confirmref = useRef();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const obj = {
        email:emailref.current.value,
        password:passwordref.current.value
    }
    try {
      if (passwordref.current.value === confirmref.current.value) {
        const res = await axios.post('http://localhost:5000/sign-in',obj);
        if(res.status===201){
            // window.location.href='./login.html';
            history.push('/login')
        }else{
            throw new Error('failed to signin');
        }
      } else {
        alert("Password and Confirm Password does not match");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Container className="container">
      <Form className="form" onSubmit={submitHandler}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "500",
          }}
        >
          Sign Up
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailref}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passwordref}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 position-relative"
          controlId="formBasicConfirmPassword"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Retype password"
            required
            ref={confirmref}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          style={{ width: "100%", marginTop: "5px", borderRadius: "20px" }}
        >
          Sign In
        </Button>
      </Form>

      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <button className="buttonControl">Have an account? Login </button>
      </Link>
    </Container>
  );
};

export default SignUp;