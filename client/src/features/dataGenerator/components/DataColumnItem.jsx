/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { string, func, bool, object } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicatorSharp';
import TextField from '@material-ui/core/TextField';
import dataTypes from '../../../constants/dataTypes';

function DataColumnItem({
  columnName,
  columnType,
  handleChangeDataRowColumnName,
  handleChangeDataRowColumnType,
  handleDeleteDataRow,
  isDuplicatedColumnName,
  dragHandleProps,
}) {
  const helperText = isDuplicatedColumnName ? 'Duplicated Column Name' : '';
  return (
    <div className="flex justify-center mb-12 w-full">
      <div className="w-5/12 mr-12">
        <TextField
          label="Column Name"
          className="w-full"
          variant="outlined"
          error={isDuplicatedColumnName}
          value={columnName}
          onChange={handleChangeDataRowColumnName}
          helperText={helperText}
        />
      </div>
      <div className="w-5/12 mr-12">
        <TextField
          select
          label="Select"
          value={columnType}
          variant="outlined"
          className="w-full text-left"
          onChange={handleChangeDataRowColumnType}
        >
          {dataTypes.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="w-2/12 flex">
        <div>
          <IconButton className="self-start" aria-label="delete" onClick={handleDeleteDataRow}>
            <DeleteIcon />
          </IconButton>
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...dragHandleProps}>
          <IconButton disableRipple disableFocusRipple style={{ pointerEvents: 'none' }}>
            <DragIndicator />
          </IconButton>
        </div>
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
