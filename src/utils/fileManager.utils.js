//Importo en us constante el módulo de FileSystem
const fs = require("node:fs");
const LUM = require("./lum.utils");

// Agrego variable para LOG
const fechaLog = LUM.getCurrentDateTime();

class FileManager {
  // Contructor
  constructor(myPath) {
    this.path = process.cwd() + "/src/persistence/" + myPath + ".json";
  }

  async existFile() {
    return await fs.existsSync(this.path);
  }

  async writeFile(datos) {
    const content = JSON.stringify(datos, null, 2);
    console.log(
      `${fechaLog} ## FileManager.writeFile.content.length: ${content.length}`
    );
    fs.promises.writeFile(this.path, JSON.stringify(datos, null, "\t"));
    console.log(
      `${fechaLog} ## FileManager.writeFile.content.length: ${content.length}`
    );
  }

  async readFile() {
    let data = [];
    try {
      if (this.existFile()) {
        const rowdata = fs.readFileSync(this.path);
        data = JSON.parse(rowdata);
        console.log(
          `${fechaLog} ## FileManager.readFile.data.length: ${data.length}`
        );
      }
    } catch (error) {}
    return data;
  }
}

module.exports = FileManager;
