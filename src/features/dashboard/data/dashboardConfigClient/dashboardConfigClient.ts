import { authRequest } from "#features/auth"

import {
  DASHBOARD_CONFIG_ENDPOINT,
  DASHBOARD_CONFIG_PULL_PAGE_SIZE,
} from "./constants"
import {
  type DashboardCardPayload,
  type DashboardConfigPageResponse,
  type RemoteDashboardCard,
} from "./types"

export const fetchDashboardCards = async (): Promise<RemoteDashboardCard[]> => {
  const page = await authRequest<DashboardConfigPageResponse>(
    `${DASHBOARD_CONFIG_ENDPOINT}?page=0&pageSize=${DASHBOARD_CONFIG_PULL_PAGE_SIZE}`,
    { auth: true },
  )
  return page.items ?? []
}

export const createDashboardCard = (
  body: DashboardCardPayload,
): Promise<number> =>
  authRequest<number>(DASHBOARD_CONFIG_ENDPOINT, {
    method: "POST",
    body,
    auth: true,
  })

export const updateDashboardCard = (
  remoteId: number,
  body: DashboardCardPayload,
): Promise<number> =>
  authRequest<number>(`${DASHBOARD_CONFIG_ENDPOINT}/${remoteId}`, {
    method: "PATCH",
    body: { id: remoteId, ...body },
    auth: true,
  })

// The backend deletes a batch (soft-delete) addressed by a raw array of ids.
export const deleteDashboardCards = (remoteIds: number[]): Promise<number> =>
  authRequest<number>(DASHBOARD_CONFIG_ENDPOINT, {
    method: "DELETE",
    body: remoteIds,
    auth: true,
  })
