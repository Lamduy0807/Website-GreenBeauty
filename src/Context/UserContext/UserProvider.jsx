import React, { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { getUserInformation } from '../../API/Networking';
const UserProvider = ({children}) => {

  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("")
  const [showUpdate, setShowUpdate] = useState(false);
  const [token, setToken] = useState("")
    useEffect(()=>{
        getUserInfor();
    },[])
    const getUserInfor = () =>{
        try{
            const id = localStorage.getItem('id')
            const tokens = localStorage.getItem('token')
            setToken(tokens);
            if(id>0)
                getUserInformation(id,tokens).then(res=>{
                    setUserData(res)
                    if(res.name === null)
                    {
                      setShowUpdate(true);
                    }
                    else
                    {
                      setUserName(handleSplit(res.name))
                    }
                })
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
    <UserContext.Provider value={{userData,setUserData, getUserInfor, userName,showUpdate, setShowUpdate, token}}>{children}</UserContext.Provider>
  )
}

export default UserProvider