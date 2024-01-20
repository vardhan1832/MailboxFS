import React, { useEffect, useState } from "react";
import { Button ,Row , Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const token = localStorage.getItem('token')
const Inbox = () => {
    const [mails, setMails] = useState([])
    useEffect(()=>{
        const getMails = async () =>{
            try{
                const response = await axios.get('http://localhost:5000/inbox',{headers:{"Authorization" : token}})
                if(response.status === 200){
                    setMails(response.data.inbox)
                }else{
                    throw new Error(response.data.message)
                }
            }catch(err){
                console.log(err)
            }
        }
        getMails()
    },[])
  return (
    <>
      <Row>
        <Col lg="2">
          <div>
            <ListGroup variant="flush" style={{ marginTop: "6rem" }}>
              <ListGroup.Item>
                <Link to='/mailbox'><Button variant="light">+ Compose</Button></Link>
              </ListGroup.Item>
              <ListGroup.Item><Link to='/inbox'>Inbox</Link></ListGroup.Item>
              <ListGroup.Item>Starred</ListGroup.Item>
              <ListGroup.Item><Link to='/sent'>Sent</Link></ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col lg="10">
            <div>
          <ListGroup variant="flush" style={{ marginTop: "6rem" }}>
          <h3 style={{color:'black', marginLeft:'1.7rem'}}>Inbox</h3>
           {mails.length>0 ? mails.map((mail)=>{
            return (
                <ListGroup.Item key={mail.id}>{mail.sender}</ListGroup.Item>
            )
           }):<h4 style={{marginTop:'4rem',marginLeft:'1.7rem'}}>No Mails To Display...</h4>}
          </ListGroup>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Inbox;
