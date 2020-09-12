import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import DataRow from '../components/DataRow';
import InputField from '../../../baseComponents/TextField';
import { FIRST_NAME, LAST_NAME, EMAIL } from '../../../constants/dataTypes';

const DEFAULT_ROWS_NUMBER = 100;

function DataGeneratorPage() {
  const initialRowsState = [
    { columnName: 'firstName', columnType: FIRST_NAME },
    { columnName: 'lastName', columnType: LAST_NAME },
    { columnName: 'email', columnType: EMAIL },
  ];
  const [dataRows, setDataRows] = useState(initialRowsState);
  const [rowsToGenerateNumber, setRowsToGenerateNumber] = useState(DEFAULT_ROWS_NUMBER);
  const isDefaultState = isEqual(initialRowsState, dataRows) && isEqual(rowsToGenerateNumber, DEFAULT_ROWS_NUMBER);
  const handleChangeDataRow = (event, index, field) => {
    const newValue = event.target.value;
    const updatedDataRows = dataRows.slice();
    updatedDataRows[index][field] = newValue;
    setDataRows(updatedDataRows);
  };

  const handleDeleteDataRow = (indexOfRowToDelete) => {
    const updatedDataRows = dataRows.filter((row, index) => index !== indexOfRowToDelete);
    setDataRows(updatedDataRows);
  };

  const handleResetToDefault = () => {
    setDataRows(initialRowsState);
    setRowsToGenerateNumber(DEFAULT_ROWS_NUMBER);
  };

  const handleRowsToGenerateNumber = (e) => {
    setRowsToGenerateNumber(e.target.value);
  };

  return (
    <div>
      <p className="mb-16">Fake Data Generator</p>
      <div className="flex flex-col items-center">
        <div>
          <div>
            {dataRows.map(({ columnName, columnType }, index) => (
              <DataRow
                key={columnType}
                columnName={columnName}
                columnType={columnType}
                handleChangeDataRowColumnName={(event) => handleChangeDataRow(event, index, 'columnName')}
                handleChangeDataRowColumnType={(event) => handleChangeDataRow(event, index, 'columnType')}
                handleDeleteDataRow={() => handleDeleteDataRow(index)}
              />
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="mr-auto my-16">
              <InputField
                label="Rows to Generate Number"
                type="number"
                variant="outlined"
                value={rowsToGenerateNumber}
                onChange={handleRowsToGenerateNumber}
              />
            </div>
            {!isDefaultState && (
              <div className="mb-20">
                <Button variant="contained" onClick={handleResetToDefault}>
                  Reset To Default
                </Button>
              </div>
            )}
            <Button variant="contained" color="primary" onClick={handleResetToDefault}>
              Generate Data
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DataGeneratorPage;
