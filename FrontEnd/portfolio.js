let catalogue = [];

const container = document.querySelector(".gallery");

fetch("http://localhost:5678/api/works")
  .then((reponse) => reponse.json())
  .then((data) => {
    catalogue = data;
    genererCatalogue(catalogue);
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

// let categories = [];

//  fetch('http://localhost:5678/api/categories')
//  .then(reponse => reponse.json())
//  .then(data =>{
//   categories = data
//   console.log(categories);
//  })

// Récupérer le tableau depuis l'API
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    // Tri par ID
    data.sort((a, b) => a.id - b.id);
    // Créer une liste des catégories
    let categories = ["Tous", "Objet", "Appartements", "Hôtels & restaurant"];
    // Créer une section pour afficher les catégories
    let sectionCategories = document.createElement("section");
    // Ajouter un titre à la section
    let titreSection = document.createElement("h2");
    titreSection.textContent = "Catégories";
    sectionCategories.appendChild(titreSection);
    // Créer un élément de liste pour chaque catégorie et les ajouter à la section
    let listeCategories = document.createElement("ul");
    for (let i = 0; i < categories.length; i++) {
      let categorie = categories[i];
      let listeElement = document.createElement("li");
      listeElement.textContent = categorie;
      // Ajouter un événement de clic pour filtrer les éléments en fonction de la catégorie
      listeElement.addEventListener("click", () => {
        filtrerParCategorie(categorie, data);
      });
      listeCategories.appendChild(listeElement);
    }
    sectionCategories.appendChild(listeCategories);
    // Ajouter la section au document
    document.body.appendChild(sectionCategories);
  })
  .catch((error) => console.error(error));

// Fonction pour filtrer les éléments en fonction de la catégorie
function filtrerParCategorie(categorie, data) {
  let elementsFiltres = [];
  if (categorie === "tous") {
    elementsFiltres = data;
  } else {
    elementsFiltres = data.filter((element) => element.categorie === categorie);
  }
  // Afficher les éléments filtrés dans la console
  console.log(elementsFiltres);
}
