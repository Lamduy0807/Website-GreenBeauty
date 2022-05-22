import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Grid from "../Grid";
import Product from "./Product";
import { getProduct } from "../../API/Networking";

const ProductRecommend = () => {
  const [maxRange,setMaxRange] = useState(10);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    getProduct().then((re) => {
      setProduct(re);
    });
  };
  const handleLoadMore = ()=>{
    maxRange+8>=product.length?
    setMaxRange(product.length): setMaxRange(pre=> pre+10)
  }
  
  console.log();
  return (
    <div className="pr">
      <div className="pr__container">
        <div >
          <h2 className="pr__title" >gợi ý dành cho bạn</h2>
        </div>

        <div className="pr__product" >
          <Grid col={5} mdCol={2} smCol={1} gap={10}>
            {product.slice(0,maxRange).map((item, index) => (
              <Link to={`/product/${item.id}`}  key={index} >
              <Product
                key={index}
                src={item.imagepresent}
                name={item.name}
                price={item.price}
                sale={item.sold}
              />
              </Link>
            ))}
          </Grid>
        </div>

        <div className="pr__button">
          <div className="pr__button__btn"
          onClick={handleLoadMore}
          >Tải thêm</div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommend;
