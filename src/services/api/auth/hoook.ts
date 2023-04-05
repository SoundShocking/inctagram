import { useMutation } from '@tanstack/react-query'

import { authAPI } from '@/services/api/auth/authAPI'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authAPI.login,
  })
}

export const useCreateNewPasswordMutation = () => {
  return useMutation({
    mutationFn: authAPI.createNewPassword,
  })
}