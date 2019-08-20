module.exports = class PhoneBookEntryValidator {
    /**
     * Check the validity of the object PhoneBookEntry
     * @param phoneBookEntry - object to validate
     * @returns {boolean} - is the object valid or not
     */
    static validate(phoneBookEntry) {
        return !!phoneBookEntry.name && !!phoneBookEntry.phoneNumber
    }
}
