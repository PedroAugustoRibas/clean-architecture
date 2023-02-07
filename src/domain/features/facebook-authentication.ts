import { type AccessToken } from '@/domain/models'
import { type AuthError } from '@/domain/errors'

export interface FacebookAuthentication {
  perform: (param: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }
  export type Result = AccessToken | AuthError
}
