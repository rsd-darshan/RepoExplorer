document.addEventListener("DOMContentLoaded", function() {
    const skeletonContainer = document.querySelector(".skeleton-container");
    const repositoriesContent = document.getElementById("repositories-content");
    const searchForm = document.querySelector(".search-form form");

    // Function to show skeleton loaders
    function showSkeleton() {
        skeletonContainer.style.display = "flex";
        repositoriesContent.style.display = "none";
    }

    // Function to hide skeleton loaders
    function hideSkeleton() {
        skeletonContainer.style.display = "none";
        repositoriesContent.style.display = "block";
    }

    // Simulate data fetching on page load
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
    }, 2000); // Replace this timeout with the actual API call

    // Show skeletons on form submission
    if (searchForm) {
        searchForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent actual form submission
            showSkeleton();

            // Simulate API call delay (Replace with actual API call)
            setTimeout(() => {
                // Fetch data here and update the DOM with results
                hideSkeleton();
                // Replace the content of #repositories-content with fetched data
                updateRepositoriesContent(); // This function should be implemented to handle the actual data update
            }, 2000); // Replace this timeout with the actual API call
        });
    }
});

// Function to toggle description expansion
function toggleDescription(button) {
    const descriptionContainer = button.previousElementSibling;
    descriptionContainer.classList.toggle("expanded");
    button.textContent = descriptionContainer.classList.contains("expanded") ? "Read Less" : "Read More";
}

// Function to simulate updating the repositories content (Replace this with actual data handling)
function updateRepositoriesContent() {
    const repositoriesContent = document.getElementById("repositories-content");
    // Clear the current content (if needed)
    repositoriesContent.innerHTML = "";

    // Example of how you might add new content based on fetched data
    // Replace this with actual code to update the content based on fetched data
    const exampleRepository = document.createElement("div");
    exampleRepository.className = "repository";
    exampleRepository.innerHTML = `
        <div class="repo-header">
            <h3><a href="#" target="_blank">Example Repository</a></h3>
            <p class="owner">
                <img src="https://via.placeholder.com/30" alt="Owner Avatar" class="owner-avatar">
                <a href="#" target="_blank">example-owner</a>
            </p>
        </div>
        <div class="description-container">
            <p class="description">This is a placeholder for a repository description. Replace this with actual data.</p>
        </div>
        <p class="tags">
            <span class="tag language">JavaScript</span>
        </p>
        <p class="details">
            <span><i class="fas fa-star"></i> 100</span>
            <span><i class="fas fa-code-branch"></i> 50</span>
            <span><i class="fas fa-exclamation-circle"></i> 5 issues</span>
            <span><i class="fas fa-balance-scale"></i> MIT License</span>
            <span><i class="fas fa-clock"></i> Updated: 2024-06-13</span>
        </p>
        <div class="links">
            <a href="#" target="_blank" title="Visit Repository">
                <i class="fas fa-link"></i>
            </a>
            <a href="#" target="_blank" title="Download ZIP">
                <i class="fas fa-file-archive"></i>
            </a>
        </div>
    `;

    repositoriesContent.appendChild(exampleRepository);
    // Show the updated content
    repositoriesContent.style.display = "block";
}
