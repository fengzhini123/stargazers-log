document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("repos");

  if (!container) {
    return;
  }

  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load repository data.");
      }
      return response.json();
    })
    .then((repositories) => {
      if (!repositories.length) {
        container.innerHTML = "<p>No starred repositories yet.</p>";
        return;
      }

      container.innerHTML = repositories
        .map(
          (repo) => `
            <article class="repo-card">
              <h2><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a></h2>
              <p>${repo.description}</p>
              <div class="repo-meta">
                <span>Language: ${repo.language}</span>
                <span>Stars: ${repo.stars}</span>
              </div>
            </article>
          `
        )
        .join("");
    })
    .catch((error) => {
      container.innerHTML = "<p>Unable to load starred repositories right now.</p>";
      console.error(error);
    });
});
