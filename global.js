console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Step 3: automatic navigation menu
const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"
    : "/portfolio/";

const pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "resume/", title: "Resume" },
  { url: "https://github.com/0calunknown", title: "GitHub" },
];

const nav = document.createElement("nav");
document.body.prepend(nav);

// Treat /dir/index.html and /dir/ as the same page
const currentPath = location.pathname.replace(/index\.html$/, "");

for (const p of pages) {
  let url = p.url;
  if (!url.startsWith("http")) {
    url = BASE_PATH + url;
  }

  const a = document.createElement("a");
  a.href = url;
  a.textContent = p.title;

  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === currentPath
  );
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

// Step 4: dark mode switcher
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

const select = document.querySelector(".color-scheme select");

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty("color-scheme", colorScheme);
  select.value = colorScheme;
}

select.addEventListener("input", (event) => {
  setColorScheme(event.target.value);
  localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

// Step 5: better contact form
const form = document.querySelector("form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const params = [];
  for (const [name, value] of data) {
    params.push(`${name}=${encodeURIComponent(value)}`);
  }

  location.href = `${form.action}?${params.join("&")}`;
});

// Lab 4: load JSON data
export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
  }
}

// Lab 4: render a list of projects into a container
export function renderProjects(projects, containerElement, headingLevel = "h2") {
  if (!(containerElement instanceof Element)) {
    console.error("renderProjects: containerElement is not a valid DOM element");
    return;
  }

  // Fall back to h2 if headingLevel isn't h1–h6
  if (!/^h[1-6]$/i.test(headingLevel)) {
    headingLevel = "h2";
  }

  containerElement.innerHTML = "";

  if (!Array.isArray(projects) || projects.length === 0) {
    containerElement.innerHTML = "<p>No projects to show yet.</p>";
    return;
  }

  for (const project of projects) {
    const article = document.createElement("article");
    const title = project.title ?? "Untitled project";
    const image = project.image ?? "https://dsc106.com/labs/lab02/images/empty.svg";
    article.innerHTML = `
      <${headingLevel}>${title}</${headingLevel}>
      <img src="${image}" alt="${title}">
      <p>${project.description ?? ""}</p>
    `;
    containerElement.appendChild(article);
  }
}

// Lab 4: GitHub API
export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
