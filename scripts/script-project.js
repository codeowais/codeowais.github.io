const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
Promise.all([
fetch('./database/projects.json').then(res => res.json())
])
.then(([projectData]) => {
    // 3. Find the specific project object that matches the URL ID
    const project = projectData.find(p => p.id === projectId);
    
    if (project){
    // Call a function here to loop through and render your content blocks!
        function renderHero(){
            let hero_mobile, hero_tablet, hero_default;
            if (project.hero) {
                hero_mobile = `assets/img/${project.id}/hero-mobile.webp`;
                hero_tablet = `assets/img/${project.id}/hero-tablet.webp`;
                hero_default = `assets/img/${project.id}/hero.webp`;
            } else {
                hero_mobile = project.hero_mobile ? `assets/img/${project.id}/hero-mobile.webp` : project.hero_default ? `assets/img/${project.id}/hero.webp` : `assets/img/${project.id}/thumb.webp`;
                hero_tablet = project.hero_tablet ? `assets/img/${project.id}/hero-tablet.webp` : project.hero_default ? `assets/img/${project.id}/hero.webp` : `assets/img/${project.id}/thumb.webp`;
                hero_default = project.hero_default ? `assets/img/${project.id}/hero.webp` : `assets/img/${project.id}/thumb.webp`;
            }
            const heroSource = `
            <source media="(max-width: 600px)" srcset='${hero_mobile}'>
            <source media="(max-width: 1024px)" srcset='${hero_tablet}'>
            <img src='${hero_default}' alt="${project.name} Hero Image">`
            document.getElementById('project-hero-section').innerHTML = heroSource;
        }
        function renderText(){
            document.getElementById('project-hero-title').innerText = project.name;
            document.getElementById('project-hero-year').innerText = project.year;
            let rawContent = project.content; 
            // The magic dynamic path based on the project's folder structure
            const assetPath = `assets/img/${project.id}/`;
            // Regex to find src='filename' or src="filename" that DON'T start with http/assets
            // It automatically injects the base path for local assets
            let hydratedContent = rawContent.replace(/(src=['"]|poster=['"])(?!http|assets\/)([^'"]+)(['"])/g, `$1${assetPath}$2$3`);
            // Inject the clean, processed HTML into your page
            document.getElementById('project-body-container').innerHTML = hydratedContent;
        }
        renderHero()
        renderText()
    } else {
    // Handle case where project ID doesn't exist in your JSON
    document.body.innerHTML = "<h1>Project not found</h1>";
    }
});