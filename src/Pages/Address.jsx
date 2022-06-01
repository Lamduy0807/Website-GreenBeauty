import React, { useEffect, useState } from "react";
import SideMenu from "../Components/MenuProfile/SideMenu";
import { getAddress, getProvince, getDistrict, getWard, postAddress } from "../API/Networking";
import Select from "react-select";
const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isShowAddForm, setIsShowAddForm] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState({name:"", id:""})
  const [selectedDistrict, setSelectedDistrict] = useState({name:"", id:""})
  const [selectedWard, setSelectedWard] = useState({name:"", id:""})
  const [addressData, setAddressData] = useState({
    name:"",
    phone:"",
    fullAddress:"",
  })
  useEffect(() => {
    const id = localStorage.getItem("id");
    const tokens = localStorage.getItem("token");
    getAddress(id, tokens).then((res) => {
      setAddresses(res);
    });
    getProvince().then(res=>{
      res.forEach(element => {
        setProvinces(prev=> [...prev, {value: element.name, id: element.id, label: element.name}])
      });
    })
  }, []);
  const handleChangeCity = (option) =>{
    setSelectedProvince({name: option.value, id: option.id})
    setWards([]);
    setDistricts([]);
    setSelectedDistrict({name:"", id:""})
    setSelectedWard({name:"", id:""})
    getDistrict(option.id).then(res=>{
      res.forEach(element => {
        setDistricts(prev=> [...prev, {value: element.name, id: element.id, label: element.name}])
      });
    })
  }
  const handleChangeDistrict = (option) =>{
    setSelectedDistrict({name: option.value, id: option.id})
    setWards([]);
    setSelectedWard({name:"", id:""})
    getWard(selectedProvince.id, option.id).then(res=>{
      res.forEach(element => {
        setWards(prev=> [...prev, {value: element.name, id: element.id, label: element.name}])
      });
    })
  }
  const handleChangeWard = (option) =>{
    setSelectedWard({name: option.value, id: option.value})
  }
  const handleAddAddress = () =>{
    var defaultAddress;
    if (addresses.length===0)
      defaultAddress = "1";
    else  
      defaultAddress = "0";
    let fullAddress =
      addressData.fullAddress +
      ', ' +
      selectedWard.name +
      ', ' +
      selectedDistrict.name +
      ', ' +
      selectedProvince.name;
      const id = localStorage.getItem("id");
      const tokens = localStorage.getItem("token");
      postAddress(id, tokens, addressData.name, addressData.phone, addressData.fullAddress, fullAddress, defaultAddress)
      .then(res=>{
        console.log(res);
        if(res===201)
          {
            getAddress(id, tokens).then((res) => {
          setAddresses(res);
         });
         setIsShowAddForm(false)
        }
      })
  }

  return (
    <div className="address">
      <div className="address__container">
        <div className="profile__sidemenu">
          <SideMenu />
        </div>
        <div className="address__content">
          <div className="address__content__container">
            <div className="ll__header">
              <h3 className="ll__header__text">Sổ địa chỉ</h3>
            </div>
            <div className="ll__lovelist">
              <div className="address__headerbar">
                <div className="address__headerbar__content address__headerbar__content--fulladd">
                  Địa chỉ chi tiết
                </div>
                <div className="address__headerbar__content address__headerbar__content--name">
                  Tên
                </div>
                <div className="address__headerbar__content address__headerbar__content--phone">
                  Số điện thoại
                </div>
                <div className="address__headerbar__content address__headerbar__content--edit"></div>
              </div>
              {addresses.length === 0 ? (
                <div className="address__noadd">Chưa có địa chỉ</div>
              ) : (
                addresses.map((item, idnex) => {
                  return (
                    <div key={idnex} className="address__detail">
                      <div className="address__detail__container">
                        <div className="address__detail__add">
                          <span className="lp__namecontent--name">
                            {item.fullAddress}
                          </span>
                        </div>
                        <div className="address__detail__name">
                          {item.receiveName}
                        </div>
                        <div className="address__detail__name">
                          {item.phone}
                        </div>
                        <div className="address__detail__btn">
                          <i className="bx bx-edit-alt address__detail__btn--btn"></i>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="address__addaddress">
              <span>Bạn muốn giao đến địa chỉ khác? </span>
              <span className="address__addaddress__btn" onClick={()=> {setIsShowAddForm(true)}} >Thêm địa chỉ mới</span>
            </div>
          </div>
          <div className={isShowAddForm? "address__content" : "displaynone"}>
            <div className="address__content__container">
              <div className="ll__header">
                <h3 className="ll__header__text">Thêm địa chỉ</h3>
              </div>
              <div className="address__addnewcontainer">
                <div className="address__addnewcontainer__left">
                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      Tên:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="Tên"
                         onChange={e=> setAddressData({...addressData, name: e.target.value}) } />
                    </div>
                  </div>

                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      Số điện thoại:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="Số điện thoại"
                         onChange={e=> setAddressData({...addressData, phone: e.target.value}) } />
                    </div>
                  </div>
                </div>
                <div className="address__addnewcontainer__right">
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      Tỉnh/ Thành phố:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui lòng chọn tỉnh/ thành phố" 
                         options={provinces}
                         isDisabled={provinces.length===0}
                         onChange={option => {handleChangeCity(option)}} />
                    </div>
                  </div>
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      Quận/ Huyện:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui lòng chọn quận/ huyện" 
                         options={districts}
                         isDisabled={districts.length===0}
                         onChange={option => {handleChangeDistrict(option)}} 
                         />
                    </div>
                  </div>
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      Phường/ Xã:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui lòng chọn phường/ xã" 
                         options={wards}
                         isDisabled={wards.length===0}
                         onChange={option => {handleChangeWard(option)}} 
                         />
                    </div>
                  </div>

                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      Địa chỉ:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="Địa chỉ"
                         onChange={e=> setAddressData({...addressData, fullAddress: e.target.value}) }/>
                    </div>
                  </div>
                  <div className="address__addnewcontainer__groupbtn">
                    <button onClick={()=> {setIsShowAddForm(false)}} className="button address__addnewcontainer__groupbtn__btn address__addnewcontainer__groupbtn__btn--cancel">Hủy</button>
                    <button onClick={handleAddAddress} className="button address__addnewcontainer__groupbtn__btn address__addnewcontainer__groupbtn__btn--update">Cập nhật</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
