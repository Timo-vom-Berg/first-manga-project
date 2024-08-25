const MANGA_API_URL = "https://api.jikan.moe/v4/manga";

const RECOMMENDED_MANGA_IDS = [114745, 2, 26, 20, 642, 336];

const mangaRecsList = document.querySelector(".manga-recs");

// https://api.jikan.moe/v4/manga/{id}/full
async function fetchRecommendedMangas() {
  mangaRecsList.innerHTML = "";
  for (const id of RECOMMENDED_MANGA_IDS) {
    await new Promise(r => setTimeout(r, 500));
    const recManga = await fetch(`${MANGA_API_URL}/${id}`);
    const manga = await recManga.json();
    const mangaObject = extractMangaData(manga.data);
    const mangaRecsList = document.querySelector(".manga-recs");
    mangaRecsList.innerHTML += CreateMangaItem(mangaObject)
  }
}

function extractMangaData(mangaData) {
  const { authors, title, themes, synopsis, images, url } = mangaData;
  const jpgImage = images.jpg.image_url
  return new MangaData(synopsis, title, themes, jpgImage, authors, url);
}

console.log("hello");
fetchRecommendedMangas();
//Suche mir die gewünschte Id
//Definiere mir ein loop der die ids anzeigt
//Zeig mir die Bilder meiner Ids

class MangaData {
  constructor(synopsis, title, themes, image, authors, url) {
    this.synopsis = synopsis;
    this.title = title;
    this.themes = themes;
    this.authors = authors;
    this.image = image
    this.url = url
  }
}

function CreateMangaItem(mangaDataObject) {
  return `<div class="card col-xs-6" style="width: 18rem">
          <img 
          onclick='linkToCrunchyRoll("${mangaDataObject.title}")' 
            src="${mangaDataObject.image}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${mangaDataObject.title}</h5>
            <p class="card-text">
            ${mangaDataObject.synopsis.slice(0, 300)}...</p>
            <a href=" ${mangaDataObject.url}" class="btn btn-primary">Go to Manga</a>
          </div>
        </div>`;
}


function getCrunchyrollLink(title) {
  const encodedTitle = encodeURIComponent(title);
  return `https://www.crunchyroll.com/de/search?q=${encodedTitle}`
}
function linkToCrunchyRoll(title) {
  console.log(title)
  const link = getCrunchyrollLink(title)
  window.location.href = link
  //.search-input damit greifen wir auf unser html Dokument zu
}
// window.location zum redircten von hyperlinks
async function searchMangas() {
  const searchInput = document.querySelector(".search-input");
  const { value } = searchInput;
  const params = new URLSearchParams();
  params.append('q', value);
  params.append('limit', 10);
  const searchUrl = `${MANGA_API_URL}?${params}`
  const searchedMangas = await fetch(searchUrl)
  const searchData = await searchedMangas.json()
  displaySearchedMangas(searchData.data)
}



function displaySearchedMangas(searchData) {
  const mangasearchedList = document.querySelector('.manga-searched')
  mangasearchedList.innerHTML = ''

  console.log(searchData)
  for (const manga of searchData) {
    console.log(manga)
    const mangaData = extractMangaData(manga);
    mangasearchedList.innerHTML += CreateMangaItem(mangaData)

    // extrahiere die daten (nutze unsere bestehende hilfsfunktion)



    // fuege den manga auf unsere seite hinzu an .manga-searched element
    // nutze unsere Klasse, denk an document.querySelector


  }
  // extrahiere unsere daten async function fetchRecommendedMangas() {


}


/* mangaRecsList.innerHTML = "";
for (const id of RECOMMENDED_MANGA_IDS) {
  await new Promise(r => setTimeout(r, 500));
  const recManga = await fetch(`${MANGA_API_URL}/${id}`);
  const manga = await recManga.json();
  const mangaObject = extractMangaData(manga);
  const mangaRecsList = document.querySelector(".manga-recs");
  mangaRecsList.innerHTML+=CreateMangaItem(mangaObject)
} */

//auf unserer Request wird ein Parameter ein neuen Wert ueberschrieben
// const ist immer eine zuweisung und mit consol.log, damit logge ich ein Objekt
//Function such in der Datenbank nach der Id
// User bekommt seine suche
