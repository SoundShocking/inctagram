import React from 'react'

import { useRouter } from 'next/router'

import { useInViewScrollEffect } from '@/common'
import { useSearch } from '@/common/hooks/useSearch'
import { FollowingUsers } from '@/components/following-followers/following/FollowingUsers'
import { ModalWithContent } from '@/components/modals'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFollowingOrUnfollowingUser, userGetFollowings } from '@/services'
import { FollowingFollowersComponentsType } from '@/types'
import { InputSearch, Spinner } from '@/ui'

export const Following = ({ isModalOpen, onClose }: FollowingFollowersComponentsType) => {
  const { search, searchInput, setSearchInput } = useSearch()
  const { query } = useRouter()
  const queryUserName = query.userName ? query.userName : ''
  const {
    followingData,
    refetchFollowing,
    isRefetchingFollowing,
    hasNextPageFollowing,
    isFetchNextPageFollowing,
    isSuccessFollowing,
    fetchNextPageFollowing,
  } = userGetFollowings({
    userName: queryUserName,
    search,
  })
  const { useFollowUnfollowUser, isLoading: isLoadingButton } = useFollowingOrUnfollowingUser({
    refetch: refetchFollowing,
  })
  const { ref } = useInViewScrollEffect({
    hasNextPage: hasNextPageFollowing,
    fetchNextPage: fetchNextPageFollowing,
  })

  return (
    <ModalWithContent size="medium" isOpen={isModalOpen} onClose={onClose} title={'Following'}>
      <div className={'w-full p-5'}>
        <InputSearch
          className="h-9 w-full"
          placeholder={'Search'}
          value={searchInput}
          callBackSearch={setSearchInput}
        />
      </div>
      <ScrollArea className="w-full h-[400px]">
        {followingData?.pages
          ? followingData.pages.map((page, index) => (
              <FollowingUsers
                key={index}
                isRefetching={isRefetchingFollowing}
                isLoadingButton={isLoadingButton}
                useFollowUnfollowUser={useFollowUnfollowUser}
                items={page.items}
              />
            ))
          : 'Not found'}

        {isSuccessFollowing && (
          <div className="pt-4 flex w-full justify-center pb-4" ref={ref}>
            {isFetchNextPageFollowing && (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </ModalWithContent>
  )
}
