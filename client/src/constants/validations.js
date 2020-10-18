import * as yup from 'yup';

export const nameValidation = yup.string().required('This field is required.');

export const emailValidation = yup.string().email('Email format is invalid').required('This field is required');

export const passwordValidation = yup.string().required('This field is required.');
