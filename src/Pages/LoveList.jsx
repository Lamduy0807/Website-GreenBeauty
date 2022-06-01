import React, { useEffect, useState } from "react";
import SideMenu from "../Components/MenuProfile/SideMenu";
import LoveProduct from "../Components/MenuProfile/LoveProduct";
import { getProductFromLoveList } from "../API/Networking";
import { getProductById } from "../API/Networking";
const LoveList = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem("id");
    getProductFromLoveList(id).then((res) => {
      res.forEach((element) => {
        getProductById(element.product_id).then((re) => {
          setProduct((prev) => [...prev, re]);
        });
      });
    });
  }, []);
  return (
    <div className="ll">
      <div className="ll__container">
        <div className="profile__sidemenu">
          <SideMenu />
        </div>
        <div className="ll__content">
          <div className="ll__content__container">
            <div className="ll__header">
              <h3 className="ll__header__text">
                Danh sách sản phẩm yêu thích ({product.length} Sản phẩm)
              </h3>
            </div>
            <div className="ll__lovelist">
              <div className="ll__headerbar">
                <div className="ll__headerbar__content ll__headerbar__content--name">
                  Sản phẩm
                </div>
                <div className="ll__headerbar__content ll__headerbar__content--status">
                  Trạng thái
                </div>
                <div className="ll__headerbar__content ll__headerbar__content--price">
                  Đơn giá
                </div>
                <div className="ll__headerbar__content ll__headerbar__content--none"></div>
              </div>
              {product.map((item, index) => {
                return (
                  <LoveProduct
                    key={index}
                    imagepresent={item.imagepresent}
                    brand={item.brand}
                    name={item.name}
                    quantity={item.quantity}
                    IsFlashsale={item.IsFlashsale}
                    price={item.price}
                    priceSale={item.priceSale}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveList;
