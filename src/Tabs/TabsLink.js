import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  toPane: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: null,
  onClick: null,
};

class TabsLink extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    this.props.onChange(event, this.props.toPane);
  };

  render() {
    const { children, className, onClick, toPane, active, ...attributes } = this.props;

    const linkClasses = cx('nav-link', { active }, className);

    return (
      <li className="nav-item">
        <a
          role="tab"
          href={`#${toPane}`}
          onClick={this.onClick}
          className={linkClasses}
          aria-controls={toPane}
          {...attributes}
        >
          {children}
        </a>
      </li>
    );
  }
}

TabsLink.propTypes = propTypes;
TabsLink.defaultProps = defaultProps;

export default TabsLink;
