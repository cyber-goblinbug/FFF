"use scrict"

let galleryClass = document.querySelectorAll(".imageGallery");
console.log(galleryClass);
console.log(galleryClass.length);


galleryClass[0].style.display = "none";
galleryClass[1].style.display = "none";
galleryClass[2].style.display = "none";

for(let i =1; i < galleryClass.length ;i++){
    galleryClass[i].style.display = "none";

    console.log(i);
}
let currentImage = 0;

galleryClass[currentImage].style.display ="block"

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", function(){

    currentImage = currentImage + 1 ;
    galleryClass[currentImage].style.display ="block"


});
