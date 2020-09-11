import React from 'react';
import { string } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const dataTypes = [{
  type: 'firstName',
  label: 'First Name',
}, {
  type: 'lastName',
  label: 'Last Name',
}];

function DataRow({ columnName, columnType }) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="mr-4">
        <TextField id="outlined-basic" label="Column Name" variant="outlined" value={columnName} />
      </div>
      <TextField
        select
        label="Select"
        value={columnType}
        variant="outlined"
      >
        {dataTypes.map((option) => (
          <MenuItem key={option.type} value={option.type}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

DataRow.propTypes = {
  columnName: string.isRequired,
  columnType: string.isRequired,
};

export default DataRow;
