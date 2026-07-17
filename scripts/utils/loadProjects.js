async function initializeLoadProjects() {
    const container = document.getElementById('projects-section');
    if (!container) return;
  
    try {
        // Fetch the JSON file
        const response = await fetch('database/index.json');
        const projectsData = await response.json();

        // Generate and inject HTML
        const projectsHTML = projectsData.map(project => {
        return `<div class="content-tile" aria-label="${project.id}">
            <a href='project.html?id=${project.id}'><div class="content-tile-thumb ${project.id}"></div></a>
            <div class="content-tile-label">
            <p>
                ${project.name}<br>
                ${project.year}
            </p>
            </div>
        </div>`;
        }).join('');
        container.innerHTML = projectsHTML;

    } catch (error) {
        console.error("Error loading projects data:", error);
    }
    initializeTileStyles();
}