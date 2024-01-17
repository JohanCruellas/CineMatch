import { LocalStorage } from "quasar";
class AuthHeader {
  getToken() {
    return LocalStorage.getItem('token')
  }

  getUser() {
    return LocalStorage.getItem('user')
  }

  getHeader() {
    const token = this.getToken()
    const user = this.getUser()
    if (token) {
      return {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'x-access-user': user,
      }
    }
    return {}
  }
}

export default AuthHeader
