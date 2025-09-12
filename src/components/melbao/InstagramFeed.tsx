import { useEffect } from "react";

const InstagramFeed = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="instagram" className="container h-full flex flex-col justify-center py-8">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Instagram Post 1 - Replace EXAMPLE1 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/DOMhINfkqpO/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/DOMhINfkqpO/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>

        {/* Instagram Post 2 - Replace EXAMPLE2 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE2/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/EXAMPLE2/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>

        {/* Instagram Post 3 - Replace EXAMPLE3 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE3/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/EXAMPLE3/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>

        {/* Instagram Post 4 - Replace EXAMPLE4 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE4/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/EXAMPLE4/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>

        {/* Instagram Post 5 - Replace EXAMPLE5 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE5/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/EXAMPLE5/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>

        {/* Instagram Post 6 - Replace EXAMPLE6 with actual post ID */}
        <div className="instagram-embed-wrapper">
          <blockquote 
            className="instagram-media" 
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE6/"
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: '0',
              width: '100%'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/p/EXAMPLE6/" 
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View this post on Instagram
              </a>
            </div>
          </blockquote>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          Want to see your buns featured? Tag us in your photos!
        </p>
        <a 
          href="https://www.instagram.com/mel__bao/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.80-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow @mel__bao
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;