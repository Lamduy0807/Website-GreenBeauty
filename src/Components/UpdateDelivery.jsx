import React, { useContext,  useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext/UserContext";
import Select from "react-select";
import { getAddress, getProvince, getDistrict, getWard, postAddress } from "../API/Networking";
const UpdateDelivery = () => {
const {showUpdateDelivery, setShowUpdateDelivery } = useContext(UserContext);
const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({name:"", id:""})
  const [selectedDistrict, setSelectedDistrict] = useState({name:"", id:""})
  const [selectedWard, setSelectedWard] = useState({name:"", id:""})
  const [addressData, setAddressData] = useState({
    name:"",
    phone:"",
    fullAddress:"",
  })
  useEffect(() => {
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
      postAddress(id, tokens, addressData.name, addressData.phone, addressData.fullAddress, fullAddress, "1")
      .then(res=>{
        console.log(res);
        if(res===201)
          {
            setShowUpdateDelivery(false)
        }
      })
  }
  return (
    <>
      {showUpdateDelivery ? (
        <div className="register">
          <div className="register__container1">
            <form className="register__form">
              <h1 className="register__form__h1">Please update your delivery information</h1>
              <div className={"address__content"}>
            <div className="address__content__container">
              <div className="ll__header">
                <h3 className="ll__header__text">Th??m ?????a ch???</h3>
              </div>
              <div className="address__addnewcontainer">
                <div className="address__addnewcontainer__left">
                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      T??n:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="T??n"
                         onChange={e=> setAddressData({...addressData, name: e.target.value}) } 
                         />
                    </div>
                  </div>

                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      S??? ??i???n tho???i:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="S??? ??i???n tho???i"
                         onChange={e=> setAddressData({...addressData, phone: e.target.value}) } 
                         />
                    </div>
                  </div>
                </div>
                <div className="address__addnewcontainer__right">
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      T???nh/ Th??nh ph???:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui l??ng ch???n t???nh/ th??nh ph???" 
                         options={provinces}
                         isDisabled={provinces.length===0}
                         onChange={option => {handleChangeCity(option)}} 
                         />
                    </div>
                  </div>
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      Qu???n/ Huy???n:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui l??ng ch???n qu???n/ huy???n" 
                         options={districts}
                         isDisabled={districts.length===0}
                         onChange={option => {handleChangeDistrict(option)}} 
                         />
                    </div>
                  </div>
                  <div className="address__addnewcontainer__form address__addnewcontainer__form--right">
                    <div className="address__addnewcontainer__form__text">
                      Ph?????ng/ X??:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <Select className="address__addnewcontainer__form__input"
                         placeholder="Vui l??ng ch???n ph?????ng/ x??" 
                         options={wards}
                         isDisabled={wards.length===0}
                         onChange={option => {handleChangeWard(option)}} 
                         />
                    </div>
                  </div>

                  <div className="address__addnewcontainer__form">
                    <div className="address__addnewcontainer__form__text">
                      ?????a ch???:
                    </div>
                    <div className="address__addnewcontainer__form__input">
                        <input className="address__addnewcontainer__form__input--input"
                         placeholder="?????a ch???"
                         onChange={e=> setAddressData({...addressData, fullAddress: e.target.value})}
                         />
                    </div>
                  </div>
                  <div className="address__addnewcontainer__groupbtn">
                    <button onClick={handleAddAddress} className="button address__addnewcontainer__groupbtn__btn address__addnewcontainer__groupbtn__btn--update">C???p nh???t</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UpdateDelivery