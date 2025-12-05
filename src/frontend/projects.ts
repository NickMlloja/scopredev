import { injectNavBar, injectFooter } from "./page_utils.js";

interface ProjectStub {
	title: string;
	description: string;
	bg_image?: string;
}

const stubProjects: ProjectStub[] = [
	{
		title: "Brain-Seg-Fault",
		description: "A project for my CS659 class at NJIT. The goal is to implement an image segmentation algorithm from a reference research paper across a wider dataset with the hopes of creating a program to streamline the diagnosis process for MRI brain scans. The project for now will be fully on python and besides standard libraries use OpenCV2, Numpy, MatPlotLib.",
	},
	{
		title: "Modular Maze Generator",
		description: "This is a tool for generating mazes with the same parameters in bulk. These parameters include Path Color, Wall Color, Number of Rows, Number of Columns, Maze Texture, and Blur Effect. The maze texture can either be straight, wavy, or jagged. The blur effect uses a box based gaussian blur. The default distance of medium being 5, and strong being 10. A custom value may be entered.",
	},
];

function createProjectsPage(): void {
	const layout = document.createElement("div");
	layout.className = "layout-container";

	const widgetWrapper = document.createElement("div");
	widgetWrapper.className = "widget-wrapper";

	const widget = document.createElement("div");
	widget.className = "widget";

	// Header
	const header = document.createElement("h1");
	header.textContent = "Projects";
	widget.appendChild(header);

	const grid = document.createElement("div");
	grid.className = "projects-grid";

	// Project Cards
	for (const project of stubProjects) {
		const card = document.createElement("div");
		card.className = "widget";
		card.style.position = "relative";
		card.style.overflow = "hidden";
		card.style.padding = "1rem";

		// Background Image
		const bg = document.createElement("div");
		bg.style.position = "absolute";
		bg.style.inset = "0";
		bg.style.backgroundImage = `url(${project.bg_image})`;
		bg.style.backgroundSize = "cover";
		bg.style.backgroundPosition = "center";
		bg.style.opacity = "0.15";
		bg.style.pointerEvents = "none";
		bg.style.filter = "grayscale(60%)";
		card.appendChild(bg);

		// Text Content
		const title = document.createElement("h2");
		title.textContent = project.title;

		const desc = document.createElement("p");
		desc.textContent = project.description;

		card.appendChild(title);
		card.appendChild(desc);
		grid.appendChild(card);
	}

	widget.appendChild(grid);
	widgetWrapper.appendChild(widget);
	layout.appendChild(widgetWrapper);
	document.body.appendChild(layout);
}

document.addEventListener('DOMContentLoaded', (): void => {
	void (async (): Promise<void> => {
		createProjectsPage();
		await injectNavBar();
		await injectFooter();
		console.log('App initialized.');
	})();
});
