# Personal portfolio — DSC 106 Lab 1

A small static website built with HTML and CSS for
[Lab 1: Introduction to the Web platform](https://dsc106.com/labs/lab01/).

## Pages

- `index.html`: introduction and photograph
- `projects/index.html`: project work
- `contact/index.html`: the lab's email contact form
- `resume/index.html`: résumé, organized with semantic HTML
- `resume/lei-zhe-yu-resume.pdf`: the original supplied résumé, available to preview or download
- `style.css`: shared styling, including a responsive layout

## Preview locally

Open `index.html` in a browser, or run this command from the repository:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>. Follow every navigation link and resize the
window to check the narrow layout.

The contact form uses `mailto:`, as required by the lab. It needs a configured
email application. Submitting opens a draft; the visitor must send it from that
application.

## Personal details still needed

The owner chose to supply their own details. Before publishing:

- Add their name to the home page heading and document titles.
- Replace the introduction with their biography.
- Add their public email after `mailto:` in `contact/index.html`.
- The résumé page now contains Lei Zhe Yu's education, experience, skills, and projects.
- Add any additional projects they want to feature.

## Publish and submit

1. Commit the completed files and push to the repository's `main` branch.
2. On GitHub, open **Settings → Pages**. Choose **Deploy from a branch**, then
   **main** and **/ (root)**, and save.
3. Enable **Enforce HTTPS** when available. Verify the published pages at
   <https://0calunknown.github.io/portfolio/> after the deployment finishes.
4. Submit <https://github.com/0calunknown/portfolio> to Gradescope along with a
   narrated screen recording in MP4 format, no longer than one minute.

Suggested recording outline:

- 0–15 seconds: introduce the home page and navigate to the other pages.
- 15–35 seconds: show the customized résumé.
- 35–45 seconds: resize the browser to demonstrate the responsive layout.
- 45–60 seconds: explain one thing you personally learned from the lab.

The site has not been published and the course submission has not been made.
