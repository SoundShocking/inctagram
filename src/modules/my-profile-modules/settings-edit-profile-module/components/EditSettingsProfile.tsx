import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { ResponseError } from '@/common'
import { SettingsAccountLayout } from '@/components/account'
import { UploadAvatarBlock } from '@/modules/my-profile-modules/avatar-module'
import {
  AccountSettingForm,
  editAccountData,
  useGetProfile,
} from '@/modules/my-profile-modules/settings-edit-profile-module'
import { SkeletonEditSettingsProfile } from '@/ui'

export const EditSettingProfile = () => {
  const client = useQueryClient()

  const { profileData, isLoading: isProfileLoading, profileAvatar } = useGetProfile()

  const { mutate: editeProfile, isLoading: isEditProfileLoading } = useMutation({
    mutationFn: editAccountData,
    onSuccess: async () => {
      toast.success('Profile was updated')
      await client.invalidateQueries(['get-profile-page'])
    },
    onError: async (error: ResponseError) => {
      const messages = error?.response?.data?.messages

      if (!messages) {
        toast.error('An error occurred while updating your profile-page')
      } else {
        messages.forEach(({ message }) => {
          toast.error(message)
        })
      }

      await client.invalidateQueries(['get-profile-page'])
    },
  })

  const editProfileData = (data: any) => editeProfile?.(data)

  return (
    <SettingsAccountLayout>
      {isProfileLoading || isEditProfileLoading ? (
        <SkeletonEditSettingsProfile />
      ) : (
        <div className="w-full xsm:flex xsm:flex-col sm:flex-col flex gap-10">
          <div className="w-full xsm:flex justify-center sm:flex sm:justify-center sm:items-center  ">
            <UploadAvatarBlock avatarUrl={profileAvatar} />
          </div>
          <AccountSettingForm onSubmit={editProfileData} initialProfileData={profileData} />
        </div>
      )}
    </SettingsAccountLayout>
  )
}
