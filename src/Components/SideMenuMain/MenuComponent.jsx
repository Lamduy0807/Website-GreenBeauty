import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getCategory } from '../../API/Networking'
const MenuComponent = (props) => {
    const [submenu, setSubmenu] = useState([])
    useEffect(()=>{
        getCategory(props.id).then(res=>{
            setSubmenu(res)
        })
    },[])
    const activeStyle = {
        backgroundColor: 'rgba(50,110,81, .6)',
      }
    const Sub = (props) =>{
        return(
            <NavLink activeStyle={activeStyle} to={'/asd'} className="menucompo__submenu">
                <div className="menucompo__submenu__name">{props.name}</div>
                <i className='bx bx-chevron-right menucompo__submenu__i'></i>
            </NavLink>
        )
    }  
  return (
    <div className='menucompo'>
        <Link to={'/'} className='menucompo__h3'>{props.name}</Link>
        {
            submenu.map((item, index)=>{
                return(
                    <Sub key={index} name={item.name}/>
                )
            })
        }
    </div>
  )
}

export default MenuComponent