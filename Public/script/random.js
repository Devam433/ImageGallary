const gallaryImgContainer1 = document.querySelector('.gallary-img-container');

const url = new URL(`https://api.unsplash.com/photos/random?count=30`);
function createRequest(url){
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Client-ID oqUYMx6ZnoPUbaH7lCSwmuBRtLAwcm2D7xpXSNTIVd8'
        }
    }
    const request = new Request(url, options);
    getImages(request)
};

async function getImages(request) {
    try {
        const response = await fetch(request);
        const json = await response.json(); //the endpoin returns an array of objects
        console.log(json);
        let imgCtr = '';
        json.forEach((imgObj) => {
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
        gallaryImgContainer1.innerHTML = imgCtr;
    }
    catch (err) {
        console.error('error', err);
    }
}
(createRequest(url))();


// const apiImg=document.querySelector('.unsplash-img');
// apiImg.addEventListener('mouseover',()=>{
//     alert('hello');
// })