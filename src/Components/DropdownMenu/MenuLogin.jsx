import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from "../../Context/CartContext/CartContext";
const MenuLogin = ({handleLeave}) => {
    const {logOut} = useContext(AuthContext)
    const {getUserInfor} = useContext(UserContext)
    const {getCartInformation} = useContext(CartContext)
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__content">
          <div className="menu__content__item">
            <Link to='/profile' className="menu__content__item--link">
              <i className="bx bxs-user-badge margin-right"></i>
              Tài khoản của bạn
            </Link>
          </div>

          <div className="menu__content__item">
            <Link  to='/order-manage' className="menu__content__item--link">
              <i className="bx bx-receipt margin-right"></i>
              Quản lý đơn hàng
            </Link>
          </div>
          <div className="menu__content__item">
            <Link to={'/product-love'} className="menu__content__item--link">
              <i className="bx bxs-heart margin-right"></i>
              Sản phẩm yêu thích
            </Link>
          </div>
          <div className="menu__content__item"
          onClick={()=>{logOut(); getUserInfor(); getCartInformation(); handleLeave();}}>
            <Link to={""} className="menu__content__item--link">
              <i className="bx bx-log-out margin-right"></i>
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLogin;
