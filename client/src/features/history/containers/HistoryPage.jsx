/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        dataGenerationEventsHistory.map((event) => (
          <Accordion key={event.createdAt}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{event.createdAt}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                More Data Generation Details
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }

    </div>
  );
}

export default HistoryPage;
