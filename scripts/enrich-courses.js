const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://hczqygwcmtmlqucctelo.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjenF5Z3djbXRtbHF1Y2N0ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzM2OTMsImV4cCI6MjA5MTM0OTY5M30.cjSzDzig1Jy8JXXL3CEUJL1n7V96LmxiqdAYF9feFPE";
const GOOGLE_KEY = "AIzaSyAv7_9q1TQ9CPC-qjlxk6w15f9u_N9hv-Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchPlace(name, city) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_KEY,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.photos",
    },
    body: JSON.stringify({
      textQuery: `${name} golf course ${city} Georgia`,
    }),
  });
  const json = await res.json();
  return json.places?.[0] ?? null;
}

function photoUrl(photoName) {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${GOOGLE_KEY}`;
}

async function main() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, name, city, google_place_id, photo_urls")
    .order("name");

  if (error) {
    console.error("Failed to fetch courses:", error);
    return;
  }

  console.log(`Found ${courses.length} courses to enrich\n`);

  let enriched = 0;
  let skipped = 0;
  let failed = 0;

  for (const course of courses) {
    // Skip if already has photos
    if (course.photo_urls && course.photo_urls.length > 0) {
      skipped++;
      continue;
    }

    try {
      const place = await searchPlace(course.name, course.city);
      await sleep(300);

      if (!place) {
        console.log(`  ✗ ${course.name} — no place found`);
        failed++;
        continue;
      }

      // Build photo URLs (up to 3)
      const photos = (place.photos ?? [])
        .slice(0, 3)
        .map((p) => photoUrl(p.name));

      const update = {
        google_place_id: place.id,
        photo_urls: photos,
      };
      if (place.rating) update.rating = place.rating;
      if (place.userRatingCount) update.review_count = place.userRatingCount;
      if (place.formattedAddress) update.address = place.formattedAddress;

      const { error: updateErr } = await supabase
        .from("courses")
        .update(update)
        .eq("id", course.id);

      if (updateErr) {
        console.log(`  ✗ ${course.name} — update failed: ${updateErr.message}`);
        failed++;
      } else {
        enriched++;
        console.log(
          `  ✓ ${course.name} — ${photos.length} photos, rating ${place.rating ?? "N/A"}`
        );
      }
    } catch (err) {
      console.log(`  ✗ ${course.name} — ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nDone: ${enriched} enriched, ${skipped} skipped, ${failed} failed`
  );
}

main();
