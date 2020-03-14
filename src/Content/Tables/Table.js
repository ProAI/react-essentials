import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import TableBody from './TableBody';
import TableData from './TableData';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeading from './TableHeading';
import TableRow from './TableRow';

const propTypes = {
  children: PropTypes.node.isRequired,
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  responsiveSm: PropTypes.bool,
  responsiveMd: PropTypes.bool,
  responsiveLg: PropTypes.bool,
  responsiveXl: PropTypes.bool,
};

const Table = React.forwardRef(function Table(props, ref) {
  const {
    bordered = false,
    striped = false,
    hover = false,
    responsive = false,
    responsiveSm = false,
    responsiveMd = false,
    responsiveLg = false,
    responsiveXl = false,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'table',
    // variable classes
    bordered && 'table-bordered',
    striped && 'table-striped',
    hover && 'table-hover',
    responsive && 'table-responsive',
    responsiveSm && 'table-responsive-sm',
    responsiveMd && 'table-responsive-md',
    responsiveLg && 'table-responsive-lg',
    responsiveXl && 'table-responsive-xl',
  );

  // TODO: Remove pseudo view and add react-native compatible component
  return (
    <BaseView
      {...elementProps}
      ref={ref}
      essentials={{ tag: 'table', className: classes, pseudo: true }}
    />
  );
});

Table.displayName = 'Table';
Table.propTypes = propTypes;

Table.Body = TableBody;
Table.Data = TableData;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.Heading = TableHeading;
Table.Row = TableRow;

export default Table;
