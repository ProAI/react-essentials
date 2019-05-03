import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const defaultProps = {
  titleId: null,
};

class ModalTitle extends React.Component {
  componentDidMount() {
    const { titleId } = this.props;

    this.title.setNativeProps({ id: titleId });
  }

  render() {
    const { titleId, ...elementProps } = this.props;

    return (
      <BaseView
        {...elementProps}
        accessibilityRole="heading"
        aria-level={5}
        ref={element => {
          this.title = element;
        }}
        essentials={{ className: 'modal-title' }}
      />
    );
  }
}

ModalTitle.propTypes = propTypes;
ModalTitle.defaultProps = defaultProps;

export default ModalTitle;
