// Initialize Vanta.js Halo effect on the #vanta-container element
VANTA.HALO({
    el: "#vanta-container",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    baseColor: 0x111111,
    backgroundColor: 0x000000,
    amplitudeFactor: 2.0,
    size: 1.0
  });
  
  // Menu toggle and content display functionality
  document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('.content-section');
  
    if (!menuIcon || !menu || !menuLinks.length || !sections.length) {
      console.error("Menu elements or sections are missing.");
      return;
    }
  
    // Toggle the menu when the menu icon is clicked
    menuIcon.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  
    // Show the corresponding content when a menu item is clicked
    menuLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
  
        // Get the target content section
        const targetSectionId = link.dataset.target;
        const targetSection = document.getElementById(targetSectionId);
  
        if (!targetSection) {
          console.error(`Section with id ${targetSectionId} not found.`);
          return;
        }
  
        // Hide all sections
        sections.forEach(section => {
          section.classList.remove('active');
          section.classList.add('hidden');
        });
  
        // Show the target section
        targetSection.classList.add('active');
        targetSection.classList.remove('hidden');
  
        // Close the menu
        menu.classList.remove('open');
      });
    });
  
    // Fetch and display GitHub repositories in the Projects section
    fetchGitHubRepos();
  });
  
  // Function to fetch GitHub repositories
  function fetchGitHubRepos() {
    const username = 'mohdjey123'; // Your GitHub username
    const repoList = document.getElementById('repo-list');
  
    if (!repoList) {
      console.error("Repo list element not found.");
      return;
    }
  
    // Fetch repositories using GitHub API
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repos => {
        repos.forEach(repo => {
          // Create a list item for each repository
          const repoItem = document.createElement('li');
          repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}`;
          repoList.appendChild(repoItem);
        });
      })
      .catch(error => console.error('Error fetching repositories:', error));
  }
  