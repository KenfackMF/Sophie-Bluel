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
