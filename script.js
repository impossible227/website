document.addEventListener("DOMContentLoaded", () => {
  const mangaList = document.getElementById("mangaList");
  const searchInput = document.getElementById("searchInput");

  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const allManga = data.manga;
      renderMangaList(allManga);

      searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = allManga.filter((manga) =>
          manga.title.toLowerCase().includes(keyword)
        );
        renderMangaList(filtered);
      });
    });

  function renderMangaList(mangaArray) {
    mangaList.innerHTML = "";

    if (mangaArray.length === 0) {
      mangaList.innerHTML = "<p>Tidak ditemukan.</p>";
      return;
    }

    mangaArray.forEach((manga) => {
      const card = document.createElement("div");
      card.className = "manga-card";

      const link = document.createElement("a");
      link.href = `detail.html?id=${manga.id}`;

      const img = document.createElement("img");
      img.src = manga.cover;
      img.alt = manga.title;

      const info = document.createElement("div");
      info.className = "info";

      const title = document.createElement("h2");
      title.textContent = manga.title;

      const desc = document.createElement("p");
      desc.textContent = manga.description;

      info.appendChild(title);
      info.appendChild(desc);

      link.appendChild(img);
      card.appendChild(link);
      card.appendChild(info);
      mangaList.appendChild(card);
    });
  }
});