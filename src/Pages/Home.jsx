import React from 'react';
import Banner from '../Components/Home/Banner';
import Deals from '../Components/Home/Deals';
import ProductRecommend from '../Components/Home/ProductRecommend';
import CategoriesDisplayComponent from '../Components/Home/CategoriesDisplayComponent';
import CategoriesList from '../Components/Home/CategoriesList';
const Home = () => {
  return (
  <div>
    <Banner/>
    <CategoriesList/>
    <Deals/>
    <CategoriesDisplayComponent id={12} title="Sửa rửa mặt" link='/categories/12/sua-rua-mat'/>
    <CategoriesDisplayComponent id={11} title="Tẩy trang" link='/categories/11/tay-trang'/>
    <CategoriesDisplayComponent id={14} title="Kem chống nắng" link='/categories/14/kem-chong-nang'/>
    <CategoriesDisplayComponent id={13} title="Toner" link='/categories/13/toner'/>
    <CategoriesDisplayComponent id={15} title="Dưỡng môi" link='/categories/15/duong-moi'/>
    <ProductRecommend/>
  </div>
  )
};

export default Home;
