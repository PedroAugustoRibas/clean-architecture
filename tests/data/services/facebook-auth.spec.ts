import { AuthError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, type MockProxy } from 'jest-mock-extended'
import { type LoadFacebookUserApi } from '../contracts/apis'

type SutType = {
  sut: FacebookAuthenticationService
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
}
const makeSut = (): SutType => {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(loadFacebookUserApi)
  return {
    sut,
    loadFacebookUserApi
  }
}

describe('Tests Facebook auth', () => {
  it('test LoadFacebookUserApi', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    await sut.perform({ token: '1234' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: '1234' })
  })
  it('test return error', async () => {
    const { sut, loadFacebookUserApi } = makeSut()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token: '1234' })
    expect(authResult).toEqual(new AuthError())
  })
})
