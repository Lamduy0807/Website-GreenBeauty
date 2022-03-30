import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { postLogin } from "../API/Networking";
import { CartContext } from "../Context/CartContext/CartContext";
import { UserContext } from "../Context/UserContext/UserContext";
const LoginPopup = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { getCartInformation } = useContext(CartContext);
  const { getUserInfor } = useContext(UserContext);

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
  return (
    <>
      {showLogin ? (
        <div className="login">
          <div className="login__container">
            <div
              className="login__container__exit"
              onClick={() => setShowLogin((prev) => !prev)}
            >
              <i class="bx bx-x"></i>
            </div>
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
                <i class="bx bx-envelope login__form__i"></i>
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
                <div className="login__form__forgotpass--txt">
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
                <div className="login__form__register--res"> Đăng ký ngay</div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LoginPopup;
