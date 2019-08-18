import axios from 'axios'

const endpoint = 'http://localhost:8080/api/phone'

export default class ServerApi {
    constructor(config) {
        this.endpoint = config.endpoint
    }

    async getAll() {
        const response = await fetch(`${endpoint}/getAll`)
        return response.json()
    }

    async add(phoneBookEntry) {
        const resp = await fetch(`${endpoint}/add`, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(phoneBookEntry)
        })
        return true
    }

    async delete(phoneBookEntry) {
        const resp = await fetch(`${endpoint}/delete`, {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(phoneBookEntry)
        })

        return true
    }
}
