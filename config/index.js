var environment = process.env.NODE_ENV || 'development'
const config = require(`./${environment}`)

export default config
