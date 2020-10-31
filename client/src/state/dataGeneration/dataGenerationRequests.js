import request from '../../helpers/requestHelper';

// eslint-disable-next-line import/prefer-default-export
export const getDataGenerationEventsHistory = () => request('/data/history');
export const generateData = (columns, rowsToGenerateNumber) =>
  request('/data/generate', 'post', { columns, rowsToGenerateNumber });
