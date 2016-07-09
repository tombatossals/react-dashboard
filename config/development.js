module.exports = {
  token_secret: 'hellothere',
  express: {
    host: '127.0.0.1',
    port: 3000,
    ssl: {
      cert: 'config/horizon-cert.pem',
      key: 'config/horizon-key.pem'
    }
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
  auth: {
    providers: {
      facebook: {
        id: '1495421584065697'
      },
      github: {
        id: '1cc2775bffaa43783ff8',
        secret: 'e7997508fc3d7a8138c1023da8c7f6d9317a57f7',
        endpoints: {
          redirect: 'https://github.com/login/oauth/authorize?',
          validate: 'https://github.com/login/oauth/access_token'
        }
      }
    }
  }
}
