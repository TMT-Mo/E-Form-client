import { Container } from '@mui/material'
import CustomizedProgressBars from 'components/Statistics'
import { DetailBox } from 'pages/analytics/dashboard/detail-box'
import React from 'react'

export const AnalyticsDashboard = () => {
  return (
    <Container sx={{paddingY: '50px'}}>
      <DetailBox/>
    </Container>
  )
}
