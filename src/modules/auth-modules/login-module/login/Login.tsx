import React from 'react'

import Link from 'next/link'

import { FormLayout } from '@/components/FormLayout'
import { useTranslation } from '@/components/translation'
import { LoginForm, GoogleGithubLogin } from '@/modules/auth-modules/login-module'
import { NameTitle } from '@/ui'

export const Login = ({}) => {
  const { t } = useTranslation()

  return (
    <FormLayout className="mt-[60px]">
      <NameTitle
        nameTitle={t.auth.singIn}
        className={'font-bold text-light-100 text-xl leading-9 mb-[12px]'}
      />
      <GoogleGithubLogin />
      <LoginForm />
      <span className="pb-[12px] text-[16px] leading-[24px] text-light-100 font-normal">
        {t.auth.login.haveAccount}
      </span>
      <Link
        href={'/auth/registration'}
        className="font-semibold text-[16px] leading-[24px] text-accent-500"
      >
        {t.auth.signUp}
      </Link>
    </FormLayout>
  )
}
