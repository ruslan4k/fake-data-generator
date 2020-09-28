import request from '../../helpers/requestHelper';

// eslint-disable-next-line import/prefer-default-export
export const getDataGenerationEventsHistory = () => request('/data/history');
export const saveDataGenerationEvent = ({ columns, rowsToGenerateNumber }) =>
  request('/data/history', 'post', { columns, rowsToGenerateNumber });
