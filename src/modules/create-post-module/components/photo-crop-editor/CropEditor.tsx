import React, { useCallback } from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Rect } from '@popperjs/core'
import ImagePlaceholder from 'next/image'
import { Point } from 'react-easy-crop'
import Slider from 'react-slick'

import placeholder from '@/assets/images/img-placeholder.png'
import { useTranslation } from '@/components/translation'
import { CreatePostModal, ModalCreatePostType } from '@/modules/create-post-module'
import { Crop } from '@/modules/create-post-module/components/Crop'
import { CropPopup } from '@/modules/create-post-module/components/photo-crop-editor/crop-popup'
import getCroppedImg from '@/modules/create-post-module/components/photo-crop-editor/utils/canvasUtils'
import { ZoomPopup } from '@/modules/create-post-module/components/photo-crop-editor/zoom-popup'
import { PhotoSelector } from '@/modules/my-profile-modules/avatar-module'
import { IPhoto, useImageSelector } from '@/store/storeSelectorPhoto'

export const CropEditor = ({ setModalOpen, isModalOpen, onClose }: ModalCreatePostType) => {
  const { t } = useTranslation()

  const settings = {
    customPaging: function (index: number) {
      const photo = imagesSelector[index]
      let imageUrl = ''

      if (photo && photo.url) {
        // @ts-ignore
        imageUrl = photo.url
      } else if (photo && photo.file) {
        imageUrl = URL.createObjectURL(photo.file)
      }

      return (
        <a>
          <img src={String(imageUrl)} alt={photo?.name} />
        </a>
      )
    },
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const handleAddPhoto = (photos: IPhoto[]) => {
    const duplicatePhotos = photos.filter(photo =>
      imagesSelector.some(item => item.url === photo.url)
    )

    if (duplicatePhotos.length === 0) {
      const newImagesSelector = imagesSelector.concat(photos)

      setImageSelector(newImagesSelector)
    }
  }

  const {
    deleteImage,
    imagesSelector,
    setCropForImage,
    setImageSelector,
    setZoomForImage,
    setAspectForImage,
    setCroppedAreaPixelsForImage,
  } = useImageSelector()
  const onCropComplete = useCallback((id: string, croppedArea: Rect, croppedAreaPixels: Rect) => {
    setCroppedAreaPixelsForImage(id, croppedArea, croppedAreaPixels)
  }, [])

  function handleCropChange(id: string, location: Point) {
    setCropForImage(id, location)
  }
  const handleZoomChange = (id: string, newZoom: number) => {
    setZoomForImage(id, newZoom)
  }

  const onCloseClick = async () => {
    setImageSelector([])
    onClose()
  }

  const onNextClick = async () => {
    try {
      const updatedImages = await Promise.all(
        imagesSelector.map(async image => {
          const { croppedAreaPixels } = image.cropData || {}
          const { url } = image

          if (!url) {
            console.error(`Image with id "${image.id}" does not have crop data`)

            return image
          }

          const croppedImage = await getCroppedImg(url, croppedAreaPixels)

          return {
            ...image,
            filteredUrl: croppedImage as string,
          }
        })
      )

      setImageSelector(updatedImages)
      setModalOpen('filters-editor')
    } catch (error) {
      console.error('Error updating images:', error)
    }
  }
  const onBackClick = () => {
    setModalOpen('photo-uploader')
  }

  const onDeleteImage = (url: string | Blob) => {
    deleteImage(url)
  }

  return (
    <CreatePostModal
      showBackArrow={true}
      variant={imagesSelector.length === 0 ? undefined : 'Next'}
      isOpen={isModalOpen}
      title={t.createPost.cropEditor.modalTitle}
      onClose={onCloseClick}
      onBackClick={onBackClick}
      onBtnClick={onNextClick}
    >
      {imagesSelector.length === 0 ? (
        <div className={'flex flex-col pt-10 justify-center items-center'}>
          {' '}
          <ImagePlaceholder src={placeholder} alt={'placeholder'} width={300} height={300} />
        </div>
      ) : (
        <Slider {...settings}>
          {imagesSelector.map(e => {
            return (
              <div key={e.id} className="relative h-[500px]">
                <Crop
                  src={e}
                  aspect={e.cropData?.aspect || 3 / 4}
                  crop={e.cropData?.crop || { x: 0, y: 0 }}
                  onCropChange={location => handleCropChange(e.id, location)}
                  zoom={e.cropData?.zoom || 1}
                  onZoomChange={zoom => handleZoomChange(e.id, zoom)}
                  onCropComplete={(croppedArea, croppedAreaPixels) =>
                    onCropComplete(e.id, croppedArea, croppedAreaPixels)
                  }
                />
                <div className="absolute bottom-[3rem] left-[3rem] ">
                  <ZoomPopup
                    zoom={e.cropData?.zoom || 1}
                    setZoom={zoom => handleZoomChange(e.id, zoom)}
                  />
                  <CropPopup setAspect={aspect => setAspectForImage(e.id, aspect)} />
                  <button
                    type={'submit'}
                    onClick={() => onDeleteImage(e.name)}
                    className={'h-6 w-6 bg-dark-500 pt-0.5'}
                  >
                    X
                  </button>
                </div>
              </div>
            )
          })}
        </Slider>
      )}

      <PhotoSelector onAdd={handleAddPhoto} showButton={false} placeholderShow={false} />
    </CreatePostModal>
  )
}
