const items = document.getElementById(`items`);        // ***informer où ce sera afficher en l'occurence là où #items sera

const infoKanapApi = async function () {               // async fait qu'une fonction renvoie une promesse * await fait qu'une fonction attend une Promise * elle me permet d'aller chercher les info dans lAPI
    await fetch("http://localhost:3000/api/products")  // Methode Fetch qui me permet de recuperer les données du serveur
        .then(function(response){                      // Promesse de recevoir une réponse de l'api 
            console.log(response);                     // verification que je recois bien la réponse
            return response.json();                    // Demande de retour de la réponse .. en format Json 
        })                                             // En + simple .then(reponse => reponse.json())
        .then(function(data){                          // une promesse de pouvoir "loguer" les datas (mes données)
            return (products = data);                  // demande d'un retour de reponse (les datas) que je "nomme" products
        })
        .catch (function (Error){                                     // Si ma promesse initiale est rejetée 'catch' (obligatoire avec un then)
            console.log(`J'en connais Un qui s'est planté` + Error);  // s'il apparait dans la console, il y a un problème
        });
};

async function miseEnPlaceProduitSurLaPage() {                        // fonction qui me permet d'installer mes éléments
    try{                                                              // le "try" instruction définit un bloc de code à exécuter (à TESTER).
      await infoKanapApi();                                           // je rapelle les info obtenu de l' API
      products.forEach((product) => {                                 // boucle foreach " à chaque"  * permet d'exécuter une fonction donnée sur chaque élément du tableau.  **  depuis le tableau (products) je vais à chaque fiche produit (product)  =>
          //Création des emplacements pour les éléments venant de l'API
          const productContainer = document.getElementById("items");  // création d'une constante qui est liée à # items
          const productLink = document.createElement("a");            // création d'une constante qui crée un <a></a>
          const productTag = document.createElement("article");       // création d'une constante qui crée un <article></article>
          const imageTag = document.createElement("img");             // création d'une constante qui crée un <img />
          const titleTag = document.createElement("h3");              // création d'une constante qui crée un <h3></h3>
          const productDescritpion = document.createElement("p");     // création d'une constante qui crée un <p></p 
  
          //Indication de l'équivalence des constantes par rapport au données de l'API
          productLink.href = "./product.html?id=" + product["_id"];   // <a href = "./product.html?id=" + product "_id"> </a>
          imageTag.src = product.imageUrl;                            // <img src= avec le lien de l'url de l'image du produit qui est dans l'API />
          imageTag.alt = product.altTxt;                              // lien avec le Alt de  l'image du produit qui est dans l'API
  
          titleTag.classList.add("productName");                      // je rajoute class="productName" au titre
          titleTag.textContent = product.name;                        // j'ecris le nom du produit qui se trouve dans l'Api 
          productDescritpion.textContent = product.description;       // j'ecris la description du produit qui se trouve dans l'Api 
          productDescritpion.classList.add("productDescription");     // je rajoute class="productDescription" au P 
         
          //Résultat des constantes
          productContainer.appendChild(productLink);                  //  # items est le pere de <a>
          productLink.appendChild(productTag);                        // <a> est le pere de <article>
          productTag.appendChild(imageTag);                           // <article> est le pere de <img />
          productTag.appendChild(titleTag);                           // <article> est le pere de <h3>
          productTag.appendChild(productDescritpion);                 // <article> est le pere de <p>
           
          console.log(product);                                       // me donne un acces visuel à tous les produits 
      });
        } catch (e) {                                                 //  catch (il faut un "TRY" au debut) instruction définit un bloc de code pour gérer toute erreur.
          console.error(e);                                           // Erreur
        }
  };
  
  miseEnPlaceProduitSurLaPage();                                      //appel de la fonction qui permetra l'affichage


// Une fonction asynchrone est une fonction qui s'exécute de façon asynchrone grâce à la boucle d'évènement en utilisant une promesse (Promise) comme valeur de retour.
// un Callback est une fonction passé en argument à une autre fonction ** 
// Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.
// La méthode then() renvoie un objet Promise. Elle peut prendre jusqu'à deux arguments qui sont deux fonctions callback à utiliser en cas de complétion ou d'échec de la Promise.
      /* const promise1 = new Promise((resolve, reject) => {
      resolve('Success!');
       });

      promise1.then((value) => {
      console.log(value);
      // expected output: "Success!"
      });
      */

// La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.  
// forEach exécute la fonction callback une fois pour chaque élément
// Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression}). Les expressions dans les espaces réservés et le texte compris dans ces espaces sont passés à une fonction.
// Les littéraux de gabarits sont des littéraux de chaînes de caractères permettant d'intégrer des expressions.
   //  Les gabarits sont délimités par des caractères accent grave.
   //  Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression})

/* ************* TRY  & CATCH ***************/ 
// try instruction définit un bloc de code à exécuter (à essayer).
// catch instruction définit un bloc de code pour gérer toute erreur.  
// finally instruction définit un bloc de code à exécuter quel que soit le résultat.  
// throw instruction définit une erreur personnalisée.