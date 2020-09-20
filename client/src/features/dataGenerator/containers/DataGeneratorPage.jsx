import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { uuid } from 'uuidv4';
import cn from 'classnames';
import { func } from 'prop-types';
import DataRow from '../components/DataRow';
import InputField from '../../../baseComponents/TextField';
import {
  FIRST_NAME, LAST_NAME, EMAIL, UUID,
} from '../../../constants/dataTypes';
import OutputBox from '../components/OutputBox';
import lastNamesArray from '../../../constants/data/lastNames';
import firstNamesArray from '../../../constants/data/firstNames';
import emailDomainsArray from '../../../constants/data/emailDomains';
import { SNACKBAR_TYPES } from '../../../constants/snackbarConstants';
import { DEFAULT_KEY_NAME } from '../../../constants/dataGenerationConstants';

const useStyles = makeStyles({
  container: { minWidth: 300 },
});

const DEFAULT_ROWS_NUMBER = 100;

const generateRandomInteger = (maxValue) => Math.floor(Math.random() * maxValue);
const generateFirstName = () => firstNamesArray[generateRandomInteger(firstNamesArray.length)];
const generateLastName = () => lastNamesArray[generateRandomInteger(lastNamesArray.length)];
const generateRandomEmailDomain = () => emailDomainsArray[generateRandomInteger(emailDomainsArray.length)];

const generateData = (dataType) => {
  switch (dataType) {
    case FIRST_NAME:
      return generateFirstName();
    case LAST_NAME:
      return generateLastName();
    case EMAIL: {
      const domain = generateRandomEmailDomain();
      const valueBeforeDomain = `${generateFirstName().toLocaleLowerCase()}.${generateLastName().toLocaleLowerCase()}${Math.floor(
        Math.random() * 10000,
      )}`;
      const email = `${valueBeforeDomain}${domain}`;
      return email;
    }
    case UUID: {
      return uuid();
    }
    default:
      return '';
  }
};

function DataGeneratorPage({ handleShowMessage }) {
  const { container } = useStyles();
  const initialColumnsState = [
    { columnName: 'firstName', columnType: FIRST_NAME, id: uuid() },
    { columnName: 'lastName', columnType: LAST_NAME, id: uuid() },
    { columnName: 'email', columnType: EMAIL, id: uuid() },
  ];
  const [columns, setColumns] = useState(initialColumnsState);
  const duplicatedColumnNames = {};
  const columnNamesCounter = {};
  columns.forEach(({ columnName }) => {
    columnNamesCounter[columnName] = columnNamesCounter[columnName] ? (duplicatedColumnNames[columnName] = true) : 1;
  });
  const [rowsToGenerateNumber, setColumnsToGenerateNumber] = useState(DEFAULT_ROWS_NUMBER);
  const [generatedDataRows, setGeneratedDataRows] = useState([]);
  const isDefaultState = isEqual(
    initialColumnsState.map((col) => ({ columnName: col.columnName, columnType: col.columnType })),
    columns.map((col) => ({ columnName: col.columnName, columnType: col.columnType })),
  ) && isEqual(rowsToGenerateNumber, DEFAULT_ROWS_NUMBER);
  const handleChangeDataRow = (event, index, field) => {
    const newValue = event.target.value;
    const updatedDataColumns = columns.slice();
    updatedDataColumns[index][field] = newValue;
    setColumns(updatedDataColumns);
  };

  const handleDeleteDataRow = (indexOfRowToDelete) => {
    const updatedDataColumns = columns.filter((row, index) => index !== indexOfRowToDelete);
    setColumns(updatedDataColumns);
  };

  const handleResetToDefault = () => {
    setColumns(initialColumnsState);
    setColumnsToGenerateNumber(DEFAULT_ROWS_NUMBER);
    handleShowMessage({ message: 'Settings successfully reset to default!', type: SNACKBAR_TYPES.SUCCESS });
  };

  const handleColumnsToGenerateNumber = (e) => {
    setColumnsToGenerateNumber(e.target.value);
  };

  const handleAddColumn = () => {
    const updatedDataColumns = [...columns, { columnName: 'firstName', columnType: FIRST_NAME, id: uuid() }];
    setColumns(updatedDataColumns);
  };

  const handleGenerateData = () => {
    const result = [];
    for (let index = 0; index < rowsToGenerateNumber; index += 1) {
      const generatedRow = {};
      columns.forEach((columnItem) => {
        const { columnName, columnType } = columnItem;
        generatedRow[columnName] = generateData(columnType);
        // eslint-disable-next-line no-underscore-dangle
        generatedRow[DEFAULT_KEY_NAME] = uuid();
      });
      result.push(generatedRow);
    }
    setGeneratedDataRows(result);
    handleShowMessage({ message: 'Data successfully generated!', type: SNACKBAR_TYPES.SUCCESS });
  };
  const isValidForm = Object.keys(duplicatedColumnNames).length === 0;
  return (
    <div>
      <p className="mb-16">Fake Data Generator</p>
      <div className="flex flex-col items-center">
        <div className={cn('flex flex-col', container)}>
          <div>
            {columns.map(({ columnName, columnType, id }, index) => (
              <DataRow
                key={id}
                columnName={columnName}
                columnType={columnType}
                handleChangeDataRowColumnName={(event) => handleChangeDataRow(event, index, 'columnName')}
                handleChangeDataRowColumnType={(event) => handleChangeDataRow(event, index, 'columnType')}
                handleDeleteDataRow={() => handleDeleteDataRow(index)}
                isDuplicatedColumnName={Boolean(duplicatedColumnNames[columnName])}
              />
            ))}
          </div>
          <div className="flex justify-between my-8">
            <InputField
              label="Columns to Generate Number"
              type="number"
              variant="outlined"
              value={rowsToGenerateNumber}
              onChange={handleColumnsToGenerateNumber}
            />
            <Fab size="small" className="self-end" color="primary" aria-label="add" onClick={handleAddColumn}>
              <AddIcon />
            </Fab>
          </div>

          <div className="flex flex-col items-start">
            {!isDefaultState && (
            <div className="mb-20">
              <Button variant="contained" onClick={handleResetToDefault}>
                Reset To Default
              </Button>
            </div>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateData}
              disabled={!isValidForm}
            >
              Generate Data
            </Button>
          </div>
        </div>
        <OutputBox generatedDataRows={generatedDataRows} />
      </div>
    </div>

  );
}

DataGeneratorPage.propTypes = {
  handleShowMessage: func.isRequired,
};

export default DataGeneratorPage;
