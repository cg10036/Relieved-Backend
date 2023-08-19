const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db.sqlite3");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS `report` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `lat` REAL, `lng` REAL, `detail` TEXT)"
  );
});

module.exports = db;
