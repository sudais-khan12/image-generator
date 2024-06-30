let searchForm = document.querySelector("#search-form");
let searchBox = document.querySelector("input");
let searchbtn = document.querySelector("#search-btn");
let showbtn = document.querySelector(".uiverse");
let showButton = document.querySelector(".show-button");
let searchResult = document.querySelector("#search-result");
let loader = document.querySelector(".show");
let keyword = "";
let page = 1;
let key = "AHNtAQBFnDFGdM7Ccr-DYGOhYzYLD_nQcpDD7VX0Vqw";

async function searchImg() {
  keyword = searchBox.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;
  let response = await fetch(url);
  let data = await response.json();
  if (page == 1) {
    searchResult.innerHTML = "";
  }
  let results = data.results;

  results.map((result) => {
    let div = document.createElement("div");
    div.setAttribute("class", "try");

    let image = document.createElement("img");
    image.src = result.urls.small;

    let imageLInk = document.createElement("a");
    imageLInk.href = result.links.html;
    imageLInk.target = "_blank";

    let para = document.createElement("p");
    para.innerText = result.description;

    // image.appendChild(div);
    // div.appendChild(para);
    imageLInk.appendChild(image);
    // imageLInk.appendChild(div);
    searchResult.appendChild(imageLInk);
    showButton.style.display = "block";
    loader.style.display = "none";
    console.log(data);
  });
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  loader.style.display = "block";
  searchImg();
});

showbtn.addEventListener("click", () => {
  page++;
  loader.style.display = "block";
  searchImg();
});
