"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { users } from "@/data/users"

export function useUserData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "users",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      return {
        success: true,
        data: users,
        pagination: {
          page: 1,
          limit: 10,
          totalPage: 2,
          totalPages: 20,
        },
      }
    },
    placeholderData: keepPreviousData,
  })
}

// Add this property for the DataTable component
useUserData.isQueryHook = true
