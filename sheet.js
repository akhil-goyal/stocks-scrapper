const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {

    constructor() {
        this.doc = new GoogleSpreadsheet('1kswl-tfCIoeTMbHHH08VVW8QdGZy1EMevjWnXHk0cIc');
    }

    async load() {
        await this.doc.useServiceAccountAuth(require('./credentials.json'));
        await this.doc.loadInfo();
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }

}