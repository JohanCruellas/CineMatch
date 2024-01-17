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

}

export default new UserService()