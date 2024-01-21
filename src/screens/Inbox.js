import React, { useEffect } from "react";
import { Button, Row, Col,Modal } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { mailactions } from "../store/mailreducers";
import axios from "axios";


const token = localStorage.getItem("token");

const Inbox = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails);
  const unreadTotal = useSelector((state)=>state.unreadTotal)
  useEffect(() => {
    const getMails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/inbox", {
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          dispatch(mailactions.addMail(response.data.inbox));
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMails();
  }, [dispatch]);

  const mailClickHandler =async (id) =>{
      setModalShow(true)
      try{
        const response = await axios.post(`http://localhost:5000/mailbox/${id}`,{unread:false},{headers:{"Authorization" : token}})
        if(response.status === 200 ){
           let mailIndex = mails.findIndex((mail)=>{
            return mail.id === id
           })
           if(mailIndex!==-1){
            mails[mailIndex].unread= false;
            let newMail = [...mails]
            dispatch(mailactions.addMail(newMail))
           }
        }else{
          throw new Error(response.data.message)
        }
      }catch(err){
        console.log(err)
      }
  }

  const deletehandler = async (id) =>{
    const confirmDelete = window.confirm('Are you sure to Delete this Mail?')
    if(confirmDelete){
      try{
        const response = await axios.delete(`http://localhost:5000/mailbox/${id}`,{headers:{"Authorization" : token}})
        if(response.status === 200 ){
          let newMail = mails.filter((mail)=>{
            return mail.id !== id
           })
            dispatch(mailactions.addMail(newMail))
            alert(response.data.message)
        }else{
          throw new Error(response.data.message)
        }
      }catch(err){
        console.log(err)
      }
    }else{
      return
    }
  }
  const iconStyle = {
    width: "15px",
    height: "15px",
    backgroundColor: "blue",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "4px",
    marginRight: "2rem",
  };
  return (
    <>
      <Row>
        <Col lg="2">
          <div>
            <ListGroup variant="flush" style={{ marginTop: "6rem" }}>
              <ListGroup.Item>
                <Link to="/mailbox">
                  <Button variant="light">+ Compose</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to="/inbox">Inbox </Link><span style={{color:'black', marginLeft:'2rem'}}>{unreadTotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>Starred</ListGroup.Item>
              <ListGroup.Item>
                <Link to="/sent">Sent</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col lg="10">
          <div>
            <ListGroup variant="flush" style={{ marginTop: "6rem" }}>
              <h3 style={{ color: "black", marginLeft: "1.7rem" }}>Inbox</h3>
              {mails.length > 0 ? (
                mails.map((mail) => {
                  return (
                    <>
                      <ListGroup.Item key={mail.id} style={{ display: "flex", cursor:'pointer',justifyContent:'space-between' }}>
                        <div style={{display:'flex'}}  onClick={()=>mailClickHandler(mail.id)}>
                        {mail.unread && <span style={iconStyle} />}
                        {mail.sender}
                        </div>
                        <Button variant="danger" onClick={()=>deletehandler(mail.id)}>Delete Mail</Button>
                      </ListGroup.Item>
                      <Modal
                         show={modalShow}
                         onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            {mail.sender}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>To : {mail.receiver}</h4>
                          <p>
                           {mail.text}
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={()=>setModalShow(false)}>Close</Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  );
                })
              ) : (
                <h4 style={{ marginTop: "4rem", marginLeft: "1.7rem" }}>
                  No Mails To Display...
                </h4>
              )}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Inbox;
