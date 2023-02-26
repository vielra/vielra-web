import { IRequestLogin, IResponseLogin } from '@/features/auth/interfaces'
import { HttpClient } from '@/features/app/http'

const authApi = {
  loginWithEmail: async (body: IRequestLogin): Promise<IResponseLogin> => {
    const response = await HttpClient.post('/auth/login', body)
    return response.data
  },
}

export { authApi }
