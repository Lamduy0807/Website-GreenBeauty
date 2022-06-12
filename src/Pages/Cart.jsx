import React, { useState, useEffect, useContext } from "react";
import EmptyCart from "../Components/Cart/EmptyCart";
import { CartItem } from "../Components/Cart/CartItem";
import { CartContext } from "../Context/CartContext/CartContext";
import { UserContext } from "../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { getAddressDelivery } from "../API/Server";
import { Popup } from "../Components/Cart/Popup";

const Cart = () => {
  const { cartData } = useContext(CartContext);
  const { token, userData } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEmptyAddress, setShowPopupEmptyAddress] = useState(false);
  const [selected, setSelected] = useState(0);
  const [listDataSelect, setListDataSelect] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  const history = useHistory();

  //Handle select product
  const handleSelect = (event, product, quantity) => {
    let listItem = listDataSelect;
    if (event === true) {
      listItem.push(product);
      setSelected(selected + 1);
      setListDataSelect(listItem);
      setTotalCash(totalCash + quantity * product.price);
    } else {
      let newList = listItem.filter((item) => item.id !== product.id);
      setSelected(selected - 1);
      setListDataSelect(newList);
      setTotalCash(totalCash - quantity * product.price);
    }
  };

  //Btn Mua Hàng
  const handleBuyProduct = () => {
    if (selected > 0) {
      getAddressDelivery(token, userData.id, "")
        .then((data) => {
          if (Object.keys(data).length === 0) {
            setShowPopupEmptyAddress(true);
          } else {
            history.push({
              pathname: "/checkout",
              search: '?query=abc',
              state:  listDataSelect ,
            });
            console.log("Đã có địa chỉ");
          }
        })
        .catch((error) => {
          console.error(`Error is: ${error}`);
        });
    } else {
      setShowPopup(true);
    }
  };

  return (
    console.log("cart data:", cartData),
    (
      <div>
        {cartData.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cartScreen">
            <div>Giỏ hàng ({cartData.length} sản phẩm)</div>
            <div className="cartScreen__header">
              <div className="cartScreen__header__checkbox">
                <label>
                  <input type="checkbox"></input>
                </label>
              </div>
              <div className="cartScreen__header__sp">Sản phẩm</div>
              <div className="cartScreen__header__dg">Đơn giá</div>
              <div className="cartScreen__header__sl">Số lượng</div>
              <div className="cartScreen__header__st">Số tiền</div>
              <div className="cartScreen__header__tt">Thao tác</div>
            </div>

            <div className="cartScreen__list">
              {cartData.map((item, index) => (
                <CartItem key={index} item={item} handleSelect={handleSelect} />
              ))}
            </div>
            <div className="cartScreen__buy">
              <div className="cartScreen__buy__checkbox">
                <label>
                  <input type="checkbox"></input>
                </label>
                <label>Chọn tất cả ({cartData.length})</label>
              </div>

              <div>Xóa</div>
              <div>Tổng thanh toán (0 sản phẩm): 0đ</div>
              {/* <Link to="/checkout" onClick={handleBuyProduct}>
              <div>Mua hàng</div>
            </Link> */}
              <button onClick={handleBuyProduct}>
                <div>Mua hàng</div>
              </button>
            </div>
            <Popup trigger={showPopup} setTrigger={setShowPopup}>
              <p>Bạn vẫn chưa chọn sản phẩm nào để mua.</p>
            </Popup>

            <Popup
              trigger={showPopupEmptyAddress}
              setTrigger={setShowPopupEmptyAddress}
            >
              <p>Bạn chưa thêm địa chỉ giao hàng.</p>
            </Popup>
          </div>
        )}
      </div>
    )
  );
};

export default Cart;
