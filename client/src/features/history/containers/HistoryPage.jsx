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
import dayjs from 'dayjs';
import { CircularProgress } from '@material-ui/core';
import * as DataGenerationActions from '../../../state/dataGeneration/dataGenerationActions';
import * as DataGenerationSelectors from '../../../state/dataGeneration/dataGenerationSelectors';
import * as UserSelectors from '../../../state/user/userSelectors';

function HistoryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dataGenerationEventsHistory = useSelector((state) => DataGenerationSelectors.selectDataGenerationEventsHistory(state));
  const loadingDataGenerationEventsHistory = useSelector((state) =>
    DataGenerationSelectors.selectLoadingDataGenerationEventsHistory(state)
  );
  const isLoggedIn = useSelector((state) => UserSelectors.selectLoggedInStatus(state));
  useEffect(() => {
    if (isLoggedIn) dispatch(DataGenerationActions.getDataGenerationEventsHistoryRequest());
  }, [dispatch, isLoggedIn]);
  if (loadingDataGenerationEventsHistory) return <CircularProgress />;
  return (
    <div className="flex-inline m-auto max-w-full xs:w-8/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
      {dataGenerationEventsHistory.length > 0 ? (
        dataGenerationEventsHistory.map((event) => (
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
                {event.columns.map((columnItem) => (
                  <div key={`${columnItem.columnType}${columnItem.columnName}`} className="flex">
                    <Typography>
                      Column Name:
                      {columnItem.columnName}
                    </Typography>
                    <Typography>
                      Column Type:
                      {columnItem.columnType}
                    </Typography>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No history events</Typography>
      )}
    </div>
  );
}

export default HistoryPage;
