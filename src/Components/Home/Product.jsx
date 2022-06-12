import React from 'react'
import {formatNumber} from "../../Function/Function"
const Product = (props) => {
  return (
    <div className='pro'>
        <div className="pro__wrapper">
          <div className="pro__img">
              <img className="pro__img__image" src={props.src}/>
          </div>
          <div className="pro__infor">
            <div className="pro__infor__name">
                <h3 className='pro__infor__h3'>{props.name}</h3>
            </div>
            <br></br>
            <div className="pro__infor__content">
              <div className="pro__infor__price">
                  {formatNumber(props.price+"")} đ
                  {/* <div className='pro__infor__price--currency'>đ</div>  */}
              </div>

              <div className="pro__infor__sale decoratenone">
                  Đã bán: {props.sale}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product