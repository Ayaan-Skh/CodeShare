import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Homepage } from './pages/home'
import { Toaster } from 'react-hot-toast'
import { Editor } from './pages/EditorPage'
function App() {

  return (
    <>
    <Toaster
    position='top-center'
    >

    </Toaster>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/editor/:roomId' element={<Editor/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
