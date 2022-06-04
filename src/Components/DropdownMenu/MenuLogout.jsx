import React, { useContext } from "react";
import { Link } from "react-router-dom";

const MenuLogout = ({open, openRe}) => {
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__content">
          <div className="menu__content__item"
          onClick={()=>{open()}}>
            <Link to={'/'} className="menu__content__item--link">
              <i className="bx bx-log-in margin-right"></i>
              Đăng nhập
            </Link>
          </div>
          <div className="menu__content__item"
          onClick={()=>{openRe()}}>
            <Link to={'/'} className="menu__content__item--link">
                <i className='bx bx-edit-alt margin-right'></i>
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLogout;
