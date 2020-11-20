const config = {
  test: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:3600',
  },
  local: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:3600',
  },
  development: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:3600',
  },
  production: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
  },
};

module.exports = config;
