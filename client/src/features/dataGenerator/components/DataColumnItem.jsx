/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  string, func, bool, object,
} from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicatorSharp';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import dataTypes from '../../../constants/dataTypes';

const useStyles = makeStyles({
  dataTypeSelectStyles: {
    width: 100,
    height: 20,
  },
  columnNameFieldStyles: {
    width: 150,
  },
  inputStyles: {
    padding: '12px 10px',
  },
});

function DataColumnItem({
  columnName,
  columnType,
  handleChangeDataRowColumnName,
  handleChangeDataRowColumnType,
  handleDeleteDataRow,
  isDuplicatedColumnName,
  dragHandleProps,
}) {
  const { dataTypeSelectStyles, columnNameFieldStyles } = useStyles();
  const helperText = isDuplicatedColumnName ? 'Duplicated Column Name' : '';
  return (
    <div className="mb-10 flex flex-row">
      <div className="mr-16">
        <TextField
          className={columnNameFieldStyles}
          label="Column Name"
          variant="outlined"
          error={isDuplicatedColumnName}
          value={columnName}
          onChange={handleChangeDataRowColumnName}
          helperText={helperText}
        />
      </div>
      <div className="mr-16">
        <TextField
          className={dataTypeSelectStyles}
          select
          label="Select"
          value={columnType}
          variant="outlined"
          onChange={handleChangeDataRowColumnType}
        >
          {dataTypes.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <IconButton className="self-start ml-16" aria-label="delete" onClick={handleDeleteDataRow}>
        <DeleteIcon />
      </IconButton>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...dragHandleProps}>
        <IconButton disableRipple disableFocusRipple style={{ pointerEvents: 'none' }}>
          <DragIndicator />
        </IconButton>
      </div>

    </div>
  );
}

DataColumnItem.propTypes = {
  columnName: string.isRequired,
  columnType: string.isRequired,
  handleChangeDataRowColumnName: func.isRequired,
  handleChangeDataRowColumnType: func.isRequired,
  handleDeleteDataRow: func.isRequired,
  isDuplicatedColumnName: bool.isRequired,
  dragHandleProps: object.isRequired,
};

export default DataColumnItem;
