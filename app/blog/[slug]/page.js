import Link from "next/link"
import { getPosts, getPostBySlug } from "@/lib/beehiiv"
import { notFound } from "next/navigation"

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.subtitle || `${post.title} — Season Golf Blog`,
    openGraph: {
      title: post.title,
      description: post.subtitle || `${post.title} — Season Golf Blog`,
      ...(post.thumbnail && {
        images: [{ url: post.thumbnail, width: 1200, height: 630 }],
      }),
      type: "article",
      siteName: "Season Golf",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="flex-1 bg-white">
      {/* header */}
      <div className="bg-brand">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link href="/">
            <img
              src="/wordmark-white.png"
              alt="Season Golf"
              className="h-8 w-auto mb-6"
            />
          </Link>
          <Link
            href="/blog"
            className="text-sm text-white/50 hover:text-white/80 transition"
          >
            &larr; All posts
          </Link>
        </div>
      </div>

      {/* article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {post.thumbnail && (
          <div className="aspect-[2/1] rounded-xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={post.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-brand tracking-tight mb-3">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-lg text-gray-500 mb-4">{post.subtitle}</p>
        )}

        {post.publishedAt && (
          <time className="text-sm text-gray-400 block mb-8">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        <div
          className="prose prose-lg prose-gray max-w-none prose-headings:text-brand prose-a:text-brand"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="border-2 border-brand rounded-xl p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">Ready to play?</p>
            <p className="text-sm text-gray-600">
              Track your rounds and compete on Season Golf.
            </p>
          </div>
          <a
            href="https://season.golf"
            className="inline-block bg-brand text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-light transition whitespace-nowrap"
          >
            Play on Season Golf &rarr;
          </a>
        </div>
      </article>
    </main>
  )
}
