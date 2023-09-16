import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { getStatistics_api, StatisticsQueryParamsType } from '@/modules/statistics-modules'

export const useGetStatistics = ({ grouping }: StatisticsQueryParamsType) => {
  const {
    data: statisticsData,
    isSuccess: isSuccessData,
    isLoading: isLoadingData,
  } = useQuery({
    queryKey: ['statistics', grouping],
    queryFn: () => getStatistics_api.getStatisticsLikes({ grouping }),
    onError: (err: Error) => toast.error(err.message),
  })

  return { statisticsData, isSuccessData, isLoadingData }
}
