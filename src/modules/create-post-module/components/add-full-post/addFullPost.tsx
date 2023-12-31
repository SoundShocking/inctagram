import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { PATH_ROUTE } from '@/common'
import { useTranslation } from '@/components/translation'
import { ModalCreatePostType, useStoreIsLoadingPublication } from '@/modules/create-post-module'
import { CreatePostModal } from '@/modules/create-post-module/components/create-post-modal/CreatePostModal'
import { AddPublication } from '@/modules/create-post-module/components/description-add/add-publication'
import { RightDescription } from '@/modules/create-post-module/components/description-add/rightDescription'
import { useUploadPost } from '@/modules/create-post-module/hooks/useAddPostImgMutation'
import { useUserStore } from '@/store'
import { useImageSelector } from '@/store/storeSelectorPhoto'

interface IAddFullPost {
  location?: boolean
}

export const AddFullPost: FC<IAddFullPost & ModalCreatePostType> = ({
  isModalOpen,
  setModalOpen,
  onClose,
}) => {
  const { t } = useTranslation()
  const { userId } = useUserStore()
  const { imagesSelector, setDescription, description } = useImageSelector()
  const { push } = useRouter()

  const [postDescription, setPostDescription] = useState(description)

  const skeletonIsPublication = useStoreIsLoadingPublication(state => state.setIsLoadingPublication)
  const onSuccessPostSent = async () => {
    onClose()
    setDescription('')
    push(PATH_ROUTE.PROFILE)
  }

  const { mutate: addPhotoToThePost, isLoading } = useUploadPost(
    onSuccessPostSent,
    userId!,
    skeletonIsPublication
  )
  const onCloseClick = async () => {
    setDescription(postDescription)
    await setModalOpen('save-draft-post')
  }

  const onBackClick = () => {
    setModalOpen('filters-editor')
  }

  const addAllPost = async () => {
    const formData = new FormData()

    await Promise.all(
      imagesSelector.map(async photo => {
        // @ts-ignore
        const response = await fetch(photo.finalUrl)
        const blob = await response.blob()

        formData.append('files', blob)
      })
    )

    formData.append('description', postDescription)
    addPhotoToThePost(formData)
    setModalOpen('')
  }

  useEffect(() => {
    skeletonIsPublication(isLoading)
  }, [isLoading])

  return (
    <CreatePostModal
      isOpen={isModalOpen}
      onBackClick={onBackClick}
      onClose={onCloseClick}
      title={t.createPost.addFullPost.modalTitle}
      onBtnClick={addAllPost}
      showBackArrow={true}
      variant={'Publish'}
    >
      <div className={'flex flex-row'}>
        <div className="max-w-[485px]">
          <div>
            <Swiper
              className="h-full"
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
            >
              {imagesSelector.map((image, ind) => {
                if (image) {
                  return (
                    <SwiperSlide key={ind}>
                      <AddPublication key={ind} location={true} imageUrl={image} />
                    </SwiperSlide>
                  )
                } else {
                  return null
                }
              })}
            </Swiper>
          </div>
        </div>
        <div className="w-full">
          <RightDescription text={postDescription} setText={setPostDescription} />
        </div>
      </div>
    </CreatePostModal>
  )
}
