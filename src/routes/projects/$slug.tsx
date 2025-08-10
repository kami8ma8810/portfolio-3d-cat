import { createFileRoute } from '@tanstack/react-router'
import { ProjectPage } from '../../pages/ProjectPage'

export const Route = createFileRoute('/projects/$slug')({
  component: ProjectPageRoute,
})

function ProjectPageRoute() {
  const { slug } = Route.useParams()
  return <ProjectPage slug={slug} />
}