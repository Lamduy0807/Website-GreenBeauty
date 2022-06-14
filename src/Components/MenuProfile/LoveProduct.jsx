import React, { useState, useEffect, useContext } from "react";
import { formatNumber } from "../../Function/Function";
import { PopupAddProductToCart } from "../Cart/Popup";
import { CartContext } from "../../Context/CartContext/CartContext";
import {
  postItemToCart,
  getProductFromCart,
  putItemInCart,
} from "../../API/Server";
const LoveProduct = (props) => {
  const { getCartInformation } = useContext(CartContext);
  const product = props;
  const [tonTai, setTonTai] = useState(false);
  const [product_Exist, setProduct_Exist] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  //fetch dữ liệu giỏ hàng
  const fetchProductFromCart = () => {
    try {
      const id = localStorage.getItem("id");
      getProductFromCart(id, "")
        .then((items) => {
          items.forEach((item) => {
            if (item.product == product.id) {
              setTonTai(true); //sản phẩm đã tồn tại
              setProduct_Exist(item);
            }
          });
        })
        .catch((error) => {});
    } catch (e) {
      console.log(e);
    }
  };

  //refresh khi thêm sản phẩm mới
  const refreshProductFromCart = () => {
    try {
      const id = localStorage.getItem("id");
      getProductFromCart(id, "")
        .then((items) => {
          items.forEach((item) => {
            if (item.product === product.id) {
              setTonTai(true);
            }
          });
        })
        .catch((error) => {});
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = () => {
    {
      try {
        const id = localStorage.getItem("id");
        const tokens = localStorage.getItem("token");
        if (!tonTai) {
          fetchProductFromCart();
          postItemToCart(id, tokens, product, 1)
            .then((item) => {
              console.log("Thêm vào giỏ hàng thành công");
              getCartInformation();
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        } else if (tonTai) {
          fetchProductFromCart();
          putItemInCart("+", product_Exist, tokens, 1)
            .then((item) => {
              getCartInformation();
              console.log("Đã update số lượng sản phẩm", product_Exist);
              //Chỗ này phải so sánh số lượng đang ở trong giỏ hàng của 1 user, nhiều user với tổng số lượng sp
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        }
      } catch (e) {
        console.log(e);
      }
    }
    setTonTai(true);
  };

  useEffect(() => {
    fetchProductFromCart();
  }, []);
  return (
    <div className="lp">
      <div className="lp__container">
        <div className="lp__name">
          <div className="lp__img">
            <img className="lp__img--img" src={props.imagepresent} />
          </div>
          <div className="lp__namecontent">
            <span className="lp__namecontent--brand">{props.brand}</span>
            <span className="lp__namecontent--name">{props.name}</span>
          </div>
        </div>
        <div className=" lp__status">
          {props.quantity > 0 ? (
            <div className="lp__status--success ">
              <i className="bx bx-check"></i>
              Còn hàng
            </div>
          ) : (
            <div className="lp__status--unsuccess">
              <i className="bx bx-x"></i>
              Hết hàng
            </div>
          )}
        </div>
        <div className="lp__price">
          {props.IsFlashsale ? (
            <div className="lp__price__sale">
              {formatNumber(props.priceSale + "")}
              <span className="lp__price__d">đ</span>
            </div>
          ) : null}
          <div
            className={
              props.IsFlashsale
                ? "lp__price__main lp__price__main--strock"
                : "lp__price__main"
            }
          >
            {formatNumber(props.price + "")}
            <span className="lp__price__d">đ</span>
          </div>
        </div>
        <div className="lp__buttoncontent ">
          <button
            style={{ borderWidth: 0 }}
            onClick={handleAddToCart}
            className={
              props.quantity > 0
                ? "lp__button lp__button--success"
                : "lp__button lp__button--unsuccess"
            }
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <PopupAddProductToCart
        trigger={showPopup}
        setTrigger={() => setShowPopup(false)}
      >
        <p>Sản phẩm đã được thêm vào Giỏ hàng</p>
      </PopupAddProductToCart>
    </div>
  );
};

export default LoveProduct;
