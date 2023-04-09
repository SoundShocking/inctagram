import React from 'react'

import { useRouter } from 'next/router'

import { useGlobalForm } from '@/common'
import ResendVerificationForm from '@/components/AuthComponents/resend-verification-form/ResendVerificationForm'
import {
  FormDataVerification,
  verificationSchema,
} from '@/modules/auth-modules/registraion-module/resend-verification-form/constants/verificationSchema'
import { useSendVerifyEmailMutation } from '@/modules/auth-modules/registraion-module/resend-verification-form/hooks/useSendVerifyEmailMutation'

export const ResendVerificationEmail = () => {
  const { push } = useRouter()

  const { handleSubmit, register, reset, setCustomError, errors } =
    useGlobalForm(verificationSchema)

  const { isLoading, resendVerification } = useSendVerifyEmailMutation(setCustomError, reset, push)

  const submitData = (data: FormDataVerification) => {
    resendVerification(data)
  }

  return (
    <ResendVerificationForm
      isLoading={isLoading}
      submitData={submitData}
      handleSubmit={handleSubmit}
      error={errors?.email?.message}
      register={register}
    />
  )
}