import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext/UserContext';
const SideMenu = () => {
  const {userName, userAvt} = useContext(UserContext);
  const activeStyle = {
    color: 'rgb(255, 85, 1)',
  }
  return (
    <div className='sm'>
        <div className='sm__container'>
          <div className="sm__infor">
            <div className="sm__infor__avt marginRight">
              <img className='sm__infor__img' src={userAvt}/>
            </div>
            <div className="sm__infor__name">
                Hi {userName}
            </div>
          </div>
          <NavLink activeStyle={activeStyle} className='sm__nav' to='/profile'>
          <i class='bx bxs-user marginRight'></i>
            Hồ sơ cá nhân
          </NavLink>

          <NavLink activeStyle={activeStyle} className='sm__nav' to='/order-manage'>
          <i class='bx bxs-cart-download marginRight'></i>
            Quản lý đơn hàng
          </NavLink>

          <NavLink activeStyle={activeStyle} className='sm__nav' to='/product-love'>
          <i class='bx bxs-heart marginRight' ></i>
            Sản phẩm yêu thích
          </NavLink>

          <NavLink activeStyle={activeStyle} className='sm__nav' to='/address'>
          <i class='bx bxs-envelope marginRight' ></i>
            Quản lý địa chỉ
          </NavLink>
        </div>
    </div>
  )
}

export default SideMenu