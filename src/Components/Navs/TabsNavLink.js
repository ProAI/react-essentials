import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  toPane: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  active: PropTypes.bool,
};

const defaultProps = {
  onClick: null,
  onChange: null,
  active: null,
};

class TabsNavLink extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    this.props.onChange(this.props.toPane, event);
  };

  render() {
    const {
      children, onClick, toPane, active, ...otherProps
    } = this.props;

    const linkClasses = cx(
      // constant classes
      'nav-link',
      // variable classes
      active && 'active',
    );

    return (
      <li className="nav-item">
        <a
          {...otherProps}
          role="tab"
          href={`#${toPane}`}
          onClick={this.onClick}
          className={linkClasses}
          aria-controls={toPane}
        >
          {children}
        </a>
      </li>
    );
  }
}

TabsNavLink.propTypes = propTypes;
TabsNavLink.defaultProps = defaultProps;

export default TabsNavLink;
