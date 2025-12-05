
export function insertAfterReference(
	newElement: HTMLElement,
	referenceId: string,
	parent: HTMLElement = document.body,
): void {
	const existing = document.getElementById(newElement.id);
	if (existing) { existing.remove(); }

	const referenceElement = document.getElementById(referenceId);

	if (referenceElement?.parentNode) {
		referenceElement.after(newElement);
	} else {
		console.warn( `[UI] referenceElement (${referenceElement?.id ?? "null"}) not found. Defaulting to ${parent.nodeName}` );
		parent.appendChild(newElement);
	}
}

export async function injectHTML(container: HTMLElement, url: string): Promise<void> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to load ${url}: ${response.statusText}`);
		}
		const html = await response.text();
		container.innerHTML = html;
	} catch (err) {
		console.error(err);
		container.textContent = "Failed to load content.";
	}
}

export async function injectNavBar(): Promise<void> {
	const navWrapper = document.createElement("div");
	navWrapper.className = "nav-container";
	navWrapper.id = "global-navbar";

	document.body.insertBefore(navWrapper, document.body.firstChild);

	const navbarURL = "/navbar.html";

	await injectHTML(navWrapper, navbarURL);

	setupNavbar(navWrapper);
}

function setupNavbar(container: HTMLElement): void {
	const navLinks = container.querySelectorAll("[data-nav]");

	navLinks.forEach((el) => {
		if (!(el instanceof HTMLElement)) { return; }

		const target = el.dataset["nav"];
		if (target === undefined) { return; }

		el.addEventListener("click", () => {
			window.location.href = target;
		});
	});

	// Active highlight logic
	const current = window.location.pathname;

	navLinks.forEach((el) => {
		if (!(el instanceof HTMLElement)) { return; }

		const target = el.dataset["nav"];
		if (target === undefined) { return; }

		if (current.endsWith(target)) {
			el.classList.add("active");
		}
	});
}

export async function injectFooter(): Promise<void> {
	const footerWrapper = document.createElement("div");
	footerWrapper.className = "footer-container";
	footerWrapper.id = "global-footer";

	document.body.appendChild(footerWrapper);

	const footerURL = "/footer.html";

	await injectHTML(footerWrapper, footerURL);

	setupFooter(footerWrapper);
}

function setupFooter(_container: HTMLElement): void {
	// #TODO
}
