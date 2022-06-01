import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="row">
          
          <div className="col-1-of-4">
            <h2 className="footer__h2">Chăm sóc khách hàng</h2>
            <ul className="footer__ul">
              <Link to={'/'} className="footer__li">Trung tâm giúp đỡ</Link>
              <Link to={'/'} className="footer__li">Hướng dẫn mua hàng</Link>
              <Link to={'/'} className="footer__li">Chăm sóc khách hàng</Link>
              <Link to={'/'} className="footer__li">Trả hàng hoàn tiền</Link>
            </ul>
          </div>
          <div className="col-1-of-4">
            <h2 className="footer__h2">Về GreenBeauty</h2>
            <Link to={'/'} className="footer__li">Giới thiệu</Link>
              <Link to={'/'} className="footer__li">Tuyển dụng</Link>
              <Link to={'/'} className="footer__li">Liên hệ</Link>
          </div>
          <div className="col-1-of-4">
            <h2 className="footer__h2">Theo dõi chúng tôi</h2>
            <Link to={'/'} className="footer__li text-align">
              <i className='bx bxl-facebook-square margin-right text-align'></i>
              Facebook</Link>
              <Link to={'/'} className="footer__li text-align">
              <i className='bx bxl-instagram margin-right text-align' ></i>
              Instagram</Link>
          </div>
          <div className="col-1-of-4">
            <p>
              <Link to="/">
                <img src={require("../assets/img/logo1.png")} className="footer__logo" alt="" />
              </Link>
            </p>
            <p className="footer__p"> 
              Hãy cùng GreenBeauty hướng đến một cuộc sống
              năng động, tích cực với làn da tươi trẻ và khỏe mạnh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
