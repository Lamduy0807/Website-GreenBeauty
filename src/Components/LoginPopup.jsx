import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { postLogin, postForgotPassword } from "../API/Networking";
import { CartContext } from "../Context/CartContext/CartContext";
import { UserContext } from "../Context/UserContext/UserContext";
const LoginPopup = ({ showLogin, setShowLogin, openRe }) => {
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail]= useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { getCartInformation } = useContext(CartContext);
  const { getUserInfor } = useContext(UserContext);
  const [forgotPassword,setForgotPassword] = useState(false)
  const handleLogin = () => {
    postLogin(email, password).then((res) => {
      if (res.status === 401)
        alert("Error: Wrong email or password, please enter again");
      else if (res.status === 500)
        alert(
          "Error: Account has not verified yet, please check register mail again"
        );
      else {
        signIn(res.tokens, res.id);
        setShowLogin((prev) => !prev);
        getCartInformation();
        getUserInfor();
      }
    });
  };
  const handleResetPassword = () =>{
    postForgotPassword(resetEmail).then(res=>{
      if(res === 200)
        alert("Check your email, to reset password");
      else
        alert("Error: Wrong email or invalid email, please enter again");
    })
  }
  return (
    <>
      {showLogin ? (
        <div className="login">
          <div className="login__container">
            <div
              className="login__container__exit"
              onClick={() => setShowLogin((prev) => !prev)}
            >
              <i className="bx bx-x"></i>
            </div>
            {
              forgotPassword?
              (
                <form className="login__form">
                    <h1 className="login__form__h1">Welcome to GreenBeauty</h1>
              <div className="login__form__realtive">
                <input
                  className="login__form__input"
                  type="email"
                  placeholder="Nhập email đã đăng ký"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <i className="bx bx-envelope login__form__i"></i>
              </div>
              <div className="login__form__button">
                <div className="login__form__button--btn" onClick={handleResetPassword}>
                  Lấy lại mật khẩu
                </div>
              </div>
              <div className="login__form__button">
                <div className="login__form__button--btn" onClick={()=>{setForgotPassword(false)}}>
                  Quay về đăng Nhập
                </div>
              </div>
                </form>
              ):
              (
            <form className="login__form">
              <h1 className="login__form__h1">Welcome to GreenBeauty</h1>
              <div className="login__form__realtive">
                <input
                  className="login__form__input"
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="bx bx-envelope login__form__i"></i>
              </div>
              <div className="login__form__realtive">
                <input
                  className="login__form__input"
                  type="password"
                  placeholder="Nhập password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i class="bx bx-lock-alt login__form__i"></i>
              </div>
              <div className="login__form__forgotpass">
                <div className="login__form__forgotpass--txt" onClick={()=>{setForgotPassword(true)}}>
                  Quên mật khẩu?
                </div>
              </div>
              <div className="login__form__button">
                <div className="login__form__button--btn" onClick={handleLogin}>
                  Đăng nhập
                </div>
              </div>
              <div className="login__form__register">
                <div>Bạn chưa có tài khoản? </div>
                <div className="login__form__register--res" onClick={() => { openRe(); setShowLogin((prev) => !prev);}} > Đăng ký ngay</div>
              </div>
            </form>
              )
            }
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPopup;
