//Récupération des produits stockés dans l'api
async function infoProductApis(id) {                                           // on rapelle l'API car certaines info ne se trouve pas dans le localStorage  ** doit être lié a id  
    let response = await fetch("http://localhost:3000/api/products/" + id)     // je recherche à récuperer l'ID de chaque produit qui se trouve dans l'API
    if (response.ok) {                                                         // si aucune erreur dans ma demande
        return response.json();                                                // il me renvoie la réponse sous format JSON
    } else {                                                                   // sinon 
        console.log(`J'en connais Un qui s'est planté`);                       // il m'informe dans la console qu il y a un bintzzzzz
    }
}

async function displayCart() {                                                 // Création d'une fonction qui me donnera mes infos sur ecran

    let basket = JSON.parse(localStorage.getItem("localBasket"));              // On recupere les ressources stockées dans le LocalStorage (ou se trouve tout les canapé "commandés")
    //console.log(basket);

    for (let i = 0; i < basket.length; i++) {                                  // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        let item = basket[i];                                                  // [i] element du tableau de basket
        let info = await infoProductApis(item.id);                             // je rapelle dans cette fonction les infos (id) qui sont dans l'API
        console.log(info);                                                     // Me donne toutes les infos de chaque kanap demandé
        console.log(item.quantity);                                            // Me donne la quantité de chaque Kanapé
        console.log(item);                                                     // me donne les 3 element demandés dans la page product.html  "quantite couleur et id"

        // On "recree les infos données dans le DOM 
        // Article
        const cartItems = document.getElementById("cart__items");              // on localise #"cart__items" on l'associe à une variable
        const article = document.createElement("article");                     // création de l'article on l'associe à une variable
        article.classList.add("cart__item");                                   // on lui rajoute une <class: ...>
        article.setAttribute("data-id", item.id);                              // on lui donne son attribut ID 
        article.setAttribute("data-color", item.color);                        // 
        cartItems.appendChild(article);                                        // # cart__items a pour enfant "article"

        const cartItemImg = document.createElement("div");                     // création d'une DIV on l'associe à une variable
        cartItemImg.classList.add("cart__item__img");                          // on lui rajoute une <class: ...>
        article.appendChild(cartItemImg);                                      // article a pour enfant cartItemImg

        const img = document.createElement("img");                             // création de <img> on l'associe à une variable
        cartItemImg.appendChild(img);                                          // cartItemImg a pour enfant img
        img.src = info.imageUrl;                                               // le src de img est dans l'API sous le nom imageUrl 
        img.alt = info.altTxt;                                                 // le Alt de img est dans l'API sous le nom imageUrl

        const cartItemContent = document.createElement("div");                 // création d'une DIV on l'associe à une variable
        cartItemContent.classList.add("cart__item__content");                  // on lui rajoute une <class: ...>
        article.appendChild(cartItemContent);                                  // article a pour enfant cartItemContent

        const cartItemContentDescription = document.createElement("div");      // création d'une DIV on l'associe à une variable
        cartItemContentDescription.classList.add("cart__item__content__description");// on lui rajoute une <class: ...>
        cartItemContent.appendChild(cartItemContentDescription);               // cartItemContent a pour enfant cartItemContentDescription

        const title = document.createElement("h2");                            // création <H2> on l'associe à une variable
        title.innerHTML = info.name;                                           // le variable "title" on va l'ecrire = son "name" qui provient de l'API
        cartItemContentDescription.appendChild(title);                         // cartItemContentDescription a pour enfant title

        const couleur = document.createElement("p");                           // création <p> on l'associe à une variable
        couleur.innerHTML = item.color;                                        // J'ecris sur l'ecran la couleur du kanapé choisi (chaque kanapé)
        cartItemContentDescription.appendChild(couleur);                       // cartItemContentDescription a pour enfant couleur

        const prix = document.createElement("p");                              // création <p> on l'associe à une variable
        prix.innerHTML = info.price + " €";                                    // J'ecris sur l'ecran le prix du canapé en € (chaque canapé)
        cartItemContentDescription.appendChild(prix);                          // cartItemContentDescription a pour enfant prix

        const cartItemContentSettings = document.createElement("div");         // création d'une DIV on l'associe à une variable
        cartItemContentSettings.classList.add("cart__item__content__settings");// on lui rajoute une <class: ...>
        cartItemContent.appendChild(cartItemContentSettings);                  // cartItemContent a pour enfant cartItemContentSettings

        const cartItemContentSettingsQuantity = document.createElement("div"); // création d'une DIV on l'associe à une variable
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");// on lui rajoute une <class: ...>
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);  // cartItemContentSettings a pour enfant cartItemContentSettingsQuantity

        const quantite = document.createElement("p");                          // création <p> on l'associe à une variable
        quantite.innerHTML = "Qté : ";                                         // J'ecris sur l'ecran " Qté :  "
        cartItemContentSettingsQuantity.appendChild(quantite);                 // cartItemContentSettingsQuantity a pour enfant quantite

        const itemQuantity = document.createElement("input");                  // création <input> on l'associe à une variable
        itemQuantity.type = "number";                                          // le type de l'input est number
        itemQuantity.classList.add("itemQuantity");                            // on lui rajoute une <class: ...>
        itemQuantity.name = "itemQuantity";                                    // le nom de l'input est itemQuantity
        itemQuantity.min = "1";                                                // sa quantité minimum est 1
        itemQuantity.max = "100";                                              // sa quantité maximum est 100
        itemQuantity.pattern = "[0123456789]{3}";                              // on ne peut pas inscrire autre chose que des chiffres
        itemQuantity.value = item.quantity;                                    // la valeur indique (sa quantité demandé) sera la quantité qui s'enregitrera dans le local storage (mais pas encore)
        cartItemContentSettingsQuantity.appendChild(itemQuantity);             // cartItemContentSettingsQuantity a pour enfant itemQuantity

        const cartItemContentSettingsDelete = document.createElement("div");   // création d'une DIV on l'associe à une variable
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");// on lui rajoute une <class: ...>
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);    // cartItemContentSettings a pour enfant cartItemContentSettingsDelete

        const deleteItems = document.createElement("p");                       // création <p> on l'associe à une variable
        deleteItems.classList.add("deleteItem");                               // on lui rajoute une <class: ...>
        deleteItems.innerHTML = "Supprimer";                                   // j'ecris le mot supprimer sur l'ecran
        cartItemContentSettingsDelete.appendChild(deleteItems);                // cartItemContentSettingsDelete a pour enfant deleteItems

        // *** event listener pour supprimer un article (pas besoin de fair une fonction pour les rajouter, idem pour update)
        deleteItems.addEventListener("click", (event) => {                     // ****** on va écouter le click de chaque element du tableau
            let basket = JSON.parse(localStorage.getItem("localBasket"));      // rappel de la sauvegarde car on est dans uen nouvelle fonction
                                      
            let article = event.target.closest("article");                     //on recupére l'article le plus proche (donc le parent)
            //on récupére les data-id et color                                 //pas besoin de preventdefault, c'est bouton ne font ps partie d'un formulaire, il n'ont pas d'action de base, donc rien a arreter
            let id = article.dataset.id;                                       // ***
            let color = article.dataset.color;                                 // ***
            if (confirm("etes vous sûr de vouloir supprimer cet article ? ") == true) {
                let newBasket = basket.filter(element => element.id !== id || element.color !== color); // Je filtre pour ne garder que ce que je veux
                localStorage.setItem("localBasket", JSON.stringify(newBasket));// j'enregistre le nouveau resultat en fonction du variable juste audessus
                
                article.remove();                                              // je supprime l'article qui contient le produit pour supprimer sa ligne sans recharger
                refreshTotal();                                                // j appelle la fonction pour mettre à jour le total
            }
        })
        itemQuantity.addEventListener("change", (event) => {                   // quand le client clique sur la double fleches (haut et bas) je ...
            
            let basket = JSON.parse(localStorage.getItem("localBasket"));      // Nouvelle fonction, on n a pas accès au ancienne info donc je la reappelle
            let article = event.target.closest("article");                     // Je recupére "l'article" le plus proche (donc le parent) ** event.target me permet de cibler l'élément desiré
            let id = article.dataset.id;                                       // je récupére les data-id ENCORE une fois puisque nouvelle fonction ** qui est en faite "item.id" => basket[i].id donc l'id de l'article choisi
            let color = article.dataset.color;                                 // je récupére les data-color ENCORE une fois puisque nouvelle fonction
            console.log(id);                                                   // cela me donne l'ID du canapé dont je change la quantité
            console.log(color);                                                // cela me donne la couleur du canapé dont je change la quantité

            // J'ecoute le changement de la variable, du coup, l'event déclanché contient la valeur
            let newValue = event.target.value; // **************je dois cree un let car en 1 fois il bloque donc en 2 fois grace au let
  
            basket.forEach(element => {                                        // je parcours le panier
                
                if (element.id == id && element.color == color) {              // si je trouve meme id et color c'est bon
                    if (newValue > 0 && newValue < 101) {                      // si newvalue est entre 1 et 100
                        element.quantity = newValue;                           // alors mise a jour de newValue
                    } else {
                        alert("quantité invalide")                             //messagae d'alerte en cas de quantité invalide
                    }
                }
            });
           
            localStorage.setItem("localBasket", JSON.stringify(basket));       // Sauvegarde *** pas de fonction saveBasket, une focntion pour 1 ligne est contreproductif, le but est de reduire le nombre de ligne, pas l'augmenter
    
            refreshTotal();                                                    // Mise a jour du total après modification

        })
    }
    
    refreshTotal()                                                             // je remets a jour le total pour la premiere fois en dehors du for pour eviter qu'il ne soit appeler a chaque article
}
displayCart();                                                                 // je rapelle la fonction entiere qui me permet d'afficher a l'ecran toutes les infos

async function refreshTotal() {                                                // création d'une fonction refresh pour mettre a jour le total
    let basket = JSON.parse(localStorage.getItem("localBasket"));              //basket n'existe pas dans cette fonction du coup ont le récupére
    let screenTotalQuantity = document.getElementById("totalQuantity");
    let totalValue = 0;                                                        // je declare la variable totalValue pour m'en servir plus tard
    for (let i = 0; i < basket.length; i++) {                                  // boucle for pour aller chercher l'info 
        value = basket[i].quantity;                                            // value = les quantités de chaques éléments se trouvanyt dans le localStorage
        //console.log(value);  
        totalValue += parseInt(value);                                         // la méthode "parseInt" analyse une valeur sous forme de chaîne et renvoie le premier entier.
        console.log(totalValue);                                               // je jetes un coup d'oeil 
    }
    screenTotalQuantity.innerText = totalValue;                                // j'ecris a l''ecran ce total

    let totalPrice = 0;                                                        // je declare cette variable pour m'en servir plus tard
    for (let i = 0; i < basket.length; i++) {                                  // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        item = basket[i];                                                      // [i] element du tableau de basket que j'ai rapelé car plus haut avec toutes les infos de chaques canapés
        info = await infoProductApis(item.id);                                 // je rapelle dans cette fonction les infos (id) qui sont dans l'API

        let valeur = item.quantity;                                            // je declare la variable = la quantité de chaque kanapé
        console.log(item); 
        totalPrice += valeur * info.price;                                     // totalPrice A chaque kanapé j'affecte = quantité de canapé X son prix 
        finalTotal = parseInt(totalPrice);                                     // dont seul les chiffres m'interessent
    }
    document.querySelector("#totalPrice").innerText = finalTotal;              // j'ecris ce chiffre là où l'ID me le demande
}
//                                                                             // je en la rapelle pas apres car elle est directement rappelé dans les fonctions qui ont besoin d'elle

/* ************************** FORMULAIRE ****************************************** */

const orderForm = document.getElementsByClassName("cart__order__form__question");// creation variable lié à #  dans le HTML
let firstName = document.getElementById("firstName");                          // creation variable lié à #firstName  dans le HTML
let lastName = document.getElementById("lastName");                            // creation variable lié à #lastName  dans le HTML
let address = document.getElementById("address");                              // creation variable lié à #address  dans le HTML   
let city = document.getElementById("city");                                    // creation variable lié à #city  dans le HTML
let email = document.getElementById("email");                                  // creation variable lié à #email  dans le HTML
let submit = document.getElementById("order");                                 // creation variable lié à #order  dans le HTML c'est le BOUTON D'ENVOI

let firstNameErr = document.getElementById("firstNameErrorMsg");               // creation variable lié à # firstName ERROR dans le HTML
let lastNameErr = document.getElementById("lastNameErrorMsg");                 // creation variable lié à #lastName  ERROR dans le HTML
let addressErr = document.getElementById("addressErrorMsg");                   // creation variable lié à #address  ERROR dans le HTML
let cityErr = document.getElementById("cityErrorMsg");                         // creation variable lié à #city  ERROR dans le HTML
let emailErr = document.getElementById("emailErrorMsg");                       // creation variable lié à #email  ERROR dans le HTML

/* ************************** REGEX *************************************** */

let nameRegExp = /^[a-zA-Zéêëèîïâäàçù ,.'-]{0,70}$/;                           // regex pour les lettres de 0 a 70 caractères
let emailRegExp = /^([a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}){0,90}$/; // regex alphanumerique + @ et .  pour le mail
let addressRegExp = /^[a-zA-Zéêëèîïâäàçù0-9 ,.'-]{0,50}$/;                     // regex alphanumerique pour les adresses     

/* ************************** FIRST NAME *************************************** */
// je fais mes tests en dehors du bouton submit parce qu eje veux qu'il me signale avant le click qu'il y a un soucis

firstName.addEventListener("input", function () {                              //  création d'un addEventListener pour l'input du prénom  j'ecoute pour voir si il repond a ma demande (pas de chiffre)
    validateFirstName();                                                       // c'est la fonction qui sera exécuté lorsque on ecrira dans l'input firstName (suite a notre ecoute)       
});

function validateFirstName() {                                                 // création de la fonction que je vais ecouter pour valider qu'il n'y a pas "d'erreur de frappe"
    let testFirstName = nameRegExp.test(firstName.value);                      // je teste avec le regex ce qu'ecrit le client voir qu'il n'y est pas d'erreur
    if (testFirstName == false) {                                              // si mon test ne passe pas 
        firstNameErr.textContent = "Veuillez saisir svp votre prénom correct";   // alors on ecrit un message d'erreur dessous "bla bla bla"
        return false;                                                          // et on le declare faux
    } else {
        firstNameErr.textContent = "";                                           // puisqu'il n 'y a pas erreur on n'ecris pas de message erreur! 
        return true;                                                           // et on le declare vrai
    }
}
let validateFirstNameVar = validateFirstName();                                // j'appelle la fonction en dehors de la fonction

/* ************************** LAST NAME *************************************** */

lastName.addEventListener("input", function () {                               //  création d'un addEventListener pour l'input du nom  j'ecoute pour voir si il repond a ma demande (pas de chiffre)
    validateLastName();                                                        // c'est la fonction qui sera exécuté lorsque on ecrira dans l'input lastName (suite a notre ecoute)    
});

function validateLastName() {                                                  // création de la fonction LastName que je vais ecouter pour valider qu'il n'y a pas "d'erreur de frappe"
    let testLastName = nameRegExp.test(lastName.value);                        // je teste avec le regex ce qu'ecrit le client voir qu'il n'y est pas d'erreur
    if (testLastName == false) {                                               // si mon test ne passe pas
        lastNameErr.innerText = "Veuillez saisir svp votre nom correct";       // alors on ecrit un message d'erreur dessous "bla bla bla"
        return false;                                                          // et on le declare faux
    } else {
        lastNameErr.innerText = "";                                            // puisqu'il n 'y a pas erreur on n'ecris pas de message erreur! 
        return true;
    }
}
let validateLastNameVar = validateLastName();                                  // j'appelle la fonction en dehors de la fonction

/* **************************** ADDRESS ************************************* */

address.addEventListener("input", function () {                                // création d'un addEventListener pour l'input de m'adresse j'ecoute pour voir si il repond a ma demande (alpha numérique)
    validateAddress();                                                         // c'est la fonction qui sera exécuté lorsque on ecrira dans l'input adress (suite a notre ecoute)    
});

function validateAddress() {                                                   // création de la fonction que je vais ecouter pour valider qu'il n'y a pas "d'erreur de frappe"
    let testaddress = addressRegExp.test(address.value);                       // je teste avec le regex ce qu'ecrit le client voir qu'il n'y est pas d'erreur
    if (testaddress == false) {                                                // si mon test ne passe pas
        addressErr.textContent = "Veuillez saisir correctement votre adresse svp ";// alors on ecrit un message d'erreur dessous "bla bla bla"
        return false;                                                          // et on le declare faux
    } else {
        addressErr.textContent = "";                                           // puisqu'il n 'y a pas erreur on n'ecris pas de message erreur! 
        return true;
    }
}
let validateAddressVar = validateAddress();                                    // j'appelle la fonction en dehors de la fonction

/* ***************************** TOWN ************************************ */

city.addEventListener("input", function () {                                   // création d'un addEventListener pour l'input city  j'ecoute pour voir si il repond a ma demande (pas de chiffre)
    validateCity();                                                            // c'est la fonction qui sera exécuté lorsque on ecrira dans l'input City (suite a notre ecoute)    
});

function validateCity() {                                                      // création de la fonction que je vais ecouter pour valider qu'il n'y a pas "d'erreur de frappe"
    let testCity = nameRegExp.test(city.value);                                // je teste avec le regex ce qu'ecrit le client voir qu'il n'y est pas d'erreur
    if (testCity == false) {                                                   // si mon test ne passe pas
        cityErr.textContent = "Veuillez ecrire le nom exact de votre ville svp ";// alors on ecrit un message d'erreur dessous "bla bla bla"
        return false;                                                          // et on le declare faux
    } else {
        cityErr.textContent = "";                                              // puisqu'il n 'y a pas erreur on n'ecris pas de message erreur! 
        return true;
    }
}
let validateCityVar = validateCity();                                          // j'appelle la fonction en dehors de la fonction

/* ***************************** E-MAIL ************************************ */

email.addEventListener("input", function () {                                  //  création d'un addEventListener pour l'input email j'ecoute pour voir si il repond a ma demande (xxx@xxxx.xxx)
    validateEmail();                                                           // c'est la fonction qui sera exécuté lorsque on ecrira dans l'input email (suite a notre ecoute)    
});

function validateEmail() {                                                     // création de la fonction que je vais ecouter pour valider qu'il n'y a pas "d'erreur de frappe"
    let testEmail = emailRegExp.test(email.value);                             // je teste avec le regex ce qu'ecrit le client voir qu'il n'y est pas d'erreur
    if (testEmail == false) {                                                  // si mon test ne passe pas
        emailErr.textContent = "Veuillez saisir correctement votre E-mail svp";// alors on ecrit un message d'erreur dessous "bla bla bla"
        return false;                                                          // et on le declare faux
    } else {
        emailErr.textContent = "";                                             // puisqu'il n 'y a pas erreur on retire de message erreur! 
        return true;
    }
}
let validateEmailVar = validateEmail();                                        // j'appelle la fonction en dehors de la fonction

/* ***************************** FIN DU FORMULAIRE ************************************ */

/* ***************************** BOUTON ORDER ************************************ */

submit.addEventListener("click", function (event) {                            // *** je crée une "ecoute" du click avec tous les evenement qui doivent se passer 
        event.preventDefault();                                                // *** pour l'instant tu ne fais rien 
       
        function submitButton() {                                              // Creation d'une fonction avec touytes les conditions qui permettre de confirmer ma commande
                                                     
            let validateFirstNameVar = validateFirstName();                    // je rapelle ma fonction car quand je click je ne veux pas qu'il continue si il est false
            let validateLastNameVar = validateLastName();                      // je rapelle ma fonction car quand je click je ne veux pas qu'il continue si il est false
            let validateAddressVar = validateAddress();                        // je rapelle ma fonction car quand je click je ne veux pas qu'il continue si il est false
            let validateCityVar = validateCity();                              // je rapelle ma fonction car quand je click je ne veux pas qu'il continue si il est false
            let validateEmailVar = validateEmail();                            // je rapelle ma fonction car quand je click je ne veux pas qu'il continue si il est false

            function emptyFirstName() {                                        // création d'une fonction que je vais écouter qui me dira le "prenom" est vide ou pas 
                if (firstName.value == "") {                                   // si l'input est vide (sa valeur) 
                    firstNameErr.textContent = "Vous m'avez oublié";           // alors on ecrit un message d'erreur dessous "Vous m'avez oublié"
                    return false;                                              // je "l'empeche" d'aller plus loin en le declarant faux
                } else {
                    firstNameErr.textContent = "";                             // puisqu'il n 'y a pas erreur on retire de message erreur! 
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyFirstNameVar = emptyFirstName();                          // Je n'oublie pas de rappeler la fonction en lui donnant un nom (variable) 

            function emptyLastName() {                                         // création d'une fonction que je vais écouter qui me dira le "nom" est vide ou pas
                if (lastName.value == "") {                                    // si l'input est vide (sa valeur)
                    lastNameErr.textContent = "Vous m'avez oublié";            // alors on ecrit un message d'erreur dessous "Vous m'avez oublié"
                    return false;                                              // je "l'empeche" d'aller plus loin en le declarant faux
                } else {
                    lastNameErr.textContent = "";                              // puisqu'il n 'y a pas erreur on retire de message erreur! 
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyLastNameVar = emptyLastName();                            // Je n'oublie pas de rappeler la fonction en lui donnant un nom (variable) 

            function emptyAddress() {                                          // création d'une fonction que je vais écouter qui me dira l' "adresse" est vide ou pas
                if (address.value == "") {                                     // si l'input est vide (sa valeur)
                    addressErr.textContent = "Vous m'avez oublié";             // alors on ecrit un message d'erreur dessous "Vous m'avez oublié"
                    return false;                                              // je "l'empeche" d'aller plus loin en le declarant faux
                } else {
                    addressErr.textContent = "";                               // puisqu'il n 'y a pas erreur on retire de message erreur! 
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyAddressVar = emptyAddress();                              // Je n'oublie pas de rappeler la fonction en lui donnant un nom (variable)

            function emptyCity() {                                             // création d'une fonction que je vais écouter qui me dira le "city" est vide ou pas
                if (city.value == "") {                                        // si l'input est vide (sa valeur)
                    cityErr.textContent = "Vous m'avez oublié";                // alors on ecrit un message d'erreur dessous "Vous m'avez oublié"
                    return false;                                              // je "l'empeche" d'aller plus loin en le declarant faux
                } else {
                    cityErr.textContent = "";                                  // puisqu'il n 'y a pas erreur on retire de message erreur! 
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyCityVar = emptyCity();                                    // Je n'oublie pas de rappeler la fonction en lui donnant un nom (variable)

            function emptyEmail() {                                            // création d'une fonction que je vais écouter qui me dira l'"email" est vide ou pas
                if (email.value == "") {                                       // si l'input est vide (sa valeur)
                    emailErr.textContent = "Vous m'avez oublié";               // alors on ecrit un message d'erreur dessous "Vous m'avez oublié"
                    return false;                                              // je "l'empeche" d'aller plus loin en le declarant faux
                } else {
                    emailErr.textContent = "";                                 // puisqu'il n 'y a pas erreur on retire de message erreur! 
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyEmailVar = emptyEmail();                                  // Je n'oublie pas de rappeler la fonction en lui donnant un nom (variable)

            let basket = JSON.parse(localStorage.getItem("localBasket"));      // je rapelle mon localStorage pour avoir des infos dont j'ai besoin
            if (basket == null || basket == 0) {                               // avant d'aller plus loin je m'assure que le panier n 'est pas vide
                alert("Il semblerait que vous ayez oublier de completer votre panier. Desirez vous retourner sur la page d'acceuil ?")
                location.href = "index.html";                                  // si elle confirme elel sera revoyer a la page d'acceuil (son panier etant vide)

            } else if (emptyFirstNameVar != true || emptyLastNameVar != true || emptyAddressVar != true || emptyCityVar != true || emptyEmailVar != true || validateFirstNameVar != true || validateLastNameVar != true || validateAddressVar != true || validateCityVar != true || validateEmailVar != true) {
                return false                                                   // si un des input du formulaire est vide ou mal rempli alors il ne sera pas accepté
            
            } else {
                function recupIdProduct() {                                    // création de la fonction qui me permet de recuperer les Id des canapés commandés
                    let idProduct = [];                                        // on va devoir recreer un nouveau tableau 
                    for (let i = 0; i < basket.length; i++) {                  // dans lequel on incrementer chaque produit commander
                        let eachProductId = basket[i].id;                      // je nomme = chaque i id qui se trouve dans le basket               
                        idProduct.push(eachProductId);                         // je "pousse" dans mon tableau (derniere ligne) chaque ID de chaque produit
                    }
                    return idProduct                                           // le tableau revient rempli des id des elements commandés
                }
                let recupArray = recupIdProduct();                             // je rapelle la fonction tout en lui insignant une variable pour la réutiliser apres

                let recupInfo = {                                              // je crée une variable qui me permet de recuperer les infos du formulaire dont j'ai besoin
                    contact: {                                                 // Je crée un objet
                        firstName: firstName.value,                            // le prenom ecrit par le client sera gardé sous le 'nom' firstName
                        lastName: lastName.value,                              // le nomecrit par le client sera gardé sous 'nom' lastName
                        address: address.value,                                // l'adresse ecrite par le client sera gardé sous 'nom' address
                        city: city.value,                                      // la ville ecrite par le client sera gardé sous 'nom' city
                        email: email.value                                     // l'email ecrit par le client sera gardé sous 'nom' email
                    },
                    products: recupArray,                                      // je récupere l'id de chaque produit sous le nom products
                };

                const request = {                                              // Je nomme ma requete Post IL SERA LE SECOND PARAMETRE DE MON FETCH *****
                    method: "POST",                                            // methode "post" qui me permet de creer ou modifier une nouvelle donnée (le formulaire)
                    headers: {                                                 // Le headers me permet de lui donner + d'info sur ma requete  *** https://developer.mozilla.org/fr/docs/Web/HTTP/Headers
                        "Content-Type": "application/json",                    // informe ma requete qu'elle sera en format JSON, cela aurait pu etre XML ou cors ....
                        'Accept': 'application/json'                           // informe le serveur des types de données pouvant être renvoyés "JSON"
                    },
                    body: JSON.stringify(recupInfo)                            //  je la convertis en string pour le format JSON car on a indique juste au dessus que ce serait ce format là que l'on utilise
                };

                fetch("http://localhost:3000/api/products/order", request)     // Avec la methode FLETCH j'enclenche le processus de récuperation des mes données en provenance de l'Api (ressource) *** AVEC 2nd PARAMETRE LA CONSTANTE REQUEST QUI ME DONNE DES OPTIONS
                    .then(function (response) {                                // puis .....  l'objet Response étant le résultat d'une opération de l'API
                        return response.json();                                // il analyse la reponse en tant qu'objet JSON
                    })
                    .then(data => {                                            // puis je recupere mes datas
                        console.log(data.orderId);                             // Mon numero de commande apparait ( si on veut le voir ne pas oublier de bloquer la redirection vers la page "confirmation")
                         localStorage.clear();                               // une fois la commande enregistré mon panier se vide
                      location.href = "confirmation.html?orderId=" + data.orderId; // Je meretrouve redirigé vers la page "confirmation.html" avce l'id de la commande (numero de bon de commande)
                    }).catch(error => {                                        // et puis si il y a une erreur ... oui il faut un catch si il ya une promesse then 
                        console.log(error);                                    // afficher l'erreur
                    })
            }

        }
        submitButton()                                                         // rappel de la fonction qui me permet de confirmer ma commande
    }

)

// POST est presque toujours favorisé lorsque l’utilisateur doit soumettre des données ou des fichiers au serveur, par exemple pour remplir des formulaires ou télécharger des photos.
// POST pour la transmission des informations et des données de l’utilisateur.
// GET est particulièrement bien adapté pour personnaliser les sites Web : les recherches des utilisateurs, les paramètres de filtrage et le tri des listes peuvent être mis en marque-page avec l’URL, de sorte qu’à la prochaine visite du site, l’utilisateur retrouvera la page telle qu’il l’a laissée.
// GET pour les paramètres d’un site Web (filtres, tri, saisies de recherche, etc.).
// PUT permet de modifier une ressource, comme le nom de l'utilisateur que vous venez de créer avec POST 
// DELETE : Permet de supprimer une ressource. 
// ***** Ce paramètre (REQUEST) est un objet qui permet de définir : la méthode HTTP, le body, c’est à dire les données qu’on souhaite envoyer + les headers qui donnent un peu plus d’information sur notre requête.