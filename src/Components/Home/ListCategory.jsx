import React from 'react'
import { Link } from 'react-router-dom'

const ListCategory = () => {
  return (
    <div className='lc'>
        <div className="lc__container">
            <div className="lc__list">
                <div className="lc__list__deal">
                    <Link className='lc__link'>
                        <span className='lc__list__img'>
                            <img className='lc__list__img--img' src={'https://hasaki.vn/img/hsk/icon/deals.svg'}/>
                        </span>
                        <div className="lc__list__title">Deals</div>
                    </Link>
                </div>
                <div className="lc__list__special">
                    <Link className='lc__link'>
                        <span className='lc__list__img'>
                            <img className='lc__list__img--img' src={'https://hasaki.vn/img/hsk/icon/special.svg'}/>
                        </span>
                        <div className="lc__list__title">Top</div>
                    </Link>
                </div>
                <div className="lc__list__freeship">
                    <Link className='lc__link'>
                        <span className='lc__list__img'>
                            <img className='lc__list__img--img' src={'https://hasaki.vn/img/hsk/icon/now-free.svg'}/>
                        </span>
                        <div className="lc__list__title">FreeShip</div>
                    </Link>
                </div>
                <div className="lc__list__fs">
                    <Link className='lc__link'>
                        <span className='lc__list__img'>
                            <img className='lc__list__img--img' src={'https://hasaki.vn/img/hsk/icon/flash-deal.svg'}/>
                        </span>
                        <div className="lc__list__title">Flashsale</div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListCategory