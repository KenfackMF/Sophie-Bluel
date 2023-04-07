let catalogue = [];

const container = document.querySelector('.gallery');


fetch('http://localhost:5678/api/works')
  .then(reponse => reponse.json())
  .then(data => {
    catalogue = data;
    genererCatalogue(catalogue); 
  });

function genererCatalogue(catalogue) {
  for (let i = 0; i < catalogue.length; i++) { 

    const figurePhoto = document.createElement("figure"); 
    const imageBal = document.createElement("img");

    imageBal.setAttribute('src', catalogue[i].imageUrl); 
    const titrePhoto = document.createElement("p");
    titrePhoto.innerText = catalogue[i].title; 

    
    container.appendChild(figurePhoto);
    figurePhoto.appendChild(imageBal);
    figurePhoto.appendChild(titrePhoto);
    console.log(catalogue);
  }
}




