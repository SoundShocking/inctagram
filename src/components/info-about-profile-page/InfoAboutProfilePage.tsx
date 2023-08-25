import React, { Dispatch, SetStateAction } from 'react'

import { LocaleType } from '@/components/translation'
import { StateModalFollowingFollowersType } from '@/types'

interface InfoAboutProfilePageInterface {
  t: LocaleType
  aboutMe: string
  following: number
  followers: number
  publications: number
  setModalOpen?: Dispatch<SetStateAction<StateModalFollowingFollowersType>>
}
export const InfoAboutProfilePage = ({
  t,
  aboutMe,
  following,
  followers,
  publications,
  setModalOpen,
}: InfoAboutProfilePageInterface) => {
  const about = aboutMe ? aboutMe : 'No description'

  return (
    <>
      <div className="flex xsm:gap-3 sm:gap-3 md:gap-6 lg:gap-10 gap-20 flex-wrap">
        <div className="text-sm leading-6 font-normal">
          <div className="font-bold">{following}</div>
          <span
            className="linkText"
            onClick={() => (setModalOpen ? setModalOpen('Following') : null)}
          >
            {t.profile.profilePage.following}
          </span>
        </div>
        <div className="text-sm leading-6 font-normal">
          <div className="font-bold">{followers}</div>
          <span
            className="linkText"
            onClick={() => (setModalOpen ? setModalOpen('Followers') : null)}
          >
            {t.profile.profilePage.followers}
          </span>
        </div>
        <div className="text-sm leading-6 font-normal">
          <div className="font-bold">{publications}</div>
          <span className="break-words break-all">{t.profile.profilePage.Publications}</span>
        </div>
      </div>
      <div className="w-full xsm:hidden sm:hidden md:hidden">
        <p className="text-sm leading-6 font-normal break-all">{about}</p>
      </div>
    </>
  )
}