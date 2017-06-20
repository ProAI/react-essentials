import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CardBlock from './CardBlock';
import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CardSubtitle from './CardSubtitle';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

class Card extends React.Component {
  static Block = CardBlock;
  static Footer = CardFooter;
  static Header = CardHeader;
  static Subtitle = CardSubtitle;

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
