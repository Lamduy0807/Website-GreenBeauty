import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Context/ModelContext/ModalContext";
import { UserContext } from "../Context/UserContext/UserContext";
import MenuComponent from "./SideMenuMain/MenuComponent";
import { getTypeOfCategory } from "../API/Networking";
const SideMenu = () => {
  const { showMenu, setShowMenu } = useContext(ModalContext);
  const {userName} = useContext(UserContext);
  const [category, setCategory]= useState([])
  useEffect(()=>{
    getTypeOfCategory().then(res=>{
        setCategory(res);
    })
  },[])
  return (
    <>
      {showMenu ? (
        <div className="sidemenu">
          <div className="sidemenu__container">
            <div className="sidemenu__left">
                <div className="sidemenu__left__head">
                    <div className="sidemenu__left__head--right">
                        <img src="https://hasaki.vn/images/graphics/icon_account_white.svg"/>
                        <h3 className="sidemenu__left__head--right--h3">Chào {userName}</h3>
                    </div>
                    <i onClick={()=> setShowMenu(prev=>!prev)} className='bx bx-menu-alt-right sidemenu__left__head--icon'></i>
                </div>
                <div className="sidemenu__left__footer">
                    {
                        category.map((item, index)=>{
                            return(
                                <MenuComponent key={index} name={item.name} id={item.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="sidemenu__right"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SideMenu;
