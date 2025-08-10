import { createFileRoute } from '@tanstack/react-router'
import { ProjectsIndex } from '../../pages/ProjectsIndex'

export const Route = createFileRoute('/projects/')({
  component: ProjectsIndex,
})