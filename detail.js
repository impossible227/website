document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mangaId = params.get("id");
  const container = document.getElementById("mangaDetail");

  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const manga = data.manga.find((m) => m.id === mangaId);
      if (!manga) {
        container.innerHTML = "<p>Manga tidak ditemukan.</p>";
        return;
      }

      const backLink = document.createElement("a");
      backLink.href = "index.html";
      backLink.textContent = "← Kembali ke daftar";
      backLink.className = "chapter-link";
      container.appendChild(backLink);

      const title = document.createElement("h2");
      title.textContent = manga.title;

      const img = document.createElement("img");
      img.src = manga.cover;
      img.alt = manga.title;

      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
        <strong>Genre:</strong> ${manga.genre.join(", ")}<br>
        <strong>Status:</strong> ${manga.status}
      `;

      const desc = document.createElement("p");
      desc.textContent = manga.description;

      const chapterList = document.createElement("div");
      chapterList.className = "chapter-list";

      const chapterTitle = document.createElement("h3");
      chapterTitle.textContent = "Daftar Chapter:";
      chapterList.appendChild(chapterTitle);

      manga.chapters.forEach((chapter) => {
        const link = document.createElement("a");
        link.href = `chapter.html?id=${manga.id}&chapter=${chapter.number}`;
        link.textContent = `Chapter ${chapter.number}`;
        link.className = "chapter-link";
        chapterList.appendChild(link);
      });

      container.appendChild(img);
      container.appendChild(title);
      container.appendChild(info);
      container.appendChild(desc);
      container.appendChild(chapterList);
    });
});