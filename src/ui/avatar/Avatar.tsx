import React from 'react'

import Image from 'next/image'

import placeholder from '@/assets/images/img-placeholder.png'

type PropsType = {
  src?: any
  alt: string
  height?: number
  width?: number
  className?: string
}
export const Avatar = ({ src, alt, height = 192, width = 192, className }: PropsType) => {
  return (
    <Image
      src={src ? src : placeholder}
      alt={alt}
      className={`rounded-[50%] ${className} h-full`}
      width={width}
      height={height}
    />
  )
}
