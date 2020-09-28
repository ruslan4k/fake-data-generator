import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import isEqual from 'lodash/isEqual';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuid } from 'uuid';
import cn from 'classnames';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  FIRST_NAME, LAST_NAME, EMAIL, UUID,
} from '../../../constants/dataTypes';
import OutputBox from '../components/OutputBox';
import DataColumns from '../components/DataColumns';
import lastNamesArray from '../../../constants/data/lastNames';
import firstNamesArray from '../../../constants/data/firstNames';
import emailDomainsArray from '../../../constants/data/emailDomains';
import { SNACKBAR_TYPES } from '../../../constants/snackbarConstants';
import { DEFAULT_KEY_NAME } from '../../../constants/dataGenerationConstants';
import * as GlobalActions from '../../../state/global/globalActions';
import * as DataGenerationActions from '../../../state/dataGeneration/dataGenerationActions';

const useStyles = makeStyles({
  container: { minWidth: 300, maxWidth: '100%' },
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
      const email = `${valueBeforeDomain}@${domain}`;
      return email;
    }
    case UUID: {
      return uuid();
    }
    default:
      return '';
  }
};

function DataGeneratorPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state: locationState } = location;
  const { container } = useStyles();
  const initialColumnsState = [
    { columnName: 'firstName', columnType: FIRST_NAME, id: uuid() },
    { columnName: 'lastName', columnType: LAST_NAME, id: uuid() },
    { columnName: 'email', columnType: EMAIL, id: uuid() },
  ];
  const [columns, setColumns] = useState(initialColumnsState);
  const [rowsToGenerateNumber, setColumnsToGenerateNumber] = useState(DEFAULT_ROWS_NUMBER);
  const initialGeneratedDataState = { columns: initialColumnsState, rows: [], csvRows: [] };
  const [generatedData, setGeneratedDataRows] = useState(initialGeneratedDataState);
  const duplicatedColumnNames = {};
  const columnNamesCounter = {};

  useEffect(() => {
    const generationEvent = locationState?.generationEvent;
    if (generationEvent) {
      const { rowsNumber, columns: locationStateColumns } = generationEvent;
      const newColumns = locationStateColumns.map((column) => ({ ...column, id: uuid() }));
      setColumnsToGenerateNumber(rowsNumber);
      setColumns(newColumns);
    }
  }, [locationState]);

  columns.forEach(({ columnName }) => {
    columnNamesCounter[columnName] = columnNamesCounter[columnName] ? (duplicatedColumnNames[columnName] = true) : 1;
  });

  const isData = Boolean(generatedData.rows.length);

  const isDefaultState = !isData
    && isEqual(
      initialColumnsState.map((col) => ({ columnName: col.columnName, columnType: col.columnType })),
      columns.map((col) => ({ columnName: col.columnName, columnType: col.columnType })),
    )
    && isEqual(rowsToGenerateNumber, DEFAULT_ROWS_NUMBER);

  const handleResetToDefault = () => {
    setColumns(initialColumnsState);
    setColumnsToGenerateNumber(DEFAULT_ROWS_NUMBER);
    setGeneratedDataRows(initialGeneratedDataState);
    dispatch(
      GlobalActions.showSnackbarMessage({ message: 'Settings successfully reset to default!', type: SNACKBAR_TYPES.SUCCESS }),
    );
  };

  const handleColumnsToGenerateNumber = (e) => {
    setColumnsToGenerateNumber(e.target.value);
  };

  const handleAddColumn = () => {
    const columnsNumber = columns.length;
    const newColumnName = `columnName${columnsNumber + 1}`;
    const updatedDataColumns = [...columns, { columnName: newColumnName, columnType: FIRST_NAME, id: uuid() }];
    setColumns(updatedDataColumns);
  };

  const handleGenerateData = () => {
    const rows = [];
    for (let index = 0; index < rowsToGenerateNumber; index += 1) {
      const generatedRow = {};
      columns.forEach((columnItem) => {
        const { columnName, columnType } = columnItem;
        generatedRow[columnName] = generateData(columnType);
        // eslint-disable-next-line no-underscore-dangle
        generatedRow[DEFAULT_KEY_NAME] = uuid();
      });
      rows.push(generatedRow);
    }
    const csvRows = rows.map(({ [DEFAULT_KEY_NAME]: defaultKeyName, ...otherFields }) => otherFields);
    const generationEvent = {
      columns,
      rowsToGenerateNumber,
    };
    dispatch(DataGenerationActions.saveDataGenerationEventRequest(generationEvent));
    setGeneratedDataRows({ rows, columns, csvRows });
    dispatch(GlobalActions.showSnackbarMessage({ message: 'Data successfully generated!', type: SNACKBAR_TYPES.SUCCESS }));
  };
  const isValidForm = Object.keys(duplicatedColumnNames).length === 0;
  return (
    <div className="p-24">
      <p className="mb-16">Fake Data Generator</p>
      <div className="flex flex-col items-center">
        <div className={cn('flex flex-col', container)}>
          <DataColumns setColumns={setColumns} columns={columns} duplicatedColumnNames={duplicatedColumnNames} />
          <div className="flex justify-between my-8">
            <TextField
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
              <div className="mb-8">
                <Button variant="contained" onClick={handleResetToDefault}>
                  Reset To Default
                </Button>
              </div>
            )}
            <div className="mt-16 flex justify-between w-full">
              <Button variant="contained" color="primary" onClick={handleGenerateData} disabled={!isValidForm}>
                Generate Data
              </Button>
              {isData && (
                <CSVLink data={generatedData.csvRows} filename={`Generated Data - ${rowsToGenerateNumber} rows.csv`}>
                  <Button variant="contained" color="secondary" disabled={!isValidForm}>
                    Download CSV
                  </Button>
                </CSVLink>
              )}
            </div>
          </div>
        </div>
        <OutputBox generatedDataRows={generatedData.rows} columns={generatedData.columns} />
      </div>
    </div>
  );
}

export default DataGeneratorPage;
