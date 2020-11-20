import './index.scss'

import React from 'react';
import { TextContent, Text } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Header = ({ actions }) => {

    const history = useHistory();

    return <div className='spot-c-header'>
        <TextContent className='spot-c-header-title' onClick={() => history.push('/')}>
            <Text component='h1'> Spotify Suggests </Text>
        </TextContent>
        {actions && actions.map(actionObj => {
            return actionObj?.title && <actionObj.title
                className={actionObj?.className}
                {...actionObj?.props}
            >
                {actionObj?.label}
            </actionObj.title>
        })}
    </div>;
};

Header.propTypes = {
    actions: PropTypes.array
}

export default Header;
