import React, { PropTypes } from 'react';
// import closeImage from './close.png';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

function CloseButton({ onClick }) {
  const closeImage = '';

  return (
    <button type="button" onClick={onClick} className="close">
      <img src={closeImage} role="presentation" />
    </button>
  );
}

CloseButton.propTypes = propTypes;

export default CloseButton;
