// Simple markdown parser for blog posts
class MarkdownParser {
  constructor() {
    this.rules = [
      // Headers
      { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },
      { pattern: /^## (.+)$/gm, replacement: '<h2>$1</h2>' },
      { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
      
      // Blockquotes
      { pattern: /^> (.+)$/gm, replacement: '<blockquote>$1</blockquote>' },
      
      // Lists
      { pattern: /^\* (.+)$/gm, replacement: '<li>$1</li>' },
      { pattern: /^- (.+)$/gm, replacement: '<li>$1</li>' },
      
      // Bold and italic
      { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
      { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
      
      // Links
      { pattern: /\[(.+?)\]\((.+?)\)/g, replacement: '<a href="$2">$1</a>' },
      
      // Paragraphs
      { pattern: /^(?!<[h|l|b])(.+)$/gm, replacement: '<p>$1</p>' }
    ];
  }

  parse(markdown) {
    let html = markdown;
    
    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*?<\/li>\s*)+/gs, match => `<ul>${match}</ul>`);
    
    this.rules.forEach(rule => {
      html = html.replace(rule.pattern, rule.replacement);
    });
    
    // Clean up extra <p> tags around block elements
    html = html.replace(/<p>(<[h|u|b])/g, '$1');
    html = html.replace(/(<\/[h|u|b][^>]*>)<\/p>/g, '$1');
    
    return html;
  }
}

// Blog system
class BlogSystem {
  constructor() {
    this.parser = new MarkdownParser();
    this.postsIndex = [];
  }

  async loadPostsIndex() {
    try {
      const response = await fetch('/blog/posts.json');
      this.postsIndex = await response.json();
      // Sort by date descending
      this.postsIndex.sort((a, b) => new Date(b.date) - new Date(a.date));
      return this.postsIndex;
    } catch (error) {
      console.error('Error loading posts index:', error);
      return [];
    }
  }

  async loadPost(slug) {
    try {
      const response = await fetch(`/blog/posts/${slug}.md`);
      const markdown = await response.text();
      return this.parser.parse(markdown);
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
      return null;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }

  renderPostList(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = posts.map(post => `
      <article class="blog-card">
        <div class="blog-card-content">
          <h3><a href="/post.html?slug=${post.slug}">${post.title}</a></h3>
          <time class="blog-date">${this.formatDate(post.date)}</time>
          <p class="blog-summary">${post.summary}</p>
          <a href="/post.html?slug=${post.slug}" class="read-more">Leer entrada →</a>
        </div>
      </article>
    `).join('');

    container.innerHTML = html;
  }

  async renderSinglePost(slug, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const post = this.postsIndex.find(p => p.slug === slug);
    if (!post) {
      container.innerHTML = '<p>Post no encontrado.</p>';
      return;
    }

    const content = await this.loadPost(slug);
    if (!content) {
      container.innerHTML = '<p>Error cargando el contenido.</p>';
      return;
    }

    // Update page title
    document.title = `${post.title} - Eligreg López`;

    container.innerHTML = `
      <article class="post-full">
        <header class="post-header">
          <h1>${post.title}</h1>
          <time class="blog-date">${this.formatDate(post.date)}</time>
        </header>
        <div class="post-content">
          ${content}
        </div>
        <nav class="post-nav">
          <a href="/blog.html" class="back-link">← Volver al blog</a>
        </nav>
      </article>
    `;
  }
}

// Initialize blog system
const blog = new BlogSystem();

// Export for use in pages
window.BlogSystem = blog;
