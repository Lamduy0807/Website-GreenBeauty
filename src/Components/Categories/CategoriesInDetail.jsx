import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCategoryById,
  getProductByCategory,
  getProductByCategoryOrdering,
} from "../../API/Networking";
import Grid from "../Grid";
import Product from "../Home/Product";
const CategoriesInDetail = () => {
  const Data = useParams();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [dataSold, setDataSold] = useState([]);
  const [dataPriceUp, setDataPriceUp] = useState([]);
  const [dataPriceDown, setDataPriceDown] = useState([]);
  const [dataQuan, setDataQuan] = useState([]);
  const [choosen, setChoosen] = useState(1);
  useEffect(() => {
      setChoosen(1);
    getCategoryById(Data.id).then((res) => {
      setName(res.name);
    });
    getProductByCategory(Data.id).then((res) => {
      setData(res);
    });
    getProductByCategoryOrdering(Data.id, "-sold").then((res) => {
      setDataSold(res);
    });
    getProductByCategoryOrdering(Data.id, "price").then((res) => {
      setDataPriceUp(res);
    });
    getProductByCategoryOrdering(Data.id, "-price").then((res) => {
      setDataPriceDown(res);
    });
    getProductByCategoryOrdering(Data.id, "quantity").then((res) => {
      setDataQuan(res);
    });
  }, [Data]);
  return (
    <div className="cateind">
      <h2 className="cateind__title">
        {name} ({data.length} sản phẩm)
      </h2>
      <div className="cateind__container">
        Sắp xếp:
        <div
          onClick={() => {
            setChoosen(1);
          }}
          className={
            choosen === 1
              ? "cateind__chossen cateind__chossen--active"
              : "cateind__chossen"
          }
        >
          Tất cả
        </div>
        <div
          onClick={() => {
            setChoosen(2);
          }}
          className={
            choosen === 2
              ? "cateind__chossen cateind__chossen--active"
              : "cateind__chossen"
          }
        >
          Bán chạy
        </div>
        <div
          onClick={() => {
            setChoosen(3);
          }}
          className={
            choosen === 3
              ? "cateind__chossen cateind__chossen--active"
              : "cateind__chossen"
          }
        >
          Giá thấp đến cao
        </div>
        <div
          onClick={() => {
            setChoosen(4);
          }}
          className={
            choosen === 4
              ? "cateind__chossen cateind__chossen--active"
              : "cateind__chossen"
          }
        >
          Giá cao đến thấp
        </div>
        <div
          onClick={() => {
            setChoosen(5);
          }}
          className={
            choosen === 5
              ? "cateind__chossen cateind__chossen--active"
              : "cateind__chossen"
          }
        >
          Số lượng hàng
        </div>
      </div>
      <Grid col={4} mdCol={2} smCol={1} gap={10}>
        {choosen === 1
          ? data.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <Product
                    src={item.imagepresent}
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                  />
                </Link>
              );
            })
          : null}
          {choosen === 2
          ? dataSold.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <Product
                    src={item.imagepresent}
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                  />
                </Link>
              );
            })
          : null}
          {choosen === 3
          ? dataPriceUp.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <Product
                    src={item.imagepresent}
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                  />
                </Link>
              );
            })
          : null}
          {choosen === 4
          ? dataPriceDown.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <Product
                    src={item.imagepresent}
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                  />
                </Link>
              );
            })
          : null}
          {choosen === 5
          ? dataQuan.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <Product
                    src={item.imagepresent}
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                  />
                </Link>
              );
            })
          : null}
      </Grid>
    </div>
  );
};

export default CategoriesInDetail;
