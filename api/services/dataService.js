const { v4: uuid } = require('uuid');
const _ = require('lodash');
const DataRepository = require('../repositories/dataRepositories');

const lastNamesArray = require('../constants/data/lastNames');
const firstNamesArray = require('../constants/data/firstNames');
const emailDomainsArray = require('../constants/data/emailDomains');
const { LAST_NAME, FIRST_NAME, EMAIL, UUID, BOOLEAN, NUMBER, FULL_NAME, USERNAME, DOMAIN } = require('../constants/dataTypes');
const { DEFAULT_KEY_NAME, MIN_VALUE, MAX_VALUE } = require('../constants/dataGenerationConstants');

const getHistoryByUserId = async (id, page) => {
  const limit = 10;
  const offset = (Number(page) - 1) * limit;
  const { items, itemsCount } = await DataRepository.getHistoryByUserId(id, limit, offset);
  return { items, itemsCount, limit };
};
const saveDataGenerationEvent = async ({ userId, columns, rowsToGenerateNumber }) =>
  DataRepository.saveDataGenerationEvent({ userId, columns, rowsToGenerateNumber });

const stubColumns = [
  { columnName: 'firstName', columnType: FIRST_NAME, id: uuid(), options: {} },
  { columnName: 'lastName', columnType: LAST_NAME, id: uuid(), options: {} },
  { columnName: 'email', columnType: EMAIL, id: uuid(), options: {} },
  { columnName: 'number', columnType: NUMBER, id: uuid(), options: {} },
];

const numberOfRows = 100;

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
    case DOMAIN: {
      return generateRandomEmailDomain();
    }
    default:
      return '';
  }
};

const generateRows = (columns = stubColumns, rowsToGenerateNumber = numberOfRows) => {
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

module.exports = {
  getHistoryByUserId,
  saveDataGenerationEvent,
  generateRows,
};
