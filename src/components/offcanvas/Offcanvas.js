import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import findNodeHandle from 'react-native-web/dist/cjs/exports/findNodeHandle';
import OffcanvasContext from './OffcanvasContext';
import OffcanvasBody from './OffcanvasBody';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasTitle from './OffcanvasTitle';
import { PLACEMENTS } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';
import useModal from '../../hooks/useModal';
import concatRefs from '../../utils/concatRefs';

const propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PLACEMENTS),
  visible: PropTypes.bool.isRequired,
  backdrop: PropTypes.bool,
  scroll: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

const Offcanvas = React.forwardRef((props, ref) => {
  const {
    placement = 'top',
    visible,
    backdrop = true,
    scroll = false,
    onToggle,
    ...elementProps
  } = props;

  const modal = useModal(visible, onToggle, { keepBodyScroll: scroll });

  // Return null if not mounted.
  if (!modal.mounted || !modal.visible) {
    return null;
  }

  const classes = cx(
    // constant classes
    'offcanvas',
    `offcanvas-${placement}`,
    'show',
  );

  const offcanvasElement = (
    <OffcanvasContext.Provider value={modal} key="offcanvas">
      <BaseView
        {...elementProps}
        ref={concatRefs((element) => {
          modal.ref.current = findNodeHandle(element);
        }, ref)}
        accessible
        accessibilityRole="dialog"
        aria-labelledby={modal.identifier}
        aria-modal="true"
        onKeyUp={(event) => {
          if (event.key !== 'Escape') {
            return;
          }

          event.preventDefault();

          modal.setVisible(false);
        }}
        essentials={{ className: classes }}
      />
    </OffcanvasContext.Provider>
  );

  if (!backdrop) {
    return ReactDOM.createPortal(offcanvasElement, document.body);
  }

  const backdropElement = (
    <BaseView
      key="offcanvas-backdrop"
      essentials={{ className: 'offcanvas-backdrop show' }}
      // For now we need onClick here, because onMouseDown would also toggle the offcanvas when the user clicks on a scrollbar.
      onClick={() => {
        modal.setVisible(false);
      }}
    />
  );

  return ReactDOM.createPortal(
    [offcanvasElement, backdropElement],
    document.body,
  );
});

Offcanvas.displayName = 'Offcanvas';
Offcanvas.propTypes = propTypes;

Offcanvas.Context = OffcanvasContext;
Offcanvas.Body = OffcanvasBody;
Offcanvas.Header = OffcanvasHeader;
Offcanvas.Title = OffcanvasTitle;

export default Offcanvas;
