import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SkipLink } from '../components/SkipLink'

export const Route = createRootRoute({
  component: () => (
    <>
      <SkipLink />
      <Outlet />
    </>
  ),
})