const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');
Promise.all([
fetch('./database/blogs.json').then(res => res.json())
])
.then(([blogData]) => {
    // 3. Find the specific project object that matches the URL ID
    const blog = blogData.find(b => b.id === blogId);
    
    if (blog){
    // Call a function here to loop through and render your content blocks!
        function renderTitle(){
            console.log('kicked');
            document.getElementById('blog-title').innerText = blog.name;
            console.log('done')
        }
        function renderText(){
            let rawContent = blog.content; 
            // The magic dynamic path based on the project's folder structure
            const assetPath = `assets/img/${blog.id}/`;
            // Regex to find src='filename' or src="filename" that DON'T start with http/assets
            // It automatically injects the base path for local assets
            let hydratedContent = rawContent.replace(/(src=['"]|poster=['"])(?!http|assets\/)([^'"]+)(['"])/g, `$1${assetPath}$2$3`);
            // Inject the clean, processed HTML into your page
            document.getElementById('blog-content').insertAdjacentHTML('beforeend',hydratedContent);
        }
        renderTitle()
        renderText()
    } else {
    // Handle case where project ID doesn't exist in your JSON
    document.body.innerHTML = "<h1>Project not found</h1>";
    }
});