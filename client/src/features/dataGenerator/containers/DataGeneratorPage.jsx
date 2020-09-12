import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import isEqual from 'lodash/isEqual';
import DataRow from '../components/DataRow';
import InputField from '../../../baseComponents/TextField';
import { FIRST_NAME, LAST_NAME, EMAIL } from '../../../constants/dataTypes';
import OutputBox from '../components/OutputBox';
import lastNamesArray from '../../../constants/data/lastNames';
import firstNamesArray from '../../../constants/data/firstNames';
import emailDomainsArray from '../../../constants/data/emailDomains';

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
    default:
      return '';
  }
};

function DataGeneratorPage() {
  const initialColumnsState = [
    { columnName: 'firstName', columnType: FIRST_NAME },
    { columnName: 'lastName', columnType: LAST_NAME },
    { columnName: 'email', columnType: EMAIL },
  ];
  const [columns, setColumns] = useState(initialColumnsState);
  const [rowsToGenerateNumber, setColumnsToGenerateNumber] = useState(DEFAULT_ROWS_NUMBER);
  const [generatedDataRows, setGeneratedDataRows] = useState([]);
  const isDefaultState = isEqual(initialColumnsState, columns) && isEqual(rowsToGenerateNumber, DEFAULT_ROWS_NUMBER);
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
  };

  const handleColumnsToGenerateNumber = (e) => {
    setColumnsToGenerateNumber(e.target.value);
  };

  const handleGenerateData = () => {
    const result = [];
    for (let index = 0; index < rowsToGenerateNumber; index += 1) {
      const generatedRow = {};
      columns.forEach((columnItem) => {
        const { columnName, columnType } = columnItem;
        generatedRow[columnName] = generateData(columnType);
      });
      result.push(generatedRow);
    }
    setGeneratedDataRows(result);
  };

  return (
    <div>
      <p className="mb-16">Fake Data Generator</p>
      <div className="flex flex-col items-center">
        <div>
          <div>
            {columns.map(({ columnName, columnType }, index) => (
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
                label="Columns to Generate Number"
                type="number"
                variant="outlined"
                value={rowsToGenerateNumber}
                onChange={handleColumnsToGenerateNumber}
              />
            </div>
            {!isDefaultState && (
              <div className="mb-20">
                <Button variant="contained" onClick={handleResetToDefault}>
                  Reset To Default
                </Button>
              </div>
            )}
            <Button variant="contained" color="primary" onClick={handleGenerateData}>
              Generate Data
            </Button>
          </div>
        </div>
        <OutputBox generatedDataRows={generatedDataRows} />
      </div>
    </div>
  );
}

export default DataGeneratorPage;
