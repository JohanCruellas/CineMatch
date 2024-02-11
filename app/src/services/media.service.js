import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class MediaService {
    async discover(page = 1) {
        return await api.get(`/media/discover`, {
            params: {
                page: page
            },
            headers: new AuthHeader().getHeader()
        })
    }
}

export default new MediaService()