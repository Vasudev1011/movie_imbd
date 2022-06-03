
async function getMovieList(params) {
  try {
    const response = await fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${params}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "221ba86526msh0ec6ee9dcd0b4a2p1d2beejsn81200e1b29ec"
      }
    })
    const jsonResponse = await response.json()
    return jsonResponse;
  } catch (error) {
    console.log("Error : ", error)
    alert("something went wrong!")
  }
}
function SetList(LIST) {
  const element = document.getElementById('movie-list-show')
  LIST.forEach(val => {
    element.innerHTML += `<div class="movie-card" >
    <img src=${val.i.imageUrl}/>
    <h5>${val.l}</h5>  
    <div>
      <h6>${val.s}</h6>
      <h6 class="movie-card-rank">Rank : ${val.rank}</h6>
    </div>
    </div>`
  })
}
async function getDefaultData() {
  var showDataOnLoad = await getMovieList("New Movies")
  if (showDataOnLoad.d) {
    SetList(showDataOnLoad.d)
  }
}

window.onload = async function () {
  const movieListTitle = document.getElementById("movie-header")
  movieListTitle.innerText = "New Movies"
  const movieInput = document.getElementById('movie-input')
  const MovieButton = document.getElementById("movie-button")
  MovieButton.onclick = function () {
    movieListTitle.innerText = movieInput.value;
    UpdateMovieList(movieInput.value)
    movieInput.value = "";

  }
}

async function UpdateMovieList(params) {
  const element = document.getElementById('movie-list-show')
  var showDataOnLoad = await getMovieList(params)
  console.log("check new : ", showDataOnLoad)
  if (showDataOnLoad.d) {
    element.innerHTML = ""
    SetList(showDataOnLoad.d)
  }
}

window.addEventListener("load", getDefaultData)