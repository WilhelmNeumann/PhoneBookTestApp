const DataBase = require('./dataAccessLayer/dataBase')

module.exports = class Synchronizer {
    static async updateDataBase(newData) {
        for (let i = 0; i < newData.length; i++) {
            const newPhoneBookEntry = newData[i]
            const phoneBookEntry = await DataBase.phoneBookEntries.getByPersonName(newPhoneBookEntry.name)
            if (phoneBookEntry) {
                await DataBase.phoneBookEntries.update(newPhoneBookEntry)
            } else {
                await DataBase.phoneBookEntries.add(newPhoneBookEntry)
            }
        }
    }
}
