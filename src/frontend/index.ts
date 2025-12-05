import { injectNavBar, injectFooter } from "./page_utils.js";

interface Link {
	label: string;
	url: string;
}

interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	repoUrl: string;
	liveUrl?: string;
}

interface Skills {
	languages: string[];
	libs: string[];
	aimlDataScience: string[];
	devops: string[];
}

interface PortfolioData {
	links: Link[];
	projects: Project[];
	skills: Skills;
}

const portfolioData: PortfolioData = {
	links: [
		{ label: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
		{ label: 'GitHub Profile', url: 'https://github.com/yourusername' },
		{ label: 'Email', url: 'mailto:your.email@example.com' },
	],
	projects: [
		{
			id: 'brainsegfault',
			title: 'Brain-Seg-Fault',
			description: 'Developed an OpenCV/NumPy pipeline to batch-process and segment MRI scans, while preserving nested folder structures.',
			techStack: ['Python', 'OpenCV2'],
			repoUrl: 'https://github.com/NickMlloja/Brain-Seg-Fault',
		},
		{
			id: 'modmazegen',
			title: 'Modular Maze Generator',
			description: 'Created a Python-based maze generation system for peripheral vision experiments leveraging multidimensional NumPy arrays.',
			techStack: ['Python', 'Numpy'],
			repoUrl: 'https://github.com/NickMlloja/Modular-Maze-Generator',
		},
	],
	skills: {
		languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C', 'C++', 'Bash', 'SQL', 'WGSL'],
		libs: ['Express', 'Node/NPM', 'HTML', 'CSS', 'Vite', 'VSCode', 'Jupyter Notebooks', 'Unittest', 'Vitest', 'Flake8', 'Black', 'Poetry'],
		aimlDataScience: ['PyTorch', 'TensorFlow', 'Numpy', 'Pandas', 'SciKit', 'OpenCV2', 'MatPlotLib', 'Seaborn', 'HPC', 'Slurm', 'Hadoop', 'WebGPU'],
		devops: ['Docker', 'CI/CD', 'GitHub', 'GitHub Projects', 'Jira', 'Linux/Unix', 'Heroku'],
	}
};


function renderLayoutContainer(id: string, className: string, contentHTML: string): string {
	return `
    <section id="${id}" class="layout-container ${className}">
      	<div class="widget-wrapper">
        	${contentHTML}
      	</div>
    </section>
  	`;
}

function renderLinks(links: Link[]): string {
	const listItems = links.map(link => `
    <li class="link-item">
      <a href="${link.url}" target="_blank">${link.label}</a>
    </li>
  	`).join('');
	return `<ul class="link-list">${listItems}</ul>`;
}

function renderProjects(projects: Project[]): string {
	const projectCards = projects.map(project => `
    <article class="project-card widget">
        <header>
            <h3>${project.title}</h3>
        </header>
        <div class="card-body">
            <p>${project.description}</p>
            <div class="tech-stack">
                <strong>Stack:</strong> ${project.techStack.join(' | ')}
            </div>
        </div>
        <footer class="project-links">
            <a href="${project.repoUrl}" target="_blank">Repository</a>
            ${(project.liveUrl ?? "") ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
        </footer>
    </article>
    `).join('');
	return `<div class="projects-grid">${projectCards}</div>`;
}

function renderSkills(skills: Skills): string {
	let skillHTML = '';
	const categories = Object.keys(skills) as Array<keyof Skills>;

	for (const category of categories) {
		let categoryTitle: string;
		switch (category) {
			case 'libs':
				categoryTitle = 'Libraries';
				break;
			case 'aimlDataScience':
				categoryTitle = 'AI / HPC / Data';
				break;
			case 'devops':
				categoryTitle = 'DevOps';
				break;
			default:
				categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
		}

		skillHTML += `
      		<div class="skill-category widget">
        	<h4>${categoryTitle}</h4>
        	<p>${skills[category].join(', ')}</p>
      		</div>
    	`;
	}
	return `<div class="skills-flex">${skillHTML}</div>`;
}

function initializeApp(): void {

	const body = document.body;
	const appRoot = document.createElement('div');
	appRoot.id = 'portfolio-app-root';

	const headerHTML = renderLayoutContainer('header-section', 'header-container', `<h1>Portfolio</h1>`);

	const linksHTML = renderLayoutContainer('links-section', 'content-container', `
    	<h2>Connect</h2>
    	${renderLinks(portfolioData.links)}
  	`);

	const skillsHTML = renderLayoutContainer('skills-section', 'content-container', `
    	<h2>Technical Capabilities</h2>
    	${renderSkills(portfolioData.skills)}
  	`);

	const projectsHTML = renderLayoutContainer('projects-section', 'content-container', `
    	<h2>Projects</h2>
    	${renderProjects(portfolioData.projects)}
  	`);

	appRoot.innerHTML = `
    	${headerHTML}
    	<main>
    	  	${linksHTML}
    	  	${skillsHTML}
    	  	${projectsHTML}
    	</main>
  	`;

	body.appendChild(appRoot);

}

document.addEventListener('DOMContentLoaded', (): void => {
    void (async (): Promise<void> => {
        initializeApp();
        await injectNavBar();
        await injectFooter();
        console.log('App initialized.');
    })();
});
