import React, { useState } from 'react'
import {ModalContext} from './ModalContext';

const ModalProvider = ({children}) => {

  const [data, setData]= useState({
      name:"",
      levelOfSave: 3,
      Description:""
  })
  const [showModal, setShowModal] = useState(false)
  return (
    <ModalContext.Provider value={{data, setData, showModal, setShowModal}}>{children}</ModalContext.Provider>
  )
}

export default ModalProvider