import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../API/Networking";
import Dialog from "../Components/Dialog";
import ConfirmDialog from "../Components/ConformDialog";
import Rating from "../Components/DetailProduct/Rating/Rating";
import Slider from "react-slick";
import { UserContext } from "../Context/UserContext/UserContext";
import {
  getListImages,
  getProductFromCart,
  postItemToCart,
  putItemInCart,
} from "../API/Server";
import { PopupAddProductToCart } from "../Components/Cart/Popup";

const Product = (props) => {
  const { token, userData } = useContext(UserContext);

  const [product, setProduct] = useState("");
  const [counter, setCounter] = useState(1);
  const productId = props.match.params.slug;
  const [listImage, setListImage] = useState([]);
  const [thumnail, setThumnail] = useState("");
  const [tonTai, setTonTai] = useState(false);
  const [product_Exist, setProduct_Exist] = useState("");
  const [quantityOfCart, setQuantityOfCart] = useState(0);
  const [listData, setListData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  //fetch dữ liệu giỏ hàng
  const fetchProductFromCart = () => {
    console.log("productID:", productId);
    getProductFromCart(userData.id, "")
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
        setQuantityOfCart(Object.keys(items).length);
      })
      .catch((error) => {
        setListData([]);
      });
  };

  //refresh khi thêm sản phẩm mới
  const refreshProductFromCart = () => {
    getProductFromCart(userData.id, "")
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
  };

  const handleAddToCart = () => {
    {
      if (tonTai === false) {
        fetchProductFromCart();
        postItemToCart(userData, token, product)
          .then((item) => {
            console.log("Thêm vào giỏ hàng thành công");
            refreshProductFromCart();
            setShowPopup(true);
          })
          .catch((error) => {
            console.error(`Error is: ${error}`);
          });
      } else if (tonTai === true) {
        fetchProductFromCart();
        putItemInCart("+", product_Exist, token)
          .then((item) => {
            console.log("Đã update số lượng sản phẩm", product_Exist);
            //Chỗ này phải so sánh số lượng đang ở trong giỏ hàng của 1 user, nhiều user với tổng số lượng sp
            refreshProductFromCart();
            setShowPopup(true);
          })
          .catch((error) => {
            console.error(`Error is: ${error}`);
          });
      }
    }
    setTonTai(true);
  };

  useEffect(() => {
    getProduct(productId);
    getAllImages(productId);
    fetchProductFromCart();
  }, []);

  const getAllImages = (productId) => {
    getListImages(productId)
      .then((products) => {
        setListImage(products);
      })
      .catch((error) => {
        console.log("Lỗi getListImages trong chi tiết sản phẩm");
      });
  };

  const getProduct = (productId) => {
    getProductById(productId)
      .then((product) => {
        setThumnail(product.imagepresent);
        setProduct(product);
      })
      .catch((error) => {
        console.log("Lỗi tải ảnh trong chi tiết sản phẩm");
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
                          style={{ width: 80, height: 80 }}
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
                  Nhận xét
                </div>
                <div className="detailProduct__container__content__slidebar__space">
                  Đánh giá
                </div>
                <div className="detailProduct__container__content__slidebar__space">
                  Đã bán
                </div>
              </div>
              <div className="detailProduct__container__content__price">
                {formatNumber(product.price + "")} đ
              </div>
              <div className="detailProduct__container__content__quantityContainer">
                <div className="detailProduct__container__content__quantityContainer__h4">
                  Số Lượng:
                </div>
                <div className="detailProduct__container__content__quantityContainer__quantity">
                  <button className="detailProduct__container__content__quantityContainer__quantity__sign">
                    -
                  </button>
                  <button className="detailProduct__container__content__quantityContainer__quantity__counter">
                    {counter}
                  </button>
                  <button className="detailProduct__container__content__quantityContainer__quantity__sign">
                    +
                  </button>
                </div>
                <div className="detailProduct__container__content__quantityContainer__h4">
                  {product.quantity} sản phẩm sẵn có
                </div>
              </div>

              <div className="detailProduct__container__content__spaceContainer">
                <button
                  className="detailProduct__container__content__spaceContainer__button"
                  onClick={() => handleAddToCart()}
                >
                  <i
                    className="bx bxs-cart-add"
                    style={{ fontSize: 24, paddingRight: 10 }}
                  ></i>
                  Thêm Vào Giỏ Hàng
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
                  Thích
                </button>

                <button
                  className="btn detailProduct__container__content__spaceContainer__blueBtn"
                  type="button"
                >
                  <i
                    className="bx bxs-share"
                    style={{ color: "#fff", marginLeft: 2, marginRight: 2 }}
                  ></i>
                  Chia sẻ
                </button>

                <button
                  className="btn detailProduct__container__content__spaceContainer__whiteBtn"
                  type="button"
                >
                  <i className="bx bxs-like"></i>
                  Thêm vào danh sách yêu thích
                </button>
              </div>

              <div style={{ marginTop: 30, display: "flex" }}>
                <div style={{ display: "flex", marginRight: 20 }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  7 ngày miễn phí trả hàng
                </div>

                <div style={{ display: "flex", marginRight: 20 }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  Hàng chính hãng 100%
                </div>

                <div style={{ display: "flex" }}>
                  <div className="detailProduct__container__content__marketing">
                    <i className="bx bx-undo" style={{ color: "#fff" }}></i>
                  </div>
                  Miễn phí vận chuyển
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="section">
            <div className="title">THÔNG TIN CHI TIẾT</div>
            <table>
              <tbody>
                <tr>
                  <td>Thương hiệu</td>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <td>Xuất xứ</td>
                  <td>{product.origin}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="section">
            <div className="title">MÔ TẢ SẢN PHẨM</div>
            <div className="content">{product.description}</div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <div className="section">
            <div className="title">HƯỚNG DẪN SỬ DỤNG</div>
            <div className="content">{product.instruction}</div>
          </div>
        </div>

        <div className="detailProduct__container--big">
          <Rating id={productId} />
        </div>

        <Dialog notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </div>
      <div>
        <div className="detailProduct__container--right">
          <div>--MIỄN PHÍ VẬN CHUYỂN--</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              style={{ height: 60, width: 60 }}
              src="https://hasaki.vn/images/graphics/delivery-120-minutes.png"
            />
            <div>
              Giao Nhanh Miễn Phí 2H (Đắk Lắk - Đà Nẵng - Tiền Giang - Kiên
              Giang - Cần Thơ - Vũng Tàu - Bình Dương - Đồng Nai - Hà Nội - HCM)
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              style={{ height: 60, width: 60 }}
              src="https://hasaki.vn/images/graphics/img_quality_3.png"
            />
            <div>
              Phát hiện hàng giả, bạn trả hàng và nhận thêm 110% giá trị.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              style={{ height: 60, width: 60 }}
              src="https://hasaki.vn/images/graphics/img_quality_2.png"
            />
            <div>
              Giao Hàng Miễn Phí (từ 90K Đắk Lắk - Đà Nẵng - Tiền Giang - Kiên
              Giang - Cần Thơ - Vũng Tàu - Bình Dương - Đồng Nai - Hà Nội - HCM
              trừ huyện, toàn Quốc từ 249K)
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              style={{ height: 60, width: 60 }}
              src="https://hasaki.vn/images/graphics/img_quality_4.png"
            />
            <div>Đổi trả trong 14 ngày. </div>
          </div>
        </div>
        <div
          className="detailProduct__container--right"
          style={{ marginTop: 10 }}
        >
          <div>Sản phẩm tương tự</div>
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
export default Product;
