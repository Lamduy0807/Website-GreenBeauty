import React, { useState, useEffect, useContext } from "react";
import MenuComponent from "../Components/SideMenuMain/MenuComponent";
import Product from "../Components/Home/Product";
import { Link } from "react-router-dom";
import Grid from "../Components/Grid";
import { ModalContext } from "../Context/ModelContext/ModalContext";
import { getSearchProduct, getSearchProductWithFiltering } from "../API/Networking";
const SearchPage = (props) => {
  const search = props.location.state.search;
  const {categories} = useContext(ModalContext);
  const [data, setData] = useState([]);
  const [dataSold, setDataSold] = useState([]);
  const [dataPriceUp, setDataPriceUp] = useState([]);
  const [dataPriceDown, setDataPriceDown] = useState([]);
  const [dataQuan, setDataQuan] = useState([]);
  const [choosen, setChoosen] = useState(1);

  useEffect(() => {
    getSearchProduct(search).then((res) => {
      setData(res);
    });
    getSearchProductWithFiltering(search, "-sold").then((res) => {
      setDataSold(res);
    });
    getSearchProductWithFiltering(search, "price").then((res) => {
      setDataPriceUp(res);
    });
    getSearchProductWithFiltering(search, "-price").then((res) => {
      setDataPriceDown(res);
    });
    getSearchProductWithFiltering(search, "quantity").then((res) => {
      setDataQuan(res);
    });
  }, [props.location.state.search]);
  return (
    <div className="categories">
      <div className="categories__container">
        <div className="categories__left">
          {categories.map((item, index) => {
            return <MenuComponent key={index} name={item.name} id={item.id} />;
          })}
        </div>
        <div className="categories__right">
          <div className="cateind">
            <h2 className="cateind__title">
              Kết quả tìm kiếm cho "{search}"
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
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
