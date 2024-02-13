import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class ListService {
    async getAll(userId) {
        return await api.get(`/list/`, {
            params: {
                userId: userId
            },
            headers: new AuthHeader().getHeader()
        })
    }
    async update(list) {
        return await api.put(`/list/${list.id}`, {
            ...list
        }, {
            headers: new AuthHeader().getHeader()
        });
    }
}

export default new ListService()