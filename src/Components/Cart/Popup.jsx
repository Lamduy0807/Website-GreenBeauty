import React from "react";

export const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          OK
        </button>
        {props.children}
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
        <button
          className="addPopupClose-btn"
          onClick={() => props.setTrigger(false)}
        >
          OK
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};
