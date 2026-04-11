const API_BASE = "https://api.beehiiv.com/v2"

async function beehiivFetch(path) {
  const apiKey = process.env.BEEHIIV_API_KEY
  const pubId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !pubId) return null

  const res = await fetch(`${API_BASE}/publications/${pubId}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!res.ok) return null
  return res.json()
}

export async function getPosts() {
  const data = await beehiivFetch("/posts?status=confirmed&limit=20&expand=free_web_content")
  if (!data?.data) return []
  return data.data.map(formatPost)
}

export async function getPostBySlug(slug) {
  // Beehiiv doesn't have a get-by-slug endpoint, so we fetch all and find
  const data = await beehiivFetch("/posts?status=confirmed&limit=100&expand=free_web_content")
  if (!data?.data) return null
  const post = data.data.find((p) => p.slug === slug)
  return post ? formatPost(post) : null
}

function formatPost(post) {
  return {
    id: post.id,
    title: post.title || "",
    subtitle: post.subtitle || "",
    slug: post.slug || "",
    content: post.content?.free?.web || "",
    thumbnail: post.thumbnail_url || null,
    publishedAt: post.publish_date
      ? new Date(post.publish_date * 1000).toISOString()
      : post.created_at
      ? new Date(post.created_at * 1000).toISOString()
      : null,
    authors: post.authors || [],
  }
}
