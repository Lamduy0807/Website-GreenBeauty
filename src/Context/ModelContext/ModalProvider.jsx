import React, { useState } from 'react'
import {ModalContext} from './ModalContext';

const ModalProvider = ({children}) => {

  const [data, setData]= useState({
      name:"",
      levelOfSave: 3,
      Description:""
  })
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  return (
    <ModalContext.Provider value={{showMenu, setShowMenu, data, setData, showModal, setShowModal}}>{children}</ModalContext.Provider>
  )
}

export default ModalProvider