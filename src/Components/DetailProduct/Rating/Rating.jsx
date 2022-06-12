import React, { useState, useEffect } from "react";
import { RatingItem } from "./RatingItem";
import { getListRating } from "../../../API/Server";

const Rating = (props) => {
  const [listRating, setListRating] = useState([]);
  const [listRating5, setListRating5] = useState([]);
  const [listRating4, setListRating4] = useState([]);
  const [listRating3, setListRating3] = useState([]);
  const [listRating2, setListRating2] = useState([]);
  const [listRating1, setListRating1] = useState([]);
  const [select, setSelect] = useState(0)

  const maxStar = [1, 2, 3, 4, 5];
  const [numberRating, setNumberRating] = useState(0);
  const [sumValue, setSumValue] = useState(0);

  const fetchAPIListRating = (id) => {
    setSumValue(0);
    setNumberRating(0)
    getListRating(id)
      .then((result) => {
        setListRating(result);
        setNumberRating(result.length)
        result.forEach((rating) => {
          if(rating.ratingpoint === 5)
            setListRating5(prev => [...prev, rating])
          else if(rating.ratingpoint === 4)
            setListRating4(prev => [...prev, rating])
          else if(rating.ratingpoint === 3)
            setListRating3(prev => [...prev, rating])
          else if(rating.ratingpoint === 2)
            setListRating2(prev => [...prev, rating])
          else if(rating.ratingpoint === 1)
            setListRating1(prev => [...prev, rating])
          setSumValue((prov) => {
            return prov + rating.ratingpoint;
          });
        });
      })
      .catch((error) => {
        console.log("Lỗi fetchAPIListRating trong chi tiết sản phẩm");
      });
  };

  useEffect(() => {
    setSumValue(0)
    setNumberRating(0)
    setListRating([])
    setListRating1([])
    setListRating2([])
    setListRating3([])
    setListRating4([])
    setListRating5([])
    setSelect(0)
    fetchAPIListRating(props.id);
  }, [props.id]);
  return (
    <div className="rating">
      <h4 className="rating__header">ĐÁNH GIÁ SẢN PHẨM</h4>
      <div className="rating__overview">
        <div className="rating__overview__total">
          <div className="rating__overview__total__left">
            <div className="rating__overview__total__left__rating">{sumValue===0? 0 : (sumValue / numberRating).toFixed(1) }</div>
            <span className="rating__overview__total__left__star orange displayblock">
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
            <div className="rating__overview__total__left__div" >{numberRating} nhận xét</div>
          </div>
          
        </div>
        <div>
          <button onClick={()=>{setSelect(0)}} className={select===0? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>Tất cả ({listRating.length})</button>
          <button onClick={()=>{setSelect(5)}} className={select===5? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>5 sao ({listRating5.length})</button>
          <button onClick={()=>{setSelect(4)}} className={select===4? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>4 sao ({listRating4.length})</button>
          <button onClick={()=>{setSelect(3)}} className={select===3? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>3 sao ({listRating3.length})</button>
          <button onClick={()=>{setSelect(2)}} className={select===2? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>2 sao ({listRating2.length})</button>
          <button onClick={()=>{setSelect(1)}} className={select===1? "rating__overview__total__right rating__overview__total__right--active" :"rating__overview__total__right"}>1 sao ({listRating1.length})</button>
        </div>
      </div>
      <div>
        {
          select === 0?
        listRating.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
        {
          select === 1?
        listRating1.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
        {
          select === 2?
        listRating2.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
        {
          select === 3?
        listRating3.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
        {
          select === 4?
        listRating4.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
        {
          select === 5?
        listRating5.map((item, index) => (
          <RatingItem item={item} name={props.name}/>
        )) : null
        }
      </div>
    </div>
  );
};

export default Rating;
