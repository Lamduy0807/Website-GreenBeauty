import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import IngredientCard from "./IngredientCard";
import {getIngredientInformation} from '../../API/Networking';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

const AnalyticsIngredient = () => {
  const [active, setActive] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [low, setLow] = useState(0);
  const [medium, setMedium] = useState(0);
  const [high, setHigh] = useState(0);
  const [ingredients, setIngredients] = useState('')
  const [resultData, setResultData] = useState([])


  const labels = ["Nguy cơ thấp", "Nguy cơ trung bình", "Nguy cơ cao"];
  
  const handleChangeActive = () => {
    setActive((prev) => !prev);
  };
  const convertToSlug = (Text)=>
  {
    return Text
        .trim()
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
  }
  const handleSplitString = (input) =>{
    const arr = input.split(',');
    arr.forEach(ingred => {
      getIngredientInformation(convertToSlug(ingred)).then(re=>{
        if(re!=="")
        {
          setResultData(prev=>[...prev, re])
          if(re.levelOfSave>=4)
          {
            setLow(prev=> prev+1)
          }
          if(re.levelOfSave===3)
          {
            setMedium(prev=> prev+1)
          }
          if(re.levelOfSave<3)
          {
            setHigh(prev=> prev+1)
          }
        }
      })
    });
    setIsShow(true);
  }
  return (
    <div className="ai">
      <div className="ai__container">
        <div className="ai__input">
          <div className="ai__input__search">
            <div className="ai__input__search__instruction">
              <h3 className="pr__title">Hướng dẫn sử dụng</h3>
              <ul className="ai__input__search__instruction--list">
                <li>Nhập tên chất muốn tra</li>
                <li>Các chất cách nhau bằng dấu "," </li>
                <li>
                  Bạn có thể coppy và paste dãy hoạt chất của một sản phẩm nào
                  đó. App sẽ dự đoán các chất trong danh sách đó
                </li>
              </ul>
            </div>
            <div className="ai__input__search__container">
              <div className="ai__input__search--input">
                <textarea
                  className="ai__input__search--input--text"
                  placeholder="Tìm kiếm thành phần"
                  value={ingredients}
                  onChange={e => {
                    setIsShow(false);
                    setIngredients(e.target.value);
                    setLow(0);
                    setHigh(0);
                    setMedium(0);
                    setResultData([])
                  }}
                ></textarea>
                <i className="bx bxs-info-square ai__input__search--input--infor ai__input__search--input--infor--hashover"></i>
                <div className="ai__input__information">
                  <div className="ai__input__information__content">
                    <span>Click icon kính lúp để tìm kiếm chất hóa học</span>
                    <br></br>
                    <span>Click icon X để xóa những chất đã nhập</span>
                  </div>
                </div>
              </div>
              <div className="ai__input__search__icon">
                <button
                 onClick={()=> handleSplitString(ingredients)} 
                 className="button button--circle ai__input__search__button">
                  <i className="bx bx-search ai__input__text"></i>
                </button>
                <button className="button button--circle ai__input__search__button"
                  onClick={()=>{
                    setLow(0);
                    setHigh(0);
                    setMedium(0);
                    setResultData([]);
                    setIngredients('');
                    setIsShow(false);
                  }}
                >
                  <i className="bx bx-x ai__input__text"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="ai__input__map">
            <div className="ai__input__map__container">
              <div className="ai__input__map__title">
                <h3 className="pr__title">Biểu đồ phân tích</h3>
                <i className="bx bxs-info-square ai__input__map__icon ai__input__map__icon--hashover"></i>
                <div className="ai__input__map__infor">
                  <div className="ai__input__map__infor__content">
                    <span>
                      Nguy cơ thấp: không có thông tin cụ thể nhưng thường dùng
                      với nồng độ thấp hoặc có thông tin kém an toàn khi sử dụng
                      qua đường uống nhưng ko có thông tin qua đường thoa
                    </span>
                    <br></br>
                    <br></br>
                    <span>
                      Nguy cơ trung bình: có nghiên cứu chứng minh độ kém an
                      toàn trong nghiên cứu động vật nhưng không có nghiên cứu
                      trên người hoặc không có thông tin cụ thể (nhóm các loại
                      thuốc loại C trong danh mục Bầu của FDA
                    </span>
                    <br></br>
                    <br></br>
                    <span>
                      Nguy cơ cao: có nghiên cứu chứng minh độ kém an toàn khi
                      sử dụng trên mẹ bầu hoặc nhóm các loại thuốc loại X trong
                      danh mục Bầu của FDA/ hoặc là thành phần không có thông
                      tin cụ thể nhưng thường dùng với lượng lớn sp, như các
                      thành phần KCN hóa học
                    </span>
                  </div>
                </div>
              </div>
              <div className="ai__input__map__choice">
                <button
                  onClick={handleChangeActive}
                  className={
                    !active
                      ? "button ai__input__map__button ai__input__map__button--active"
                      : "button ai__input__map__button button ai__input__map__button--hashover"
                  }
                >
                  Biểu đồ tròn
                </button>
                <button
                  onClick={handleChangeActive}
                  className={
                    active
                      ? "button ai__input__map__button ai__input__map__button--active"
                      : "button ai__input__map__button button ai__input__map__button--hashover"
                  }
                >
                  Biểu đồ cột
                </button>
                
              </div>
            </div>

            <div
              className={
                active&&isShow
                  ? "ai__input__map--bar"
                  : "ai__input__map--bar displaynone"
              }
            >
              <Bar
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: ["Thấp", "Trung bình", "Cao"],
                      data: [low, medium, high],
                      backgroundColor: ["#1627D0", "#C7CB14", "#D7375E"],
                      barThickness: 50
                    },
                  ],
                }}
              ></Bar>
            </div>

            <div
              className={
                !active&&isShow
                  ? "ai__input__map--pie"
                  : "ai__input__map--pie displaynone"
              }
            >
              <Pie
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: ["Thấp", "Trung Bình", "Cao"],
                      data: [low, medium, high],
                      backgroundColor: ["#1627D0", "#C7CB14", "#D7375E"],
                    }
                  ],
                }}
              ></Pie>
            </div>

            <div className="ai__input__map__indicate">
              <div className="ai__input__map__indicate--container">
                <div className="ai__input__map__indicate--square low"></div>
                <span>Nguy cơ thấp: {low}</span>
              </div>

              <div className="ai__input__map__indicate--container marginLeft">
                <div className="ai__input__map__indicate--square medium"></div>
                <span>Nguy cơ trung bình: {medium}</span>
              </div>

              <div className="ai__input__map__indicate--container marginLeft">
                <div className="ai__input__map__indicate--square high"></div>
                <span>Nguy cơ cao: {high}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ai__result">
          <h3 className="pr__title">Kết quả chi tiết</h3>
          <div className="ai__result__list">
            {
              resultData.map((item, index)=>{
                return(
                  <IngredientCard  key={index} levelOfSave={item.levelOfSave} name={item.name} Description = {item.Description}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsIngredient;
