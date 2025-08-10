import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: フォーム送信の実装
    console.log('Form submitted:', formData)
    alert('お問い合わせありがとうございます。（※現在はデモです）')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <nav className="mb-4">
            <Link 
              to="/" 
              className="text-primary-black hover:text-primary-yellow transition-colors"
            >
              ← ホームに戻る
            </Link>
          </nav>
          <h1 className="text-4xl font-bold">コンタクト</h1>
        </header>

        <main id="main-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-primary-yellow focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-primary-yellow focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:border-primary-yellow focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary-black text-primary-white rounded hover:opacity-90 transition-opacity"
            >
              送信する
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">その他の連絡先</h2>
            <div className="space-y-2">
              <p>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-black hover:text-primary-yellow transition-colors underline"
                >
                  Twitter
                </a>
              </p>
              <p>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-black hover:text-primary-yellow transition-colors underline"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}