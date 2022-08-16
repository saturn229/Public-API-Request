const randomUrl = 'https://randomuser.me/api/?results=12&nat=us$';
var gallery = document.querySelector("#gallery"),
users = [];
const numUsers = 12;

init();


async function main(){
    for(let i = 0; i < numUsers; i++){
        users.push(await fetchUser());
    }

    users.forEach(user => {
        const pic = user.picture.large
        const firstName = user.name.first
        const lastName = user.name.last
        const email = user.email
        const city = user.location.city
        const state = user.location.state
        const phone = user.phone
        const streetNumber = user.location.street.number
        const streetName = user.location.street.name
        const postcode = user.location.postcode
        const dob = new Date(user.dob.date).toISOString().split('T')[0]

        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${pic} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>`;

        gallery.insertAdjacentHTML("beforeend", html);

        var card = gallery.lastChild;
        card.addEventListener("click", () => {
            var modalContainer = document.querySelector(".modal-container"),
            modalInfoContainer = document.querySelector(".modal-info-container");

            modalInfoContainer.innerHTML = `
            <img class="modal-img" src="${pic}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postcode}</p>
            <p class="modal-text">Birthday: ${dob}</p>`;

            modalContainer.style.display = "block";
        });
    });

} main();


function fetchUser(){
    return fetch(randomUrl)
            .then(response => response.json())
            .then(data => data.results[0])
            .catch(error => console.error(error));
};

function init() {
    insertModalContainer();

    var modalContainer = document.querySelector(".modal-container"),
    modalCloseButton = document.querySelector("#modal-close-btn");

    modalContainer.style.display = "none"; // Hides modal on start

    modalCloseButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
};


function insertModalContainer() {
    const html = `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container"></div>
            </div>
    </div>`;
    document.querySelector("#gallery").insertAdjacentHTML("afterend", html);
};
