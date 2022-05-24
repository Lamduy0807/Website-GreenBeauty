import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext/CartContext";
import { UserContext } from "../Context/UserContext/UserContext";
import MenuLogin from "./DropdownMenu/MenuLogin";
import MenuLogout from "./DropdownMenu/MenuLogout";
import { ModalContext } from "../Context/ModelContext/ModalContext";
const Header = ({open, openRe}) => {
  const {cartData} = useContext(CartContext);
  const {userName, token} = useContext(UserContext);
  const { setShowMenu } = useContext(ModalContext);

  const [quantity,setQuantity] = useState(0);
  const [likeList, setLikeList] = useState('');

  useEffect(()=>{
    setQuantity(cartData.length)
  },[cartData])

  const renderLikeList = (val) =>{
    return val? <MenuLogin handleLeave={handleLeave}/> :<MenuLogout open={open} openRe={openRe}/>;
  }
  const handleLeave=()=>{
    setLikeList('')
  }
  const handleHover=(val)=>{
    setLikeList(renderLikeList(val))
  }
  return (
    <>
      <div className="header">
      <div className="header__content">
        <div className="header__logo">
          <div className="header__logo__menu">
            <i onClick={()=>setShowMenu(prev=>!prev)} className="bx bx-menu cursor"></i>
          </div>
          <div className="header__logo__icon">
            <Link className="header__logo__icon__site" to="/">
              <img
                className="header__logo__icon__img"
                src={require("../assets/img/logo1.png")}
              />
            </Link>
          </div>
        </div>

        <div className="header__search">
          <div className="header__search__bar">
            <div className="header__search__main">
              <form className="header__search__form">
                <input className="header__search__input"></input>
              </form>
            </div>
            <button
              type="button"
              className="btn btn-solid-primary btn--s btn--inline header__search__search-button"
            >
              <i className='bx bx-search-alt-2'></i>
            </button>
          </div>
        </div>

        <div className="header__right">
            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper">
                <Link to='/cart' className="header__right__icon_header">
                    <i className='bx bx-cart-alt header__right__icon_header-icon'></i>
                    {
                      quantity>0?
                      <span className="header__right__icon_header__counter_number">{quantity}</span>
                      :
                      null
                    } 
                </Link>
                <Link to='/cart' className="header__right__txt_gio_hang"> Giỏ <br></br> hàng </Link>
            </div>
            
            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper"
              onMouseOver={()=>{token===null?handleHover(false): handleHover(true)}} onMouseLeave={handleLeave}>
                <div className="header__right__icon_header">
                    <i className='bx bx-user header__right__icon_header-icon'></i>
                </div>
                <div className="header__right__txt_gio_hang"> Chào {userName} <br></br> Tài khoản </div>
                {likeList}
            </div>
            
            
            
            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper">
                <Link to='/analys' className="header__right__icon_header">
                    <i className='bx bx-analyse header__right__icon_header-icon'></i>
                </Link>
                <Link to='/analys' className="header__right__txt_gio_hang"> Phân tích <br></br> Thành phần </Link>
            </div>
        </div>
      </div>
      
    </div>
    </>
   
  );
};

export default Header;
