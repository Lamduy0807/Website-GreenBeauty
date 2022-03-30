import React, { useContext,  useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { UserContext } from "../Context/UserContext/UserContext";
import { putUpdateUserInformation } from "../API/Networking";
const UpdateInformation = () => {
  const {showUpdate, setShowUpdate, userData, token, getUserInfor} = useContext(UserContext);
  const sexData = [{ name: "Male" }, { name: "Female" }];
  const [checked, setChecked] = useState();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const handleUpdate = () =>{
    try{
      putUpdateUserInformation(userData.id, token, userData.email, name, phoneNumber, checked, convert(birthDay)).then(re=>{
        if(re===200)
        {
          setShowUpdate(prev=>!prev);
          getUserInfor();
          alert("Update thành công")
        }
        else
        {
          alert("Vui lòng thử lại!")
        }
      })
    }catch(error){
      console.log(`Error is  ${error}`);
    }
  }
  const convert = (str) =>{
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [ date.getFullYear(),mnth, day].join("-");
  }
  return (
    <>
      {showUpdate ? (
        <div className="register">
          <div className="register__container">
            <div className="register__container__exit"
            onClick={()=> setShowUpdate(prev=> !prev)}>
              <i class="bx bx-x"></i>
            </div>

            <form className="register__form">
              <h1 className="register__form__h1">Please update your information</h1>

              <div className="register__form__realtive">
                <input
                  className="register__form__input"
                  placeholder="Nhập họ tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <i class="bx bx-user-pin register__form__i"></i>
              </div>

              <div className="register__form__realtive">
                <input
                  className="register__form__input"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <i class="bx bx-mobile register__form__i"></i>
              </div>

              <div className="register__form__birthday">
                  <DatePickerComponent placeholder="Chọn ngày sinh"
                  onChange={(e) => setBirthDay(e.target.value)}
                  ></DatePickerComponent>
              </div>

              <div className="register__form__checkbox">
                  Giới tính: 
                {sexData.map((item, index) => (
                  <div key={index} className="register__form__checkbox--cb">
                    <input
                      type="radio"
                      className="register__form__checkbox--cb--input"
                      checked={checked === item.name}
                      onChange={() => setChecked(item.name)}
                    />
                    {item.name}
                  </div>
                ))}
              </div>

              <div className="register__form__button">
                <div className="register__form__button--btn"
                onClick={handleUpdate}>Cập nhật thông tin</div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateInformation;
