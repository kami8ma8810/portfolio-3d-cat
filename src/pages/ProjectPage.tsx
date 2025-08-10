import { Link } from '@tanstack/react-router'

interface ProjectPageProps {
  slug: string
}

export function ProjectPage({ slug }: ProjectPageProps) {
  // TODO: 実際のプロジェクトデータを取得
  const project = {
    title: 'サンプルプロジェクト',
    description: 'これはサンプルプロジェクトの詳細説明です。',
    tags: ['React', 'TypeScript', 'Three.js'],
    content: '詳細な内容がここに入ります。',
    links: {
      demo: 'https://example.com',
      github: 'https://github.com/example/repo',
    },
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <nav className="mb-4">
            <Link 
              to="/projects" 
              className="text-primary-black hover:text-primary-yellow transition-colors"
            >
              ← プロジェクト一覧に戻る
            </Link>
          </nav>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm px-3 py-1 bg-primary-yellow text-primary-black rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <main id="main-content">
          <div className="prose prose-lg max-w-none mb-12">
            <p>{project.content}</p>
          </div>

          {(project.links.demo || project.links.github) && (
            <div className="flex gap-4">
              {project.links.demo && (
                <a 
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary-black text-primary-white rounded hover:opacity-90 transition-opacity"
                >
                  デモを見る
                </a>
              )}
              {project.links.github && (
                <a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-primary-black rounded hover:bg-primary-black hover:text-primary-white transition-colors"
                >
                  GitHubで見る
                </a>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}