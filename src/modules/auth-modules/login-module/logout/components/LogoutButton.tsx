import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { FaSignOutAlt } from 'react-icons/fa'

import { Confirm } from '@/components/modals/confirm/Confirm'
import { useTranslation } from '@/components/translation'
import { useLogoutMutation } from '@/modules/auth-modules/login-module/logout/hooks/useLogout'
import { routes } from '@/routing/router'
import { useMeQuery } from '@/services/hookMe'

export const LogoutButton: FC = () => {
  const router = useRouter()
  const { data, isError, isLoading } = useMeQuery()
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirmModal = () => {
    sendLogout()
  }

  const onDeclineModal = () => {
    setIsModalOpen(false)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    setIsModalOpen(false)

    router.push(routes.auth.login)
  }

  const { sendLogout } = useLogoutMutation(handleLogout)

  if (isLoading || isError || !data) return null

  return (
    <div className="">
      <button onClick={() => setIsModalOpen(true)} className="flex items-center">
        <FaSignOutAlt className="ml-1 mr-4 xsm:w-[24px] xsm:mr-[12px] xsm:h-[24px]" />
        <span className="sm:hidden">{t.navBar.logout}</span>
      </button>

      <Confirm
        isOpen={isModalOpen}
        onConfirm={onConfirmModal}
        onDecline={onDeclineModal}
        onClose={onCloseModal}
        title="Log Out"
        text={`Are you really want to log out of your account "${data.data?.email}"?`}
      />
    </div>
  )
}
