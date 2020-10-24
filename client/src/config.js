const config = {
  local: {
    API_URL: 'http://localhost:3600',
  },
  development: {
    API_URL: 'http://localhost:3600',
  },
  production: {
    API_URL: process.env.REACT_APP_PRODUCTION_API_URL,
  },
};

export default config;
