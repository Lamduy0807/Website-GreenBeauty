import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductFromCart } from "../API/Server";
import { useHistory } from "react-router-dom";

import { UserContext } from "../Context/UserContext/UserContext";
import {
  postOrder,
  postOrderDetail,
  deleteProductFromCart,
  getAddressDelivery,
} from "../API/Server";
import { formatNumber } from "../Function/Function";
export const Checkout = (props) => {
  const { token, userData } = useContext(UserContext);
  const history = useHistory();

  const location = useLocation();
  const listData = location.state;
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [orderID, setOrderID] = useState(null);

  const fetchDelivery = () => {
    getAddressDelivery(token, userData.id, 1).then((address) => {
      address.forEach((_address) => {
        // console.log(_address)
        setDelivery(_address);
      });
    });
  };

  const btnConfirmOrder = () => {
    // console.log('delivery:', delivery.id)
    postOrder(token, userData.id, total, delivery.id)
      .then((result) => {
        listOrderDetail.forEach((item) => {
          postOrderDetail(result.id, item.product_id, item.quantity)
            .then((res) => {
              console.log("orderID:", result.id);
              setOrderID(result.id);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        });

        listData.forEach((product) => {
          getProductFromCart(userData.id, product.id)
            .then((cartItem) => {
              console.log("cart id nè:", cartItem[0].id);
              deleteProductFromCart(cartItem[0].id)
                .then(() => {
                  history.push("/order-manage");
                  console.log(
                    "Đặt hàng thành công, đã xóa sản phẩm vừa mua khỏi giỏ hàng"
                  );
                })
                .catch((error) => {
                  console.log(
                    "Đặt hàng ko thành công, list product in cart còn nguyên"
                  );
                });
            })
            .catch((error) => {});
        });
      })
      .catch((error) => {
        console.error(`Error is: ${error}`);
      });
  };

  const orderDetail = (product_id, quantity) => {
    let item = { product_id, quantity };
    let temp = listOrderDetail;
    temp.push(item);
    setListOrderDetail(temp);
  };

  useEffect(() => {
    fetchDelivery();
  }, []);
  return (
    <div className="checkout">
      <div className="cartScreen__tilte">Thanh toán</div>
      <div className="checkout__address">
        <div className="checkout__address__line"></div>
        <div className="checkout__address__con">
          <div className="checkout__address__title">
            <i className="bx bx-paper-plane checkout__address__title__icon"></i>
            Địa Chỉ Nhận Hàng
          </div>
          <div className="checkout__address__content">
            <div className="checkout__address__content__add">
              <div className="checkout__address__content__name">
                Tên Nga 023473778
              </div>
              <div> full address ho chi minh address ho chi minh address ho chi minh</div>
            </div>
            <div className="checkout__address__content__change">Thay đổi</div>
          </div>
        </div>
      </div>

      <div className="checkout__list-product">
        <div className="checkout__address__title">Sản phẩm</div>
        <div className="checkout__list-product__header">
          <div className="checkout__list-product__name"></div>
          <div className="checkout__list-product__price">Đơn giá</div>
          <div className="checkout__list-product__quan">Số lượng</div>
          <div className="checkout__list-product__tt">Thành tiền</div>
        </div>
        <div>
          {listData.map((item, index) => (
            <ItemProduct key={index} item={item} orderDetail={orderDetail} />
          ))}
        </div>
      </div>
      <div className="checkout__footer">
        <div className="checkout__footer__check">
            <div className="checkout__footer__check__row">
              <div className="checkout__footer__check__row--content">
                Tổng tiền hàng:
              </div>
              <div className="checkout__footer__check__row--value">
                {formatNumber("210000")} đ
              </div>
            </div>
        </div>
        <div className="checkout__footer__check">
            <div className="checkout__footer__check__row">
              <div className="checkout__footer__check__row--content">
                Phí vận chuyển:
              </div>
              <div className="checkout__footer__check__row--value">
                {formatNumber("0")} đ
              </div>
            </div>
        </div>
        <div className="checkout__footer__check">
            <div className="checkout__footer__check__row">
              <div className="checkout__footer__check__row--content">
                Tổng thanh toán:
              </div>
              <div className="checkout__footer__check__row--value checkout__footer__check__row--value--big">
                {formatNumber("210000")} đ
              </div>
            </div>
        </div>
        <div className="checkout__footer__order">
          <div className="checkout__footer__order__warning">
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo 
            <div className="checkout__footer__order__warning--faq">
            Điều khoản GreenBeauty
            </div> 
          </div>
          <button className="cartScreen__buy__right__button" onClick={btnConfirmOrder}>Đặt hàng</button>
        </div>
      </div>
      
    </div>
  );
};

const ItemProduct = ({ item, orderDetail }) => {
  const { userData } = useContext(UserContext);
  const [quantity, setQuantity] = useState(0);

  const getQuantity = () => {
    getProductFromCart(userData.id, "")
      .then((datas) => {
        datas.forEach((data) => {
          if (data.product == item.id) {
            setQuantity(data.quantities);
            orderDetail(item.id, data.quantities);
          }
        });
      })
      .catch((error) => {
        console.error(`Error is: ${error}`);
      });
  };
  useEffect(() => {
    getQuantity();
  }, []);

  return (
    <div style={{ display: "flex", width:"100%", marginTop:"1rem" }}>
      <div className="checkout__list-product__name">
        <img
          style={{ height: 80, width: 80 }}
          src={item.imagepresent}
          alt="thumnail"
        />
        <div style={{marginLeft:"1rem"}} >{item.name}</div>
      </div>
      <div className="checkout__list-product__price colorBtn">{formatNumber(item.price + "")} đ</div>
      <div className="checkout__list-product__quan">{quantity}</div>
      <div className="checkout__list-product__tt colorBtn">{formatNumber(quantity * item.price + "")} đ</div>
    </div>
  );
};
