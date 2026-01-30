import { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch('/api/instagram');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      
      if (data.success && data.posts) {
        setPosts(data.posts);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Unable to load Instagram posts');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (post: InstagramPost) => {
    // For videos, use thumbnail; for images, use media_url
    if (post.media_type === 'VIDEO' && post.thumbnail_url) {
      return post.thumbnail_url;
    }
    return post.media_url;
  };

  const truncateCaption = (caption: string | undefined, maxLength: number = 100) => {
    if (!caption) return '';
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + '...';
  };

  return (
    <section id="instagram" className="container h-full flex flex-col justify-center py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Follow Our Journey</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          See our daily baking process, fresh ingredients, and happy customers on Instagram
        </p>
        <a 
          href="https://www.instagram.com/mel__bao/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-primary hover:text-primary/80 font-medium"
        >
          @mel__bao
        </a>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-muted-foreground">
          <p>{error}</p>
          <a 
            href="https://www.instagram.com/mel__bao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Visit us on Instagram →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={getImageUrl(post)}
                alt={post.caption || 'Instagram post'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-sm text-center">
                  {truncateCaption(post.caption, 120)}
                </p>
              </div>

              {/* Video indicator */}
              {post.media_type === 'VIDEO' && (
                <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              )}

              {/* Carousel indicator */}
              {post.media_type === 'CAROUSEL_ALBUM' && (
                <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <a 
          href="https://www.instagram.com/mel__bao/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow @mel__bao
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
