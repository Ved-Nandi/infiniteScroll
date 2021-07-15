// this is using intersection observer
//
//


// dom documents
const imgConte = document.getElementById('img-conte');
const loader = document.getElementById('loader');

// to get all a tag
let all_a_tag = document.querySelectorAll('a');


// number of images
let count = 10;

// count no of images loaded
let imgloaded = 0;

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
            
            // first we need to unobserve previous a tag
            all_a_tag = document.querySelectorAll('a');
            observer.unobserve(all_a_tag[all_a_tag.length - 3]);

            // call get photos get mor photos & set count 30 to get 30 photos now on
            count = 30;
            imgloaded = 0;
            getPhotos();
            
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

        // img loader
        imgTag.addEventListener('load', () => {
            
            imgloaded++;
            if (imgloaded === count) {

                // setting up onserver to a tag
                all_a_tag = document.querySelectorAll('a')
                observer.observe(all_a_tag[all_a_tag.length - 3])
            }
        }) 
    });
}

getPhotos();

