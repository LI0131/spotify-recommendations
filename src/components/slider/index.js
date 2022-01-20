import './index.scss';

import React from 'react';
import { Slider, Text, TextVariants, StackItem } from '@patternfly/react-core';


const DataSlider = ({ title, sliderValue, setSliderValue }) => {

    const discreteSteps = [...Array(1).keys()].map((index) => ({
        label: '',
        value: ((index + 1) / 10) * 100
    }));

    return <StackItem className='spot-c-data-slider'>
        <Text className='spot-c-data-slider_title' component={TextVariants.h2}>
            {title}:
        </Text>
        <Slider
            className='spot-c-data-slider_slider'
            value={sliderValue}
            onChange={setSliderValue}
            areCustomStepsContinuous
            customSteps={discreteSteps}
        />
    </StackItem>;
};

export default DataSlider;
