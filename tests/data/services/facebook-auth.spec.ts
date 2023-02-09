import { AuthError } from '@/domain/errors'
import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
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
