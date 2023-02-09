import { type FacebookAuthentication } from '@/domain/features'
import { AuthError } from '@/domain/errors'

class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthError()
  }
}
namespace LoadFacebookUserByTokenApi {
  export type Params = {
    token: string
  }
  export type Result = undefined
}
interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserByTokenApi.Params) => Promise<LoadFacebookUserByTokenApi.Result>
}
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserByTokenApi.Params): Promise<LoadFacebookUserByTokenApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('Tests Facebook auth', () => {
  it('test LoadFacebookUserApi', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: 'asdasd' })
    expect(loadFacebookUserApi.token).toBe('asdasd')
  })
  it('test return error', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: 'asdasd' })
    expect(authResult).toEqual(new AuthError())
  })
})
