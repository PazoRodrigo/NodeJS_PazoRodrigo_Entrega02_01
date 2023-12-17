const { Guid } = require("js-guid");

// LUM - Librería de usos múltiples
class LUM {
  static getCurrentDateTime() {
    const dateTime = new Date();
    return dateTime.toLocaleDateString();
  }

  static getNewId() {
    return Guid.newGuid();
  }
}

module.exports = LUM;
