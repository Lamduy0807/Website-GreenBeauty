import React, { useEffect, useState } from "react";
import SideMenu from "../Components/MenuProfile/SideMenu";
import OrderComponent from "../Components/MenuProfile/OrderComponent";
import { getOrderInformation } from "../API/Networking";
const OrderManage = () => {
  const tabs = [
    { name: "Chờ xác nhận" },
    { name: "Chờ lấy hàng" },
    { name: "Đang giao hàng" },
    { name: "Giao thành công" },
    { name: "Tất cả" }
  ];
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [success, setSuccess] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(()=>{
    const id = localStorage.getItem('id')
    getOrderInfor(id);
  },[])
  const getOrderInfor = (id) =>{
    getOrderInformation(id).then(res=>{
      setOrderData(res);
      res.forEach(item => {
        if(item.status==='1')
          setPending(prev=>[...prev, item]);
        else if(item.status==='2')
          setWaiting(prev=>[...prev,item]);
        else if(item.status==='3')
          setDelivery(prev=>[...prev, item]);
        else if(item.status==='4')
          setSuccess(prev=>[...prev,item])
      });
    })
  }

  return (
    <div className="odmanage">
      <div className="odmanage__container">
        <div className="profile__sidemenu">
          <SideMenu />
        </div>
        <div className="odmanage__content">
          <div className="odmanage__content__container">
            <div className="odmanage__tab">
              {tabs.map((item, index) => {
                return (
                  <div className="odmanage__tab__container"
                  key={index}
                  onClick={()=>{setActive(index)}}>
                    <div
                      key={index}
                      className={
                        active === index
                          ? "odmanage__tab--item odmanage__tab--item--active"
                          : "odmanage__tab--item"
                      }
                      
                    >
                      {item.name}
                    </div>
                    <div className={active===index? "odmanage__tab__line" : null}></div>
                  </div>
                );
              })}
            </div>
            <div className="odmanage__order">
                { active===0?
                  pending.map((item,index)=>{
                    return(
                      <OrderComponent  key={index} id={item.id} status={item.status} totalValue={item.totalValue}/>
                    )
                  })
                  :
                  null
                }
                {
                  active===0 && pending.length===0?
                  <div className="odmanage__order__noorder">
                    <img className="odmanage__order__noorder--img" src={'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'} />
                     <span>Chưa có đơn hàng nào</span>
                  </div>
                  :
                  null
                }
                { active===1?
                  waiting.map((item,index)=>{
                    return(
                      <OrderComponent   key={index} id={item.id} status={item.status} totalValue={item.totalValue}/>
                    )
                  })
                  :
                  null
                }
                {
                  active===1 && waiting.length===0?
                  <div className="odmanage__order__noorder">
                     <img className="odmanage__order__noorder--img" src={'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'} />
                     <span>Chưa có đơn hàng nào</span>
                  </div>
                  :
                  null
                }

                { active===2?
                  delivery.map((item,index)=>{
                    return(
                      <OrderComponent  key={index} id={item.id} status={item.status} totalValue={item.totalValue}/>
                    )
                  })
                  :
                  null
                }
                {
                  active===2 && delivery.length===0?
                  <div className="odmanage__order__noorder">
                    <img className="odmanage__order__noorder--img" src={'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'} />
                     <span>Chưa có đơn hàng nào</span>
                  </div>
                  :
                  null
                }

                { active===3?
                  success.map((item,index)=>{
                    return(
                      <OrderComponent  key={index} id={item.id} status={item.status} totalValue={item.totalValue}/>
                    )
                  })
                  :
                  null
                }
                {
                  active===3 && success.length===0?
                  <div className="odmanage__order__noorder">
                    <img className="odmanage__order__noorder--img" src={'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'} />
                     <span>Chưa có đơn hàng nào</span>
                  </div>
                  :
                  null
                }

                { active===4?
                  orderData.map((item,index)=>{
                    return(
                      <OrderComponent  key={index} id={item.id} status={item.status} totalValue={item.totalValue}/>
                    )
                  })
                  :
                  null
                }
                {
                  active===4 && orderData.length===0?
                  <div className="odmanage__order__noorder">
                    <img className="odmanage__order__noorder--img" src={'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png'} />
                     <span>Chưa có đơn hàng nào</span>
                  </div>
                  :
                  null
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManage;
