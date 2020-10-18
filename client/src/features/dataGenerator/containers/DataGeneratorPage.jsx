import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import isEqual from 'lodash/isEqual';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuid } from 'uuid';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FIRST_NAME, LAST_NAME, EMAIL } from '../../../constants/dataTypes';
import OutputBox from '../components/OutputBox';
import DataColumns from '../components/DataColumns';

import { SNACKBAR_TYPES } from '../../../constants/snackbarConstants';
import { DEFAULT_KEY_NAME } from '../../../constants/dataGenerationConstants';
import * as GlobalActions from '../../../state/global/globalActions';
import * as DataGenerationActions from '../../../state/dataGeneration/dataGenerationActions';

import { generateRows } from '../../../helpers/dataGenerationHelpers';

const DEFAULT_ROWS_NUMBER = 100;

function DataGeneratorPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state: locationState } = location;
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

  const isDefaultState =
    !isData &&
    isEqual(
      initialColumnsState.map((col) => ({ columnName: col.columnName, columnType: col.columnType })),
      columns.map((col) => ({ columnName: col.columnName, columnType: col.columnType }))
    ) &&
    isEqual(rowsToGenerateNumber, DEFAULT_ROWS_NUMBER);

  const handleResetToDefault = () => {
    setColumns(initialColumnsState);
    setColumnsToGenerateNumber(DEFAULT_ROWS_NUMBER);
    setGeneratedDataRows(initialGeneratedDataState);
    dispatch(
      GlobalActions.showSnackbarMessage({ message: 'Settings successfully reset to default!', type: SNACKBAR_TYPES.SUCCESS })
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
    const generatedRows = generateRows(columns, rowsToGenerateNumber);
    const csvRows = generatedRows.map(({ [DEFAULT_KEY_NAME]: defaultKeyName, ...otherFields }) => otherFields);
    const generationEvent = {
      columns,
      rowsToGenerateNumber,
    };
    dispatch(DataGenerationActions.saveDataGenerationEventRequest(generationEvent));
    setGeneratedDataRows({ rows: generatedRows, columns, csvRows });
    dispatch(GlobalActions.showSnackbarMessage({ message: 'Data successfully generated!', type: SNACKBAR_TYPES.SUCCESS }));
  };
  const isValidForm = Object.keys(duplicatedColumnNames).length === 0;
  return (
    <div className="p-24">
      <p className="mb-16">Fake Data Generator</p>
      <div className="flex justify-center">
        <div className="w-full md:w-10/12 lg:w-6/12 xl:w-4/12">
          <DataColumns setColumns={setColumns} columns={columns} duplicatedColumnNames={duplicatedColumnNames} />
          <div className="flex justify-center w-full">
            <div className="w-5/12 mr-12">
              <TextField
                label="Rows Number"
                type="number"
                variant="outlined"
                className="w-full"
                value={rowsToGenerateNumber}
                onChange={handleColumnsToGenerateNumber}
              />
            </div>
            <div className="mr-12 w-7/12 flex justify-end">
              <Fab size="small" color="primary" aria-label="add" onClick={handleAddColumn}>
                <AddIcon />
              </Fab>
            </div>
          </div>
          <div className="flex justify-between items-start">
            {!isDefaultState && (
              <div className="mt-16">
                <Button variant="outlined" onClick={handleResetToDefault}>
                  Reset To Default
                </Button>
              </div>
            )}
            <div className="mt-16 flex flex-col justify-between ml-auto">
              <div>
                <Button size="large" variant="contained" color="primary" onClick={handleGenerateData} disabled={!isValidForm}>
                  Generate Data
                </Button>
              </div>
              {isData && (
                <div className="flex flex-col">
                  <CSVLink data={generatedData.csvRows} filename={`Generated Data - ${rowsToGenerateNumber} rows.csv`}>
                    <Button variant="contained" color="secondary" disabled={!isValidForm} className="w-full">
                      Download CSV
                    </Button>
                  </CSVLink>
                  <div>
                    <CopyToClipboard text={JSON.stringify(generatedData.rows)}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValidForm}
                        className="w-full"
                        onClick={() =>
                          dispatch(
                            GlobalActions.showSnackbarMessage({
                              message: 'Copied',
                              type: SNACKBAR_TYPES.SUCCESS,
                            })
                          )
                        }
                      >
                        Copy Rows (JSON)
                      </Button>
                    </CopyToClipboard>
                  </div>
                </div>
              )}
            </div>
          </div>
          <OutputBox generatedDataRows={generatedData.rows} columns={generatedData.columns} />
        </div>
      </div>
    </div>
  );
}

export default DataGeneratorPage;
