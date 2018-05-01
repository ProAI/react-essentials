import React from 'react';
import PropTypes from 'prop-types';
import { RawLink as RouterLink } from 'react-router-dom';
import BaseText from './BaseText';
import BaseView from './BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
  isView: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  external: false,
  onClick: null,
  preventToggle: false,
  keepFocus: false,
  isView: false,
};

class RawLink extends React.Component {
  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.context.onToggle !== undefined && !this.props.preventToggle) {
      this.context.onToggle();
    }

    if (!this.props.keepFocus) {
      this.link.blur();
    }
  };

  render() {
    const {
      to, external, children, preventToggle, keepFocus, isView, ...attributes
    } = this.props;

    const BaseTag = isView ? BaseView : BaseText;

    // action link
    if (!to) {
      return (
        <BaseTag
          {...attributes}
          tag="a"
          role="button"
          tabIndex="0"
          ref={(c) => {
            this.link = c;
          }}
          onKeyPress={/* TODO */ () => {}}
          onClick={this.onClick}
        >
          {children}
        </BaseTag>
      );
    }

    // external link
    if (external) {
      return (
        <BaseTag
          {...attributes}
          tag="a"
          ref={(c) => {
            this.link = c;
          }}
          href={to}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </BaseTag>
      );
    }

    // router link
    return (
      <BaseTag
        {...attributes}
        tag={RouterLink}
        withInnerRef
        to={to}
        onClick={this.onClick}
        innerRef={(c) => {
          this.link = c;
        }}
      >
        {children}
      </BaseTag>
    );
  }
}

RawLink.propTypes = propTypes;
RawLink.defaultProps = defaultProps;
RawLink.contextTypes = contextTypes;

export default RawLink;
