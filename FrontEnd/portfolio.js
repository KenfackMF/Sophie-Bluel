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
    figurePhoto.classList.add('figure-gallery');
    figurePhoto.setAttribute("data-id", catalogue[i].id);
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
logoutLink.className = 'log-out';
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
// Créer l'icone et modifier sur le titre
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

// Créer l'icone et modifier sous l'image
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
  
  
  // Masquer les catégories
  const modaleOpening = document.querySelector('h2.projets');
  editionButton.appendChild(icone);
  modaleOpening.appendChild(editionButton);
  

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
  
  // fermer la modale et le supprime du DOM
  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
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

    // appeler la fonction genererCatalogue2 avec les data en argument
    genererCatalogue2(catalogueModal);
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données de la galerie : ', error);
  });

// définir la fonction genererCatalogue2 
function genererCatalogue2(catalogueModal) {


  // boucler sur le tableau de données
  for (let i = 0; i < catalogueModal.length; i++) {
    // créer un élément div pour contenir chaque image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    imgContainer.setAttribute('data-id',  catalogueModal[i].id);

    // créer un élément img pour afficher l'image
    const img = document.createElement('img');
    img.src = catalogueModal[i].imageUrl;
    img.alt = catalogueModal[i].title;

    // créer un bouton de suppression pour chaque image
    const deleteButton = document.createElement('button');
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

     // créer un bouton 'éditer' pour chaque image
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



    // ajouter un écouteur d'événement pour supprimer l'image
deleteButton.addEventListener('click', () => {
  const imageId = img.getAttribute('data-id'); // récupérer l'ID de l'image
  const imageToDelete = document.querySelector(`.img-container [data-id="${imageId}"]`); // trouver l'élément imgContainer correspondant à l'ID

  if (imageToDelete) {
    imageToDelete.remove(); // supprimer l'élément imgContainer
  }
});




const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    const container = deleteButton.parentNode;
    const containerId = container.dataset.id; // la valeur de l'attribut "data-id" de l'image
    container.remove(); // supprime le container qui contient l'image du DOM

    const galleryFigures = document.querySelectorAll('.figure-gallery');

    for (let i = 0; i < galleryFigures.length; i++) {
      const figure = galleryFigures[i];
      if (figure.dataset.id === containerId) {
        figure.remove();
        break; // arrête la boucle une fois que la figure est trouvée et supprimée
      }
    }

    console.log(containerId);

    fetch(`http://localhost:5678/api/works/${containerId}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la suppression de l\'image');
      } 
    })
    .catch(error => {
      console.error(error);
    });
  });
});


  }

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


  buttonErase.addEventListener('click', (e) => {
    e.preventDefault();
    supprimerTouteLaGalerie();
});




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
  
    // fermer la modale et le supprime du DOM
    const closeButton2 = document.createElement('button');
    closeButton2.className = 'close-button2';
    closeButton2.textContent = 'X';
    modalContent2.appendChild(closeButton2);
  
    closeButton2.addEventListener('click', (e) => {
      e.preventDefault()
      modal.parentNode.removeChild(modal);
    });
  
    // ajouter les éléments de la modale2
    const modalText2 = document.createElement('p');
    modalText2.className = 'modalTitle2'
    modalText2.textContent = 'Ajout photo';
    modalContent2.appendChild(modalText2);
  
    const blueRectangle = document.createElement("div");
    blueRectangle.classList.add("blue-rectangle");
    modalContent2.appendChild(blueRectangle);
  
    const imageLost = document.createElement('div');
    imageLost.innerHTML = '<i class="fa-regular fa-image"></i>';
    blueRectangle.appendChild(imageLost);
  
    const labelText = document.createElement('span');
    labelText.textContent = '+ Ajouter photo';
    labelText.classList.add('texte-ajout');
    blueRectangle.appendChild(labelText);
  
    const imageInput = document.createElement('input');
    imageInput.classList.add('input-ajout');
    imageInput.accept = '.jpg, .png';
    imageInput.type = 'file';
    imageInput.style.opacity = '0';
    labelText.appendChild(imageInput);
  
    let file; //  variable a utiliser dans d'autres parties du code
  
    imageInput.addEventListener('change', function(e) {
      file = e.target.files[0];
  
      // Vérifier la taille de l'image n'eest pas su^érieur à 4mo
      const maxSizeInBytes = 4 * 1024 * 1024; 
      if (file.size > maxSizeInBytes) {
        alert('La taille de l\'image dépasse la limite maximale autorisée.');
        imageInput.value = ''; 
        return; // Arrêter l'exécution du reste de la fonction
      }
  
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const imageUrl = e.target.result;
  
        // Supprimer le contenu existant de blueRectangle
        blueRectangle.innerHTML = '';
  
        // Créer un élément <img> pour afficher l'image importée
        const imageImport = document.createElement('img');
        imageImport.src = imageUrl;
        imageImport.style.maxWidth = '30%';
        blueRectangle.appendChild(imageImport);
  
        // Vérifier si tous les champs sont valides pour activer le bouton de validation
        validationCheck();
      };
  
      reader.readAsDataURL(file);
    });
  
    const imgSize = document.createElement('p');
    imgSize.classList.add('img-size');
    imgSize.innerText = 'jpg, png : 4mo max';
    blueRectangle.appendChild(imgSize);
  
    const titleLabel = document.createElement("label");
    titleLabel.innerHTML = "Titre";
    titleLabel.classList.add('title-label');
    modalContent2.appendChild(titleLabel);
  
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.classList.add('title-input');
    modalContent2.appendChild(titleInput);
  
    //menu déroulant des catégories
    const catLabel = document.createElement("label");
    catLabel.innerHTML = "Catégories";
    catLabel.classList.add('cat-label');
    modalContent2.appendChild(catLabel);
  
    const catInput = document.createElement("div");
    catInput.classList.add('cat-input');
    modalContent2.appendChild(catInput);
  
    // Récupérer fetch por recuperer les cats
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
        const categories = data; 
  
        // Créer l'élément select pour le menu déroulant
        const selectMenu = document.createElement('select');
        selectMenu.classList.add('select-menu');
  
        // Création de l'élément div parent
        const customSelect = document.createElement('div');
        customSelect.classList.add('custom-select');
  
        // Création de l'élément div pour le chevron
        const selectArrow = document.createElement('div');
        selectArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        selectArrow.classList.add('select-arrow');
  
        // Ajout des elements aux parents
        selectMenu.appendChild(selectArrow);
  
        customSelect.appendChild(selectMenu);
  
        catInput.appendChild(customSelect);
  
        // les menu déroulant à partir des catégories
        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.text = category.name;
          selectMenu.appendChild(option);
        });
  
        // Vérifier si tous les champs sont valides pour activer le bouton de validation
        validationCheck();
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des catégories:', error);
      });
  
    const traisGris2 = document.createElement('div');
    traisGris2.className = 'ligne2';
    modalContent2.appendChild(traisGris2);
  
    // Le bouton validation de l'ajout de photo
    const validationButton = document.createElement('input');
    validationButton.type = 'button';
    validationButton.disabled = true;
    validationButton.className = 'validation';
    validationButton.value = 'Valider';
    modalContent2.appendChild(validationButton);
  
    function validationCheck() {
  
      // Vérifier si le select, l'input texte et l'image sont valides
      const selectValue = selectMenu.value;
      const textValue = titleInput.value;
      const imageValid = file && file.size <= maxSizeInBytes;
  
      // Activer ou désactiver le bouton de soumission en fonction de la validité des champs
      if (selectValue && textValue && imageValid) {
        validationButton.disabled = false;
        validationButton.style.backgroundColor = '#1D6154';
      } else {
        validationButton.disabled = true;
        validationButton.style.backgroundColor = '';
      }
    }
  
    validationButton.addEventListener('click', function() {
      const imageValue = imageInput.value;
      const titleValue = titleInput.value;
      const categoryValue = selectMenu.value;
    
      // Vérifier si tous les champs sont remplis
      if (imageValue && titleValue && categoryValue) {
        // Créer un nouvel objet FormData et ajouter les valeurs des champs
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', titleValue);
        formData.append('category', categoryValue);
    
        // Envoyer la requête POST avec les données du formulaire
        fetch('http://localhost:5678/api/works', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Une erreur s\'est produite lors de l\'envoi de la requête:', error);
          });
      }


    });
  
  });
  

// ecouter l'evenment input du formulaire pour activé le button submit (verifier si le select et l'input texte sont valide ainsi que l'image si ok passé le disable en false)
// changer le button valider en "submit"
// au click du btton, on récupère la value de l'image, le titre et la catégories et on crée un formData et ce formData qui sera mis dans le body de la requète POST
}


// Le bouton qui va déclencher l'ouverture de la modale
const button = document.querySelector('btnModifier');

// ajouter un gestionnaire d'événement pour le clic sur le bouton
editionButton.addEventListener('click', openModal);



  


  }






  