import React, { useState } from 'react'

import { useInViewScrollEffect } from '@/common'
import { LikesUsers } from '@/components/following-followers-likes'
import { RenderLoadingIndicator } from '@/components/infinity-scroll'
import { NotFoundComponent } from '@/components/not-found/NotFound'
import { useFollowingOrUnfollowingUser } from '@/services'
import { useGetCommentsLikes } from '@/services/hooks/likes/useGetCommentsLikes'
import { useModalsStore, useSearchStore, useUserStore } from '@/store'
import { Spinner } from '@/ui'

export const LikesComments = () => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)

  const { useFollowUnfollowUser, isLoading: isLoadingButton } = useFollowingOrUnfollowingUser({
    userId: currentUserId,
  })
  const { commentId } = useUserStore()
  const { postId } = useModalsStore(state => state.postModal)

  const { search } = useSearchStore()
  const {
    likesData,
    isRefetchingLikes,
    hasNextPageLikes,
    isFetchingNextPageLikes,
    isSuccessLikes,
    fetchNextPageLikes,
    isLoadingLikes,
  } = useGetCommentsLikes({
    postId: postId,
    commentId,
    search,
  })

  const { ref } = useInViewScrollEffect({
    hasNextPage: hasNextPageLikes,
    fetchNextPage: fetchNextPageLikes,
  })
  const handleToggleSubscriptionsCallBack = (userId: number) => {
    setCurrentUserId(userId)
    useFollowUnfollowUser()
  }

  return (
    <>
      {!isLoadingLikes ? (
        <>
          {likesData?.pages ? (
            likesData.pages.map((users, index) => (
              <LikesUsers
                key={index}
                isRefetching={isRefetchingLikes}
                isLoadingButton={isLoadingButton}
                handleToggleSubscriptionsCallBack={handleToggleSubscriptionsCallBack}
                items={users.items}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <NotFoundComponent message={'Not Found'} />
          )}
          <RenderLoadingIndicator
            isSuccess={isSuccessLikes}
            isFetchNextPage={isFetchingNextPageLikes}
            customRef={ref}
          />
        </>
      ) : (
        <div className="absolute h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
