import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
const Icon = ({size, color, style, resizeMode, path}) => {
  return (
    <Image
      resizeMode={resizeMode}
      style={[{width: size, height: size}, style]}
      source={path}
      tintColor={color}
    />
  );
};

Icon.defaultProps = {
  name: 'menu',
  size: 22,
  color: '#fff',
  style: {},
  resizeMode: 'center',
};
Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  resizeMode: PropTypes.string,
};

export default Icon;
