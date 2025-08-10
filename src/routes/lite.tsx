import { createFileRoute } from '@tanstack/react-router'
import { Lite } from '../pages/Lite'

export const Route = createFileRoute('/lite')({
  component: Lite,
})