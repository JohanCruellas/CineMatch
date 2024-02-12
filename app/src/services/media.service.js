import { api } from 'src/boot/axios'
import AuthHeader from './auth.header'
import qs from 'qs'

class MediaService {
    async discover(page = 1, filters) {
        return await api.get(`/media/discover`, {
            params: {
                page: page,
                genres : filters.genres?.map(genre => genre.value),
                releaseYearMin : filters.releaseYearMin,
                rating : filters.rating,
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            },
            headers: new AuthHeader().getHeader()
        })
    }

    async genres() {
        return await api.get(`/media/genres`, {
            headers: new AuthHeader().getHeader()
        })
    }

    async search(searchStr, page) {
        return await api.get(`/media/search`, {
            params : {
                searchStr : searchStr,
                page : page
            },
            headers : new AuthHeader().getHeader()
        })
    }
}

export default new MediaService()