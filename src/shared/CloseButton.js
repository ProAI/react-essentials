import React, { PropTypes } from 'react';
// import closeImage from './close.png';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

function CloseButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="close">
      <img src="/close.png" role="presentation" />
    </button>
  );
}

CloseButton.propTypes = propTypes;

export default CloseButton;
