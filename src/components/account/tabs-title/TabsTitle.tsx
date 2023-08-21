import React, { FC } from 'react'

import { TabComponent } from '@/ui'

interface TabsType {
  id: string
  label: string
  content: React.ComponentType | React.ReactNode
}

interface PropsTabType {
  tabs?: Omit<TabsType, 'content'>[]
  activeTab?: string
  setActiveTab?: (activeTab: string | undefined) => void
}

export const TabsTitle: FC<PropsTabType> = ({ tabs, setActiveTab, activeTab }) => {
  const tabsLayout = tabs?.map(tab => (
    <TabComponent
      key={tab.id}
      label={tab.label}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  ))

  return (
    <>
      <div className="flex w-full md:min xsm:overflow-x-scroll xsm:no-scrollbar sm:overflow-x-scroll sm:no-scrollbar  border-b border-gray-200  border-none h-[96] gap-[2px]">
        {tabsLayout}
      </div>
      <div className="divide-y-[100%] bg-bgLogBorder h-[1px]"></div>
    </>
  )
}
