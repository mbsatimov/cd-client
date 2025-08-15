import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'

import { Spinner } from '@/components/ui'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'

import { BookingList } from './-components'

const BookingsPage = () => {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Bookings | MOCK - IELTS ZONE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/exams">CD Offline Exams</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bookings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">Bookings</h1>
      <Suspense
        fallback={
          <div className="grid place-items-center py-10">
            <Spinner className="size-10" />
          </div>
        }
      >
        <BookingList />
      </Suspense>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/bookings/')({
  component: BookingsPage,
})
