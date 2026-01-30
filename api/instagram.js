// Vercel Serverless Function to fetch Instagram posts
// Token is stored in INSTAGRAM_ACCESS_TOKEN environment variable

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  if (!accessToken) {
    return res.status(500).json({ error: 'Instagram token not configured' });
  }

  try {
    // Fetch user's media from Instagram Basic Display API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=3&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Instagram API error:', error);
      return res.status(response.status).json({ error: 'Failed to fetch Instagram posts' });
    }

    const data = await response.json();
    
    // Return the posts
    return res.status(200).json({
      posts: data.data || [],
      success: true
    });

  } catch (error) {
    console.error('Error fetching Instagram:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
