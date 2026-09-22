const gallery = document.querySelectorAll(".gallery img");

const lightbox = document.querySelector(".lightbox");

const lightboxImg = document.querySelector(".lightbox-img");

const closeBtn = document.querySelector(".close");

const prev = document.querySelector(".prev");

const next = document.querySelector(".next");

let current = 0;

gallery.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        current=index;

        showImage();

    });

});

function showImage(){

    lightbox.style.display="flex";

    lightboxImg.src=gallery[current].src;

}

closeBtn.onclick=()=>{

    lightbox.style.display="none";

}

next.onclick=()=>{

    current++;

    if(current>=gallery.length){

        current=0;

    }

    showImage();

}

prev.onclick=()=>{

    current--;

    if(current<0){

        current=gallery.length-1;

    }

    showImage();

}

window.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

    if(e.key==="ArrowRight"){

        next.click();

    }

    if(e.key==="ArrowLeft"){

        prev.click();

    }

});