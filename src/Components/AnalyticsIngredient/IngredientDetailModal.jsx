import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Context/ModelContext/ModalContext";

const IngredientDetailModal = () => {
  const { data, showModal, setShowModal } = useContext(ModalContext);
  const [classname, setClassname] = useState("");

  useEffect(() => {
    if (data.levelOfSave >= 4)
      setClassname("IngredientCard__point__container--low");
    if (data.levelOfSave === 3)
      setClassname("IngredientCard__point__container--medium");
    if (data.levelOfSave < 3)
      setClassname("IngredientCard__point__container--high");
  }, [data]);
  return (
    <>
      {showModal ? (
        <div className="ai__modal displayflex">
          <div className="ai__modal__container">
            <div className="ai__modal__head">
              <div className="IngredientCard__point">
                <div
                  className={"IngredientCard__point__container " + classname}
                >
                  <span className="marginAuto">{data.levelOfSave}</span>
                </div>
              </div>
              <div className="IngredientCard__Name">
                <h3 className="IngredientCard__Name__h3">{data.name}</h3>
              </div>
            </div>
            <div className="ai__modal__body">
              <p className="ai__modal__body__p">{data.Description}</p>
            </div>
            <div className="ai__modal__footer">
              <div className="ai__modal__footer__btn "
              onClick={()=> {setShowModal(prev=>!prev)}}>
                  Đóng
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default IngredientDetailModal;
