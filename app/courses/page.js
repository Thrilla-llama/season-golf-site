import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"

export const metadata = {
  title: "Georgia Golf Courses",
  description:
    "Browse all 274 golf courses in Georgia. View par, slope, ratings, and leaderboards for every course on Season Golf.",
}

export default async function CoursesIndexPage() {
  const { data: courses } = await supabase
    .from("courses")
    .select("id, name, city, par, slope_rating, rating")
    .order("name")

  return (
    <main className="flex-1 bg-gray-50">
      <div className="bg-brand text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Georgia Golf Courses</h1>
          <p className="text-white/70 mt-2">
            {courses?.length ?? 274} courses across the state
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses?.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${slugify(course.name)}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand/30 transition block"
            >
              <h2 className="font-semibold text-brand text-lg leading-snug mb-2">
                {course.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{course.city}, GA</p>
              <div className="flex gap-4 text-sm text-gray-700">
                {course.par && (
                  <span>
                    Par <strong>{course.par}</strong>
                  </span>
                )}
                {course.slope_rating && (
                  <span>
                    Slope <strong>{course.slope_rating}</strong>
                  </span>
                )}
                {course.rating && (
                  <span>
                    &#9733; <strong>{course.rating}</strong>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
