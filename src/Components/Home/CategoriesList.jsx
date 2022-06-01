import React, { useEffect, useState } from 'react'
import Grid from '../Grid'
import { Link } from 'react-router-dom'
import { getAllCategory } from '../../API/Networking'
import { toSlug } from '../../Function/Function'
const CategoriesList = () => {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getAllCategory().then(res=>{
            setCategories(res);
        })
    },[])

  const Cate = (props) =>{
      return(
          <Link to={'/categories/'+ props.id + '/'+toSlug(props.name)} className="catelist__cate">
              <img className="catelist__cate__img" src={props.src}/>
              <div className="catelist__cate__name">{props.name}</div>
          </Link>
      )
  }  
  return (
    <div className='catelist'>
        <div className="catelist__container">
            <div className="catelist__header">
                <h2 className='catelist__header__h3'>Danh mục bạn quan tâm</h2>
            </div>
            <div className="catelist__grid">
                <Grid col={8} mdCol={2} smCol={1} gap={10}>
                    {
                        categories.slice(0, categories.length-1).map((item, index)=>{
                            return(
                                <Cate key={index} id={item.id} src={item.imagecategory} name={item.name}/>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    </div>
  )
}

export default CategoriesList