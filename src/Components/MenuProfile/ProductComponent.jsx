import React, { useEffect, useState } from 'react'
import { getProductById } from '../../API/Networking'
const ProductComponent = (props) => {
    const [product, setProduct] = useState({
        name: '',
        imagepresent: '',
    })
    useEffect(()=>{
        getProductById(props.id).then(res=>{
            setProduct(res)
        })
    },[])
    return(
        <div className="orderCom__product">
            <div className="orderCom__product__container">
                <div className="orderCom__product__image">
                    <img className='orderCom__product__image--img' src={product.imagepresent}/>
                </div>
                <div className="orderCom__product__information">
                    <span>{product.name}</span>
                    <span>x{props.quantities}</span>
                </div>
                <div className="orderCom__product__price">
                    <span className='orderCom__product__price--text'>đ</span>
                    <span className='orderCom__product__price--price'>{product.price}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent