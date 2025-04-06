import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

const CodeEditor = () => {
  const editorRef = useRef(null);
  const codemirrorRef = useRef(null);
  const roomId = '12345';

  useEffect(() => {
    if (!editorRef.current) return;
  
    socket.emit("join-room", roomId);
  
    codemirrorRef.current = CodeMirror.fromTextArea(editorRef.current, {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });
  
    codemirrorRef.current.on("change", (instance) => {
      const updatedCode = instance.getValue();
      console.log("New local code:", updatedCode);
      socket.emit("code-change", { code: updatedCode, roomId }); // ✅ fixed
    });
  
    socket.on("code-update", (newCode) => {
      const editor = codemirrorRef.current;
      console.log("Received remote code update:", newCode);
      if (editor && editor.getValue() !== newCode) {
        editor.setValue(newCode); // ✅ fixed
      }
    });
  
    return () => {
      socket.disconnect();
      codemirrorRef.current.toTextArea();
    };
  }, []);
  

  return (
    <div>
      <textarea ref={editorRef} className="h-screen w-screen" />
    </div>
  );
};

export default CodeEditor;
