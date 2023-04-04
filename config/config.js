require('dotenv').config()
exports.dbconfig = {
  "development": {
    "username": process.env.DB_USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "operatorsAliases": process.env.DB_OPERATION_ALIASES,
    "pool": {
      "max": +process.env.DB_POOL_MAX,
      "min": +process.env.DB_POOL_MIN,
      "idleTimeoutMillis": process.env.DB_POOL_IDLE_TIMEOUT_MILLIS,
    },
    "dialectOptions": {
      "useUTC": process.env.DB_USE_UTC,
    },
    "timezone": process.env.DB_TIMEZONE,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
