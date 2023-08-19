import { useRouter } from 'next/router'

import { routes } from '@/routing/router'

export const useRedirectToUserProfilePage = () => {
  const router = useRouter()

  return (userName: string | null, userID: string | null) => {
    if (userName) {
      router.replace({
        pathname: `${routes.sideBar.userHomePage}${userName}`,
        query: { userId: userID },
      })
    }
  }
}