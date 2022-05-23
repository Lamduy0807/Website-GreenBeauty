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
    <CategoriesDisplayComponent id={12} title="Sửa rửa mặt" link='/'/>
    <CategoriesDisplayComponent id={11} title="Tẩy trang" link='/'/>
    <CategoriesDisplayComponent id={14} title="Kem chống nắng" link='/'/>
    <CategoriesDisplayComponent id={13} title="Toner" link='/'/>
    <CategoriesDisplayComponent id={15} title="Dưỡng môi" link='/'/>
    <ProductRecommend/>
  </div>
  )
};

export default Home;
