const path = require('path')

export default {
  webpack: path.join(__dirname, 'webpack'),
  assets: path.join(__dirname, 'webpack', 'assets'),
  source: path.join(__dirname, '../src')
}
