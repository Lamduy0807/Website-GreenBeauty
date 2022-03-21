import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const Quantity = 2;
  const name = 'Leo'
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__logo">
          <div className="header__logo__menu">
            <i class="bx bx-menu"></i>
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
              class="btn btn-solid-primary btn--s btn--inline header__search__search-button"
            >
              <i class='bx bx-search-alt-2'></i>
            </button>
          </div>
        </div>

        <div className="header__right">
            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper">
                <Link to='/cart' class="header__right__icon_header">
                    <i class='bx bx-cart-alt header__right__icon_header-icon'></i>
                    <span className="header__right__icon_header__counter_number">{Quantity}</span>
                </Link>
                <Link to='/cart' class="header__right__txt_gio_hang"> Giỏ <br></br> hàng </Link>
            </div>

            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper">
                <Link to='/cart' class="header__right__icon_header">
                    <i class='bx bx-user header__right__icon_header-icon'></i>
                </Link>
                <Link to='/cart' class="header__right__txt_gio_hang"> Chào {name} <br></br> Tài khoản </Link>
            </div>

            <div className="header__right__item-header header__right__item-header-giohang minicart-wrapper">
                <Link to='/cart' class="header__right__icon_header">
                    <i class='bx bx-analyse header__right__icon_header-icon'></i>
                </Link>
                <Link to='/cart' class="header__right__txt_gio_hang"> Phân tích <br></br> Thành phần </Link>
            </div>
        </div>
      </div>

      
    </div>
  );
};

export default Header;
