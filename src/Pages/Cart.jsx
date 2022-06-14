import React, { useState, useEffect, useContext } from "react";
import EmptyCart from "../Components/Cart/EmptyCart";
import { CartItem } from "../Components/Cart/CartItem";
import { CartContext } from "../Context/CartContext/CartContext";
import { UserContext } from "../Context/UserContext/UserContext";
import { useHistory } from "react-router-dom";
import { getAddressDelivery } from "../API/Server";
import { Popup } from "../Components/Cart/Popup";
import { formatNumber } from "../Function/Function";
import { getCart } from "../API/Networking";
const Cart = () => {
  const { cartData, getCartInformation } = useContext(CartContext);
  const { token, userData } = useContext(UserContext);
  const [productCart, setProductCart] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupEmptyAddress, setShowPopupEmptyAddress] = useState(false);
  const [selected, setSelected] = useState(0);
  const [listDataSelect, setListDataSelect] = useState([]);
  const [totalCash, setTotalCash] = useState(0);
  const history = useHistory();

//handle check tất cả
useEffect(()=>{
  try{
    const id = localStorage.getItem('id')
    getCart(id).then(res=>{
      setProductCart(res)
    })
  }catch(e)
  {
    console.log(e);
  }
},[cartData])

const selectAll=(product, quantity)=>{
  listDataSelect.forEach(item=>{
    setTotalCash(totalCash+quantity*product.price)
  })

}

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

  const handleSub = (product, quantity) => {
    setTotalCash(totalCash - product.price);
  };

  const handlePlus = (product, quantity) => {
    setTotalCash(totalCash + product.price);
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
              search: "?query=abc",
              state: listDataSelect,
              totalCash: totalCash,
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
    <div>
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cartScreen">
          <div className="cartScreen__container">
            <div className="cartScreen__tilte">
              Giỏ hàng{" "}
              <div className="cartScreen__tilte--small">
                ({cartData.length} sản phẩm)
              </div>
            </div>
            <div className="cartScreen__header">
              <div className="cartScreen__header__checkbox">
                <label>
                  <input  type="checkbox"></input>
                </label>
              </div>
              <div className="cartScreen__header__sp colorBlack">Sản phẩm</div>
              <div className="cartScreen__header__dg colorBlack">Đơn giá</div>
              <div className="cartScreen__header__sl colorBlack">Số lượng</div>
              <div className="cartScreen__header__st colorBlack">Số tiền</div>
              <div className="cartScreen__header__tt colorBlack">Thao tác</div>
            </div>

            <div className="cartScreen__list">
              {productCart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  handleSelect={handleSelect}
                  handlePlus={handlePlus}
                  handleSub={handleSub}
                />
              ))}
            </div>
            <div className="cartScreen__buy">
              <div className="cartScreen__buy__left">
                <div className="cartScreen__buy__checkbox">
                  <label className="cartScreen__buy__align">
                    <input type="checkbox"></input>
                  </label>
                  <label className="cartScreen__buy__checkbox__lb">
                    Chọn tất cả ({cartData.length})
                  </label>
                </div>
                <div className="cartScreen__buy__left__delete">Xóa</div>
              </div>

              <div className="cartScreen__buy__right">
                <div className="cartScreen__buy__right__title">
                  Tổng thanh toán ({cartData.length} sản phẩm):{" "}
                  {formatNumber(totalCash + "")}đ
                </div>
                <button
                  className="cartScreen__buy__right__button"
                  onClick={handleBuyProduct}
                >
                  Mua hàng
                </button>
              </div>
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
        </div>
      )}
    </div>
  );
};

export default Cart;
