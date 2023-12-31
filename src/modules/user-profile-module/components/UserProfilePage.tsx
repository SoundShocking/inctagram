import React, { useEffect, useState } from 'react'

import { useGetQueryUserNameUserId, useWindowSize } from '@/common'
import { useUpdateUserCounts } from '@/common/hooks/followers-following/useUpdateUserCounts'
import { useOpenCloseModal } from '@/common/hooks/open-close-modal/useOpenCloseModal'
import { BusinessAccountIcon } from '@/components/icon/BusinessAccountIcon'
import {
  DuplicateUserNameDescription,
  InfoAboutProfilePage,
} from '@/components/info-about-profile-page'
import { useTranslation } from '@/components/translation'
import { SkeletonProfilePage } from '@/modules/my-profile-modules/profile-page-module'
import { LatestPosts } from '@/modules/post-modules/latest-posts-module'
import { useGetUserProfileData } from '@/modules/user-profile-module'
import { UserProfileButtons } from '@/modules/user-profile-module/components/UserProfileButtons'
import { useFollowingOrUnfollowingUser } from '@/services'
import { useUserStore } from '@/store'
import { StateModalFollowingFollowersType } from '@/types'
import { Avatar } from '@/ui'
import { ModalManagerFollowingFollowers } from 'src/components/following-followers-likes'

export const UserProfilePage = () => {
  const { userNameQuery } = useGetQueryUserNameUserId()
  const { userId: myUserID } = useUserStore()

  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const {
    userProfileData,
    userProfileAvatar,
    isRefetchingUserProfile,
    refetchUserProfile,
    isLoadingUserProfile,
  } = useGetUserProfileData(userNameQuery)
  const { useFollowUnfollowUser, isLoading: isLoadingButton } = useFollowingOrUnfollowingUser({
    refetch: refetchUserProfile,
    userId: currentUserId,
  })

  const { t } = useTranslation()
  const { onCloseClick, modalOpen, setModalOpen } =
    useOpenCloseModal<StateModalFollowingFollowersType>({})
  const isFollowing = userProfileData.isFollowing
  const userId = userProfileData.id || null
  const hideSubscriptionButtons = userId !== myUserID
  const handleToggleSubscriptionsCallBack = (userId: number | null) => {
    setCurrentUserId(userId)
    if (userId) {
      useFollowUnfollowUser()
    }
  }
  const { width } = useWindowSize()

  useUpdateUserCounts({
    followersCount: userProfileData.followersCount,
    followingCount: userProfileData.followingCount,
  })

  useEffect(() => {
    setModalOpen(null)
  }, [userNameQuery])

  return (
    <div className="flex w-full">
      <main className="grow">
        {!isLoadingUserProfile ? (
          <>
            <div className="flex xsm:gap-0 sm:gap-3 sm:items-center text-light-100 gap-9">
              <Avatar
                src={userProfileAvatar}
                alt={'photo'}
                className={
                  'xsm:w-[72px] xsm:mr-7 xsm:h-[72px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]'
                }
              />
              <div className="flex w-full flex-col gap-5">
                <div className="xsm:flex-col-reverse  sm:gap-5 md:gap-5 lg:gap-5 gap-5 w-full flex flex-col flex-wrap justify-between">
                  <div className="lg:flex-col justify-between lg:gap-5 flex items-center">
                    <div className="font-bold gap-3 flex break-all xsm:hidden sm:hidden md:hidden">
                      {userProfileData.userName}
                      {userProfileData.isBusinessAccount && <BusinessAccountIcon />}
                    </div>
                    <div className="md:flex-col flex gap-3">
                      {width && width >= 768 && (
                        <UserProfileButtons
                          hideSubscriptionButtons={hideSubscriptionButtons}
                          isFollowing={isFollowing}
                          isRefetchingUserProfile={isRefetchingUserProfile}
                          isLoadingButton={isLoadingButton}
                          handleToggleSubscriptionsCallBack={() =>
                            handleToggleSubscriptionsCallBack(userId)
                          }
                        />
                      )}
                    </div>
                  </div>
                  <InfoAboutProfilePage
                    t={t}
                    aboutMe={userProfileData.aboutMe}
                    publications={userProfileData.publicationsCount}
                    followers={userProfileData.followersCount}
                    following={userProfileData.followingCount}
                    setModalOpen={setModalOpen}
                  />
                </div>
              </div>
            </div>
            <ModalManagerFollowingFollowers isModalOpen={modalOpen} onClose={onCloseClick} />
            <DuplicateUserNameDescription
              userName={userProfileData.userName}
              aboutMe={userProfileData.aboutMe}
            />
            {width && width <= 768 && (
              <div className="flex w-full gap-3 flex-col">
                <UserProfileButtons
                  hideSubscriptionButtons={hideSubscriptionButtons}
                  isFollowing={isFollowing}
                  isRefetchingUserProfile={isRefetchingUserProfile}
                  isLoadingButton={isLoadingButton}
                  handleToggleSubscriptionsCallBack={() =>
                    handleToggleSubscriptionsCallBack(userId)
                  }
                />
              </div>
            )}
            <LatestPosts />
          </>
        ) : (
          <SkeletonProfilePage />
        )}
      </main>
    </div>
  )
}
