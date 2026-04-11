import Link from "next/link"
import { getPosts } from "@/lib/beehiiv"

export const revalidate = 3600

export const metadata = {
  title: "Blog",
  description:
    "Match play strategy, course spotlights, and updates from Season Golf.",
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="flex-1 bg-white">
      {/* header */}
      <div className="bg-brand">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/">
            <img
              src="/wordmark-white.png"
              alt="Season Golf"
              className="h-8 w-auto mb-10"
            />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-lg text-white/60">
            Match play strategy, course spotlights, and updates from Season
            Golf.
          </p>
        </div>
      </div>

      {/* posts */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-2">No posts yet.</p>
            <p className="text-gray-400 text-sm">
              Check back soon — we&apos;re working on something.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  {post.thumbnail && (
                    <div className="aspect-[2/1] rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={post.thumbnail}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-brand group-hover:text-brand-light transition mb-2">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="text-gray-500 mb-2">{post.subtitle}</p>
                  )}
                  {post.publishedAt && (
                    <time className="text-sm text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
