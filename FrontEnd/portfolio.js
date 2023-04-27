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
  document.querySelector('.bandeNoir')
  navBar.style.backgroundColor = "black";
  navBar.style.margin = "0";
  navBar.style.marginLeft = "";
  navBar.style.width = "1140px"
  navBar.style.height = "60px";
  navBar.style.display = "flex";
  navBar.style.justifyContent = "center";
  navBar.style.alignItems = "center";
  document.body.insertBefore(navBar, document.body.firstChild);
  
  const publishButton = document.createElement("button");
  publishButton.textContent = "Publier les changements";
  publishButton.style.backgroundColor = "white";
  publishButton.style.borderRadius = "60px";
  publishButton.style.padding = "10px 20px";
  publishButton.style.margin = "20px";
  publishButton.style.display = "flex";
  publishButton.style.alignItems = "center";
  publishButton.style.color = "black";
  publishButton.style.border = "none";

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

  
  // créer le bouton "Modifier"
  const btnModifier = document.createElement('button');
  btnModifier.textContent = 'Modifier';
  btnModifier.style.backgroundColor = "white";
  btnModifier.style.border = "none";
  btnModifier.style.fontSize = "17px";
  btnModifier.style.color = "#1D6154";
  btnModifier.style.marginLeft = "15px";

  
  
  // ajouter le bouton et l'icône à l'en-tête "Mes Projets"
  const modaleOpening = document.querySelector('h2.projets');
  btnModifier.appendChild(icone);
  modaleOpening.appendChild(btnModifier);
  
  // Masquer les catégories
  const categoriesDiv = document.getElementById("categories");
  if (categoriesDiv) {
    categoriesDiv.style.display = "none";
  }



  // créer une fonction qui crée dynamiquement la modale
function openModal() {
  // créer un élément div pour la modale
  const modal = document.createElement('div');
  modal.className = 'modal';


  // créer un élément pour le contenu de la modale
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  

  // créer un élément pour le bouton de fermeture de la modale
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.textContent = 'X';
  
  // ajouter le bouton de fermeture au contenu de la modale
  modalContent.appendChild(closeButton);
  
  // ajouter un gestionnaire d'événements au bouton de fermeture
  closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    // fermer la modale
    modal.style.display = 'none';
  });

  // ajouter le bouton de fermeture au contenu de la modale
  modalContent.appendChild(closeButton);

  // créer un élément pour le texte de la modale
  const modalText = document.createElement('p');
  modalText.className = 'modalTitle'
  modalText.textContent = 'Galerie photo';

  const traisGris = document.createElement('div');
  traisGris.className = 'ligne';


  // créer le button ajout de photo
  const modalButton = document.createElement('button');
  modalButton.className = 'ajout-photo';
  modalButton.textContent = 'Ajouter une photo';

  const buttonErase = document.createElement('p');
  buttonErase.className = 'suppression';
  buttonErase.textContent = 'Supprimer la galerie'

  // ajouter le texte à la modale
  modalContent.appendChild(modalText);

  // ajouter le contenu de la modale à la modale
  modal.appendChild(modalContent);

  // ajouter le button à la modale
  modalContent.appendChild(modalButton);

  modalContent.appendChild(buttonErase);

  modalContent.appendChild(traisGris);



  // ajouter la modale au corps de la page
  document.body.appendChild(modal);


}

// sélectionner le bouton qui va déclencher l'ouverture de la modale
const button = document.querySelector('btnModifier');

// ajouter un gestionnaire d'événement pour le clic sur le bouton
btnModifier.addEventListener('click', openModal);

  
}