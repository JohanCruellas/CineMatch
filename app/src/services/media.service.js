import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'

class MediaService {
    async discover(page = 1) {
        // const response = await api.get(`/media/discover`, {
        //     params: {
        //         page: page
        //     },
        //     headers: new AuthHeader().getHeader()
        // })
        // return response
        return await api.get(`/media/discover`, {
            params: {
                page: page
            },
            headers: new AuthHeader().getHeader()
        })
    }
}

export default new MediaService()