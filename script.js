document.addEventListener('DOMContentLoaded', () => {
    // Navigation Routing
    const navLinks = document.querySelectorAll('.nav-link, .nav-rule-link');
    const sections = document.querySelectorAll('.content-section');
    const breadcrumbPage = document.getElementById('breadcrumb-page');
    const searchInput = document.getElementById('search-input');
    const ruleCards = document.querySelectorAll('.rule-card');

    function navigateTo(targetId) {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active states in navigation
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
                
                // Set breadcrumbs
                const parentSectionName = link.closest('.nav-item') ? 
                    link.closest('.nav-item').querySelector('.nav-link').textContent.trim() : 'Docs';
                breadcrumbPage.textContent = link.textContent.trim();
            } else {
                link.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);
        });
    });

    // Search rules filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            ruleCards.forEach(card => {
                const id = card.getAttribute('data-rule-id').toLowerCase();
                const title = card.querySelector('.rule-title').textContent.toLowerCase();
                const desc = card.querySelector('.rule-desc').textContent.toLowerCase();

                if (id.includes(query) || title.includes(query) || desc.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Also filter sidebar rules list for matches
            const sidebarRuleLinks = document.querySelectorAll('.nav-rule-link');
            sidebarRuleLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const target = link.getAttribute('data-target').toLowerCase();
                if (text.includes(query) || target.includes(query)) {
                    link.style.display = 'block';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    }

    // Direct routing support if hash exists
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        navigateTo(hashTarget);
    } else {
        // Default page
        navigateTo('intro');
    }
});
