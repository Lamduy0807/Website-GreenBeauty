import React, { useState, useEffect } from 'react'
import {ModalContext} from './ModalContext';
import { getTypeOfCategory } from '../../API/Networking';
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
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    getTypeOfCategory().then((res) => {
      setCategories(res);
    });
  },[])
  return (
    <ModalContext.Provider value={{categories,setCategories ,showRating,setShowRating,detailData, setDetailData, showMenu, setShowMenu, data, setData, showModal, setShowModal}}>{children}</ModalContext.Provider>
  )
}

export default ModalProvider