import React, { useEffect, useState, useContext } from 'react'
import { ModalContext } from '../../Context/ModelContext/ModalContext';
const IngredientCard = (props) => {
  
  useEffect(() => {
    if(props.levelOfSave>=4)
      setClassname('IngredientCard__point__container--low')
    if(props.levelOfSave===3)
      setClassname('IngredientCard__point__container--medium')
    if(props.levelOfSave<3)
      setClassname('IngredientCard__point__container--high')
  }, []);

  const [classname, setClassname] = useState('')
  const {data, setData, setShowModal} = useContext(ModalContext);
  return (
    <div className='IngredientCard'>
        <div className="IngredientCard__container">
            <div className="IngredientCard__point">
              <div className={"IngredientCard__point__container "+ classname}>
                <span className="marginAuto">{props.levelOfSave}</span>
              </div>
            </div>
            <div className="IngredientCard__Name">
                <h3 className='IngredientCard__Name__h3'>{props.name}</h3> 
            </div>
            <div className="IngredientCard__description">
                <span className='IngredientCard__description__text'>
                  {props.Description}
                </span>
                <button onClick={()=>{
                  setShowModal(prev=>!prev);
                  setData({
                    ...data,
                    levelOfSave: props.levelOfSave,
                    name: props.name,
                    Description: props.Description
                  })
                }} 
                className='button IngredientCard__description__button'>Xem chi tiết</button>
            </div>
        </div>
    </div>
  )
}

export default IngredientCard