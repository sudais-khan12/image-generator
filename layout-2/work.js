const track = document.getElementById("image-track");
const searchbtn = document.querySelector(".icon");
const searchBox = document.querySelector("input");
let searchResult = document.querySelector("#image-track");
let showButton = document.querySelector(".button"); 
let loader = document.querySelector(".show");
let keyword = "";
let page = 1;
let key = "AHNtAQBFnDFGdM7Ccr-DYGOhYzYLD_nQcpDD7VX0Vqw";

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  const clampedPercentage = Math.max(-100, Math.min(0, nextPercentage));

  track.dataset.percentage = clampedPercentage;

  track.animate(
    {
      transform: `translate(${clampedPercentage}%, -50%)`,
    },
    { duration: 500, fill: "forwards" }
  );

  for (const image of track.querySelectorAll("#image-track img")) {
    image.animate(
      {
        objectPosition: `${100 + clampedPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

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
    let image = document.createElement("img");
    image.src = result.urls.small;
    image.setAttribute("draggable", "false");

    let imageLInk = document.createElement("a");
    imageLInk.href = result.links.html;
    imageLInk.target = "_blank";

    let divs = document.createElement("div");
    divs.setAttribute("class", "div-class");

    page = 1;
    imageLInk.appendChild(image);
    divs.appendChild(imageLInk);
    searchResult.appendChild(divs);
    showButton.style.display = "block";
    loader.style.display = "none";
  });
}

showButton.addEventListener("click", () => {
  page++;
  loader.style.display = "block";
  searchImg();
});

searchbtn.addEventListener("click", () => {
  searchImg();
  loader.style.display = "block";
});
