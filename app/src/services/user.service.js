import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'


class UserService {
    async login(username, password) {
        const response = await api.post(`/user/login`, {
            username: username,
            password: password
        })
        return response
    }
    async logout() {
        const response = await api.post(`/user/logout`, {}, { headers: AuthHeader() })
        return response
    }
    async create(username, email, password) {
        const response = await api.post(`/user`, {
            username: username,
            email: email,
            password: password
        })
        return response
    }

    async delete(id) {
        return await api.delete(`/user/${id}`, {
            headers: new AuthHeader().getHeader()
        })
    }

    async getAll(userFilters) {
        return await api.get(`/user`, {
            params: {
                username: userFilters?.username
            },
            headers: new AuthHeader().getHeader()
        })
    }

}

export default new UserService()