import { type FacebookAuthentication } from '@/domain/features'
class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUserByToken(params.token)
  }
}
interface LoadFacebookUserByTokenApi {
  loadUserByToken: (toke: string) => Promise<void>
}
class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserByTokenApi {
  token?: string
  async loadUserByToken (token: string): Promise<void> {
    this.token = token
  }
}
describe('Tests Facebook auth', () => {
  it('', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserByTokenApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.perform({ token: 'asdasd' })
    expect(loadFacebookUserByTokenApi.token).toBe('asdasd')
  })
})
