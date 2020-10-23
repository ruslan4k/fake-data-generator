export const LAST_NAME = 'lastName';
export const FIRST_NAME = 'firstName';
export const EMAIL = 'email';
export const UUID = 'uuid';
export const BOOLEAN = 'boolean';
export const NUMBER = 'number';
export const FULL_NAME = 'fullName';
export const USERNAME = 'username';

const dataTypes = [
  {
    type: FIRST_NAME,
    label: 'First Name',
    order: 0,
  },
  {
    type: LAST_NAME,
    label: 'Last Name',
    order: 0,
  },
  {
    type: FULL_NAME,
    label: 'Full Name',
    order: 1,
  },
  {
    type: USERNAME,
    label: 'Username',
    order: 1,
  },
  {
    type: EMAIL,
    label: 'Email',
    order: 1,
  },
  {
    type: UUID,
    label: 'UUID',
    order: 1,
  },
  {
    type: BOOLEAN,
    label: 'Boolean',
    order: 1,
  },
  {
    type: NUMBER,
    label: 'Number',
    order: 1,
  },
];

export default dataTypes;
