import React from 'react';
import { string, func, bool } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';
import InputField from '../../../baseComponents/TextField';
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

function DataRow({
  columnName,
  columnType,
  handleChangeDataRowColumnName,
  handleChangeDataRowColumnType,
  handleDeleteDataRow,
  isDuplicatedColumnName,
}) {
  const { dataTypeSelectStyles, columnNameFieldStyles } = useStyles();
  const helperText = isDuplicatedColumnName ? 'Duplicated Column Name' : '';
  return (
    <div className="mb-10 flex flex-row">
      <div className="mr-16">
        <InputField
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
        <InputField
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
        </InputField>
      </div>
      <IconButton className="self-start ml-16" aria-label="delete" onClick={handleDeleteDataRow}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

DataRow.propTypes = {
  columnName: string.isRequired,
  columnType: string.isRequired,
  handleChangeDataRowColumnName: func.isRequired,
  handleChangeDataRowColumnType: func.isRequired,
  handleDeleteDataRow: func.isRequired,
  isDuplicatedColumnName: bool.isRequired,
};

export default DataRow;
