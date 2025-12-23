// Projects Gallery and Filters

class Projects {
    constructor() {
        this.filters = document.querySelectorAll('.projects__filter');
        this.projects = document.querySelectorAll('.project-card');
        this.loadMoreBtn = document.getElementById('loadMoreProjects');
        this.sliders = document.querySelectorAll('.project-card__slider-input');
        
        this.init();
    }
    
    init() {
        // Filter functionality
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => this.filterProjects(filter));
        });
        
        // Before/After sliders
        this.sliders.forEach(slider => {
            slider.addEventListener('input', (e) => this.updateSlider(e.target));
        });
        
        // Load more functionality
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
    }
    
    filterProjects(activeFilter) {
        const filterValue = activeFilter.dataset.filter;
        
        // Update active filter
        this.filters.forEach(f => f.classList.remove('projects__filter--active'));
        activeFilter.classList.add('projects__filter--active');
        
        // Filter projects
        this.projects.forEach(project => {
            const category = project.dataset.category;
            
            if (filterValue === 'all' || category === filterValue) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
    
    updateSlider(slider) {
        const value = slider.value;
        const card = slider.closest('.project-card__before-after');
        const afterImage = card.querySelector('.project-card__img--after');
        
        if (afterImage) {
            afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        }
    }
    
    loadMore() {
        // This would typically load more projects from an API
        // For now, we'll just hide the button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.style.display = 'none';
        }
    }
}

// Initialize projects
document.addEventListener('DOMContentLoaded', () => {
    new Projects();
});