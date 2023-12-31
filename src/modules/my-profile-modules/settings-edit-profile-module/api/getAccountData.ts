import { RootProfile } from '@/modules/my-profile-modules/settings-edit-profile-module/types/profile-type'
import { authInstance } from '@/services'

export const getAccountData = (): Promise<RootProfile> => {
  return authInstance.get(`users/profile`)
}
