import React from "react";

export const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner" >
        {props.children}
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          OK
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export const PopupAddProductToCart = (props) => {
  return props.trigger ? (
    <div className="addPopup">
      <div className="addPopup-inner">
     
        {props.children}

        <button
          className="addPopupClose-btn"
          onClick={() => props.setTrigger(false)}
        >
          OK
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};
