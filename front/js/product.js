let urlparam = new URLSearchParams(window.location.search);                     // ***Recuperation de L'ID de l'URL
let productID = urlparam.get("id");                                             // Cette technique me permet de localiser l'ID et donc dans la foction suivante n'appeler que lui !

async function infoProductApi() {
  let response = await fetch("http://localhost:3000/api/products/" + productID) // Methode Fetch qui me permet de recuperer les données du serveur * Et là l'ID demandé plus haut 
  if (response.ok) {                                                            // Si reponse (nom du variable) est ok.... 
    return response.json();                                                     // Alors il renvoie une reponse sous format JSON
  } else {
    console.log(`J'en connais Un qui s'est planté`);                            // Si Erreur alors message dans le console.log
  }
}

async function displayInfo() {                                                  // Creation d'une fonction de mettre sur ecran les info recus
  const kanapInfo = await infoProductApi();                                     // Creation variable = l'appel de la fonction d'avant / le nom du variable sera utilise juste apres 
  document.getElementById("title").textContent = kanapInfo.name;                // liaison entre #title et le nom du produit qui est sous le nom name dans le Json                    
  document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${kanapInfo.imageUrl}" alt="${kanapInfo.altTxt}">`; // [0] me permet d'aller chercher le 1er element de la .class item__img...         //   variable connécté a lemplacement de l'image
  document.getElementById("price").textContent = kanapInfo.price;               // liaison entre #price (html) et le nom du produit qui est dans le Json                      //   variable connécté a lemplacement du prix
  document.getElementById("description").textContent = kanapInfo.description;   // liaison entre #description (html) et le nom du produit qui est dans le Json           //   variable connécté a lemplacement de la description

  kanapInfo.colors.forEach((color) => {                                         //   La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
    document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`; // Les gabarits sont délimités par des caractères accent grave (` `) TOUT CE QUI RENVOIE UNE VALEUR VA ETRE REMPLACE PAR SA VALEUR
  })
  const itemQuantity = document.getElementById("quantity");                     // Creation du variable en liaison à la page Html #quantity
  const ColorSet = document.getElementById("colors");                           // Creation du variable en liaison à la page Html #colors
  const addToTheCart = document.getElementById("addToCart");                    //  Creation du variable en liaison à la page Html #addToCart
  addToTheCart.addEventListener('click', (event) => {                           // Création d'une ecoute evenement (le click du bouton #addToCart)
    event.preventDefault();                                                     // Je l'empeche momentanement de faire son travail  

    if (itemQuantity.value > 0 && itemQuantity.value < 101 && ColorSet.value != "") { // Si le chiffre indique par le client est superieur ou egal à 0 et inferieur à 100 et qu'il a une couleur choisie 
      let kanapItem = {                                                         // Creation d'un objet qui liste les produits demandés
        id: productID,
        color: ColorSet.value,
        quantity: itemQuantity.value,
      };

      function addBasket(kanapItem) {                                           // Fonction dans la fonction qui me permetra de rajouter un element
        let basket = JSON.parse(localStorage.getItem("localBasket"));           // Creation d'un variable qui permet de recuperer les infos se trouvant dans le localStorage nommé basket

        if (basket == null) {                                                   // Si le localstiorage est vide 
          basket = [];                                                          // Alors création d'un tableau 
          basket.push(kanapItem);                                               // La méthode push() ajoute de nouveaux éléments à la fin d'un tableau, modifie la longueur du tableau et renvoie la nouvelle longueur.
          localStorage.setItem("localBasket", JSON.stringify(basket));          // L'objet localStorage STOCKE les données sans date d'expiration et permet d'enregistrer des paires clé/valeur dans le navigateur.
          alert("Votre canapé a été ajouté à votre panier");                    // La methode alert()affiche une boîte d'alerte avec un message et un bouton OK, elle est utilisée lorsque vous souhaitez que des infos parviennent à l'utilisateur. Ne pas en Abuser
        } else {                                                                // sinon 
          let update = false;                                                   // Je le declare pour l'utiliser sous forme true apres 
          
          for (let i = 0; i < basket.length; i++) {                             // Les boucles for sont pratiques pour exécuter le même code encore et encore, à chaque fois avec une valeur différente.
           var basketIQuantity = basket[i].quantity;                            // ma variable = la quantité de chaques kanapés
           var itemQuantityValue = itemQuantity.value;                          // la valeur inscrite par le client (nombre de kanap désiré)
           var itemQuantityValueParse = parseInt(itemQuantityValue);            // il me faut juste premiers nombres 
           var basketIQuantityParse = parseInt(basketIQuantity);                // il me faut juste premiers nombres
           var totalKanapItem = itemQuantityValueParse + basketIQuantityParse;  // mon total est egal à la quantité qui est dans le localStorage + le chiffre inscrit a l'instant par le client dans l'input
           if (basketIQuantity > 100) {                                         // si la quantité de mon local storage à 100 
               alert("Vous avez dépassé la limite autorisé de 100 articles identique en meme temps")
               return false                                                     // retourne faux (ca bloquera )
           }else if (kanapItem.id == basket[i].id && kanapItem.color == basket[i].color && totalKanapItem > 100){ // sinon si meme kanap , meme couleur et total du LocalStorage + input value  superieur a 100
            alert("attention vous ne pouvez pas commander + de 100 articles identique en meme temps")// Alerte général
            return false                                                        // retourne faux
           }
           
            else if (kanapItem.id == basket[i].id && kanapItem.color == basket[i].color) { // Si l'id demandé est egale a celle du panier, si la couleur demandé est égale a celle du panier
              update = true;                                                    // la MISE A JOUR est donc "possible"
              let totalBasket = parseInt(basket[i].quantity) + parseInt(kanapItem.quantity); // La méthode parseInt analyse une valeur sous forme de chaîne et renvoie le premier entier. Mon total sera = ma demande sur l'ecran + ce qui est deja dans le panier
              basket[i].quantity = totalBasket;                                 // le contenu de mon panier me donnera le nouveau total 
              alert("la quantité choisie a été mise à jour");
            }
          }
          if (update == false) {                                                // si ce sont different canapé ou differente couleur 
            basket.push(kanapItem);                                             // alors poussé l'element (kanapItem) dans le localStorage 
            alert("Votre nouveau canapé a été ajouté à votre panier");
          }
          localStorage.setItem("localBasket", JSON.stringify(basket));          // On enregistre la valeur (basket) du stockage (localstorage) qui a pour clé (localBasket)
        }
      }
      addBasket(kanapItem);                                                     // appel de la fonction qui permet d'executer ses instructions
    } else {
      alert("N'oubliez pas de nous informer sur la couleur et le nombre d'article de votre choix");
    }
  })
}
displayInfo();                                                                  // appel de la fonction qui permet d'executer ses instructions