import { ParseServer } from 'parse-server';
import config from 'config';

const PORT = config.get('express.port');
const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/react', // Connection string for your MongoDB database
  cloud: `${__dirname}/routes/main.js`, // Absolute path to your Cloud Code
  appId: 'react-dashboard',
  masterKey: 'myb1gs3cret',
  serverURL: `http://localhost:${PORT}/parse`, // Don't forget to change to https if needed
});

export default api;
