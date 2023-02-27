import { AuthError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'

describe('Tests Facebook auth', () => {
  it('test LoadFacebookUserApi', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }

    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: '1234' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: '1234' })
  })
  it('test return error', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: '1234' })
    expect(authResult).toEqual(new AuthError())
  })
})
