document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mangaId = params.get("id");
  const chapterNum = params.get("chapter");
  const container = document.getElementById("chapterImages");

  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const manga = data.manga.find((m) => m.id === mangaId);
      if (!manga) {
        container.innerHTML = "<p>Manga tidak ditemukan.</p>";
        return;
      }

      const chapter = manga.chapters.find((c) => c.number === chapterNum);
      if (!chapter) {
        container.innerHTML = "<p>Chapter tidak ditemukan.</p>";
        return;
      }

      chapter.pages.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Halaman Chapter ${chapterNum}`;
        container.appendChild(img);
      });
    });
});