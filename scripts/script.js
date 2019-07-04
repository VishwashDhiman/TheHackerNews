var newsItems = {
    news : null,
    count : 0
};

// Get all the news ID's from URL.
function getTopNewsID(){
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(function(response) {
        return response.json()
    })
    .then(function(fetchedNews){
        newsItems.news = fetchedNews;
        getTopNewsFromID();
    })
}
// Increments counter
function incrementCount(){
    newsItems.count += 1;
    getTopNewsFromID();
}
// Setting up loading button
function loadingButton(removeButton){
    var loadMoreButton = document.createElement("button");
    const button = document.getElementById('loading');
    if(button.childElementCount > 0){
        removeButton;
    }
    loadMoreButton.id = "loadButton";
    loadMoreButton.addEventListener("click", incrementCount);
    loadMoreButton.innerHTML = "Load more top stories"
    button.appendChild(loadMoreButton)
}

// Removes if button already exists
function removeButton(){
    let btnRef = document.getElementById('loadButton');
    if(btnRef != null){
    btnRef.parentElement.removeChild(btnRef);
    }
}
// Getting id's tofetch data
function getTopNewsFromID(){
    var {count, news} = newsItems;
    for(var id = 0; id < 20; id += 1){
        getNewsDetails(news[(count*20)+id]);
    }
    loadingButton(removeButton());
   
}

// Fetches news data and stores in localStorage of browser
function getNewsDetails(id){
    if(localStorage.getItem(id) == null){
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (details){
        let data = {};
        data = details
        localStorage.setItem(id, JSON.stringify(data));
        showData(details);
        
      })
    }
    else{
        // If element present in there. Then fetches from there.
        let d = localStorage.getItem(id);
        showData(JSON.parse(d));
    }
}

// Initializing DOM to show results
function showData(data){
    const main = document.getElementById('main');
    
    const author = document.createElement('h2');
    t = document.createTextNode(data.by);
    author.appendChild(t);

    const title = document.createElement('p');
    t = document.createTextNode(`Title =  ${data.title}`);
    title.appendChild(t);

    const type = document.createElement('p');
    t = document.createTextNode(`Type = ${data.type}`);
    type.appendChild(t);

    const score = document.createElement('p');
    t = document.createTextNode(`${data.score} votes | ${data.descendants} comments`);
    score.appendChild(t);

    main.append(author);
    main.append(title);
    main.append(type);
    main.append(score);
    
}