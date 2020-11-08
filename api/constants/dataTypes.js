const LAST_NAME = 'lastName';
const FIRST_NAME = 'firstName';
const EMAIL = 'email';
const UUID = 'uuid';
const BOOLEAN = 'boolean';
const NUMBER = 'number';
const FULL_NAME = 'fullName';
const USERNAME = 'username';
const DOMAIN = 'domain';

const dataTypes = [
  {
    type: FIRST_NAME,
    label: 'First Name',
  },
  {
    type: LAST_NAME,
    label: 'Last Name',
  },
  {
    type: FULL_NAME,
    label: 'Full Name',
  },
  {
    type: USERNAME,
    label: 'Username',
  },
  {
    type: EMAIL,
    label: 'Email',
  },
  {
    type: UUID,
    label: 'UUID',
  },
  {
    type: BOOLEAN,
    label: 'Boolean',
  },
  {
    type: NUMBER,
    label: 'Number',
  },
  {
    type: DOMAIN,
    label: 'domain',
  },
];

module.exports = { dataTypes, LAST_NAME, FIRST_NAME, EMAIL, UUID, BOOLEAN, NUMBER, FULL_NAME, USERNAME, DOMAIN };
