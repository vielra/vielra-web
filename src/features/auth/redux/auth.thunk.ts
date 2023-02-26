import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRequestLogin } from '@/features/auth/interfaces'
import { authApi } from '@/features/auth/api'

const auth_login = createAsyncThunk(
  '@auth/login',
  async (body: IRequestLogin, { rejectWithValue }) => {
    try {
      const response = await authApi.loginWithEmail(body)
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export { auth_login }
