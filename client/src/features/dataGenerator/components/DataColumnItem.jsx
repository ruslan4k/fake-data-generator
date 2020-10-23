/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { string, func, bool, object, number } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicator from '@material-ui/icons/DragIndicatorSharp';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import dataTypes, { EMAIL, NUMBER } from '../../../constants/dataTypes';
import { MAX_VALUE, MIN_VALUE } from '../../../constants/dataGenerationConstants';

function DataColumnItem({
  columnName,
  columnType,
  handleChangeDataRowColumnName,
  handleChangeDataRowColumnType,
  handleChangeShowCustomDomainField,
  handleDeleteDataRow,
  handleChangeMinValue,
  handleChangeMaxValue,
  minValue,
  maxValue,
  isDuplicatedColumnName,
  dragHandleProps,
  isCustomDomainEnabled,
  customDomain,
  handleChangeCustomDomainField,
}) {
  const helperText = isDuplicatedColumnName ? 'Duplicated Column Name' : '';
  return (
    <div className="mb-32">
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
      {columnType === EMAIL && (
        <div className="text-left mb-12 flex items-center">
          <Switch color="primary" checked={isCustomDomainEnabled} onChange={handleChangeShowCustomDomainField} />
          <Typography className="text-24">Specify Domain</Typography>
          {isCustomDomainEnabled && (
            <div className="ml-48">
              <TextField
                label="Static Domain"
                variant="outlined"
                value={customDomain}
                onChange={handleChangeCustomDomainField}
                helperText={helperText}
              />
            </div>
          )}
        </div>
      )}
      {columnType === NUMBER && (
        <div className="text-left mb-12 flex items-center">
          <div className="mr-12">
            <TextField
              label="Min Value"
              variant="outlined"
              value={minValue}
              onChange={handleChangeMinValue}
              helperText={helperText}
            />
          </div>
          <TextField
            label="Max Value"
            variant="outlined"
            value={maxValue}
            onChange={handleChangeMaxValue}
            helperText={helperText}
          />
        </div>
      )}
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
  isCustomDomainEnabled: bool,
  handleChangeShowCustomDomainField: func.isRequired,
  customDomain: string,
  handleChangeCustomDomainField: func.isRequired,
  handleChangeMinValue: func.isRequired,
  handleChangeMaxValue: func.isRequired,
  minValue: number,
  maxValue: number,
};

DataColumnItem.defaultProps = {
  isCustomDomainEnabled: false,
  customDomain: '',
  minValue: MIN_VALUE,
  maxValue: MAX_VALUE,
};

export default DataColumnItem;
