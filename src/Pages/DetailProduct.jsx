import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../API/Networking";
import Dialog from "../Components/Dialog";
import ConfirmDialog from "../Components/ConformDialog";

const Product = (props) => {
  const [product, setProduct] = useState("");
  const [counter, setCounter] = useState(1);
  const params = useParams();
  console.log(props.match.params.slug);
  const productId = props.match.params.slug;
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

  const onPress = () => {
    // setNotify({
    //   isOpen: true,
    //   message: "Submited successfully",
    //   type: "success",
    // });

    setConfirmDialog({
      isOpen: true,
      title: "Are you sure?",
      subTitle: "You can't undo this",
    });
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  const getProduct = (productId) => {
    getProductById(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.log("Lỗi tải ảnh trong chi tiết sản phẩm");
      });
  };

  return (
    <div className="detailProduct">
      <div className="detailProduct__container--big">
        <div className="detailProduct__container" style={{ padding: 10 }}>
          <img
            style={{ width: 350, height: 350 }}
            src={product.imagepresent}
            alt="Detail product"
          />
          <div className="detailProduct__container__content">
            <h3 className="detailProduct__container__content__productName">
              {product.name}
            </h3>
            <div className="detailProduct__container__content__slidebar">
              <h3 className="detailProduct__container__content__slidebar__space">
                Nhận xét
              </h3>
              <h3 className="detailProduct__container__content__slidebar__space">
                Đánh giá
              </h3>
              <h3 className="detailProduct__container__content__slidebar__space">
                Đã bán
              </h3>
            </div>
            <h4 className="detailProduct__container__content__price">
              {formatNumber(product.price + "")} đ
            </h4>
            <div className="detailProduct__container__content__quantityContainer">
              <h4 className="detailProduct__container__content__quantityContainer__h4">
                Số Lượng:
              </h4>
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
              <h4 className="detailProduct__container__content__quantityContainer__h4">
                {product.quantity} sản phẩm sẵn có
              </h4>
            </div>

            <div className="detailProduct__container__content__spaceContainer">
              <button
                className="detailProduct__container__content__spaceContainer__button"
                onClick={onPress}
              >
                <i
                  className="bx bxs-cart-add"
                  style={{ fontSize: 24, paddingRight: 10 }}
                ></i>
                Thêm Vào Giỏ Hàng
              </button>
              <button
                className="detailProduct__container__content__spaceContainer__button"
                style={{ backgroundColor: "#ff6600" }}
              >
                <i className="bx bx-cart-add"></i>
                Mua Ngay
              </button>
            </div>

            <div className="detailProduct__container__content__spaceContainer">
              <button
                className="btn detailProduct__container__content__spaceContainer__blueBtn"
                onClick={onPress}
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
                onClick={onPress}
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
        <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <h4>Thông tin chi tiết</h4>
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
        <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <h4>Mô tả sản phẩm</h4>
          <h4>{product.description}</h4>
        </div>
      </div>

      <div className="detailProduct__container--big">
        <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <h4>Thành phần sản phẩm</h4>
          <h4>{product.Ingredient}</h4>
        </div>
      </div>

      <div className="detailProduct__container--big">
        <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <h4>Hướng dẫn sử dụng</h4>
          <h4>{product.instruction}</h4>
        </div>
      </div>

      <div className="detailProduct__container--big">
        <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <h4>Đánh giá sản phẩm</h4>
          <h4>{product.instruction}</h4>
        </div>
      </div>

      <Dialog notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};

export default Product;
