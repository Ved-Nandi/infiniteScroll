// html documents
const imgConte = document.getElementById('img-conte');
const loader = document.getElementById('loader');

// to check the image loader count
let checkLoad = false;
let countImg = 0;


// number of images
let count = 5;

// api key
const API_KEY = process.env.SPLASH_API;

// Unsplash api
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=`;

// get photos from unsplash api
async function getPhotos() {
    try {
        const res = await fetch(`${API_URL}${count}`)
        const data = await res.json()
        displayPhotos(data)
        loader.hidden = true;
    } catch (error) {
        // error msg
    }
}

// set attribute function
function setAtt(tag, attributes) {
    for (const key in attributes) {
        tag.setAttribute(key, attributes[key])
    }
}

// display photos in page
function displayPhotos(photos) {
    photos.forEach(photo => {
        
        // create <a>
        const aTag = document.createElement('a');
        setAtt(aTag, {
            href: photo?.links?.html,
            target: '_blank'
        })

        // creat <img>
        const imgTag = document.createElement('img');
        setAtt(imgTag, {
            src: photo?.urls?.regular,
            alt: photo?.alt_description,
            title: photo?.alt_description
        })
        
        // put img in a tag
        aTag.appendChild(imgTag);
        imgConte.appendChild(aTag)

        // imge load event
        imgTag.addEventListener('load', () => {
            countImg++;
            if (countImg === count) {
                checkLoad = true;
                countImg = 0;
                // set the count to 30 now becouse if it is 10 then initial loading time is less but after initiol load it could be 30
                count = 30;
            }
        })
        
    });
}

// scrool event
window.addEventListener('scroll', scroll => {
    // here we are checking the height and and imgload property if both tru then this will call getPhotos() method
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && checkLoad) {
        checkLoad = false;
        getPhotos();
    }
})

getPhotos()
