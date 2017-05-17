import React from 'react';
import PropTypes from 'prop-types';
import GeminiScrollbar from 'gemini-scrollbar';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  autoShow: PropTypes.bool,
  forceCustom: PropTypes.bool,
};

const defaultProps = {
  className: null,
  style: null,
  autoShow: false,
  forceCustom: false,
};

class Scrollbars extends React.Component {
  componentDidMount() {
    this.scrollbar = new GeminiScrollbar({
      element: this.container,
      autoshow: this.props.autoShow,
      forceGemini: this.props.forceCustom,
      createElements: false,
    }).create();
  }

  componentDidUpdate() {
    this.scrollbar.update();
  }

  componentWillUnmount() {
    if (this.scrollbar) {
      this.scrollbar.destroy();
    }
    this.scrollbar = null;
  }

  /**
   * Holds the reference to the GeminiScrollbar instance.
   * @property scrollbar <public> [Object]
   */
  scrollbar = null;

  render() {
    const { className, children, style } = this.props;

    return (
      <div
        className={className}
        style={style}
        ref={(c) => {
          this.container = c;
        }}
      >
        <div className="gm-scrollbar -vertical">
          <div className="thumb" />
        </div>
        <div className="gm-scrollbar -horizontal">
          <div className="thumb" />
        </div>
        <div className="gm-scroll-view">
          {children}
        </div>
      </div>
    );
  }
}

Scrollbars.propTypes = propTypes;
Scrollbars.defaultProps = defaultProps;

export default Scrollbars;
