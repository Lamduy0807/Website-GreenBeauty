export const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={"ButtonSlider next"} onClick={onClick}>
        <i className="bx bx-chevron-right"></i>
      </div>
    );
  };

  export const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={"ButtonSlider prev"} onClick={onClick}>
        <i className="bx bx-chevron-left"></i>
      </div>
    );
  };
  export const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };