'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    initPage();
});

function initPage() {
    let startBtn = document.querySelector('#spela');
    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validateLogin()
    });
}


function validateLogin(event) {
    //Utföra formulärvalidering för att logga in.
    try {
        let username = document.querySelector('#username');
        let password = document.querySelector('#password');
        let errorMsg = document.querySelector('#msg');
        let checkbox = document.querySelector('#question')
        if (!users.some(user => user.username === username.value && user.password === password.value)) {
            throw {
                'msg': 'Fel användarnamn eller lösenord!'
            };
        } else if (!checkbox.checked) {
            throw {
                'msg': 'Checkboxen är inte ibockad.'
            };
        } else {
            console.log('success!')
            errorMsg.innerHTML = '';
            initContent()
        }
    } catch (error) {
        console.log(error);
        document.querySelector('#msg').textContent = error.msg;
    }

}


function initContent() {
    console.log('initContent')
    document.querySelector('#formDiv').classList.add('d-none');

    //variable hämtat från functionen.
    placeGhostPictures(10, 15);

}

function removeGhosts() {
    const ghosts = document.querySelectorAll('.ghost');

    // tar bort alla tidigare spöken
    ghosts.forEach(ghost => {
        ghost.parentNode.removeChild(ghost);
    });
    oGameData.capturedGhosts = 0;
}

//genererar ett antal spöken mellan 10 och 15. PLacerar ut de på random plats och byter till net vid mouseover.
function placeGhostPictures(min, max) {

    //räknar antal spöken att placera ut. Min max är 10 till 15.
    const numGhosts = Math.floor(Math.random() * (max - min + 1)) + min;

    //loop som placerar ut varje spökbild.
    for (let i = 0; i < numGhosts; i++) {

        //genererar en ny img element.
        const ghost = document.createElement('img');

        //Bestämmer initialsource och klass for ghostbilden.
        ghost.src = './resources/ghost.png';
        ghost.className = 'ghost';

        //bestämmer positionen av ghostbilden.
        ghost.style.position = 'absolute';
        ghost.style.left = `${oGameData.left()}px`; //px refererar till returnerad px från oGameData
        ghost.style.top = `${oGameData.top()}px`;

        //Kopplar ghostbilden till html bodyn.
        document.body.appendChild(ghost);

        //Fäster en eventlistener till hovereffekten
        ghost.addEventListener('mouseover', () => {

            //kollar om den nuvarande src inkluderar ghost.
            if (ghost.src.includes('ghost')) {

                //om nuvarnde bild är ghost, byt till netbilden.
                ghost.src = './resources/net.png';
            } else {

                //om nuvarande bilen är net så byts den till ghost.
                ghost.src = './resources/ghost.png';
            }
            checkForWin();
        });
    }
}

function checkForWin() {
    console.log('winGame()');

    const ghostImagesREf = document.querySelectorAll('.ghost');
    let allNetsRef = true;

    //itererar över varje ghostbild
    ghostImagesREf.forEach(ghost => {

        //kollar of image src innehåller net.
        if (!ghost.src.includes('net')) {

            //om någon ghost inte är ett net, blir allNetsRef satt till false.
            allNetsRef = false;
        }
    });
    //om alla ghostbilder har ändrts till net har spelaren vunnit.
    if (allNetsRef) {
        console.log('Du har vunnit!');

        //Tar bort tidigare spöken
        removeGhosts();
        document.querySelector('#formDiv').classList.remove('d-none');
        initPage()
    }
}
