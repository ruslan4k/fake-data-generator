import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import lastNamesArray from '../constants/data/lastNames';
import firstNamesArray from '../constants/data/firstNames';
import emailDomainsArray from '../constants/data/emailDomains';
import { FIRST_NAME, LAST_NAME, EMAIL, UUID } from '../constants/dataTypes';
import { DEFAULT_KEY_NAME } from '../constants/dataGenerationConstants';

const generateRandomInteger = (maxValue) => Math.floor(Math.random() * maxValue);
const generateFirstName = () => firstNamesArray[generateRandomInteger(firstNamesArray.length)];
const generateLastName = () => lastNamesArray[generateRandomInteger(lastNamesArray.length)];
const generateRandomEmailDomain = () => emailDomainsArray[generateRandomInteger(emailDomainsArray.length)];

const generateData = (dataType, firstName, lastName, customDomain) => {
  switch (dataType) {
    case FIRST_NAME:
      return generateFirstName();
    case LAST_NAME:
      return generateLastName();
    case EMAIL: {
      const domain = customDomain || generateRandomEmailDomain();
      const valueBeforeDomain = `${firstName || generateFirstName()}.${lastName || generateLastName()}${Math.floor(
        Math.random() * 10000
      )}`.toLowerCase();
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

export const generateRows = (columns, rowsToGenerateNumber) => {
  const sortedColumns = _.orderBy(columns, ['columnType'], ['desc']);
  const rows = [];
  for (let index = 0; index < rowsToGenerateNumber; index += 1) {
    const generatedRow = {};
    let firstName;
    let lastName;
    sortedColumns.forEach((columnItem) => {
      const { columnName, columnType, customDomain } = columnItem;
      const rowValue = generateData(columnType, firstName, lastName, customDomain);
      if (columnType === FIRST_NAME) firstName = rowValue;
      if (columnType === LAST_NAME) lastName = rowValue;
      generatedRow[columnName] = rowValue;
      // eslint-disable-next-line no-underscore-dangle
      generatedRow[DEFAULT_KEY_NAME] = uuid();
    });
    rows.push(generatedRow);
  }
  return rows;
};
