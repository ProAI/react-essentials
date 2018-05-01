import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

class Card extends React.Component {
  static Body = CardBody;
  static Footer = CardFooter;
  static Header = CardHeader;

  render() {
    const { children, className, ...attributes } = this.props;
    const classes = cx('card', className);

    return (
      <div {...attributes} className={classes}>
        {children}
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
