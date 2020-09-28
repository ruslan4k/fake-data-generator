/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dayjs from 'dayjs';
import * as DataGenerationActions from '../../../state/dataGeneration/dataGenerationActions';
import * as DataGenerationSelectors from '../../../state/dataGeneration/dataGenerationSelectors';

const useStyles = makeStyles({
  container: {
    width: 360,
  },
});

function HistoryPage() {
  const dispatch = useDispatch();
  const { container } = useStyles();
  const dataGenerationEventsHistory = useSelector((state) => DataGenerationSelectors.selectDataGenerationEventsHistory(state));
  useEffect(() => {
    dispatch(DataGenerationActions.getDataGenerationEventsHistoryRequest());
  }, [dispatch]);
  return (
    <div className={cn(container, 'flex-inline flex-col m-auto')}>
      {
        dataGenerationEventsHistory.length > 0
          ? dataGenerationEventsHistory.map((event) => (
            <Accordion key={event.createdAt}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className="flex justify-around w-full">
                  <div className="flex flex-col items-start">
                    <Typography>{dayjs(event.createdAt).format('HH:mm:ss MMMM DD, YYYY')}</Typography>
                    <Typography className="flex-none">
                      Rows Number:
                      {' '}
                      {event.rowsNumber}
                    </Typography>
                  </div>
                  <Button variant="contained" color="secondary">Generate Again</Button>
                </div>

              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col items-start">
                  {event.columns.map((columnItem) => (
                    <div className="flex">
                      <Typography key={`${columnItem.columnType}${columnItem.columnName}`}>
                        Column Name:
                        {' '}
                        {columnItem.columnType}
                      </Typography>
                      <Typography key={`${columnItem.columnType}${columnItem.columnName}`}>
                        Column Type:
                        {' '}
                        {columnItem.columnType}
                      </Typography>

                    </div>
                  ))}
                </div>

              </AccordionDetails>
            </Accordion>
          )) : <Typography>No history events</Typography>
      }

    </div>
  );
}

export default HistoryPage;
