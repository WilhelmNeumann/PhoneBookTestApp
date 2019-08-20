import axios from 'axios'

const endpoint = 'http://localhost:8080/api/phone'

export default class ServerApi {
    constructor(config) {
        this.endpoint = config.endpoint
    }

    async getAll() {
        const response = await axios.get(`${endpoint}/getAll`)
        return response.data.payload
    }

    async add(phoneBookEntry) {
        const response = await axios.post(`${endpoint}/add`, phoneBookEntry)
        return response.data
    }

    async delete(phoneBookEntry) {
        const response = await axios.post(`${endpoint}/delete`, phoneBookEntry)
        return response.data
    }
}
