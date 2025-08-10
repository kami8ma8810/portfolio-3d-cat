export interface MetaData {
  title: string
  description?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonical?: string
  keywords?: string[]
}

export function generateMeta(data: MetaData): Record<string, string> {
  const siteName = 'Cat-Quest Portfolio'
  const defaultDescription = '3D猫が案内するインタラクティブなポートフォリオサイト'
  const defaultOgImage = '/og-image.png' // TODO: 実際のOG画像を用意

  return {
    title: data.title ? `${data.title} | ${siteName}` : siteName,
    description: data.description || defaultDescription,
    'og:title': data.title || siteName,
    'og:description': data.description || defaultDescription,
    'og:image': data.ogImage || defaultOgImage,
    'og:type': data.ogType || 'website',
    'og:site_name': siteName,
    'twitter:card': 'summary_large_image',
    ...(data.canonical && { canonical: data.canonical }),
    ...(data.keywords && { keywords: data.keywords.join(', ') }),
  }
}

export function Meta({ data }: { data: MetaData }) {
  const meta = generateMeta(data)

  // Note: 実際のmeta tagの挿入はreact-helmetやvite-plugin-seoを使用
  // ここではデータ生成のみ
  return null
}