import { array } from 'prop-types';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { DEFAULT_KEY_NAME } from '../../../constants/dataGenerationConstants';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function OutputBox({ generatedDataRows, columns }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const isResult = generatedDataRows.length > 0;
  const tableColumns = columns.filter((column) => column !== DEFAULT_KEY_NAME);
  const currentTableRows = generatedDataRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="mt-20 max-w-full">
      {isResult && (
        <Paper elevation={3} classes={{ root: classes.root }}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableCell key={column.columnName} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.columnName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableRows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row[DEFAULT_KEY_NAME]}>
                    {columns.map((column) => {
                      const value = row[column.columnName];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={generatedDataRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

OutputBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  generatedDataRows: array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  columns: array.isRequired,
};

export default memo(OutputBox);
