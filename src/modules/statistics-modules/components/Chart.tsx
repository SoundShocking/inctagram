import React from 'react'

import { ru, enUS, uk } from 'date-fns/locale'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useWindowSize } from '@/common'
import { useTranslation } from '@/components/translation'
import {
  changedFormatDateXAxis,
  ChartCustomTooltip,
  getChartColors,
  StatisticsProps,
  StatisticsType,
} from '@/modules/statistics-modules'

type ChartProps = {
  statisticsData: StatisticsType
} & StatisticsProps

export const Chart = ({ type, category, statisticsData }: ChartProps) => {
  const { t, localeLanguage } = useTranslation()
  const { width } = useWindowSize()
  // eslint-disable-next-line no-nested-ternary
  const language: Locale = localeLanguage === 'ru' ? ru : localeLanguage === 'en' ? enUS : uk
  const count = statisticsData?.data.metrics.count
  const dataTimeStart = statisticsData?.data.metrics.time_intervals[0]

  const data = count?.map((value, index) => ({
    name: dataTimeStart ? new Date(dataTimeStart).getTime() + index * 24 * 60 * 60 * 1000 : null,
    value,
  }))
  const classNames = getChartColors({ type })

  return (
    <ResponsiveContainer minWidth="330" height={width && width > 576 ? 300 : 240}>
      <LineChart
        // width={972}
        // height={300}
        data={data}
        className={'bg-dark-500 border-dark-300 border-1 rounded-sm pt-3 text-xs text-light-900'}
        margin={{ right: 24, bottom: 12 }}
      >
        <XAxis
          dataKey="name"
          interval="preserveStartEnd"
          tickFormatter={value => changedFormatDateXAxis({ date: value, language })}
          minTickGap={category === 'week' ? 400 : 375}
        />
        <Tooltip
          cursor={false}
          isAnimationActive={true}
          content={<ChartCustomTooltip t={t} type={type} language={language} />}
          wrapperStyle={{ lineHeight: 0 }}
        />
        <Line
          dot={{ stroke: classNames.dot.stroke, fill: classNames.dot.fill }}
          activeDot={{
            stroke: classNames.activeDot.stroke,
            fill: classNames.activeDot.fill,
            r: 4,
          }}
          dataKey="value"
          stroke={classNames.stroke}
          strokeWidth={3}
          strokeLinecap="square"
        />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )
}