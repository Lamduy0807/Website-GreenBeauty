import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../Components/MenuProfile/SideMenu";
import {
  getOrderInformationById,
  getDetailOrderInformation,
  getDeliveryInformationById,
  putCanceDlelivery,
  putConfirmDelivery
} from "../API/Networking";
import ProductComponent from "../Components/MenuProfile/ProductComponent";
import { useHistory } from "react-router-dom";
import { ModalContext } from "../Context/ModelContext/ModalContext";
const DetailOrder = () => {
  const {setDetailData, setShowRating} = useContext(ModalContext)
  const history = useHistory()
  const [order, setOrder] = useState({ id: "" });
  const [detailOrder, setDetailOrder] = useState([]);
  const [title, setTitle] = useState("");
  const [titleButton, setTitleButton] = useState("");
  const [delivery, setDelivery] = useState({});
  const [isRating, setIsRating] = useState(false);
  const param = useParams();
  useEffect(() => {
    getOrderInformationById(param.id).then((res) => {
      if (res.status === "1") {
        setTitle("Chờ xác nhận");
        setTitleButton("Hủy đơn hàng");
      } else if (res.status === "2") {
        setTitle("Đang vận chuyển");
        setTitleButton("Chờ vận chuyển");
      } else if (res.status === "3") {
        setTitle("Đang giao hàng");
        setTitleButton("Xác nhận đã nhận hàng");
      } else if (res.status === "4") {
        setTitle("Giao hàng thành công");
        setTitleButton("Đánh giá");
      } else {
        setTitle("Đã hủy");
        setTitleButton("Đã hủy");
      }
      setOrder(res);
      getDeliveryInformationById(res.delivery).then((res) => {
        setDelivery(res);
      });
    });
    getDetailOrderInformation(param.id).then((res) => {
      res.forEach((element) => {
        if (element.isRating === true) 
        {
          setIsRating(true);
          return false 
        }
        else
          return true
      });
      setDetailOrder(res);
    });
  }, []);
  console.log(isRating);
  const handleButton = (status) =>{
    if(status==="1")
      handleCancelDelivery();
    else if(status === "3")
      handleConfirmDelivery();
    else if(status==="4")
      handleEvaluate();
  }
  const handleCancelDelivery = () =>{
    putCanceDlelivery(param.id).then(res=>{
      if(res===200)
      window.location.reload();
    })
  }
  const handleConfirmDelivery = () =>{
    putConfirmDelivery(param.id).then(res=>{
      if(res===200)
      window.location.reload();
    })
  }
  const handleEvaluate = () =>{
    detailOrder.forEach(item=>{
      if(!item.isRating)
      setDetailData(prev=>[...prev, item])
    })
    setShowRating(prev=>!prev)
  }
  return (
    <div className="odmanage">
      <div className="odmanage__container">
        <div className="profile__sidemenu">
          <SideMenu />
        </div>
        <div className="odmanage__content">
          <div className="do__container">
            <div className="do__header">
              <div className="do__header__back"
               onClick={()=>{history.push('/order-manage')}} >
                <i className="bx bx-chevron-left"></i>
                Trở lại
              </div>
              <div className="do__header__infor">
                ID đơn hàng: {order.id}
                <div className="do__header__line"></div>
                <div className="do__header__infora">{title}</div>
              </div>
            </div>
            <div className="do__process">
              <div className="do__process__container">
                {order.status !== "5" && order.status >= "1" ? (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--nocolor"></div>
                    <div
                      className={
                        order.status === "1"
                          ? "do__process__pic__container--active"
                          : "do__process__pic__container"
                      }
                    >
                      <i
                        className={
                          order.status === "1"
                            ? "bx bx-receipt do__process__pic__icon--active"
                            : "bx bx-receipt do__process__pic__icon"
                        }
                      ></i>
                    </div>
                    <div className={order.status === "1"?"do__process__pic__line--inactive":"do__process__pic__line"}></div>
                  </div>
                ) : (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--nocolor"></div>
                    <div className="do__process__pic__container--inactive">
                      <i className="bx bx-receipt do__process__pic__icon--inactive"></i>
                    </div>
                    <div className="do__process__pic__line--inactive"></div>
                  </div>
                )}
                <div className="do__process__content">
                  {order.status === 1 ? "Đơn chờ xác nhận" : "Đơn đã xác nhận"}
                </div>
              </div>
              <div className="do__process__container">
              {order.status !== "5" && order.status >= "2" ? (
                  <div className="do__process__pic">
                  <div className="do__process__pic__line"></div>
                  <div
                    className={
                      order.status === "2"
                        ? "do__process__pic__container--active"
                        : "do__process__pic__container"
                    }
                  >
                    <i
                      className={
                        order.status === "2"
                          ? "bx bxs-truck do__process__pic__icon--active"
                          : "bx bxs-truck do__process__pic__icon"
                      }
                    ></i>
                  </div>
                  <div className={order.status === "2"?"do__process__pic__line--inactive":"do__process__pic__line"}></div>
                </div>
                ) : (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--inactive"></div>
                    <div className="do__process__pic__container--inactive">
                      <i className="bx bxs-truck do__process__pic__icon--inactive"></i>
                    </div>
                    <div className="do__process__pic__line--inactive"></div>
                  </div>
                )}
                
                <div className="do__process__content">Đã giao cho ĐVVC</div>
              </div>
              <div className="do__process__container">
              {order.status !== "5" && order.status >= "3" ? (
                  <div className="do__process__pic">
                  <div className="do__process__pic__line"></div>
                  <div
                    className={
                      order.status === "3"
                        ? "do__process__pic__container--active"
                        : "do__process__pic__container"
                    }
                  >
                    <i
                      className={
                        order.status === "3"
                          ? "bx bxs-package do__process__pic__icon--active"
                          : "bx bxs-package do__process__pic__icon"
                      }
                    ></i>
                  </div>
                  <div className={order.status === "3"?"do__process__pic__line--inactive":"do__process__pic__line"}></div>
                </div>
                ) : (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--inactive"></div>
                    <div className="do__process__pic__container--inactive">
                      <i className="bx bxs-package do__process__pic__icon--inactive"></i>
                    </div>
                    <div className="do__process__pic__line--inactive"></div>
                  </div>
                )}
                
                <div className="do__process__content">Đang giao</div>
              </div>
              <div className="do__process__container">
              {order.status !== "5" && order.status >= "4" ? (
                  <div className="do__process__pic">
                  <div className="do__process__pic__line"></div>
                  <div
                    className={
                      order.status === "4" && !isRating
                        ? "do__process__pic__container--active"
                        : "do__process__pic__container"
                    }
                  >
                    <i
                      className={
                        order.status === "4"&& !isRating
                          ? "bx bx-check do__process__pic__icon--active"
                          : "bx bx-check do__process__pic__icon"
                      }
                    ></i>
                  </div>
                  <div className={order.status === "4" && !isRating?"do__process__pic__line--inactive":"do__process__pic__line"}></div>
                </div>
                ) : (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--inactive"></div>
                    <div className="do__process__pic__container--inactive">
                      <i className="bx bx-check do__process__pic__icon--inactive"></i>
                    </div>
                    <div className="do__process__pic__line--inactive"></div>
                  </div>
                )}
                
                <div className="do__process__content">Đã giao</div>
              </div>
              <div className="do__process__container">
              {order.status !== "5" && isRating ? (
                  <div className="do__process__pic">
                  <div className="do__process__pic__line"></div>
                  <div
                    className={
                      isRating
                        ? "do__process__pic__container--active"
                        : "do__process__pic__container"
                    }
                  >
                    <i
                      className={
                        isRating
                          ? "bx bx-star do__process__pic__icon--active"
                          : "bx bx-star do__process__pic__icon"
                      }
                    ></i>
                  </div>
                  <div className="do__process__pic__line--nocolor"></div>
                </div>
                ) : (
                  <div className="do__process__pic">
                    <div className="do__process__pic__line--inactive"></div>
                    <div className="do__process__pic__container--inactive">
                      <i className="bx bx-star do__process__pic__icon--inactive"></i>
                    </div>
                    <div className="do__process__pic__line--nocolor"></div>
                  </div>
                )}
                
                <div className="do__process__content">Đánh giá</div>
              </div>
            </div>
            <div className="do__btn">
              <div className="do__btn__warning">
                Vui lòng kiểm tra tất cả các sản phẩm trong đơn hàng trước khi
                xác nhận đã nhận hàng, nếu phát hiện vấn đề, bạn có thể yêu cầu
                trả hàng/hoàn tiền.
              </div>
              <div className="do__btn__button">
                <button
                  onClick={()=>handleButton(order.status)}
                  className={
                    order.status === "5" || order.status === "2"
                      ? "do__btn__button--btn--inactive"
                      : "do__btn__button--btn"
                  }
                >
                  {titleButton}
                </button>
              </div>
            </div>
            <div className="do__detail">
              <div className="do__detail__line">
                <div className="do__detail__line--line"></div>
              </div>
              <div className="do__detail__title">Địa chỉ nhận hàng</div>
              <div className="do__detail__content">
                <div className="do__detail__content__right">
                  <div className="do__detail__content__name">
                    {delivery.receiveName}
                  </div>
                  <div className="do__detail__content__infro">
                    {delivery.phone}
                  </div>
                  <div className="do__detail__content__infro">
                    {delivery.fullAddress}
                  </div>
                </div>
                <div className="do__detail__content__left">
                  <div className="do__detail__status">
                    <div className="do__detail__status__contain">
                      <div className="do__detail__status__process">
                        <div className="do__detail__status__process--top"></div>
                        <div
                          className={
                            order.status === "4"
                              ? "do__detail__status__process--circle--active"
                              : "do__detail__status__process--circle"
                          }
                        ></div>
                        <div className="do__detail__status__process--bottom--active"></div>
                      </div>
                      <div className="do__detail__status__processname">
                        Đã giao hàng
                      </div>
                    </div>
                  </div>
                  <div className="do__detail__status">
                    <div className="do__detail__status__contain">
                      <div className="do__detail__status__process">
                        <div className="do__detail__status__process--top--active"></div>
                        <div
                          className={
                            order.status === "3"
                              ? "do__detail__status__process--circle--active"
                              : "do__detail__status__process--circle"
                          }
                        ></div>
                        <div className="do__detail__status__process--bottom--active"></div>
                      </div>
                      <div className="do__detail__status__processname">
                        Đang giao hàng
                      </div>
                    </div>
                  </div>
                  <div className="do__detail__status">
                    <div className="do__detail__status__contain">
                      <div className="do__detail__status__process">
                        <div className="do__detail__status__process--top--active"></div>
                        <div
                          className={
                            order.status === "2"
                              ? "do__detail__status__process--circle--active"
                              : "do__detail__status__process--circle"
                          }
                        ></div>
                        <div className="do__detail__status__process--bottom--active"></div>
                      </div>
                      <div className="do__detail__status__processname">
                        Đã xác nhận
                      </div>
                    </div>
                  </div>
                  <div className="do__detail__status">
                    <div className="do__detail__status__contain">
                      <div className="do__detail__status__process">
                        <div className="do__detail__status__process--top--active"></div>
                        <div
                          className={
                            order.status === "1"
                              ? "do__detail__status__process--circle--active"
                              : "do__detail__status__process--circle"
                          }
                        ></div>
                        <div className="do__detail__status__process--bottom"></div>
                      </div>
                      <div className="do__detail__status__processname">
                        Chờ xác nhận
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="do__detail__product">
                {detailOrder.map((item, index) => {
                  return (
                    <ProductComponent
                      key={index}
                      id={item.product}
                      quantities={item.quantities}
                    />
                  );
                })}
              </div>
              <div className="do__fee">
                <div className="do__fee__row">
                  <div className="do__fee__infor">Tổng tiền hàng:</div>
                  <div className="do__fee__fee">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalValue)}
                  </div>
                </div>
                <div className="do__fee__row">
                  <div className="do__fee__infor">Phí vận chuyển:</div>
                  <div className="do__fee__fee">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(0)}
                  </div>
                </div>
                <div className="do__fee__row">
                  <div className="do__fee__infor">Giảm giá:</div>
                  <div className="do__fee__fee">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(0)}
                  </div>
                </div>
                <div className="do__fee__row">
                  <div className="do__fee__infor">Tổng số tiền:</div>
                  <div className="do__fee__fee">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalValue)}
                  </div>
                </div>
                <div
                  className={
                    order.status === "5"
                      ? "do__fee__row--final do__fee__row"
                      : "displaynone"
                  }
                >
                  <div className="do__fee__infor">Nguyên nhân hủy:</div>
                  <div className="do__fee__fee">{order.cancellationReason}</div>
                </div>
                <div className="do__fee__row--final do__fee__row">
                  <div className="do__fee__infor">Phương thức thanh toán:</div>
                  <div className="do__fee__fee">COD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
