/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import dayjs from 'dayjs';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as UserSelectors from '../../../state/user/userSelectors';
import * as DataGenerationSelectors from '../../../state/dataGeneration/dataGenerationSelectors';
import * as DataGenerationActions from '../../../state/dataGeneration/dataGenerationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    '& nav': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}));

function HistoryPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { items, itemsCount, limit } = useSelector((state) => DataGenerationSelectors.selectDataGenerationEventsHistory(state));
  const pagesNumber = Math.ceil(itemsCount / limit);
  const loadingDataGenerationEventsHistory = useSelector((state) =>
    DataGenerationSelectors.selectLoadingDataGenerationEventsHistory(state)
  );
  const [page, setPage] = React.useState(1);
  const isLoggedIn = useSelector((state) => UserSelectors.selectLoggedInStatus(state));
  useEffect(() => {
    if (isLoggedIn) dispatch(DataGenerationActions.getDataGenerationEventsHistoryRequest(page));
  }, [dispatch, isLoggedIn]);

  const handleChangePage = (event, value) => {
    const callback = () => setPage(value);
    if (isLoggedIn && page !== value) dispatch(DataGenerationActions.getDataGenerationEventsHistoryRequest(value, callback));
  };
  const isHistoryFetched = useSelector((state) => DataGenerationSelectors.selectIsHistoryFetched(state));

  return (
    <div className="flex-inline m-auto max-w-full sm:w-8/12 md:w-6/12 lg:w-4/12">
      {loadingDataGenerationEventsHistory && <CircularProgress />}
      {items.length > 0 && (
        <>
          {items.map((event) => (
            <Accordion key={event.createdAt} className="mb-12">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="flex justify-around w-full">
                  <div className="flex flex-col items-start">
                    <Typography>{dayjs(event.createdAt).format('HH:mm:ss MMMM DD, YYYY')}</Typography>
                    <Typography className="flex-none">
                      Rows Number:
                      {event.rowsNumber}
                    </Typography>
                  </div>
                  <Button
                    className="flex-none self-center"
                    onClick={() => history.push({ pathname: '/', state: { generationEvent: event } })}
                    variant="contained"
                    color="secondary"
                  >
                    Generate Again
                  </Button>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex items-center flex-col w-full">
                  <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Column Name</TableCell>
                          <TableCell align="left">Column Type</TableCell>
                          <TableCell align="left">Options</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {event.columns.map((columnItem) => (
                          <TableRow key={columnItem.columnName}>
                            <TableCell align="left">{columnItem.columnName}</TableCell>
                            <TableCell align="left">{columnItem.columnType}</TableCell>
                            <TableCell align="left">{JSON.stringify(columnItem.options)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
      {!isHistoryFetched && !loadingDataGenerationEventsHistory && (
        <Typography>{`No history events. ${!isLoggedIn && 'Please login to see history.'}`}</Typography>
      )}

      {items.length > 0 && (
        <div className={cn(classes.root, 'm-auto')}>
          <Pagination
            count={pagesNumber}
            color="primary"
            page={page}
            onChange={handleChangePage}
            disabled={loadingDataGenerationEventsHistory}
          />
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
