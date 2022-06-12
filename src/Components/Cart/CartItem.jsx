import React, { useState, useEffect, useContext } from "react";
import { getProductById } from "../../API/Networking";
import { getProductFromCart } from "../../API/Server";
import { putItemInCart } from "../../API/Server";
import { UserContext } from "../../Context/UserContext/UserContext";

export const CartItem = ({ item, handleSelect }) => {
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
          putItemInCart("+", _product, token)
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
  };

  const btnSub = () => {
    getProductFromCart(userData.id, productID)
      .then((product) => {
        product.forEach((_product) => {
          putItemInCart("-", _product, token)
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
      <div>
        <img
          style={{ height: 80, width: 80 }}
          src={product.imagepresent}
          alt="thumnail"
        />
      </div>

      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>
        <button onClick={btnSub}>-</button>
        <button>{quantity}</button>
        <button onClick={btnPlus}>+</button>
      </div>
    </div>
  );
};
