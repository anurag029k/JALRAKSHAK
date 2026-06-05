"use client";
import React from 'react'
import dynamic from 'next/dynamic'
import LineGraph from '@/components/LineGraph/page'
import BarGraph from '@/components/BarGraph/page'

// const HeatMap = dynamic(() => import('@/components/HeatMap/page'), {
//   ssr: false,
// })

const Reports = () => {
  return (
    <div>
      <LineGraph />
      <BarGraph />
      {/* <HeatMap /> */}
    </div>
  )
}

export default Reports
