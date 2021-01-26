
let heroesList;
let homeList = [];
let allData;
const heroCard = document.querySelector('.hero__card');
let currentPage = 'https://swapi.dev/api/people/';

//Начало приложения
fetch(currentPage)
    .then(response => response.json())
    .then((data) => {
        heroesList = data.results;
        allData = data;
        findPlanet(heroesList);
        console.log(allData)
        render();
     //   changePage()
        
});

let testPage = fetch(currentPage)
.then(response => response.json())
.then((data) => {
    testPage = data.next
    console.log(testPage)
 //   changePage()
});
console.log(testPage)

function findPlanet(heroes){
    heroes.map(function(hero, idx){
        fetch(hero.homeworld)
        .then(response => response.json())
        .then((home) =>{
            homeList[idx] = home.name;
            render();
        })
    })
}

function nextPage(){
    if(allData.next){
        clearRender();
        fetch(allData.next)
            .then(response => response.json())
            .then((data) => {
                heroesList = data.results;
                allData = data;
                findPlanet(heroesList);
                console.log(allData)
                render();
        });
    }
}
function prevPage(){
    if(allData.previous){
        clearRender();
        fetch(allData.previous)
            .then(response => response.json())
            .then((data) => {
                heroesList = data.results;
                allData = data;
                findPlanet(heroesList);
                console.log(allData)
                render();
        });
    }
}

function clearRender(){
    const warriorsList = document.querySelector('.warriors__list');
    warriorsList.innerHTML = '';
    homeList = [];
}

function render() {
    const warriorsList = document.querySelector('.warriors__list');
    const loader = `
        <div class="container small_loader">
            <div class="yellow"></div>
            <div class="red"></div>
            <div class="blue"></div>
            <div class="violet"></div>
        </div>
    `;

    warriorsList.innerHTML = heroesList.map(function (warrior, idx) {
        return `
        <li class="hero">
                <div class="main__hero__block">
                    <div class="info__area">
                        <div class="info__title-block">
                            <div class="name__title answer-info">${warrior.name}</div> 
                            <div class="toggle__block" onclick="toggleCheck(${idx})">  
                               <div class="toggle__circle" id="toggle__circle${idx}">
                                    <div class="toggle__info">i</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more__info">
                    <p class="birthday__info text-info">Birthday:</p>
                    <p class="birthday__info-date text-info">${warrior.birth_year}</p>
                   
                    <p class="planet__info text-info">Planet:</p>
                    <p class="planet__info-place text-info">${homeList[idx] ? homeList[idx] : loader}</p>
                </div>
            </li>
        `
    }).join('');
}



// функция при клике на переключатель двигает ползунок вправо и открывает страницу героя
function toggleCheck(idx) {
    const toggleCircle = document.getElementById('toggle__circle' + idx); // определем по какому элементу кликнули
    toggleCircle.classList.add('toggle__circle-check');
    openCloseCard(idx);   // вызываем функцию открытия карточки
}

//функция открытия карточки
function openCloseCard(idx) {
    heroCard.classList.add('hero__card-show')
    showHeroInfo(idx)                                       //вызываем функцию отрисовки данных героя
    const arrowBack = document.getElementById('arrowBack')   // стрелочка закрытия карточки
    arrowBack.onclick = () => {                                // при клике по ней закрываем карточку
        heroCard.classList.remove('hero__card-show')
        const toggleCircle = document.getElementById('toggle__circle' + idx)
        toggleCircle.classList.remove('toggle__circle-check')  // передвигаем тумблер влево
    }

}


// функция заполняем карточку героя
function showHeroInfo(idx) {
    const heroName = document.querySelector('.hero__title-info');
    heroName.textContent = heroesList[idx].name;

    const heroBirthday = document.querySelector('.year__info');
    heroBirthday.textContent = heroesList[idx].birth_year;

    const heroHome = document.querySelector('.home__info');
    heroHome.textContent = heroesList[idx].homeworld;

    const heroEye = document.querySelector('.eye__info');
    heroEye.textContent = heroesList[idx].eye_color;

    const heroGender = document.querySelector('.gender__type');
    heroGender.textContent = heroesList[idx].gender;

    const heroHair = document.querySelector('.hair__info');
    heroHair.textContent = heroesList[idx].hair_color;

    const heroMass = document.querySelector('.mass__value');
    heroMass.textContent = heroesList[idx].mass;

    const heroSkin = document.querySelector('.skin__type');
    heroSkin.textContent = heroesList[idx].skin_color;

    const heroPic = document.querySelector('.hero__pic');
    heroPic.style.backgroundImage = 'url('+picBank[idx]+')';
    console.log(picBank[idx])
}


// function changePage() {
//     const dataNext = allData.next
//     //console.log(dataNext)
//     const nextPage = document.getElementById('arrowRight')
//     nextPage.onclick = () => {
//         currentPage = dataNext;
//         console.log('hi')
//     }
// }






const prev = document.getElementById('arrowLeft')
prev.onclick = prevPage

const next = document.getElementById('arrowRight')
next.onclick = nextPage;

const picBank = [
    'img/luke_skywalker.jpg',
    'img/C_3PO.jpg',
    'img/r2d2.jpg',
    'img/Darth_Vader.jpg',
    'img/Leia_Organa.jpg',
    'img/Owen_Lars.jpg',
    'img/Beru_Whitesun_lars.jpg',
    'img/R5_D4.jpg',
    'img/Biggs_Darklighter.jpg',
    'img/Obi_Wan_Kenobi.jpg'
]

