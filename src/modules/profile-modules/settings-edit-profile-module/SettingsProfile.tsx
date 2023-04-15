import React, { useState } from 'react'

import { tabs } from '@/common/constants'
import TabsTitle from '@/components/account/tabs-title/TabsTitle'

export const SettingsProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs && tabs[0].label)

  const tabsLayout = tabs.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  const onChangeTab = (tabLabel: string) => setActiveTab(tabLabel)

  return (
    <div className="relative w-full">
      <TabsTitle variant="edit" tabs={tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
