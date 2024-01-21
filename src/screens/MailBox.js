// MailBox.js
import React , {useRef} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./MailBox.css"; 
import axios from "axios";

const MailBox = () => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    const receiverRef = useRef('')
    const emailTextRef = useRef('')
    const clickHandler = async () =>{
        try{
            if (emailTextRef.current) {
                const contentState = emailTextRef.current.getEditorState().getCurrentContent();
                const rawText = contentState.getPlainText();
                const text = rawText.replace(/\n/g, '')
                const obj = {
                    receiver:receiverRef.current.value,
                    text:text
                }
                console.log(obj)
                const res = await axios.post('http://localhost:5000/mailbox',obj,{headers:{"Authorization" : token}})
                if(res.status === 200){
                    alert(res.data.message)
                    history.push('/inbox')
                }else{
                    throw new Error(res.data.message)
                }
            }
        }catch(err){
            console.log(err)
        }
        receiverRef.current.value = ''
    }
  return (
    <>
    <div style={{display:'flex',marginTop:'6rem'}}>
    <h4 style={{marginLeft:'25px',marginRight:'1rem'}}>TO</h4>
    <input type="email" placeholder="Input recipient email address" ref={receiverRef} required/><br/>
    </div>
      <div className="editor-container">
        <Editor
          ref={emailTextRef}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorStyle={{ minHeight: '350px',maxWidth:'700px', backgroundColor: '#dcdfe3', padding: '10px', wordWrap: 'break-word' }}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
            },
            list: {
              inDropdown: true,
              options: ['unordered', 'ordered'],
            },
            textAlign: {
              inDropdown: true,
              options: ['left', 'center', 'right'],
            },
          }}
        />
      </div>
      <Button onClick={clickHandler} variant="primary" style={{padding:'6px 10px', width:'5rem',height:'3rem',marginLeft:'25px',marginTop:'5px'}}>Send</Button>
    </>
  );
};

export default MailBox;
