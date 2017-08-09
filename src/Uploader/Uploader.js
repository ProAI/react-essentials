import React from 'react';
import PropTypes from 'prop-types';
import FileListItem from './FileListItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  upload: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['list', 'thumbs', 'list-thumbs']),
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  onRemove: PropTypes.func,
  onCompleted: PropTypes.func,
  onError: PropTypes.func,
};

const defaultProps = {
  variant: 'list',
  multiple: false,
  accept: null,
  onRemove: null,
  onCompleted: null,
  onError: null,
};

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.fileUpload = null;

    this.state = {
      uploads: {},
      lastId: 0,
    };
  }

  onTriggerClick = (e) => {
    if (!this.fileInput) return;

    e.target.blur();

    this.fileInput.click();
  };

  onTriggerKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onTriggerClick(e);
    }
  };

  onFileRemove = (e, id) => {
    e.preventDefault();

    // call custom onRemove function
    if (this.props.onRemove) {
      this.props.onRemove(this.state.uploads[id].file);
    }

    // set timeout, so animation could run first
    setTimeout(() => {
      const uploads = this.state.uploads;
      if (uploads[id]) {
        delete uploads[id];
        this.setState({ uploads });
      }
    }, 200);
  };

  onChange = (e) => {
    const newUploads = {};
    const lastId = this.state.lastId;
    for (let i = 0; i < e.target.files.length; i += 1) {
      const id = i + 1 + lastId;
      const file = e.target.files[i];

      newUploads[id] = {
        status: 'uploading',
        error: null,
        file,
      };
    }

    // add new files to state and update last id
    this.setState({
      uploads: Object.assign({}, newUploads, this.state.uploads),
      lastId: lastId + e.target.files.length,
    });

    // process upload after setting state to prevent race conditions
    for (let i = 0; i < e.target.files.length; i += 1) {
      const id = i + 1 + lastId;
      const file = e.target.files[i];

      this.props.upload(file).then(
        // upload successful
        () => {
          // make sure upload file is still in list after async action
          if (!this.state.uploads[id]) return;

          // call custom onCompleted function
          if (this.props.onCompleted) {
            this.props.onCompleted(file);
          }

          this.setState({
            uploads: Object.assign({}, this.state.uploads, {
              [id]: {
                status: 'completed',
                error: null,
                file,
              },
            }),
          });
        },
        // upload fails
        (error) => {
          // make sure upload file is still in list after async action
          if (!this.state.uploads[id]) return;

          // call custom onError function
          if (this.props.onError) {
            this.props.onError(file, error);
          }

          this.setState({
            uploads: Object.assign({}, this.state.uploads, {
              [id]: {
                status: 'error',
                error,
                file,
              },
            }),
          });
        },
      );
    }

    // empty the input to accept new upload(even same)
    e.target.value = '';
    if (!/safari/i.test(navigator.userAgent)) {
      e.targetput.type = '';
      e.target.type = 'file';
    }
  };

  render() {
    const { variant, multiple, accept, children } = this.props;

    return (
      <div className="uploader">
        <input
          type="file"
          ref={(fileInput) => {
            this.fileInput = fileInput;
          }}
          style={{ display: 'none' }}
          multiple={multiple}
          accept={accept}
          onChange={this.onChange}
        />
        <button
          tabIndex={0}
          type="button"
          onClick={this.onTriggerClick}
          onKeyDown={this.onTriggerKeyDown}
          className="btn btn-secondary uploader-control"
        >
          {children}
        </button>
        <div className={`uploader-file-list ${variant}`}>
          {Object.keys(this.state.uploads)
            .reverse()
            .map(id =>
              (<FileListItem
                key={id}
                status={this.state.uploads[id].status}
                file={this.state.uploads[id].file}
                onRemove={e => this.onFileRemove(e, id)}
              />),
            )}
        </div>
      </div>
    );
  }
}

Uploader.propTypes = propTypes;
Uploader.defaultProps = defaultProps;

export default Uploader;
