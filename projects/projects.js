import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { fetchJSON, renderProjects } from "../global.js";

const projects = await fetchJSON("../lib/projects.json");
const projectsContainer = document.querySelector(".projects");

// Show the project count in the page title
const projectsTitle = document.querySelector(".projects-title");
if (projectsTitle) {
  projectsTitle.textContent = `${projects?.length ?? 0} Projects`;
}

// Lab 5: pie chart of projects per year, plus search and click-to-filter
let query = "";
let selectedIndex = -1;
// Keep the selected year too, so a selection survives the pie being redrawn
let selectedYear = null;

const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
const colors = d3.scaleOrdinal(d3.schemeTableau10);

// Projects that match the search query
function filterByQuery(projectsGiven) {
  return projectsGiven.filter((project) => {
    let values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });
}

// Projects that match the search query AND the selected year (if any)
function getVisibleProjects() {
  let filtered = filterByQuery(projects);
  if (selectedYear !== null) {
    filtered = filtered.filter((project) => project.year === selectedYear);
  }
  return filtered;
}

function renderPieChart(projectsGiven) {
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year };
  });
  // re-calculate slice generator, arc data, arcs
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));

  // Keep the selection on the same year if it's still in the data
  selectedIndex = newData.findIndex((d) => d.label === selectedYear);
  if (selectedIndex === -1) selectedYear = null;

  // clear up paths and legends
  let svg = d3.select("#projects-pie-plot");
  svg.selectAll("path").remove();
  let legend = d3.select(".legend");
  legend.selectAll("li").remove();

  // update paths and legends
  newArcs.forEach((arc, i) => {
    svg
      .append("path")
      .attr("d", arc)
      .attr("fill", colors(i))
      .attr("class", i === selectedIndex ? "selected" : null)
      .on("click", () => {
        selectedIndex = selectedIndex === i ? -1 : i;
        selectedYear = selectedIndex === -1 ? null : newData[i].label;

        svg
          .selectAll("path")
          .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : null));
        legend
          .selectAll("li")
          .attr("class", (_, idx) =>
            idx === selectedIndex ? "legend-item selected" : "legend-item",
          );

        renderProjects(getVisibleProjects(), projectsContainer, "h2");
      });
  });

  newData.forEach((d, idx) => {
    legend
      .append("li")
      .attr("style", `--color:${colors(idx)}`)
      .attr("class", idx === selectedIndex ? "legend-item selected" : "legend-item")
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

// Initial render on page load
renderProjects(projects, projectsContainer, "h2");
renderPieChart(projects);

let searchInput = document.querySelector(".searchBar");
searchInput.addEventListener("input", (event) => {
  // update query value
  query = event.target.value;
  // The pie shows every year matching the search; the list also applies the selected year
  renderPieChart(filterByQuery(projects));
  renderProjects(getVisibleProjects(), projectsContainer, "h2");
});
