module.exports = {
  page: {
    baseUrl: 'http://127.0.0.1:9005',
    title: 'React-Dashboard',
    port: 3000,
    token_secret: 'hellothere'
  },
  express: {
    host: '0.0.0.0',
    port: 8080
  },
  devServer: {
    publicPath: 'http://127.0.0.1:9005/static',
    host: '127.0.0.1',
    port: 9005,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    }
  },
  parse: {
    databaseURI: 'mongodb://localhost:27017/react',
    serverURL: 'http://localhost:8080/parse',
    appId: 'react-dashboard',
    masterKey: 'myb1gs3cret',
    email: {
      key: 'key-594e4a7262d18f7adf9edd7f035e680d'
    }
  },
  auth: {
    providers: {
      facebook: {
        id: '1495421584065697'
      },
      github: {
        id: '1cc2775bffaa43783ff8',
        secret: '7477913dfb02abdf2a48d3ea563b2c39a40e8b15',
        endpoints: {
          redirect: 'https://github.com/login/oauth/authorize?',
          validate: 'https://github.com/login/oauth/access_token'
        }
      }
    }
  }
}
