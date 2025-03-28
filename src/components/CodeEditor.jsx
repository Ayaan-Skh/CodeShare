import React, { useEffect } from 'react'
import CodeMirror from 'codemirror'
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/themes/darcula.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/addon/edit/closetag'
// import 'codemirror/addon/edit/closebrackets'


const CodeEditor = () => {
  useEffect(() => {
    async function init() {
      CodeMirror.fromTextArea(document.getElementById('realTimeEditor'),{
        mode:{name:"javascript",json:true},
        theme:"dracula",
        autoCloseTage:true,
        autoCloseBrackets:true,
        lineNumbers:true
      })
    }
    init()
  }, [])


  return (
    <textarea id='realTimeEditor'></textarea>
  )
}

export default CodeEditor
