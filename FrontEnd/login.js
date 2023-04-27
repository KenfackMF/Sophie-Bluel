const form = document.querySelector('form');
const erreurSaisi = document.createElement('p');
erreurSaisi.textContent = 'Adresse mail ou mot de passe invalide';
erreurSaisi.style.color = 'red';
erreurSaisi.style.display = 'none';
erreurSaisi.setAttribute('id', 'erreurSaisi');
form.appendChild(erreurSaisi);

const donnEntre = {
  email: "",
  password: "",
};

const adresseMail = document.querySelector('#adresseMail');
const motDePasse = document.querySelector('#motDePasse');

adresseMail.addEventListener("input", (e) => {
  donnEntre.email = e.target.value;
});

motDePasse.addEventListener("input", (e) => {
  donnEntre.password = e.target.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  donnEntre.email = adresseMail.value;
  donnEntre.password = motDePasse.value;


  console.log(donnEntre);




  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(donnEntre)
  })
  .then((reponse) => reponse.json())
  .then((data) => {
    donneData = data

    console.log(donneData);

    if (donneData.message) {
      alert('Email invalide')
    } else if (donneData.error){
      alert('Mot de passe invalide')
    }else{  
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    }
  

    
  })

  .catch((error) => {
    console.error(error);
    document.querySelector('#erreurSaisi').style.display = 'block';
  });
});

