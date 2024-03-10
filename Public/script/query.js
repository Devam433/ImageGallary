const img = document.querySelector('.unsplash-img');
const gallaryImgContainer = document.querySelector('.gallary-img-container');
const searchInput=document.querySelector('.search-input');
const searchBtn=document.querySelector('.search-btn');
const nextPage=document.querySelector('.next-page');
const prevPage=document.querySelector('.prev-page');

let currentPage=1;
nextPage.addEventListener('click',()=>{
    ++currentPage;
    getSearchQuery();
})
prevPage.addEventListener('click',()=>{
    if(currentPage>1){
        --currentPage;
        getSearchQuery();
    }
})

searchBtn.addEventListener('click',getSearchQuery);
searchBtn.addEventListener('keypress',(event)=>{
    if(event.key==='Enter'){
        getSearchQuery();
    }
})

function getSearchQuery(){
    let search_query='';
    search_query=searchInput.value;
    getUrl(search_query,(url)=>{
        createRequest(url);
    })
}
function getUrl(query,callback){
    const url = new URL(`https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=20`);
    callback(url)
}
function createRequest(url){
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID oqUYMx6ZnoPUbaH7lCSwmuBRtLAwcm2D7xpXSNTIVd8'
        }
    }
    const request = new Request(url, options);
    getImages(request)
}

async function getImages(request) {
    try {
        const response = await fetch(request);
        const json = await response.json();
        const results = json.results;
        console.log(json.results);
        let imgCtr = '';
        results.forEach((imgObj) => {
            imgCtr += `
                <div class="img-container">
                    <img src="${imgObj.urls.small_s3}" alt="" class="unsplash-img">
                    <div class="img-gradient">
                    <div>${imgObj.alt_description ?? `A photo by ${imgObj.user.name}`}</div>
                   <a href="${imgObj.links.download}"><div><span class="material-symbols-outlined">
                    download
                    </span></div></a>
                </div>
                    <div class="img-details">
                        <div>${imgObj.user.name}</div>
                        <div class="img-details">
                            <i class="fa fa-heart-o" aria-hidden="true" style="margin-top:3px;"></i>
                            <span>${imgObj.likes}</span>
                        </div>
                    </div>
                </div>`
        })
        gallaryImgContainer.innerHTML = imgCtr;
    }
    catch (err) {
        console.error('error', err);
    }
}