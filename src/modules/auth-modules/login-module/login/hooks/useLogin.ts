import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  meSendRequest,
  sendLoginRequest,
} from '@/modules/auth-modules/login-module/login/api/loginAPI'

export const useLoginMutation = (
  onSuccess: () => void,
  setCustomError: () => void,
  reset: () => void
) => {
  const client = useQueryClient()
  const {
    data,
    isLoading,
    variables,
    mutate: sendLoginData,
  } = useMutation({
    mutationFn: sendLoginRequest,
    mutationKey: ['login'],
    onSuccess: data => {
      const { accessToken } = data.data

      localStorage.setItem('accessToken', accessToken)
      onSuccess()
      reset()

      client.invalidateQueries(['me'])
      toast.success('Success')
    },
    onError: () => {
      setCustomError()
      toast.error('Error')
    },
  })
  const meQuery = useMeQuery()

  return {
    data,
    sendLoginData,
    variables,
    isLoading,
    meData: meQuery.data?.data,
  }
}

const useMeQuery = () => {
  return useQuery({
    queryFn: meSendRequest,
    queryKey: ['me'],
    retry: false,
  })
}
