let addMoviesList = JSON.parse(localStorage.getItem("movies")) || [];

function showAddedMoviesList(){
    // fetch the movieList element from the DOM
    const moviesListContainer = document.querySelector(".movies-list");

    // traverse over the array 
    for(let i = 0; i < addMoviesList.length; i++){

        const movieCard = document.createElement('div');
        const poster = document.createElement('div')
        const image = document.createElement('img');
        const details = document.createElement('div');
        const title = document.createElement('div');
        const titleP = document.createElement("p");
        const plot = document.createElement('div');
        const plotP = document.createElement("p");
        const removeBtn = document.createElement('div');
        const remove = document.createElement("p");

        // add event listener to remove the respective movie from the list
        remove.addEventListener("click", () => {
            // call the findIndex method to get the index of the movie in the movie list
            const startIndex = addMoviesList.findIndex((movie) => movie.Title === addMoviesList[i].Title);
            addMoviesList.splice(startIndex, 1);
            localStorage.setItem("movies", JSON.stringify(addMoviesList));
            removeAllMoviesFromlist();
            showAddedMoviesList();
        })

        // add the styling
        movieCard.classList.add("movie-card");
        poster.classList.add("poster");
        poster.classList.add("width-40");
        details.classList.add("details");
        details.classList.add("width-60");
        title.classList.add("title");
        plot.classList.add("plot");
        removeBtn.classList.add("remove-btn");
        remove.classList.add("remove");

        // setting the attribute for the image tag
        image.setAttribute("src", addMoviesList[i].Poster);
        image.setAttribute("alt", "Poster");

        // add the content
        titleP.innerHTML = addMoviesList[i].Title;
        plotP.innerHTML = addMoviesList[i].Plot;
        remove.innerHTML = "Remove";

        // create the parent-child relationship
        poster.appendChild(image);
        title.appendChild(titleP);
        plot.appendChild(plotP);
        removeBtn.appendChild(remove);
        details.appendChild(title);
        details.appendChild(plot);
        details.appendChild(removeBtn);
        movieCard.appendChild(poster);
        movieCard.appendChild(details);
        moviesListContainer.appendChild(movieCard);
    }
}

function removeAllMoviesFromlist(){
    const moviesListContainer = document.querySelector(".movies-list");
    let child = moviesListContainer.lastElementChild;
    while(child){
        moviesListContainer.removeChild(child);
        child =  moviesListContainer.lastElementChild;
    }
}

async function handleMovieSearch(){
    // fetch the movie-container-search from the DOM
    const movieContainerSearch = document.querySelector('.movies-container-search');
    const moviesListContainer = document.querySelector(".movies-list");
    moviesListContainer.style.opacity = 0.1;

    // get the value of the input field
    const inputField = document.querySelector("#search-field");
    const movieName = inputField.value;

    // call the api to get the movie details
    const response = await fetch(`https://www.omdbapi.com/?apikey=3ca5df7&t=${movieName}`);
    const movie = await response.json();

    //create the movie card
    // create the required elememts
    const moviecard = document.createElement('div');
    const poster = document.createElement('div');
    const image = document.createElement("img");
    const details = document.createElement('div');
    const title = document.createElement('div');
    const titleP = document.createElement("p");
    const plot = document.createElement("div");
    const plotP = document.createElement("p");
    const optionsBtn = document.createElement('div');
    const add = document.createElement("p");
    const cancel = document.createElement("p");
    cancel.addEventListener("click", () => {
        movieContainerSearch.removeChild(moviecard);
        moviesListContainer.style.opacity = 1;
        inputField.value = "";
    })

    add.addEventListener("click", () => {
        addMoviesList.push(movie);
        localStorage.setItem("movies", JSON.stringify(addMoviesList));
        movieContainerSearch.removeChild(moviecard);
        removeAllMoviesFromlist();
        showAddedMoviesList();
        moviesListContainer.style.opacity = 1;
        inputField.value = "";
    })

    // add the class
    moviecard.classList.add("movie");
    poster.classList.add("poster");
    details.classList.add("details");
    title.classList.add("title");
    plot.classList.add("plot");
    optionsBtn.classList.add("fav-btn");
    add.classList.add("add");
    cancel.classList.add("cancel");

    // set the attribute
    image.setAttribute("src", movie.Poster);
    image.setAttribute("alt", "Poster");

    // add the content
    titleP.innerHTML = movie.Title;
    plotP.innerHTML = movie.Plot;
    add.innerHTML = "Add";
    cancel.innerHTML = "Cancel";

    // create parent-child relationship
    poster.appendChild(image);
    title.appendChild(titleP);
    plot.appendChild(plotP);
    optionsBtn.appendChild(add);
    optionsBtn.appendChild(cancel);
    details.appendChild(title)
    details.appendChild(plot);
    details.appendChild(optionsBtn);
    moviecard.appendChild(poster);
    moviecard.appendChild(details);
    movieContainerSearch.appendChild(moviecard);
}

function setMovieList(){
    // how to add data in local storage
    // fetch the movie list from localstorage
    const movies = JSON.parse(localStorage.getItem("movies"));
    if(!movies){
        localStorage.setItem("movies", JSON.stringify([]));
    }
    showAddedMoviesList();
}

setMovieList();

