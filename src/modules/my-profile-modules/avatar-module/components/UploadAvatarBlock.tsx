import React, { useState } from 'react'

import { ModalWithContent } from '@/components/modals'
import { useStoreAvatarBlockModal } from '@/components/modals/store'
import { useTranslation } from '@/components/translation'
import { PhotoSelector, ProfileAvatarEditor } from '@/modules/my-profile-modules/avatar-module'
import { DeleteAvatarButton } from '@/modules/my-profile-modules/avatar-module/components/avatar-delete-button/DeleteButton'
import { useDeleteAvatar } from '@/modules/my-profile-modules/avatar-module/hooks/useDeleteAvatar'
import { useUploadAvatar } from '@/modules/my-profile-modules/avatar-module/hooks/useUploadAvatar'
// eslint-disable-next-line import/namespace
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'
import { Avatar, GlobalButton, Preloader } from '@/ui'

type PropsType = {
  avatarUrl?: string
}
export const UploadAvatarBlock = ({ avatarUrl = '' }: PropsType) => {
  const UploadAvatarBlockModal = useStoreAvatarBlockModal()
  const [avatar, setAvatar] = useState(avatarUrl)
  const { imagesSelector, setImageSelector } = useImageSelector()
  const { t } = useTranslation()
  const [selectedPhoto, setSelectedPhoto] = useState<string | File | null>('')

  const handleAddPhoto = (photos: IPhoto[]) => {
    const uniquePhotos = photos.filter(
      photo => !imagesSelector.some(item => item.url === photo.url)
    )

    if (uniquePhotos.length > 0) {
      setSelectedPhoto(uniquePhotos[0].file)
      setImageSelector([uniquePhotos[0]])
    }
  }

  const onDeleteSuccess = () => {
    setAvatar('')
  }

  const onUploadSuccess = (avatar: string) => {
    setAvatar(avatar)
    UploadAvatarBlockModal.setIsModalOpen(false)
  }

  const { isLoading: isLoadingDeleteAvatar, mutate: deleteAvatar } =
    useDeleteAvatar(onDeleteSuccess)

  const { isLoading: isLoadingUploadAvatar, mutate: uploadAvatar } =
    useUploadAvatar(onUploadSuccess)

  const isDisabled = isLoadingUploadAvatar || isLoadingDeleteAvatar
  const isAvatarShown = avatar ? avatar : ''

  const onCloseClick = () => {
    setSelectedPhoto('')
    UploadAvatarBlockModal.setIsModalOpen(false)
  }

  const onSaveClick = (formData: File) => {
    uploadAvatar(formData)
    UploadAvatarBlockModal.setIsModalOpen(false)
    setSelectedPhoto('')
  }

  const onAddPhotoClick = () => {
    UploadAvatarBlockModal.setIsModalOpen(true)
  }

  const onDeleteAvatarClick = () => {
    deleteAvatar()
  }

  if (isLoadingUploadAvatar || isLoadingDeleteAvatar) {
    return <Preloader />
  }

  return (
    <div className={'flex xsm:w-full flex-col flex-nowrap items-center w-52 font-medium p-[5px]'}>
      <div className={'mb-[30px] mt-[48px] w-52'}>
        <Avatar alt={'profile-page photo'} src={isAvatarShown} className={``} />
        {isAvatarShown && (
          <DeleteAvatarButton onDeleteAvatarClick={onDeleteAvatarClick} disabled={isDisabled} />
        )}
      </div>
      <GlobalButton
        type={'button'}
        variant={'transparent'}
        className={`text-base xsm:ml-0  w-full`}
        callback={onAddPhotoClick}
        disabled={isDisabled}
      >
        {t.uploadPhoto.buttonAddPhoto}
      </GlobalButton>

      <ModalWithContent
        isOpen={UploadAvatarBlockModal.isModalOpen}
        onClose={onCloseClick}
        title={t.uploadPhoto.uploadAvatarBlock.title}
      >
        <>
          {selectedPhoto ? (
            <ProfileAvatarEditor
              image={selectedPhoto}
              onSaveClick={onSaveClick}
              disabled={isLoadingUploadAvatar}
            />
          ) : (
            <PhotoSelector onAdd={handleAddPhoto} />
          )}
        </>
      </ModalWithContent>
    </div>
  )
}
