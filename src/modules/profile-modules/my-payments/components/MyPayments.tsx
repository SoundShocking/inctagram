import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react'

import { useQuery } from '@tanstack/react-query'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import s from '../them.module.css'

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ['get-my-payments'],
    queryFn: async () => {
      const res = await fetch('/api/payments')

      return res.json()
    },
  })
}

export const MyPayments = () => {
  const { data } = useGetMyPayments()
  const columnDefs = [
    { field: 'startDate', header: 'Date of Payment' },
    { field: 'endDate', header: 'End date of subscription' },
    {
      field: 'price',
      header: 'Price',
      valueFormatter: (params: any) => '$' + params.data.price,
    },
    { field: 'subscription', header: 'Subscription Type' },
    { field: 'payments', header: 'Payment Type' },
  ]

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  )
  const gridRef = useRef<any>()
  const onPageSizeChanged = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value

    gridRef.current.api.paginationSetPageSize(value)
  }, [])

  return (
    <div className={`ag-theme-alpine-dark ${s.asd} `} style={{ height: 500, width: 972 }}>
      <AgGridReact
        ref={gridRef}
        animateRows={true}
        rowSelection={'multiple'}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={8}
        suppressHorizontalScroll={true}
      />
      <select className={s.optionsBlock} onChange={e => onPageSizeChanged(e)}>
        <option value={'25'}>25</option>
        <option value={'50'}>50</option>
        <option value={'75'}>75</option>
        <option value={'100'}>100</option>
      </select>
    </div>
  )
}
