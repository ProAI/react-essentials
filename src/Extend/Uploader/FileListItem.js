import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../Components/Spinners/Spinner';
import { formatFileSize } from '../../utils';
import { BaseTouchable } from '../../utils/components';

const STATUS = ['ready', 'uploading', 'completed', 'error'];

const propTypes = {
  status: PropTypes.oneOf(STATUS).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  file: PropTypes.object.isRequired,
  // onRemove: PropTypes.func.isRequired,
};

class FileListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };

    // Define some variables that need some computation here, so that the
    // render method is small. That's helpful, because of the progress bar the
    // render method will be called quite often.
    this.fileSize = formatFileSize(props.file.size);
    this.fileIsImage = props.file.type.split('/')[0] === 'image';
    this.filePreviewUrl = (window.URL || window.webkitURL).createObjectURL(
      props.file,
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;

    return (
      props.status !== nextProps.status || state.progress !== nextState.progress
    );
  }

  componentWillUpdate(nextProps) {
    const { props } = this;

    // trigger progress bar complete animation
    if (props.status === 'uploading' && nextProps.status === 'completed') {
      this.completeProgressBar();
    }

    // trigger progress bar error state
    if (nextProps.status === 'error') {
      this.setProgressBarToErrorState();
    }
  }

  componentWillUnmount() {
    // we need to revoke each object url
    (window.URL || window.webkitURL).revokeObjectURL(this.filePreviewUrl);
  }

  onRemove = e => {
    const { props } = this;

    this.item.style.transition = 'opacity .4s ease';
    this.item.style.opacity = 0;

    props.onRemove(e);
  };

  setProgressBarToErrorState = () => {
    this.setState({
      progress: 0.75,
    });
  };

  completeProgressBar = () => {
    const { state } = this;

    const id = setInterval(() => {
      if (state.progress >= 1) {
        clearInterval(id);
      } else {
        this.setState({
          progress: state.progress + 0.05,
        });
      }
    }, 20);
  };

  render() {
    const { status, file } = this.props;
    const { progress } = this.state;

    const showLoadingIndicator =
      status === 'uploading' || (status === 'completed' && progress < 1);
    const showProgressBar =
      status === 'uploading' ||
      status === 'error' ||
      (status === 'completed' && progress < 1);
    const showRemoveButton =
      status === 'error' || (status === 'completed' && progress >= 1);

    return (
      <div
        className="uploader-file-list-item"
        ref={item => {
          this.item = item;
        }}
      >
        <div className="uploader-file-preview">
          {this.fileIsImage && (
            <img
              className="uploader-file-preview-image"
              src={this.filePreviewUrl}
              alt={file.name}
            />
          )}
        </div>
        <div className="uploader-file-description">
          {showLoadingIndicator && <Spinner color="#444" width={16} />}
          {file.name} ({this.fileSize})
          {status === 'error' && <span className="error-message">- Error</span>}
          {showRemoveButton && (
            <BaseTouchable tabIndex={0} onClick={this.onRemove} />
          )}
        </div>
        <div
          className={`uploader-file-progressbar ${
            showProgressBar ? 'active' : null
          }`}
        >
          {showProgressBar && (
            <div
              style={{
                width: `${(progress * 100).toString()}%`,
              }}
              className={`uploader-file-progressbar-status ${
                status === 'error' ? 'error' : null
              }`}
            />
          )}
        </div>
      </div>
    );
  }
}

FileListItem.propTypes = propTypes;

export default FileListItem;
