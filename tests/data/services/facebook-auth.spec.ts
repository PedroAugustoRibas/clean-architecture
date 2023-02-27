import { AuthError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type LoadFacebookUserApi } from '../contracts/apis'

describe('Tests Facebook auth', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  beforeEach(() => {
    loadFacebookUserApi = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi)
  })
  it('test LoadFacebookUserApi', async () => {
    await sut.perform({ token: '1234' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: '1234' })
  })
  it('test return error', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: '1234' })
    expect(authResult).toEqual(new AuthError())
  })
})
