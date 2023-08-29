import React, { Dispatch, SetStateAction } from 'react'

import { useGetQueryUserNameUserId } from '@/common'
import { useModal } from '@/common/hooks/useModal'
import {
  DeleteUserButton,
  FollowUnfollowButton,
  URLUsernameForModal,
} from '@/components/following-followers'
import { Confirm } from '@/components/modals'
import { useTranslation } from '@/components/translation'
import { FollowingsFollowersType, FollowUnfollowButtonPropsInterface } from '@/types'

type FollowingUsersProps = {
  items: FollowingsFollowersType[]
  setCurrentDeleteUserId: Dispatch<SetStateAction<number | null>>
  currentUserId: number | null
  isLoadingDeleteUser: boolean
  handleToggleSubscriptionsCallBack: (userId: number) => void
  deleteUserCallBack: () => void
  currentDeleteUserId: any
} & Omit<FollowUnfollowButtonPropsInterface, 'isFollowing' | 'handleToggleSubscriptionsCallBack'>

export const FollowersUsers = ({
  items,
  currentUserId,
  currentDeleteUserId,
  isLoadingDeleteUser,
  handleToggleSubscriptionsCallBack,
  isRefetching,
  isLoadingButton,
  setCurrentDeleteUserId,
  deleteUserCallBack,
}: FollowingUsersProps) => {
  const { isModalOpen, setIsModalOpen, onConfirmModal, onDeclineModal } = useModal({
    callBack: () => deleteUserCallBack(),
  })
  const { t } = useTranslation()
  const { userIdQuery } = useGetQueryUserNameUserId()

  return (
    <>
      {items.map((user: FollowingsFollowersType, index) => (
        <div className="flex items-center align-middle justify-between" key={user.userId}>
          <URLUsernameForModal
            avatartSrc={user.avatars?.thumbnail.url || null}
            userName={user.userName}
          />
          {!userIdQuery && (
            <>
              {!user.isFollowing && (
                <FollowUnfollowButton
                  key={index}
                  isFollowing={user.isFollowing}
                  handleToggleSubscriptionsCallBack={() =>
                    handleToggleSubscriptionsCallBack(user.userId)
                  }
                  isLoadingButton={currentUserId === user.userId && isLoadingButton}
                  isRefetching={currentUserId === user.userId && isRefetching}
                />
              )}
              <Confirm
                isOpen={isModalOpen}
                onConfirm={() => onConfirmModal({ value: user.userId })}
                onDecline={onDeclineModal}
                onClose={onDeclineModal}
                title={t.profile.profilePage.confirmTitleDeleteFollowing}
                text={`${t.profile.profilePage.confirmDescriptionDeleteFollowing} ${user.userName}"?`}
              />
              <DeleteUserButton
                disabled={user.userId === currentDeleteUserId && isLoadingDeleteUser}
                userId={user.userId}
                setCurrentDeleteUserId={setCurrentDeleteUserId}
                setIsModalOpen={setIsModalOpen}
              />
            </>
          )}
        </div>
      ))}
    </>
  )
}
