import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "./SettingForSlider";
import { getProductByCategory } from "../../API/Networking";
const CategoriesDisplayComponent = (props) => {
  const [product, setProduct] = useState([]);
  const [style, setStyle]=useState('colorBlue')
  const [bgStyle, setBgStyle] = useState("bgcolorBlue")
  useEffect(() => {
    getProductByCategory(props.id).then((res) => {
      setProduct(res);
    });
    if(props.id===11)
    {
      setStyle("colorMain")
      setBgStyle("bgcolorMain")
    }
    if(props.id===14)
    {
      setStyle("colorMiner")
      setBgStyle("bgcolorMiner")
    }
    if(props.id===13)
    {
      setStyle("colorBtn")
      setBgStyle("bgcolorBtn")
    }
    if(props.id===15)
    {
      setStyle("colorYellow")
      setBgStyle("bgcolorYellow")
    }
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="cdc">
      <div className="cdc__container">
        <div className="cdc__header">
          <div className="cdc__header__title">
            <div className="deal__title__left">
              <h2 className={"cdc__header__title--h2 "+ style}>{props.title}</h2>
            </div>

            <div className={"cdc__btn "+ bgStyle}>
              <Link to={props.link} className="cdc__btn--btn">
                Xem tất cả
              </Link>
            </div>
          </div>
        </div>
        <div className="deal__fl boxshadow">
          <Slider {...settings}>
            {product.map((item, index) => {
              return (
                <div key={index}>
                  <Product
                    name={item.name}
                    price={item.price}
                    sale={item.sold}
                    src={item.imagepresent}
                    brand={item.brand}
                    id={item.id}
                  />
                </div>
              );
            })}
          </Slider>

          <div className={props.id === 14 ? "cdc__listimg" : "displaynone"}>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="	https://media.hasaki.vn/hsk/1644808708415-x-130---9.jpg"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="		https://media.hasaki.vn/hsk/1652436242anessa_415x130.jpg"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://media.hasaki.vn/hsk/1644808727415-x-130---8.jpg"
              />
            </Link>
          </div>
          <div className={props.id === 12 ? "cdc__listimg" : "displaynone"}>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://www.watsons.vn/medias/09.05.22-P-LAROCHEPOSAY?context=bWFzdGVyfHJvb3R8MzQ4MDV8aW1hZ2UvanBlZ3xoODMvaDZjLzkzMzY1NDc1NDEwMjIuanBnfGFkZjFmZDZmNDkwMGMxZDNlNWE3ZDUyYmQ5YjFhODI5NzM3ZGRmMDlmNDg1MTdjZDYxZGNiMWZlNGM4YTYyNmU"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://cdn.tgdd.vn/Files/2021/12/14/1404444/tong-hop-tat-ca-san-pham-cua-thuong-hieu-my-pham-simple-202112150022435233.jpg"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://www.boshop.vn/uploads/2020/08/24/5f436847996ba-review-bo-my-pham-naruko-boshop-10.jpg"
              />
            </Link>
          </div>

          <div className={props.id === 15 ? "cdc__listimg" : "displaynone"}>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://media.hasaki.vn/hsk/1639446173415x130_laneige.jpg"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://media.hasaki.vn/hsk/1624872227sulwasooo.jpg"
              />
            </Link>
            <Link to={"/"} className="cdc__listimg__img">
              <img
                className="cdc__listimg__img--img"
                src="https://media.hasaki.vn/hsk/1640663436415x130_shu%20uemura.jpg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesDisplayComponent;
