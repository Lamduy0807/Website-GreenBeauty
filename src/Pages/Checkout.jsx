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
      <div>Thanh toán</div>
      <div className="checkout__address">
        <div className="checkout__address__title">Địa Chỉ Nhận Hàng</div>
        <div className="checkout__address__content">
          <div> Tên Nga</div>
          <div> SDT 023473778</div>
          <div> full address ho chi minh</div>
        </div>
      </div>

      <div className="checkout__list-product">
        <div>Sản phẩm</div>
        <div>
          {listData.map((item, index) => (
            <ItemProduct item={item} orderDetail={orderDetail} />
          ))}
        </div>
      </div>

      <button onClick={btnConfirmOrder}>Đặt hàng</button>
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <img
          style={{ height: 80, width: 80 }}
          src={item.imagepresent}
          alt="thumnail"
        />
      </div>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <div>{quantity}</div>
      <div>{quantity * item.price}</div>
    </div>
  );
};
