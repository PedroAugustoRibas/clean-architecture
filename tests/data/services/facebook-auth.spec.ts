import { AuthError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock } from 'jest-mock-extended'
import { type LoadFacebookUserApi } from '../contracts/apis'

describe('Tests Facebook auth', () => {
  it('test LoadFacebookUserApi', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({ token: '1234' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: '1234' })
  })
  it('test return error', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({ token: '1234' })
    expect(authResult).toEqual(new AuthError())
  })
})
