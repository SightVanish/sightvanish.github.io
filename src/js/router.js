import BlogList from '../blogs/BlogList.js';
import BlogDetail from '../blogs/BlogDetail.js';

class Router {
    constructor() {
        this.currentPage = 'about';
    }

    init() {
        // Handle navigation clicks
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            link.addEventListener('click', (e) => {
                const page = e.target.textContent.toLowerCase();
                this.navigateToPage(page);
            });
        });

        // Handle blog post clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.read-more')) {
                e.preventDefault();
                const postId = e.target.getAttribute('href').split('/').pop();
                this.showBlogPost(postId);
            }
        });
    }

    navigateToPage(page) {
        console.log('Navigating to page:', page); // Debug log
        
        // Hide all articles
        document.querySelectorAll('article').forEach(article => {
            article.classList.remove('active');
        });

        // Show selected article
        const selectedArticle = document.querySelector(`article[data-page="${page}"]`);
        if (selectedArticle) {
            selectedArticle.classList.add('active');
        }

        // If it's the blog page, render the blog list
        if (page === 'blog') {
            console.log('Rendering blog list'); // Debug log
            const blogList = new BlogList();
            const blogContent = document.querySelector('.blog-posts');
            if (blogContent) {
                blogContent.innerHTML = '';
                blogContent.appendChild(blogList.render());
            } else {
                console.error('Blog content container not found'); // Debug log
            }
        }

        this.currentPage = page;
    }

    showBlogPost(postId) {
        console.log('Showing blog post:', postId); // Debug log
        
        const blogDetail = new BlogDetail();
        const blogContent = document.querySelector('.blog-posts');
        
        if (blogContent) {
            console.log('Found blog content container'); // Debug log
            
            // Clear the blog content
            blogContent.innerHTML = '';
            
            // Create a container for the blog post
            const postContainer = document.createElement('div');
            postContainer.className = 'blog-post-container';
            
            // Render and append the blog post
            const postContent = blogDetail.render(postId);
            postContainer.appendChild(postContent);
            blogContent.appendChild(postContainer);
            
            console.log('Blog post rendered'); // Debug log
        } else {
            console.error('Blog content container not found'); // Debug log
        }
    }
}

export default Router; 