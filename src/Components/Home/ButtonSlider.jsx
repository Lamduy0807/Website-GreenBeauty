import React from 'react'

const ButtonSlider = ({moveSlide, direction}) => {

    const left = <i class='bx bx-chevron-left' ></i>
    const right = <i class='bx bx-chevron-right' ></i>
  return (
    <button 
    onClick={moveSlide}
    className={direction === 'next'? 'ButtonSlider next' : 'ButtonSlider prev'}>
        {direction === 'next'? right : left}
    </button>
  )
}

export default ButtonSlider