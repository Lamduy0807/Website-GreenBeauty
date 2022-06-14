import React, { useEffect, useState, useContext } from "react";
import { getProductRating } from "../../API/Networking";
import { formatNumber } from "../../Function/Function";
import { PopupAddProductToCart } from "../Cart/Popup";
import { CartContext } from "../../Context/CartContext/CartContext";
import {
  postItemToCart,
  getProductFromCart,
  putItemInCart,
} from "../../API/Server";
import { getProductById } from "../../API/Networking";

const FlashSaleProduct = (props) => {
  const maxStar = [1, 2, 3, 4, 5];
  const [numberRating, setNumberRating] = useState(0);
  const [sumValue, setSumValue] = useState(0);

  const { getCartInformation } = useContext(CartContext);
  const productId = props.id;
  const [product, setProduct] = useState("");
  const [listData, setListData] = useState([]);
  const [tonTai, setTonTai] = useState(false);
  const [product_Exist, setProduct_Exist] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const getProduct = (productId) => {
    getProductById(productId)
      .then((product) => {
        console.log("product", product);
        setProduct(product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch dữ liệu giỏ hàng
  const fetchProductFromCart = () => {
    try {
      const id = localStorage.getItem("id");
      getProductFromCart(id, "")
        .then((items) => {
          items.forEach((item) => {
            if (item.product == productId) {
              console.log("item exits:", item);

              //sản phẩm đã tồn tại
              setTonTai(true);
              setProduct_Exist(item);
            }
          });
          setListData(items);
        })
        .catch((error) => {
          setListData([]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  //refresh khi thêm sản phẩm mới
  const refreshProductFromCart = () => {
    try {
      const id = localStorage.getItem("id");
      getProductFromCart(id, "")
        .then((items) => {
          items.forEach((item) => {
            if (item.product === productId) {
              setTonTai(true);
            }
          });
          setListData(items);
        })
        .catch((error) => {
          setListData([]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = () => {
    {
      try {
        const id = localStorage.getItem("id");
        const tokens = localStorage.getItem("token");
        if (!tonTai) {
          fetchProductFromCart();
          postItemToCart(id, tokens, product, 1)
            .then((item) => {
              console.log("Thêm vào giỏ hàng thành công");
              getCartInformation();
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        } else if (tonTai) {
          fetchProductFromCart();
          putItemInCart("+", product_Exist, tokens, 1)
            .then((item) => {
              getCartInformation();
              console.log("Đã update số lượng sản phẩm", product_Exist);
              //Chỗ này phải so sánh số lượng đang ở trong giỏ hàng của 1 user, nhiều user với tổng số lượng sp
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        }
      } catch (e) {
        console.log(e);
      }
    }
    setTonTai(true);
  };

  useEffect(() => {
    getProduct(productId);
    fetchProductFromCart();
    getProductRating(props.id).then((ratings) => {
      setNumberRating(ratings.length);
      ratings.forEach((rating) => {
        setSumValue((prov) => {
          return prov + rating.ratingpoint;
        });
      });
    });
  }, []);

  return (
    <div className="fsp">
      <div className="fsp__card fsp__front">
        <div className="fsp__front__img">
          <img className="fsp__front__img__image" src={props.src} />
          <div className="fsp__front__flag">
            <h3 className="fsp__front__flag__h3">
              {" "}
              -{(100 - (props.sale * 100) / props.price).toFixed()}%
            </h3>
          </div>
        </div>

        <div className="fsp__infor">
          <div className="fsp__infor__name">
            <h3 className="fsp__infor__h3">{props.name}</h3>
          </div>

          <div className="fsp__infor__content">
            <div className="fsp__infor__sale">
              {formatNumber(props.sale + "")}
              <div className="fsp__infor__price--currency">đ</div>
            </div>
            <div className="fsp__infor__price">
              {formatNumber(props.price + "")} đ
              {/* <div className="fsp__infor__price--currency">đ</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="fsp__card fsp__back fsp__back__ground">
        <div className="fsp__back__content">
          <div className="fsp__back__content__cta">
            <span className="fsp__back__content__cta--avg displayblock">
              {props.name}
            </span>
            <span className="fsp__back__content__cta--only displayblock">
              Chỉ còn
            </span>
            <span className="fsp__back__content__cta--value orange displayblock">
              {formatNumber(props.sale + "")} đ
            </span>
            <span className="fsp__back__content__cta--only displayblock">
              ({numberRating})<br></br>
              <span className="fsp__back__content__cta--value orange displayblock">
                {maxStar.map((item, key) => {
                  return (
                    <i
                      key={key}
                      className={
                        item <= sumValue / numberRating
                          ? "bx bxs-star"
                          : "bx bx-star"
                      }
                    ></i>
                  );
                })}
              </span>
            </span>

            <button
              onClick={handleAddToCart}
              className="btn btn--white btn__animated"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <PopupAddProductToCart
        trigger={showPopup}
        setTrigger={() => setShowPopup(false)}
      >
        <p>Sản phẩm đã được thêm vào Giỏ hàng</p>
      </PopupAddProductToCart>
    </div>
  );
};

export default FlashSaleProduct;
