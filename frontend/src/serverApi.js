import axios from 'axios'

const endpoint = 'http://localhost:8080/api/phone'

export default class ServerApi {
    constructor(config) {
        this.endpoint = config.endpoint


    }

    async getAll() {
        const result = await axios.get(`${endpoint}/getAll`)
        console.log(result)
        return result
    }
}
