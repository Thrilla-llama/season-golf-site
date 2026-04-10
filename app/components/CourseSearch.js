"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-white/50"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
    </svg>
  )
}

export default function CourseSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true)
      const term = `%${query.trim()}%`
      const { data } = await supabase
        .from("courses")
        .select("name, city")
        .or(`name.ilike.${term},city.ilike.${term}`)
        .limit(8)

      setResults(data ?? [])
      setOpen(true)
      setLoading(false)
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  return (
    <div ref={wrapperRef} className="relative max-w-md w-full">
      <div className="flex items-center gap-3 bg-[#1a3a1a] border border-[#2d5a2d] rounded-full pl-5 pr-4 py-3">
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setOpen(true)
          }}
          placeholder="Search Georgia courses..."
          className="flex-1 text-sm text-white placeholder-white/40 outline-none bg-transparent"
        />
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {results.map((course) => (
            <Link
              key={course.name}
              href={`/courses/${slugify(course.name)}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
            >
              <span className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 21V7l5-4 5 4 5-4 3 2v14l-3-2-5 4-5-4-5 4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{course.name}</p>
                <p className="text-xs text-gray-400">{course.city}, GA</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 z-50">
          <p className="text-sm text-gray-400 text-center">No courses found</p>
        </div>
      )}
    </div>
  )
}
