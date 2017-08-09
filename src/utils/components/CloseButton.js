import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: 'Close',
};

function CloseButton({ onClick, title }) {
  // eslint-disable-next-line max-len
  const closeImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDOTU0MjFFMDQxNjExRTZBQTA3RkRBMDdDMDNENUI4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDOTU0MjFGMDQxNjExRTZBQTA3RkRBMDdDMDNENUI4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkM5NTQyMUMwNDE2MTFFNkFBMDdGREEwN0MwM0Q1QjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkM5NTQyMUQwNDE2MTFFNkFBMDdGREEwN0MwM0Q1QjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6K47K5AAAAYklEQVR42mL8//8/AyWAiYFCADeAkZHxPxCnEdIAUgNSCxcAeQHqDZBmECMNJoaOsakhqICQHHG24DOYkFMJeY2BCP/iDReKo5H6XqAoECmKRooTEiHN6IbA+IwDnhsBAgwAy9Fh9mPLmD8AAAAASUVORK5CYII=';

  return (
    <button type="button" onClick={onClick} className="close" aria-label={title}>
      <img src={closeImage} alt="" aria-hidden="true" />
    </button>
  );
}

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
