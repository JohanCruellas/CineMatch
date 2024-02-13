import { LocalStorage } from "quasar";
class AuthHeader {
  getToken() {
    return LocalStorage.getItem('token')
  }

  getHeader() {
    const token = this.getToken()
    if (token) {
      return {
        'Content-Type': 'application/json',
        'x-access-token': token,
      }
    }
    return {}
  }
}

export default AuthHeader
