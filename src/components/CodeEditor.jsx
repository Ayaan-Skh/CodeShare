import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = CodeMirror.fromTextArea(editorRef.current, {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    return () => editor.toTextArea();
  }, []);

  const runCode = () => {
    try {
      const code = editorRef.current.value; // Get code from editor
      const result = eval(code); // Execute JS code
      setOutput(result !== undefined ? result.toString() : "No output");
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div>
      <textarea ref={editorRef} className="h-screen w-screen" defaultValue="console.log('Hello, CodeMirror!');" />
      <button onClick={runCode} className='mt-[10px] text-white font-semibold text-md py-[8px] w-30 bg-slate-900 rounded-lg'>
        Run Code
      </button>
      <pre style={{ backgroundColor: "#282A36", color: "#fff", padding: "10px", marginTop: "10px" }}>
        {output}
      </pre>
    </div>
  );
};

export default CodeEditor;
