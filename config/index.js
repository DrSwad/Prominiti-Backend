const path = require('path')
const rootPath = path.normalize(path.join(__dirname, '..'))
const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    env,
  },

  test: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    env,
  },

  production: {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    env,
  },
}

module.exports = config[env]
