import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../Components/MenuProfile/SideMenu";
import {
  getUserInformation,
  putUserInformation,
  putUpdateUserInformation,
} from "../API/Networking";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { UserContext } from "../Context/UserContext/UserContext";
const Profile = () => {
  const { getUserInfor } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    avt: "",
    sex: "",
    dateofbirth: "",
  });
  const [avatar, setAvatar] = useState();
  const sexData = [{ name: "Male" }, { name: "Female" }];
  const [checked, setChecked] = useState();
  useEffect(() => {
    getUserInforMation();
  }, []);
  const getUserInforMation = () => {
    try {
      const id = localStorage.getItem("id");
      const tokens = localStorage.getItem("token");
      if (id > 0)
        getUserInformation(id, tokens).then((res) => {
          setUserData(res);
          setChecked(res.sex);
        });
    } catch (error) {
      console.log(`Error is ${error}`);
    }
  };
  const handleUpdateFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserData({ ...userData, avt: reader.result });
      }
    };
    setAvatar(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleUpdateInformation = () => {
    const ids = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (avatar === undefined)
      putUpdateUserInformation(
        ids,
        token,
        userData.email,
        userData.name,
        userData.phone,
        checked,
        convert(userData.dateofbirth)
      ).then((res) => {
        if (res === 200) window.location.reload();
      });
    else
      putUserInformation(
        ids,
        token,
        userData.email,
        userData.name,
        userData.phone,
        checked,
        convert(userData.dateofbirth),
        avatar
      ).then((res) => {
        if (res === 200) window.location.reload();
      });
    getUserInfor();
  };

  const convert = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__sidemenu">
          <SideMenu />
        </div>
        <div className="profile__content">
          <div className="profile__content__container">
            <div className="profile__content__header ">
              <h3 className="marginBottom">Hồ sơ cá nhân</h3>
              <span>Chỉnh sửa trang cá nhân để bảo mật tài khoản</span>
            </div>
            <div className="profile__content__body">
              <div className="profile__content__infor">
                <div className="profile__content__infor--row marginBottom2">
                  <div className="profile__content__infor--row--left">
                    <span>Email</span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <span>{userData.email}</span>
                  </div>
                </div>

                <div className="profile__content__infor--row marginBottom2">
                  <div className="profile__content__infor--row--left">
                    <span>Họ và tên</span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <div className="register__form__realtive">
                      <input
                        className="profile__content__input"
                        placeholder="Nhập họ tên"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="profile__content__infor--row marginBottom2">
                  <div className="profile__content__infor--row--left">
                    <span> Số điện thoại</span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <div className="register__form__realtive">
                      <input
                        className="profile__content__input"
                        placeholder="Nhập số điện thoại"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="profile__content__infor--row marginBottom2">
                  <div className="profile__content__infor--row--left">
                    <span>Giới tính</span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <div className="register__form__realtive displayflex alignItem">
                      {sexData.map((item, index) => (
                        <div
                          key={index}
                          className="register__form__checkbox--cb"
                        >
                          <input
                            type="radio"
                            className="profile__content__infor__checkbox marginRight-5"
                            checked={checked === item.name}
                            onChange={() => setChecked(item.name)}
                          />
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="profile__content__infor--row marginBottom2">
                  <div className="profile__content__infor--row--left">
                    <span>Ngày sinh</span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <div className="register__form__birthday">
                      <DatePickerComponent
                        placeholder="Chọn ngày sinh"
                        value={userData.dateofbirth}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            dateofbirth: e.target.value,
                          })
                        }
                      ></DatePickerComponent>
                    </div>
                  </div>
                </div>

                <div className="profile__content__infor--row">
                  <div className="profile__content__infor--row--left">
                    <span> </span>
                  </div>
                  <div className="profile__content__infor--row--right">
                    <button
                      onClick={handleUpdateInformation}
                      className="button profile__btn"
                    >
                      Lưu thông tin
                    </button>
                  </div>
                </div>
              </div>
              <div className="profile__content__avt">
                <div className="profile__content__avt__container">
                  <div className="profile__content__avt--img">
                    <img
                      className="profile__content__avt--img--content"
                      src={userData.avt}
                    />
                  </div>
                  <label
                    htmlFor="upload-photo"
                    className="button profile__btn marginBottom2 marginTop"
                  >
                    Chọn ảnh
                  </label>
                  <input
                    //className="button profile__btn marginBottom2 marginTop"
                    type="file"
                    id="upload-photo"
                    onChange={handleUpdateFile}
                  ></input>
                  <span>Dung lượng tối đa 1 MB</span>
                  <span>Định dạng ảnh: .JPG, .PNG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
