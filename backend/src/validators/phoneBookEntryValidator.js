module.exports = class PhoneBookEntryValidator {
    static validate(phoneBookEntry) {
        return phoneBookEntry.name && phoneBookEntry.phoneNumber
    }
}
