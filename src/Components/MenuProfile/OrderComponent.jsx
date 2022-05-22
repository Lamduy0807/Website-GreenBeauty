import React, { useState , useEffect } from "react";
import ProductComponent from "./ProductComponent";
import { getDetailOrderInformation , putConfirmDelivery, putCanceDlelivery} from "../../API/Networking";
const OrderComponent = (props) => {
  const [detailProduct, setDetailProduct] = useState([])
  useEffect(() => {
    getDetailOrderInformation(props.id).then(res=>{
      setDetailProduct(res)
    })
  }, []);
  const handleCancelDelivery = () =>{
    putCanceDlelivery(props.id).then(res=>{
      if(res===200)
      window.location.reload();
    })
  }
  const handleConfirmDelivery = () =>{
    putConfirmDelivery(props.id).then(res=>{
      if(res===200)
      window.location.reload();
    })
  }
  return (
    <div className="orderCom">
      <div className="orderCom__container">
        <div className="orderCom__header">
          <div className="orderCom__header__id">Mã đơn hàng: #{props.id}</div>
          <div className={props.status==='1'? 'orderCom__header__status':'displaynone'}>Chờ xác nhận</div>
          <div className={props.status==='2'? 'orderCom__header__status':'displaynone'}>Chờ lấy hàng</div>
          <div className={props.status==='3'? 'orderCom__header__status':'displaynone'}>Đang giao hàng</div>
          <div className={props.status==='4'? 'orderCom__header__status':'displaynone'}>Giao hàng thành công</div>
          <div className={props.status==='5'? 'orderCom__header__status':'displaynone'}>Đã hủy</div>
        </div>
        <div className="orderCom__body">
          {
            detailProduct.map((item, index)=>{
              return(
                <ProductComponent key={index} id={item.product} quantities={item.quantities} />
              )
            })
          }
        </div>
        <div className="orderCom__footer">
          <div className="orderCom__price">
            <span className="orderCom__product__price--price marginRight">Tổng số tiền: </span>
            <div className="orderCom__price__container">
              <span className="orderCom__price--d">đ</span>
              <span className="orderCom__price--price">{props.totalValue}</span>
            </div>
          </div>

          <div className="orderCom__btngroup">
              <button onClick={handleCancelDelivery} className={props.status==='1'? 'button orderCom__btngroup--white' : 'displaynone'}>Hủy đơn hàng</button>
              <button className={props.status==='2'? 'button orderCom__btngroup--white' : 'displaynone'}>Chờ Xác Nhận</button>
              <button onClick={handleConfirmDelivery} className={props.status==='3'? 'button orderCom__btngroup--active' : 'displaynone'}>Đã Nhận Được Hàng</button>
              <button className={props.status==='4'? 'button orderCom__btngroup--active' : 'displaynone'}>Đánh Giá</button>
              <button className={props.status==='5'? 'button orderCom__btngroup--white' : 'displaynone'}>Đã Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
