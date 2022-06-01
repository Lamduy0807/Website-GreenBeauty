import React, { useState, useEffect } from "react";
import { RatingItem } from "./RatingItem";

const Rating =({id})=>{
    return (
        <div style={{ backgroundColor: "#fff", marginTop: 10, paddingTop:12, paddingLeft:20 }}>
          <h4 style={{color:'black'}}>Đánh giá</h4>
          <h4 style={{color:'black', fontWeight:'400', fontSize:15, paddingTop:16}}>Đánh giá trung bình</h4>
          <div style={{display:'flex'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <h1>4.5</h1>
          <h4 style={{color:'black', fontWeight:'400', fontSize:15}}>32 nhận xét</h4>
          </div>
          <div style={{display:'flex', marginLeft:40, }}>
              <div>
                  <h4>5 sao</h4>
                  <h4>4 sao</h4>
                  <h4>3 sao</h4>
                  <h4>2 sao</h4>
                  <h4>1 sao</h4>
              </div>
              <div style={{marginLeft:20, marginRight:20}}> 
                  <div>------------</div>
                  <div>------------</div>
                  <div>------------</div>
                  <div>------------</div>
                  <div>------------</div>

              </div>
              <div style={{marginRight:28}}>
                  <div>0</div>
                  <div>0</div>
                  <div>0</div>
                  <div>0</div>
                  <div>0</div>
              </div>
              <div style={{marginRight:140}}>
                  <div>Rất hài lòng</div>
                  <div>Hài lòng</div>
                  <div>Bình thường</div>
                  <div>Không hài lòng</div>
                  <div>Rất tệ</div>
              </div>
          </div>
          <div>
          <h4 style={{color:'black', fontWeight:'400', fontSize:15}}>Chia sẻ nhận xét của bạn về sản phẩm này</h4>
          <button style={{color:'black', fontWeight:'400', fontSize:15}}>Viết bình luận</button>


          </div>
          </div>
          <div style={{display:'flex'}}>
          <h4 style={{color:'black', fontWeight:'400', fontSize:15}}>32 bình luận cho sản phẩm ngày</h4>

          </div>

          <RatingItem id={id}/>
        </div>
    )
}

export default Rating