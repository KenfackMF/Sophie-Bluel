let catalogue = [];
let categories = [];

const container = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    catalogue = data;
    genererCatalogue(catalogue);
    console.log(catalogue)
  });

function genererCatalogue(catalogue) {
  for (let i = 0; i < catalogue.length; i++) {
    const figurePhoto = document.createElement("figure");
    const imageBal = document.createElement("img");

    imageBal.setAttribute("src", catalogue[i].imageUrl);
    const titrePhoto = document.createElement("p");
    titrePhoto.innerText = catalogue[i].title;

    container.appendChild(figurePhoto);
    figurePhoto.appendChild(imageBal);
    figurePhoto.appendChild(titrePhoto);
  }
}

fetch("http://localhost:5678/api/categories")
  .then((reponse) => reponse.json())
  .then((data) => {
    categories = data
    console.log(categories);
    const categoriesContainer = document.getElementById('categories');
    const photosContainer = document.getElementsByClassName('gallery');

    const categoryMap = new Map();
    categories.forEach(category => categoryMap.set(category.id, category));

    // Ajouter la catégorie "Tous"
    const tousButton = document.createElement('button');
    tousButton.textContent = 'Tous'; 
    tousButton.dataset.categoryId = 0;
    tousButton.classList.add('category-button');
    categoriesContainer.appendChild(tousButton);
    
    // Ajouter l'écouteur d'événements pour le bouton 'Tous'
    tousButton.addEventListener('click', () => {
      updatePhotos(0);
      // Changer la couleur de fond et le texte du bouton 'Tous'
      tousButton.style.backgroundColor = '#0E2F28';
      tousButton.style.color = 'white';
      // Réinitialiser la couleur de fond et le texte de tous les autres boutons de catégorie
      const buttons = document.querySelectorAll('.category-button');
      buttons.forEach(button => {
        if (button !== tousButton) {
          button.style.backgroundColor = '';
          button.style.color = '';
        }
      });
    });

    
    
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name; 
      button.dataset.categoryId = category.id;
      button.classList.add('category-button');
      categoriesContainer.appendChild(button);
      // Ajouter l'écouteur d'événements pour chaque bouton de catégorie
      button.addEventListener('click', () => {
        const categoryId = parseInt(button.dataset.categoryId);
        updatePhotos(categoryId);
        // Changer la couleur de fond et le texte du bouton actif
        button.style.backgroundColor = '#0E2F28';
        button.style.color = 'white';
        // Réinitialiser la couleur de fond et le texte de tous les autres boutons de catégorie
        const buttons = document.querySelectorAll('.category-button');
        buttons.forEach(btn => {
          if (btn !== button && btn !== tousButton) {
            btn.style.backgroundColor = '';
            btn.style.color = '';
          }
        });
      });
    });



    function updatePhotos(categoryId) {
      while (photosContainer[0].firstChild) {
        photosContainer[0].removeChild(photosContainer[0].firstChild);
      }

      // Modifier la condition pour afficher toutes les photos
      const filteredPhotos = categoryId === 0 ? catalogue : catalogue.filter(photo => photo.categoryId === categoryId);
      filteredPhotos.forEach(photo => {
        const figurePhoto = document.createElement("figure");
        const imageBal = document.createElement("img");

        imageBal.setAttribute("src", photo.imageUrl);

        const titrePhoto = document.createElement("p");
        titrePhoto.innerText = photo.title;
    
        container.appendChild(figurePhoto);
        figurePhoto.appendChild(imageBal);
        figurePhoto.appendChild(titrePhoto);
      });
    }
});


//  Vérifier si le token de connexion est présent dans le localStorage

const token = localStorage.getItem("token");

if (token) {
  const navBar = document.createElement("div");
  navBar.classList.add("bandeNoir");
  document.body.insertBefore(navBar, document.body.firstChild);
  
  const publishButton = document.createElement("button");
  publishButton.textContent = "Publier les changements";
  publishButton.classList.add('publish-button');
  navBar.appendChild(publishButton);

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-pen-to-square");
  icon.style.color = "white";
  navBar.appendChild(icon);
  
  const text = document.createElement("p");
  text.textContent = "Mode Edition";
  text.style.marginLeft = "10px";
  text.style.color = "white";
  navBar.appendChild(text);
  navBar.appendChild(publishButton);


  
  const icone = document.createElement('i');
  icone.className = 'fa-sharp fa-solid fa-pen-to-square';
  icone.style.fontSize = '16px';
  icone.style.color = '#1D6154';
  icone.style.marginLeft = '10px';



const nav = document.querySelector('nav ul');


const logoutLi = document.createElement('li');
const logoutLink = document.createElement('a');
logoutLink.href = '#';
logoutLink.textContent = 'logout';
logoutLink.className = 'deconexion';
logoutLi.appendChild(logoutLink);

// Ajout d'un écouteur d'événement sur le bouton de déconnexion
logoutLink.addEventListener('click', (e) => {
  e.preventDefault(); 

  
  localStorage.removeItem('token');


  window.location.href = 'login.html';
});


if (localStorage.getItem('token')) {

  const loginLi = document.querySelector('.log');
  nav.insertBefore(logoutLi, loginLi.nextSibling); 
  loginLi.style.display = 'none'


}

const title = document.querySelector('article');
title.classList.add('titre');

const editionButton1 = document.createElement('button');
editionButton1.classList.add('btn-modifier1');
title.insertBefore(editionButton1, title.firstChild);

const icon2 = document.createElement('i');
icon2.classList.add("fas", "fa-pen-to-square");
editionButton1.appendChild(icon2);

const edition = document.createElement('p');
edition.classList.add('btn-modifier1');
edition.innerText = 'Modifier';
editionButton1.appendChild(edition);


const titlePicture = document.querySelector('figure');
titlePicture.classList.add('image-titre');

const editionButton2 = document.createElement('button');
editionButton2.classList.add('btn-modifier2');
titlePicture.appendChild(editionButton2);

const icon3 = document.createElement('i');
icon3.classList.add("fas", "fa-pen-to-square");
editionButton2.appendChild(icon3);

const edition2 = document.createElement('p');
edition2.classList.add('btn-modifier1');
edition2.innerText = 'Modifier';
editionButton2.appendChild(edition2);




  
  // créer le bouton "Modifier" pour ouvrir la modale
  const editionButton = document.createElement('button');
  editionButton.textContent = 'Modifier';
  editionButton.classList.add('btn-modifier');


  
  
  const modaleOpening = document.querySelector('h2.projets');
  editionButton.appendChild(icone);
  modaleOpening.appendChild(editionButton);
  
  // Masquer les catégories
  const categoriesDiv = document.getElementById("categories");
  if (categoriesDiv) {
    categoriesDiv.style.display = "none";
  }



  // créer la modale
function openModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  document.body.appendChild(modal);


  // créer modalcentent
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modal.appendChild(modalContent);

  // Les éléments afficher de la modale
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.textContent = 'X';
  modalContent.appendChild(closeButton);
  
  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    // fermer la modale et le supprime du DOM
    modal.parentNode.removeChild(modal);
  });


  const modalText = document.createElement('p');
  modalText.className = 'modalTitle'
  modalText.textContent = 'Galerie photo';
  modalContent.appendChild(modalText);


    // créer un élément div pour contenir toutes les images
    const galleryModal = document.createElement('div');
    galleryModal.className = 'gallery-modal';
    modalContent.appendChild(galleryModal);


// // Afficher la galerie dans la modale
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // stocker les données dans une variable
    const catalogueModal = data;

    // appeler la fonction genererCatalogue2 avec les données en argument
    genererCatalogue2(catalogueModal);
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données de la galerie : ', error);
  });

// définir la fonction genererCatalogue2 en dehors de la chaîne de promesses
function genererCatalogue2(catalogueModal) {


  // boucler sur le tableau de données
  for (let i = 0; i < catalogueModal.length; i++) {
    // créer un élément div pour contenir chaque image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    // créer un élément img pour afficher l'image
    const img = document.createElement('img');
    img.src = catalogueModal[i].imageUrl;
    img.alt = catalogueModal[i].title;

   

    // créer un bouton de suppression pour chaque image
    const deleteButton = document.createElement('i');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';


    // créer la croix suppression pour chaque image
    const deleteArrows = document.createElement('i');
    deleteArrows.className = 'delete-arrows';
    deleteArrows.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
    deleteArrows.style.display = 'none';

    // ajouter un écouteur d'événement pour afficher le bouton de suppression
    imgContainer.addEventListener('mouseover', () => {
      deleteArrows.style.display = 'block';
    });
    // ajouter un écouteur d'événement pour masquer le bouton de suppression
    imgContainer.addEventListener('mouseout', () => {
      deleteArrows.style.display = 'none';
    });

     // créer un bouton d'édition pour chaque image
     const editButton = document.createElement('p');
     editButton.className = 'edit-button';
     editButton.textContent = 'Editer';
     imgContainer.appendChild(editButton);


    // ajouter le bouton de suppression et l'image à l'élément div imgContainer
    imgContainer.appendChild(deleteButton);
    imgContainer.appendChild(deleteArrows);
    imgContainer.appendChild(img);

    // ajouter l'élément div imgContainer à l'élément div galleryModal
    galleryModal.appendChild(imgContainer);
  }

  // ajouter l'élément div galleryModal à l'élément modalContent (à définir ailleurs)
}


  const traisGris = document.createElement('div');
  traisGris.className = 'ligne';
  modalContent.appendChild(traisGris);



  // Le button ajout de photo
  const addPhotoButton = document.createElement('button');
  addPhotoButton.className = 'add-photo';
  addPhotoButton.textContent = 'Ajouter une photo';
  modalContent.appendChild(addPhotoButton);

  // Le button supprimer la galerie
  const buttonErase = document.createElement('p');
  buttonErase.className = 'delete-gallery';
  buttonErase.textContent = 'Supprimer la galerie'
  modalContent.appendChild(buttonErase);


  // Créer la modale2 pour l'ajout de photo
  addPhotoButton.addEventListener('click', function() {

  
    // Les éléments pour le contenu de la modale2
    const modalContent2 = document.createElement('div');
    modalContent2.className = 'modal-content2';
    modal.appendChild(modalContent2);
    
    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    modalContent2.appendChild(backButton);
      
    // retour à la première modal

    backButton.addEventListener('click', (e) => {
      e.preventDefault()
      modalContent2.style.display = "none";
      modalContent.classList.add('modal-content');
    });


    const closeButton2 = document.createElement('button');
    closeButton2.className = 'close-button2';
    closeButton2.textContent = 'X';
    modalContent2.appendChild(closeButton2);
    
    closeButton2.addEventListener('click', (e) => {
      e.preventDefault()
      // fermer la modale et le supprime du DOM
      modal.parentNode.removeChild(modal);
    });
  
  
    const modalText2 = document.createElement('p');
    modalText2.className = 'modalTitle2'
    modalText2.textContent = 'Ajout photo';
    modalContent2.appendChild(modalText2);


    const blueRectangle = document.createElement("div");
    blueRectangle.classList.add("blue-rectangle");
    modalContent2.appendChild(blueRectangle);

    const imageLost = document.createElement('i');
    imageLost.classList.add = 'image-lost';
    imageLost.innerHTML = '<i class="fa-solid fa-image"></i>';
    modalContent2.appendChild(imageLost);

    const texteAjout = document.createElement('button');
    texteAjout.classList.add('texte-ajout');
    texteAjout.textContent = 'Ajouter photo'
    modalContent2.appendChild(texteAjout);


    const titleLabel = document.createElement("label");
    titleLabel.innerHTML = "Titre";
    modalContent2.appendChild(titleLabel);
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    modalContent2.appendChild(titleInput);

    const catLabel = document.createElement("label");
   catLabel.innerHTML = "Catégories";
    modalContent2.appendChild(catLabel);
   const catInput = document.createElement("input");
  catInput.setAttribute("type", "text");
    modalContent2.appendChild(catInput);
  
    modal2.appendChild(modalContent2);
    document.body.appendChild(modal2);

    closeButton2.addEventListener("click", function() {
    modal2.style.display = "none";})


    backButton.addEventListener("click", function() {
      modal2.style.display = "none";
      modal.style.display = "block";
    });

console.log(addPhotoButton);
  
  } )



}


// Le bouton qui va déclencher l'ouverture de la modale
const button = document.querySelector('btnModifier');

// ajouter un gestionnaire d'événement pour le clic sur le bouton
editionButton.addEventListener('click', openModal);









  }