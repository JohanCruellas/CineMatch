import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class RoleService {
    async getAll() {
        return await api.get(`/role/`, {
            headers: new AuthHeader().getHeader()
        })
    }

    async update(userId, roles) {
        return await api.put(`/role/${userId}`, {
            roles: roles
        }, {
            headers: new AuthHeader().getHeader()
        })
    }
}

export default new RoleService()