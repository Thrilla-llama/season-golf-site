const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

async function searchPlace(query) {
  const res = await fetch(SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.photos",
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search failed (${res.status}): ${text}`);
  }
  return res.json();
}

function getPhotoUrl(photoName) {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&key=${GOOGLE_API_KEY}`;
}

async function main() {
  // Find courses with empty or null photo_urls
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, name, city, google_place_id, rating, photo_urls")
    .or("photo_urls.is.null,photo_urls.eq.[]");

  if (error) {
    console.error("Query error:", error.message);
    return;
  }

  console.log(`Found ${courses.length} courses with missing photos\n`);

  for (const course of courses) {
    const query = `${course.name} ${course.city} golf course Georgia`;
    console.log(`Searching: ${course.name}...`);

    try {
      const data = await searchPlace(query);
      const places = data.places || [];

      if (places.length === 0) {
        console.log("  No results found");
        continue;
      }

      const place = places[0];
      const photos = (place.photos || []).slice(0, 3).map((p) => getPhotoUrl(p.name));

      const update = {
        google_place_id: place.id || course.google_place_id,
        rating: place.rating || course.rating,
        review_count: place.userRatingCount || null,
        address: place.formattedAddress || null,
        photo_urls: photos,
      };

      const { error: updateError } = await supabase
        .from("courses")
        .update(update)
        .eq("id", course.id);

      if (updateError) {
        console.error(`  Update error: ${updateError.message}`);
      } else {
        console.log(
          `  Updated: rating=${update.rating}, photos=${photos.length}, place_id=${update.google_place_id}`
        );
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  console.log("\nDone.");
}

main();
