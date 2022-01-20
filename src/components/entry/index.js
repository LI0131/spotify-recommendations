import './index.scss';

import React from 'react';
import * as Actions from '../../actions';
import { connect } from 'react-redux';
import { Button, Stack } from '@patternfly/react-core';
import { getSpotifyRedirectUrl } from '../../utils/Common';
import PropTypes from 'prop-types';
import DataSlider from '../slider';

const Entry = ({ instrumentalness, setInstrumentalness, energy, setEnergy, loudness, setLoudness, popularity, setPopularity }) => {
    const { origin } = window.location;

    return <Stack className='spot-c-entry_stack'>
            <Button
                className='spot-c-entry__rec-button'
                onClick={() => (window.location = getSpotifyRedirectUrl(origin))}
            >
                Get Music Recommendations
            </Button>
        <DataSlider
            title='Instrumentalness'
            sliderValue={instrumentalness}
            setSliderValue={setInstrumentalness}
        />
        <DataSlider
            title='Energy'
            sliderValue={energy}
            setSliderValue={setEnergy}
        />
        <DataSlider
            title='Loudness'
            sliderValue={loudness}
            setSliderValue={setLoudness}
        />
        <DataSlider
            title='Popularity'
            sliderValue={popularity}
            setSliderValue={setPopularity}
        />
    </Stack>;
};

Entry.propTypes = {
    instrumentalness: PropTypes.number,
    setInstrumentalness: PropTypes.func,
    energy: PropTypes.number,
    setEnergy: PropTypes.func,
    popularity: PropTypes.number,
    setPopularity: PropTypes.func,
    loudness: PropTypes.number,
    setLoudness: PropTypes.func
}

export default connect(state => ({
    instrumentalness: state.Reducer.instrumentalness,
    energy: state.Reducer.energy,
    popularity: state.Reducer.popularity,
    loudness: state.Reducer.loudness
}), dispatch => ({
    setInstrumentalness: (val) => dispatch(Actions.setInstrumentalness(val)),
    setEnergy: (val) => dispatch(Actions.setEnergy(val)),
    setPopularity: (val) => dispatch(Actions.setPopularity(val)),
    setLoudness: (val) => dispatch(Actions.setLoudness(val))
}))(Entry);
