import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../Routes/Routes";
import Header from "./Header";
import Footer from "./Footer";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import UpdateInformation from "./UpdateInformation";
import IngredientDetailModal from '../Components/AnalyticsIngredient/IngredientDetailModal'
import AuthProvider from "../Context/AuthContext/AuthProvider";
import CartProvider from "../Context/CartContext/CartProvider";
import UserProvider from "../Context/UserContext/UserProvider";
import ModalProvider from "../Context/ModelContext/ModalProvider";
import SideMenu from "./SideMenu";
import RatingProduct from "./MenuProfile/RatingProduct";
const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const openLogin = () => {
    setShowLogin((prev) => !prev);
  };
  const openRegister = () => {
    setShowRegister((prev) => !prev);
  };
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <ModalProvider>
            <Route
              render={(props) => (
                <div>
                  <UpdateInformation/>
                  <RatingProduct/>
                  <IngredientDetailModal/>
                  <SideMenu/>
                  <LoginPopup
                    showLogin={showLogin}
                    setShowLogin={setShowLogin}
                  />
                  <RegisterPopup
                    showRegister={showRegister}
                    setShowRegister={setShowRegister}
                  />
                  <Header
                    {...props}
                    showLogin={showLogin}
                    setShowLogin={setShowLogin}
                    open={openLogin}
                    openRe={openRegister}
                  />
                  <div className="container">
                    <div className="main">
                      <Routes />
                    </div>
                  </div>
                  <Footer/>
                </div>
              )}
            />
            </ModalProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Layout;
