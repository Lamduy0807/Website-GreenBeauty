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
            <Link className="menu__content__item--link">
              <i class="bx bxs-user-badge margin-right"></i>
              Tài khoản của bạn
            </Link>
          </div>

          <div className="menu__content__item">
            <Link className="menu__content__item--link">
              <i class="bx bx-receipt margin-right"></i>
              Quản lý đơn hàng
            </Link>
          </div>
          <div className="menu__content__item">
            <Link className="menu__content__item--link">
              <i class="bx bxs-heart margin-right"></i>
              Sản phẩm yêu thích
            </Link>
          </div>
          <div className="menu__content__item"
          onClick={()=>{logOut(); getUserInfor(); getCartInformation(); handleLeave();}}>
            <Link className="menu__content__item--link">
              <i class="bx bx-log-out margin-right"></i>
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLogin;
