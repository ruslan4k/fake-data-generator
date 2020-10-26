import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import lastNamesArray from '../constants/data/lastNames';
import firstNamesArray from '../constants/data/firstNames';
import emailDomainsArray from '../constants/data/emailDomains';
import { FIRST_NAME, LAST_NAME, EMAIL, UUID, BOOLEAN, NUMBER, FULL_NAME, USERNAME } from '../constants/dataTypes';
import { DEFAULT_KEY_NAME, MAX_VALUE, MIN_VALUE } from '../constants/dataGenerationConstants';

const generateRandomInteger = (maxValue) => Math.floor(Math.random() * maxValue);
const generateFirstName = () => firstNamesArray[generateRandomInteger(firstNamesArray.length)];
const generateLastName = () => lastNamesArray[generateRandomInteger(lastNamesArray.length)];
const generateRandomEmailDomain = () => emailDomainsArray[generateRandomInteger(emailDomainsArray.length)];
const generateUsername = (firstName, lastName) =>
  `${firstName || generateFirstName()}.${lastName || generateLastName()}${Math.floor(Math.random() * 10000)}`.toLowerCase();

const generateData = ({ dataType, firstName, lastName, customDomain, minValue = MIN_VALUE, maxValue = MAX_VALUE }) => {
  switch (dataType) {
    case FIRST_NAME:
      return generateFirstName();
    case LAST_NAME:
      return generateLastName();
    case FULL_NAME: {
      const fullName = `${firstName || generateFirstName()} ${lastName || generateLastName()}`;
      return fullName;
    }
    case USERNAME: {
      const username = generateUsername(firstName, lastName);
      return username;
    }
    case EMAIL: {
      const domain = customDomain || generateRandomEmailDomain();
      const username = generateUsername(firstName, lastName);
      const email = `${username}@${domain}`;
      return email;
    }
    case UUID: {
      return uuid();
    }
    case BOOLEAN: {
      const invariants = [false, true];
      const randomInt = Math.round(Math.random(0, 1));
      const result = invariants[randomInt].toString();
      return result;
    }
    case NUMBER: {
      return Math.floor(Math.random() * (Number(maxValue) - Number(minValue) + 1) + Number(minValue));
    }
    default:
      return '';
  }
};

export const generateRows = (columns, rowsToGenerateNumber) => {
  const sortedColumns = _.orderBy(columns, ['order'], ['asc']);
  const rows = [];
  for (let index = 0; index < rowsToGenerateNumber; index += 1) {
    const generatedRow = {};
    let firstName;
    let lastName;
    sortedColumns.forEach((columnItem) => {
      const {
        columnName,
        columnType,
        options: { customDomain, minValue, maxValue },
      } = columnItem;
      const rowValue = generateData({ dataType: columnType, firstName, lastName, customDomain, minValue, maxValue });
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
