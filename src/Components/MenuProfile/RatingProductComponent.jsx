import React, { useContext, useEffect, useState } from "react";
import { getProductById } from "../../API/Networking";
import { ModalContext } from "../../Context/ModelContext/ModalContext";
import { postRatingInformation, setRating } from "../../API/Networking";
const RatingProductComponent = (props) => {
  const {setDetailData, detailData} = useContext(ModalContext)
  const [product, setProduct] = useState({
    imagepresent:"",
    name:"",
    id: ""
  })
  const [defaultRating, setdefaultRating] = useState(5);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [avatar, setAvatar] = useState("");
  const [img, setImg] = useState()
  const [content, setContent] = useState("")
  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";
  const starImgCorner =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
  
  useEffect(()=>{
    setAvatar("");
    setContent("")
    getProductById(props.id).then(res=>{
      setProduct(res)
    })
  },[detailData])
    const handleUpdateFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    setImg(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };
  const CustomStarRating = () => {
    return (
      <div className="ratingpro__component__rating">
        <div className="displayflex">
          {maxRating.map((item, index) => {
            return (
              <div key={index} onClick={() => setdefaultRating(item)}>
                <img
                  className="ratingpro__component__rating--img"
                  src={item <= defaultRating ? starImgFilled : starImgCorner}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const handleUp = () =>{
    try {
      const tokens = localStorage.getItem("token");
      postRatingInformation(product.id, tokens,img, content, defaultRating).then((res) => {
        if(res===201)
            {
              setRating(props.id).then(res=>{
                if(res===200)
                {
                    var y = detailData
                    var x = y.filter(object => {
                      return object.id !== props.id;
                    })
                    setDetailData(x);
                }
              })
            }
        });
    } catch (error) {
      console.log(`Error is ${error}`);
    }
    
  }
  return (
    <div className="ratingpro__component">
      <div className="ratingpro__component__product">
        <img
          className="ratingpro__component__product--img"
          src={product.imagepresent}
        />
        <div className="ratingpro__component__product--name">
          {product.name}
        </div>
      </div>
      <CustomStarRating />
      <input
        placeholder="Nhập cảm nhận của bạn về sản phẩm"
        className="ratingpro__component__input"
        onChange={e=>setContent(e.target.value)}
      />
      <label
        htmlFor="upload-photo"
        className="ratingpro__component__upload"
      >
        <i className='bx bxs-camera marginRight'></i>
        Thêm hình ảnh
      </label>
      <input
        type="file"
        id="upload-photo"
        onChange={handleUpdateFile}
      ></input>
      <img src={avatar} className={avatar!==""? "ratingpro__component__image": "displaynone"}/>
      <div className="ratingpro__component__up">
          <button onClick={handleUp} className="ratingpro__component__up--btn">Đánh giá</button>
      </div>
    </div>
  )
};

export default RatingProductComponent;
