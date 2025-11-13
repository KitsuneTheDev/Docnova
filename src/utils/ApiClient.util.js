export default class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;        
    }

    async post(endpoint, body, token) {
        if(!body) {
            console.error("A body is required for the post request.");
            return;
        } else {
            const response = await this.#send(endpoint, "POST", body, token);
            return response;
        }   
    }

    async #send(endpoint, method, body = null, token = null) {
        const options = {
            method,
            headers: {},
        }

        if(body !== null) {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        if(token) {
            options.headers['R-Auth'] = token;
        }

        try {
            console.log(`${this.baseURL}${endpoint}`, options);
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if(!response.ok) {
                throw new Error(`Fetch Error: ${response.statusText}`);
            } else {
                const data = await response.json();
                return data;
            }
        } catch(error) {
            console.error("An error occurred while fetching: ", error);
        }
    }
}