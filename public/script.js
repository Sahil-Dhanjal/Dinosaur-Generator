// This javascript that's being written is the CLient Side Javascript. It is used by the clients ...
// ... [in our case] to request the server for the dinosaur information and the server further requests the API to generate a response.

// A statment written just for Debugging purposes
console.log('script.js Loaded')

// Creating an Event Listener
document.querySelector('#btnLoad').addEventListener('click', () => {
    // When we click the button with id '#btnLoad', we run these function written below:
    getDinoName();
    getDinoImage();
})


// async functions have been used because again we've been using APIs ...
// .. and we don't know how long it is going to take for them to return us the response.
async function getDinoName() {

    // The await operator is used to wait for a Promise.
    const response = await fetch('/dinoname');

    // In here we receive the response from the route we create on the server end. ..
    // .. and the same data is being formatted as a json
    const data = await response.json();

    // This statement printed would be visible in our browser console.
    // The data that we receive is an array which is further an array, so we're basically trying to access that first array.
    let dinoName = data[0].join(' ');

    console.log(dinoName);

    // Accessing the text content of the HTML tag with id = dinoName & replacing the same content with the dinonames that ..
    // .. were received from the API's Response.
    document.querySelector('#dinoName').textContent = dinoName;
    
}

// Client side function for getting the Image of the Dinosaur by making a call to the endpoint we've created here in the back-end
async function getDinoImage() {
    const response = await fetch('/dinoimage');
    const data = await response.json();

    // As the dinosaur's image is present in the thumbnailurl attribute of the response received ..
    // .. when the API is run, therefore here below we are going to access the thumbnail url of
    // .. the very first image out of the 50 images that our API returns.
    // let dinoImage = data.value[0].thumbnailUrl;
    
    // We hardcoded it previously, but all that we want is a random image from that array containing 10 images - A random number between 1 to 10
    // Here's the code for the same:
    let dinoImage = data.value[Math.floor(Math.random() * data.value.length)];
    
    // Accessing the other attributes of the received Image to be later used in the mark-up.
    let dinoImageUrl = dinoImage.thumbnailUrl;
    let dinoAlt = dinoImage.name;

    console.log(dinoImage);

    // Because all the images generated were getting appended as 'Img' elements in our mark-up, ..
    // .. therefore in order to prevent that we delete the previous Image so as to keep just one image on the display.
    // To do that we initially check for any image's presence in the mark-up & then delete before calling the next one via an API call.
    if (document.querySelector('#dinoImage') !== null) {
        // if it is not null, it shows that the Image exists
        document.querySelector('#dinoImage').remove();
    }
    // The above code just ensures that before loading the next Image, the previous image is removed.
    
    // NOW, WE GET TO RECEIVING THE NEXT IMAGE.
    // Appending the received Image to the HTML Page Dynamically using Javascript.
    let img = document.createElement('img');
    img.id = 'dinoImage';
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('body').appendChild(img);
    changeBtnTextToOriginal();
}

changeBtnText = () => {
    const btnText = document.getElementById("btnText");
    btnText.innerText = "Generating...";
}

changeBtnTextToOriginal = () =>{
    const btnText = document.getElementById("btnText");
    btnText.innerText = "Generate Dinosaur";
}