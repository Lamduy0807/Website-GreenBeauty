import React, { useState, useEffect, useContext } from "react";
import { getProductById } from "../../API/Networking";
import { getProductFromCart } from "../../API/Server";
import { putItemInCart } from "../../API/Server";
import { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from "../../Context/CartContext/CartContext";
import { deleteProductFromCart } from "../../API/Server";
import { formatNumber } from "../../Function/Function";

export const CartItem = ({ item, handleSelect, handlePlus, handleSub }) => {
  const { getCartInformation } = useContext(CartContext);
  const cartID = item.id;
  const productID = item.product;
  const { token, userData } = useContext(UserContext);
  const [product, setProduct] = useState("");
  const [isSelected, setIsSelect] = useState(false);
  const [quantity, setQuantity] = useState(item.quantities);

  const fetchProductById = (productID) => {
    getProductById(productID)
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Khi bấm dấu + hoặc - thì filter trong Cart với user_id và product_id
  const btnPlus = () => {
    getProductFromCart(userData.id, productID)
      .then((product) => {
        product.forEach((_product) => {
          putItemInCart("+", _product, token, 1)
            .then((item) => {
              console.log("Đã cộng số lượng sản phẩm");
              setQuantity(item.quantities);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        });
      })
      .catch((error) => {
        console.error(`Error is: ${error}`);
      });

    if (isSelected) {
      handlePlus(product, quantity);
    }
  };

  //Chưa xử lý dc
  const handleDeleteProduct = () => {
    deleteProductFromCart(cartID)
      .then(() => {
        getCartInformation();
        console.log("đã xóa sản phẩm khỏi giỏ hàng");
      })
      .catch((error) => {
        console.log("xóa sp khỏi giót hàng thất bại");
      });
  };

  const btnSub = () => {
    if (quantity > 1) {
      getProductFromCart(userData.id, productID)
        .then((product) => {
          product.forEach((_product) => {
            putItemInCart("-", _product, token, 1)
              .then((item) => {
                console.log("Đã trừ số lượng sản phẩm");
                setQuantity(item.quantities);
              })
              .catch((error) => {
                console.error(`Error is: ${error}`);
              });
          });
        })
        .catch((error) => {
          console.error(`Error is: ${error}`);
        });
      if (isSelected) {
        handleSub(product, quantity);
      }
    }
  };

  useEffect(() => {
    fetchProductById(productID);
  }, []);

  return (
    <div className="cartItem">
      <div className="cartItem__checkbox">
        <label>
          <input
            type={"checkbox"}
            onChange={(event) => {
              handleSelect(event.target.checked, product, quantity);
              setIsSelect(event);
            }}
          ></input>
        </label>
      </div>
      <div className="cartItem__sp">
        <img
          style={{ height: 80, width: 80 }}
          src={product.imagepresent}
          alt="thumnail"
        />
        <div style={{ marginLeft: ".5rem" }}>{product.name}</div>
      </div>

      <div className="cartItem__price">
        {formatNumber(product.price + "")} đ
      </div>
      <div className="cartItem__quan">
        <div className="cartItem__quan__container">
          {quantity}
          <div className="cartItem__quan__modify">
            <i
              onClick={btnPlus}
              className="bx bxs-up-arrow cartItem__quan__icon"
            ></i>
            <i
              onClick={btnSub}
              className="bx bxs-down-arrow cartItem__quan__icon"
            ></i>
          </div>
        </div>
      </div>
      <div className="cartItem__st">
        {formatNumber(product.price * quantity + "")} đ
      </div>
      <div onClick={handleDeleteProduct} className="cartItem__tt">
        <button className="cartItem__tt__btn">Xóa</button>
      </div>
    </div>
  );
};
