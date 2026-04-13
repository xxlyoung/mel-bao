import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Content-Type": "application/json",
  };

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Instagram token not configured" }),
    };
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=3&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Instagram API error:", error);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Failed to fetch Instagram posts" }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
      body: JSON.stringify({ posts: data.data || [], success: true }),
    };
  } catch (error) {
    console.error("Error fetching Instagram:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
