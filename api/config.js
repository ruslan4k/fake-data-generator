const config = {
  local: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:3600',
  },
  development: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:3600',
  },
  production: {
    APP_URL: 'https://fakedata.rk-projects.dev',
    API_URL: 'https://api.fakedata.rk-projects.dev',
  },
};

module.exports = config;
