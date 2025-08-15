export async function fetchStoryFromRapidAPI(username) {
  const url = "https://instagram120.p.rapidapi.com/api/instagram/stories";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, 
      "x-rapidapi-host": "instagram120.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`RapidAPI error: ${response.status}`);
  }

  const result = await response.json();
  const stories = result?.result;
  
  if (!Array.isArray(stories) || stories.length === 0) {
    throw new Error("No stories found or invalid response format.");
  }

  return {
    type: "story",
    stories,
    username,
  };
}
