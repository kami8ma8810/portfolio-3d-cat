import { Link } from '@tanstack/react-router'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  thumbnail?: string
}

const DUMMY_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'サンプルプロジェクト 1',
    description: 'これはサンプルプロジェクトの説明です。',
    tags: ['React', 'TypeScript', 'Three.js'],
  },
  {
    id: 'project-2',
    title: 'サンプルプロジェクト 2',
    description: '別のサンプルプロジェクトの説明です。',
    tags: ['Vue', 'Node.js'],
  },
]

export function ProjectsIndex() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <nav className="mb-4">
            <Link 
              to="/" 
              className="text-primary-black hover:text-primary-yellow transition-colors"
            >
              ← ホームに戻る
            </Link>
          </nav>
          <h1 className="text-4xl font-bold">プロジェクト</h1>
        </header>

        <main id="main-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_PROJECTS.map((project) => (
              <article 
                key={project.id}
                className="group border-2 border-primary-black rounded-lg overflow-hidden hover:border-primary-yellow transition-colors"
              >
                <Link to={`/projects/${project.id}`} className="block p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-yellow transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}