async function initializeLoadBlogs() {
    const container = document.getElementById('blog-section-list');
    if (!container) return;
  
    try {
        // Fetch the JSON file
        const response = await fetch('database/blogs.json');
        const blogsData = await response.json();

        const recentBlogs = blogsData.slice(-3).reverse();

        // Generate and inject HTML
        const blogsHTML = recentBlogs.map(blog => {
        return `<div class="blog-tile" aria-label="${blog.id}">
            <a href='blog.html?id=${blog.id}'><div class="blog-tile-thumb ${blog.id}" style="background-image: url('assets/img/${blog.id}/thumb.jpg')"></div>
            <div class="blog-tile-label">
            <p>
                ${blog.name}
            </p>
            </div></a></div>`;
        }).join('');
        container.innerHTML = blogsHTML;

    } catch (error) {
        console.error("Error loading blogs data:", error);
    }
}