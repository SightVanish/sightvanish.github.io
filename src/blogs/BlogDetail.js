import blogPosts from './blogData.js';
import Router from '../js/router.js';

class BlogDetail {
    constructor() {
        this.blogPosts = blogPosts;
        this.router = new Router();
    }

    render(postId) {
        const post = this.blogPosts.find(post => post.id === parseInt(postId));
        
        if (!post) {
            return this.renderNotFound();
        }

        const container = document.createElement('div');
        container.className = 'blog-post-detail';

        const header = document.createElement('header');
        header.className = 'blog-header';
        
        const title = document.createElement('h2');
        title.className = 'h2 article-title';
        title.textContent = post.title;
        
        const meta = document.createElement('div');
        meta.className = 'blog-meta';
        meta.innerHTML = `
            <p class="blog-category">${post.tags.join(', ')}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
            <span class="dot"></span>
            <span class="author">By ${post.author}</span>
        `;
        
        const content = document.createElement('div');
        content.className = 'blog-content';
        content.innerHTML = post.content;
        
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = '← Back to Blog List';
        backButton.addEventListener('click', () => {
            this.router.navigateToPage('blog');
        });
        
        container.appendChild(backButton);
        container.appendChild(header);
        header.appendChild(title);
        header.appendChild(meta);
        container.appendChild(content);
        
        return container;
    }
    
    renderNotFound() {
        const container = document.createElement('div');
        container.className = 'blog-post-detail';
        container.innerHTML = `
            <h2 class="h2 article-title">Blog Post Not Found</h2>
            <p class="blog-text">The blog post you're looking for doesn't exist.</p>
            <button class="back-button">← Back to Blog List</button>
        `;
        
        const backButton = container.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            this.router.navigateToPage('blog');
        });
        
        return container;
    }
}

export default BlogDetail; 