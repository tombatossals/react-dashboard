import { ParseServer } from 'parse-server';

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: `${__dirname}/cloud/main.js`, // Absolute path to your Cloud Code
  appId: 'react-dashboard',
  masterKey: 'myb1gs3cret',
  serverURL: `http://localhost:${PORT}/parse`, // Don't forget to change to https if needed
});

export default api;
