// Start Quran Boxies
let container = document.querySelector(".container");

function getSurah() {
    fetch("https://api.alquran.cloud/v1/surah")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let surah = data.data;
            let surahNumber = 114;
            for(let i = 0; i < surahNumber; i++) {
                container.innerHTML += `
                <div class="box">
                    <div class="surahNumber">
                        <div class="numberBox">${surah[i].number}</div>
                        <div class="icon"><i class='bx bx-heart' ></i></div>
                    </div>
                    <h3 class="name">${surah[i].name}</h3>
                    <h3 class="nameEnglish">${surah[i].englishName}</h3>
                </div>
                `;
            }
            let surahsTitle = document.querySelectorAll('.box');
            let popup = document.querySelector('.quran_popup'),
                ayaContainer = document.querySelector('.ayat');
            surahsTitle.forEach((title, index) => {
                title.addEventListener('click', () => {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            ayaContainer.innerHTML = "";
                            let ayat = data.data.ayahs;
                            ayat.forEach(aya => {
                                popup.classList.add('active');
                                ayaContainer.innerHTML += `<p>${aya.text} - (${aya.numberInSurah})</p>`;
                            });
                        });
                });
            });
            let closePopup = document.querySelector('.close_popup');
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active');
            });
        });

}

getSurah();