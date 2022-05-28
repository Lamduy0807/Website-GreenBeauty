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
  const [showRating, setShowRating] = useState(false);
  const [detailData, setDetailData] = useState([])
  return (
    <ModalContext.Provider value={{showRating,setShowRating,detailData, setDetailData, showMenu, setShowMenu, data, setData, showModal, setShowModal}}>{children}</ModalContext.Provider>
  )
}

export default ModalProvider