import request from '../../helpers/requestHelper';

// eslint-disable-next-line import/prefer-default-export
export const getDataGenerationEventsHistory = (page = 0) => request(`/data/history?page=${page}`);
export const generateData = (columns, rowsToGenerateNumber) =>
  request('/data/generate', 'post', { columns, rowsToGenerateNumber });
