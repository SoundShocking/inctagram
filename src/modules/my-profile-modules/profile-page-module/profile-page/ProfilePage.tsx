import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import settings from '../../../../assets/icons/settings.svg'

import { useTranslation } from '@/components/translation'
import { useGetProfile } from '@/modules/my-profile-modules/settings-edit-profile-module'
import { Avatar, GlobalButton } from '@/ui'
import { LatestPosts } from 'src/modules/post-modules/latest-posts-module'

export const ProfilePage = () => {
  const { push } = useRouter()
  const { profileData, profileAvatar } = useGetProfile()
  const { t } = useTranslation()
  const userName = profileData && profileData.userName
  const aboutMe = profileData && profileData.aboutMe
  const avatar = profileAvatar && profileAvatar
  const onRedirectToSetting = () => push('/profile-page/settings/edit')

  return (
    <div className="flex w-full">
      <main className="pr-16 grow">
        <div className="flex text-light-100 gap-9">
          <Avatar src={avatar} alt={'photo'} />
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold">{userName}</div>
              <GlobalButton
                className={'md:px-3 text-base bg-dark-300 font-semibold'}
                type={'button'}
                variant={'grey'}
                callback={onRedirectToSetting}
              >
                <span className={'md:hidden'}>{t.profile.profilePage.buttonProfileSettings}</span>
                <Image
                  className={'md:visible invisible'}
                  src={settings}
                  alt={'settings'}
                  height={24}
                  width={24}
                />
              </GlobalButton>
            </div>
            <div className="flex gap-[72px] md:gap-[20px] flex-wrap">
              <div className="text-sm">
                <div className="font-bold">2 218</div>
                <span>{t.profile.profilePage.following}</span>
              </div>
              <div className="text-sm">
                <div className="font-bold">2 358</div>
                <span>{t.profile.profilePage.followers}</span>
              </div>
              <div className="text-sm">
                <div className="font-bold">2 764</div>
                <span className="break-words">{t.profile.profilePage.Publications}</span>
              </div>
            </div>
            <div className="w-full">
              <p className="text-base break-all">{aboutMe}</p>
            </div>
          </div>
        </div>

        <LatestPosts />
      </main>
    </div>
  )
}