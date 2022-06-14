import React, { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { getUserInformation, getDefaultAddress } from '../../API/Networking';
const UserProvider = ({children}) => {

  const [userData, setUserData] = useState();
  const [userAvt, setUserAvt] = useState('');
  const [userName, setUserName] = useState("")
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateDelivery, setShowUpdateDelivery] = useState(false)
  const [token, setToken] = useState("")
    useEffect(()=>{
        getUserInfor();
    },[])
    const getUserInfor = () =>{
        try{
            const id = localStorage.getItem('id')
            const tokens = localStorage.getItem('token')
            setToken(tokens);
            if(id>0){
                getDefaultAddress(id, tokens).then(res=>{
                  if(res.length === 0)
                    setShowUpdateDelivery(true)
                })
                getUserInformation(id,tokens).then(res=>{
                    setUserData(res)
                    setUserAvt(res.avt)
                    if(res.name === null)
                    {
                      setShowUpdate(true);
                    }
                    else
                    {
                      setUserName(handleSplit(res.name))
                    }
                })
              }
            else{
              setUserName('')
            }
        }catch(error){
            console.log(`Error is ${error}`);
        }
    }

    const handleSplit = (val) =>{
        const nameArray = val.split(" ");
        return nameArray[nameArray.length-1]
    }
    
  return (
    <UserContext.Provider value={{showUpdateDelivery, setShowUpdateDelivery, userAvt, userData,setUserData, getUserInfor, userName,showUpdate, setShowUpdate, token}}>{children}</UserContext.Provider>
  )
}

export default UserProvider