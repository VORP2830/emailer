import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';
import axios from 'axios';

export default function App() {
    const editorRef = useRef(null);
    const [email, setemail] = useState("")
    const Enviar = () => {
      axios.post("https://apiemailer.herokuapp.com/enviar", 
      {email: email,
      editor: editorRef.current.getContent()}).then((res) => {
        alert(res.data.mensagem)
  };

  return (
    <>
  <p class="texto">Emailer</p>
    <div class="conteiner">
      <div class='box'>
        <input type="text" class="email" id="email" placeholder="Email" values={email} onChange={e =>setemail(e.target.value)}/>
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue=""
            init={{
            height: 500,
            width:800,
            menubar: true,
            plugins: [
              'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
              'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
              'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount','code'
            ],
            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
            }}
        />
        <button onClick={Enviar}  class="enviar">Enviar email</button>
      </div>
    </div>
    </>
  );
}
