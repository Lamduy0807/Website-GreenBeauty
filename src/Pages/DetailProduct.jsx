import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "../Components/DetailProduct/Rating/Rating";
import Slider from "react-slick";
import { PopupAddProductToCart } from "../Components/Cart/Popup";
import Grid from "../Components/Grid";
import { default as Pro } from "../Components/Home/Product";
import { CartContext } from "../Context/CartContext/CartContext";
import { formatNumber } from "../Function/Function";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../Components/Home/SettingForSlider";
import {
  getCategoryById,
  getProductById,
  getProductByCategory,
} from "../API/Networking";
import {
  getListImages,
  getProductFromCart,
  postItemToCart,
  putItemInCart,
  postToLoveList,
  getProductFromLoveList,
} from "../API/Server";

const Product = (props) => {
  const { getCartInformation } = useContext(CartContext);
  const [product, setProduct] = useState("");
  const [counter, setCounter] = useState(1);
  const productId = props.match.params.slug;
  const [listImage, setListImage] = useState([]);
  const [thumnail, setThumnail] = useState("");
  const [tonTai, setTonTai] = useState(false);
  const [product_Exist, setProduct_Exist] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [cate, setCate] = useState("UNDEFIED");
  const [productRecommend, setProductRecommend] = useState([]);
  const [isLoveExist, setIsLoveExist] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [isLoveID, setIsLoveID] = useState("");
  const [numRating, setNumRating] = useState(0);
  const [startPoint, setStartPoint] = useState(0);

  const numberRating = (sumValue, numberRating) => {
    setNumRating(numberRating);
    setStartPoint(numRating===0? 0 : sumValue / numberRating);
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    setTonTai(false);
    setProduct_Exist("")
    getProduct(productId);
    getAllImages(productId);
    fetchProductFromCart();
  }, [productId]);
  //fetch d??? li???u gi??? h??ng
  const fetchProductFromCart = () => {
    try {
      const id = localStorage.getItem("id");
      getProductFromCart(id, "")
        .then((items) => {
          items.forEach((item) => {
            if (item.product == productId) {
              console.log("item exits:", item);

              //s???n ph???m ???? t???n t???i
              setTonTai(true);
              setProduct_Exist(item);
            }
          });
        })
        .catch((error) => {});

      checkLoveList();
    } catch (e) {
      console.log(e);
    }
  };

  //refresh khi th??m s???n ph???m m???i
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
        })
        .catch((error) => {});
      checkLoveList();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = () => {
    {
      console.log("Addd: ", productId);
      try {
        const id = localStorage.getItem("id");
        const tokens = localStorage.getItem("token");
        if (tonTai === false) {
          fetchProductFromCart();
          postItemToCart(id, tokens, productId, counter)
            .then((item) => {
              console.log("Th??m v??o gi??? h??ng th??nh c??ng");
              getCartInformation();
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });
        } else if (tonTai === true) {
          fetchProductFromCart();
          putItemInCart("+", product_Exist, tokens, 1)
            .then((item) => {
              getCartInformation();
              console.log("???? update s??? l?????ng s???n ph???m", product_Exist);
              //Ch??? n??y ph???i so s??nh s??? l?????ng ??ang ??? trong gi??? h??ng c???a 1 user, nhi???u user v???i t???ng s??? l?????ng sp
              refreshProductFromCart();
              setShowPopup(true);
            })
            .catch((error) => {
              console.error(`Error is: ${error}`);
            });

          if (counter !== 1) {
            putItemInCart("+", product_Exist, tokens, counter)
              .then((item) => {
                getCartInformation();
                console.log("???? update s??? l?????ng s???n ph???m", product_Exist);
                //Ch??? n??y ph???i so s??nh s??? l?????ng ??ang ??? trong gi??? h??ng c???a 1 user, nhi???u user v???i t???ng s??? l?????ng sp
                refreshProductFromCart();
                setShowPopup(true);
              })
              .catch((error) => {
                console.error(`Error is: ${error}`);
              });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    setTonTai(true);
  };

  const checkLoveList = () => {
    const id = localStorage.getItem("id");
    getProductFromLoveList(id)
      .then((list) => {
        if (Object.keys(list).length === 0) {
          setIsLoveExist(false);
        } else {
          list.forEach((item) => {
            if (item.product_id == productId) {
              console.log("???a l?? c?? ch???y v?? ????y ko");

              console.log("item.id", item.id);
              console.log("item.productid", item.product_id);
              console.log("productid", productId);
              setIsLove(true);
              setIsLoveID(item.id);
            }
          });
        }
      })
      .catch((error) => {
        console.error(`Error is: ${error}`);
      });
  };

  const handleLoveList = () => {
    const id = localStorage.getItem("id");
    const tokens = localStorage.getItem("token");
    if (!isLoveExist) {
      postToLoveList(id, tokens, productId)
        .then((result) => {
          setIsLove(true);
          setIsLoveExist(true);
          setIsLoveID(result.id);

          console.log("Th??m v??o love list th??nh c??ng 1");
        })
        .catch((error) => {
          console.error(`Error is: ${error}`);
        });

      checkLoveList();
    }
  };

  //Khi b???m d???u + ho???c - th?? filter trong Cart v???i user_id v?? product_id
  const btnPlus = () => {
    setCounter(counter + 1);
  };

  const btnSub = () => {
    setCounter(counter - 1);
  };
  const getAllImages = (productId) => {
    getListImages(productId)
      .then((products) => {
        setListImage(products);
      })
      .catch((error) => {
        console.log("L???i getListImages trong chi ti???t s???n ph???m");
      });
  };

  const getProduct = (productId) => {
    getProductById(productId)
      .then((product) => {
        setThumnail(product.imagepresent);
        setProduct(product);
        getCategoryById(product.category).then((res) => {
          setCate(res.name);
        });
        getProductByCategory(product.category).then((res) => {
          setProductRecommend(res);
        });
      })
      .catch((error) => {
        console.log("L???i t???i ???nh trong chi ti???t s???n ph???m");
      });
  };

  return (
    <div className="detailProduct">
      <div>
        <div className="detailProduct__container--big">
          <div className="detailProduct__container" style={{ padding: 10 }}>
            <div className="detailProduct__container__imageContainer">
              <img className="mainImage" src={thumnail} alt="Detail product" />

              <div style={{ width: 350, marginTop: 12 }}>
                <Slider {...settings}>
                  {listImage.map((item, index) => {
                    return (
                      <div key={index}>
                        <img
                          style={{ width: 80, height: 80, padding: ".1rem" }}
                          className="detailProduct__smallimg"
                          src={item.img}
                          alt="Detail product"
                          onMouseEnter={() => setThumnail(item.img)}
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="detailProduct__container__content">
              <div className="detailProduct__container__content__productName">
                {product.name}
              </div>
              <div className="detailProduct__container__content__slidebar">
                <div className="detailProduct__container__content__slidebar__space">
                 {numRating===undefined? 0 : numRating.toFixed()} Nh???n X??t
                </div>
                <div className="detailProduct__container__content__slidebar__space">
                  {startPoint === 0? 0 : startPoint.toFixed(1)} ????nh Gi??
                </div>
                <div className="detailProduct__container__content__slidebar__space">
                  {product.sold} ???? B??n 
                </div>
              </div>
              <div className="detailProduct__container__content__price">
                {formatNumber(product.price + "")} ??
              </div>
              <div className="detailProduct__container__content__quantityContainer">
                <div className="detailProduct__container__content__quantityContainer__h4">
                  S??? L?????ng:
                </div>
                <div className="detailProduct__container__content__quantityContainer__quantity">
                  <button
                    onClick={btnSub}
                    className="detailProduct__container__content__quantityContainer__quantity__sign cursor"
                  >
                    -
                  </button>
                  <button className="detailProduct__container__content__quantityContainer__quantity__counter">
                    {counter}
                  </button>
                  <button
                    onClick={btnPlus}
                    className="detailProduct__container__content__quantityContainer__quantity__sign cursor"
                  >
                    +
                  </button>
                </div>
                <div className="detailProduct__container__content__quantityContainer__h4">
                  {product.quantity} s???n ph???m s???n c??
                </div>
              </div>

              <div className="detailProduct__container__content__spaceContainer">
                <button
                  className="detailProduct__container__content__spaceContainer__button cursor"
                  onClick={() => handleAddToCart()}
                >
                  <i
                    className="bx bxs-cart-add"
                    style={{ fontSize: 24, paddingRight: 10 }}
                  ></i>
                  Th??m V??o Gi??? H??ng
                </button>
                <Link
                  to="/cart"
                  className="detailProduct__container__content__spaceContainer__button"
                  style={{ backgroundColor: "#ff6600", textDecoration: "none" }}
                >
                  <i className="bx bx-cart-add"></i>
                  Mua Ngay
                </Link>
              </div>

              <div className="detailProduct__container__content__spaceContainer">
                <button
                  className="btn detailProduct__container__content__spaceContainer__blueBtn"
                  type="button"
                >
                  <i
                    className="bx bxs-like"
                    style={{ color: "#fff", marginLeft: 2, marginRight: 2 }}
                  ></i>
                  Th??ch
                </button>

                <button
                  className="btn detailProduct__container__content__spaceContainer__blueBtn"
                  type="button"
                >
                  <i
                    className="bx bxs-share"
                    style={{ color: "#fff", marginLeft: 2, marginRight: 2 }}
                  ></i>
                  Chia s???
                </button>

                {!isLove ? (
                  <button
                    onClick={handleLoveList}
                    className="btn detailProduct__container__content__spaceContainer__whiteBtn"
                    type="button"
                  >
                    <i className="bx bxs-heart"></i>
                    Th??m v??o danh s??ch y??u th??ch
                  </button>
                ) : (
                  <button
                    className="btn detailProduct__container__content__spaceContainer__whiteBtn"
                    type="button"
                  >
                    <i className="bx bxs-heart"></i>
                    ???? y??u th??ch
                  </button>
                )}
              </div>

              <div style={{ marginTop: 30, display: "flex" }}>
                <div style={{ display: "flex", marginRight: 20 }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  7 ng??y mi???n ph?? tr??? h??ng
                </div>

                <div style={{ display: "flex", marginRight: 20 }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  H??ng ch??nh h??ng 100%
                </div>

                <div style={{ display: "flex" }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  Mi???n ph?? v???n chuy???n
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="detailProduct__section section">
            <div className="title">TH??NG TIN CHI TI???T</div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
              }}
            >
              <tbody className="detailProduct__container__tablebody">
                <tr className="detailProduct__container__tablerow">
                  <td className="detailProduct__container__tablerow--left ">
                    Th????ng hi???u
                  </td>
                  <td className="detailProduct__container__tablerow--right uppercase">
                    {product.brand}
                  </td>
                </tr>
                <tr>
                  <td className="detailProduct__container__tablerow--left">
                    Xu???t x???
                  </td>
                  <td className="detailProduct__container__tablerow--right">
                    {product.origin}
                  </td>
                </tr>
                <tr>
                  <td className="detailProduct__container__tablerow--left">
                    S??? l?????ng kho
                  </td>
                  <td className="detailProduct__container__tablerow--right">
                    {product.quantity}
                  </td>
                </tr>
                <tr>
                  <td className="detailProduct__container__tablerow--left">
                    Danh m???c
                  </td>
                  <td className="detailProduct__container__tablerow--right">
                    {cate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="detailProduct__section section">
            <div className="title">M?? T??? S???N PH???M</div>
            <div className="content">{product.description}</div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="detailProduct__section section">
            <div className="title">H?????NG D???N S??? D???NG</div>
            <div className="content">{product.instruction}</div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="detailProduct__section section">
            <div className="title uppercase">Th??nh ph???n s???n ph???m</div>
            <div className="content">{product.Ingredient}</div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <Rating
            id={productId}
            name={product.name}
            numberRating={numberRating}
          />
        </div>
      </div>
      <div>
        <div className="detailProduct__container--right">
          <div className="detailProduct__containerright">
            <div
              className="detailProduct__containerright__line"
              style={{ marginRight: ".5rem" }}
            ></div>
            <div className="detailProduct__containerright__content">
              MI???N PH?? V???N CHUY???N
            </div>
            <div
              className="detailProduct__containerright__line"
              style={{ marginLeft: ".5rem" }}
            ></div>
          </div>
          <div className="detailProduct__containerright__footer">
            <img
              style={{ height: 80, width: 80 }}
              src="https://hasaki.vn/images/graphics/delivery-120-minutes.png"
            />
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              Giao Nhanh Mi???n Ph?? 2H (?????k L???k - ???? N???ng - Ti???n Giang - Ki??n
              Giang - C???n Th?? - V??ng T??u - B??nh D????ng - ?????ng Nai - H?? N???i - HCM)
            </div>
          </div>
          <div
            className="detailProduct__containerright__footer"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <img
              style={{ height: 80, width: 80 }}
              src="https://hasaki.vn/images/graphics/img_quality_3.png"
            />
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "1.3rem",
                textAlign: "justify",
                alignSelf: "center",
              }}
            >
              Ph??t hi???n h??ng gi???, b???n tr??? h??ng v?? nh???n th??m 110% gi?? tr???.
            </div>
          </div>
          <div
            className="detailProduct__containerright__footer"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <img
              style={{ height: 80, width: 80 }}
              src="https://hasaki.vn/images/graphics/img_quality_2.png"
            />
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              Giao H??ng Mi???n Ph?? (t??? 90K ?????k L???k - ???? N???ng - Ti???n Giang - Ki??n
              Giang - C???n Th?? - V??ng T??u - B??nh D????ng - ?????ng Nai - H?? N???i - HCM
              tr??? huy???n, to??n Qu???c t??? 249K)
            </div>
          </div>
          <div
            className="detailProduct__containerright__footer"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <img
              style={{ height: 80, width: 80 }}
              src="https://hasaki.vn/images/graphics/img_quality_4.png"
            />
            <div
              style={{
                marginLeft: "1rem",
                fontSize: "1.3rem",
                textAlign: "justify",
                alignSelf: "center",
              }}
            >
              ?????i tr??? trong 14 ng??y.
            </div>
          </div>
        </div>
        <div
          className="detailProduct__container--right detailProduct__recommend"
          style={{ marginTop: 10 }}
        >
          <div className="detailProduct__containerright marginBottom">
            <div
              className="detailProduct__containerright__line"
              style={{ marginRight: ".5rem" }}
            ></div>
            <div className="detailProduct__containerright__content uppercase">
              S???n ph???m t????ng t???
            </div>
            <div
              className="detailProduct__containerright__line"
              style={{ marginLeft: ".5rem" }}
            ></div>
          </div>
          <Grid col={1} mdCol={1} smCol={1} gap={10}>
            {productRecommend.length > 5
              ? productRecommend.slice(0, 5).map((item, index) => (
                  <Link to={`/product/${item.id}`} key={index}>
                    <Pro
                      src={item.imagepresent}
                      name={item.name}
                      price={item.price}
                      sale={item.sold}
                    />
                  </Link>
                ))
              : productRecommend.map((item, index) => (
                  <Link to={`/product/${item.id}`} key={index}>
                    <Pro
                      src={item.imagepresent}
                      name={item.name}
                      price={item.price}
                      sale={item.sold}
                    />
                  </Link>
                ))}
          </Grid>
        </div>
      </div>
      <PopupAddProductToCart
        trigger={showPopup}
        setTrigger={() => setShowPopup(false)}
      >
        <div>S???n ph???m ???? ???????c th??m v??o Gi??? h??ng</div>

      </PopupAddProductToCart>
    </div>
  );
};
export default Product;
