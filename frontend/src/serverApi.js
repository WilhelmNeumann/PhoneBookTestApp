import axios from 'axios'

class PhoneBookEntriesApi {
    /**
     * A set of methods for getting phone book entries
     * @param url: server address
     */
    constructor(url) {
        this.url = url + '/phone'
    }

    async getAll() {
        const response = await axios.get(this.url + `/getAll`)
        return response.data.payload
    }

    async add(phoneBookEntry) {
        const response = await axios.post(this.url + `/add`, phoneBookEntry)
        return response.data
    }

    async delete(phoneBookEntry) {
        const response = await axios.post(this.url + `/delete`, phoneBookEntry)
        return response.data
    }
}

export default class ServerApi {
    constructor(config) {
        this.phoneBookEntries = new PhoneBookEntriesApi(config.url)
    }
}
