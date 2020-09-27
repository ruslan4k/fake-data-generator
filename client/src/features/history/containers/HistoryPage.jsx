/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import cn from 'classnames';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  container: {
    width: 360,
  },
});

function HistoryPage() {
  const { container } = useStyles();

  return (
    <div className={cn(container, 'flex-inline flex-col m-auto')}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Date Generation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            More Data Generation Details
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default HistoryPage;
