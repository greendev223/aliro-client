
const BASE_API_URL = 'https://aliro-flask.herokuapp.com';
export default class ApiClient {
    constructor() {
        this.base_url = BASE_API_URL + '/api';
    }

    async request(options) {
        let response;
        try {
            response = await fetch(this.base_url + options.url, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                body: options.body ? JSON.stringify(options.body) : null,
            });
        }
        catch (error) {
            response = {
                ok: false,
                status: 500,
                json: async () => {
                    return {
                        code: 500,
                        message: 'The server is unresponsive',
                        description: error.toString(),
                    };
                }
            }
        }
        return {
            ok: response.ok,
            status: response.status,
            body: response.status === 200 ? await response.json() : null
        };
    }

    async get(url, options) {
        return this.request({ method: 'GET', url, ...options });
    }

    async post(url, body, options) {
        return this.request({ method: 'POST', url, body, ...options });
    }

    async put(url, body, options) {
        return this.request({ method: 'PUT', url, body, ...options });
    }

    async delete(url, options) {
        return this.request({ method: 'DELETE', url, ...options });
    }

    async login(email, password) {
        const body = {
            "email": email,
            "password": password
        }
        const response = await this.post('https://aliro-flask.herokuapp.com/login', body);
        if (!response.ok) {
            return response.status === 401 ? 'fail' : 'error';
        }
        // localStorage.setItem('accessToken', response.body.access_token);
        localStorage.setItem('email', response.body.user);
        // navigate('/home');
        return response;
    }

    async logout() {
        // await this.delete('/tokens');
        localStorage.removeItem('email');
    }

    isAuthenticated() {
        return localStorage.getItem('email') !== null;
    }
}