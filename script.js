// this is using intersection observer
//
//


// dom documents
const imgConte = document.getElementById('img-conte');
const loader = document.getElementById('loader');

// to check the image loader count
let checkLoad = false;
let countImg = 0;


// number of images
let count = 5;

// api key
const API_KEY = "20O5AnV-GilJl1gSfd0TvmairFs_m2IFpFfGYgtJLrU";

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

// intersection observer
const observer = new IntersectionObserver(entries => {
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            getPhotos()
        }
    })
    
})


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
        
    });

    // setting up onserver to a tag
    let all_a_tag = agdocument.querySelectorAll('a')
    console.log(all_a_tag);
    
}

getPhotos()

