const Sequelize = require("sequelize")
const db = new Sequelize(
    'postgres://kfaeiigq:9yx6Bd-MpMVZ3e5zGxDtn-nilATGdnjP@fanny.db.elephantsql.com/kfaeiigq'
)

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports = db;