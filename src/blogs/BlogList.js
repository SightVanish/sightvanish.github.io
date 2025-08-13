import blogPosts from './blogData.js';
import Router from '../js/router.js';

class BlogList {
    constructor() {
        this.blogPosts = blogPosts;
        this.router = new Router();
    }

    render() {
        const blogListContainer = document.createElement('ul');
        blogListContainer.className = 'blog-posts-list';
        
        this.blogPosts.forEach(post => {
            const blogCard = this.createBlogCard(post);
            blogListContainer.appendChild(blogCard);
        });
        
        return blogListContainer;
    }
    
    createBlogCard(post) {
        const listItem = document.createElement('li');
        listItem.className = 'blog-post-item';
        
        const figure = document.createElement('figure');
        figure.className = 'blog-banner-box';
        
        const img = document.createElement('img');
        img.src = 'assets/images/blog-1.jpg';
        img.alt = post.title;
        img.loading = 'lazy';
        
        figure.appendChild(img);
        
        const content = document.createElement('div');
        content.className = 'blog-content';
        
        const meta = document.createElement('div');
        meta.className = 'blog-meta';
        meta.innerHTML = `
            <p class="blog-category">${post.tags[0]}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        `;
        
        const title = document.createElement('h3');
        title.className = 'h3 blog-item-title';
        title.textContent = post.title;
        
        const text = document.createElement('p');
        text.className = 'blog-text';
        text.textContent = post.excerpt;
        
        const readMore = document.createElement('button');
        readMore.className = 'read-more';
        readMore.textContent = 'Read More';
        
        // Add click event listener to the read more button
        readMore.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Read More clicked for post:', post.id); // Debug log
            this.router.showBlogPost(post.id);
        };
        
        content.appendChild(meta);
        content.appendChild(title);
        content.appendChild(text);
        content.appendChild(readMore);
        
        listItem.appendChild(figure);
        listItem.appendChild(content);
        
        return listItem;
    }
}

export default BlogList; 