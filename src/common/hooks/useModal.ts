import { useState } from 'react'

export const useModal = ({ callBack }: { callBack: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onConfirmModal = ({ value }: { value: number }) => {
    if (value) {
      callBack()
    }
    setIsModalOpen(false)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }
  const onDeclineModal = onCloseModal

  return { isModalOpen, onConfirmModal, onDeclineModal, setIsModalOpen }
}
