import React, { useState } from "react";
import { postRegister } from "../API/Networking";
const RegisterPopup = ({ showRegister, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleRegister = () =>{
    if(password===rePassword)
    {
      postRegister(email,password).then(re=>{
        if(re===201)
        {
          alert("Tạo tài khoản thành công! Vui lòng check email đăng ký để xác nhận")
        }
        else{
          alert("Email này đã được đăng ký! vui lòng đăng ký bằng một email khác!")
        }
      })
    }
    else{
      alert("Password và nhập lại pass word không giống nhau!")
    }
  }
  return (
    <>
      {showRegister ? (
        <div className="register">
          <div className="register__container">
            <div className="register__container__exit"
            onClick={()=> setShowRegister(prev=> !prev)}>
              <i class="bx bx-x"></i>
            </div>

            <form className="register__form">
              <h1 className="register__form__h1">Let's join GreenBeauty</h1>
              <div className="register__form__realtive">
                <input
                  className="register__form__input"
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i class="bx bx-envelope register__form__i"></i>
              </div>

              
              <div className="register__form__realtive">
                <input
                  className="register__form__input"
                  type="password"
                  placeholder="Nhập password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i class="bx bx-lock-alt register__form__i"></i>
              </div>

              <div className="register__form__realtive">
                <input
                  className="register__form__input"
                  type="password"
                  placeholder="Nhập lại password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <i class="bx bx-lock-alt register__form__i"></i>
              </div>
              <div className="register__form__button"
              onClick={handleRegister}>
                <div className="register__form__button--btn">Đăng Ký</div>
              </div>
              <div className="register__form__login">
                <div>Bạn đã có tài khoản? </div>
                <div className="register__form__login--res">
                  Đăng nhập ngay
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RegisterPopup;
