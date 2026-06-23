import { useState } from 'react'
import Slider from 'react-slider'
import "./priceSlider.css"

const PriceSlider = ({priceRange, values, onChangeValue}) => {
    return (
        <div className='w-100'>
            <label><b>Rango de precio</b></label>
            <Slider
                className="slider"
                value={values}
                onChange={onChangeValue}
                min={priceRange[0]}
                max={priceRange[1]}
            />
            <div className='d-flex justify-content-between'>
                <label className='mt-2'>${values[0]}</label>
                <label className='mt-2'>${values[1]}</label>
            </div>
        </div>
    );
}

export default PriceSlider