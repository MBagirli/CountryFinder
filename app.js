let input = document.querySelector('.container--1--input');
let container__2 = document.querySelector('.container--2');

let allData = [];
fetch('https://restcountries.com/v3.1/all').then(promise => promise.json()).then(data => allData = [...data]).catch(err => {
  container__2.innerHTML = `<h2>Error : ${err.message}</h2>`;
});

input.addEventListener('keyup', function () {
  let index;
  for (let i = 0; i < allData.length; i++) {
    if (this.value.toLowerCase() == allData[i].name.common.toLowerCase()) {
      index = i;
      break;
    } else {
      container__2.innerHTML = `<h2>Not Found!</h2>`;
      index = null;
    }
  }

  if (this.value == '') {
    container__2.innerHTML = '';
    index = null;
  }

  if (index) {
    for (let i = 0; i < allData[index].continents.length; i++) {
      if (allData[index].continents[i] == 'Asia' || allData[index].continents[i] == 'Europe') {
        allData[index].continents = 'Eurasia';
      }
    }

    let html = `
        <div class="container--2__country">
          <img class="container--2__country--img" src="${allData[index].flags.png}" alt="Flag">
          <h1 class="container--2__country--h1">${allData[index].name.common}</h1> 
        </div> 
          <div class="container--2__characteristic">
            <p class="container--2__characteristic--p">Continent(s) : ${allData[index].continents}</p>
            <p class="container--2__characteristic--p">Region(s) : ${allData[index].region}</p>
            <p class="container--2__characteristic--p">Capital : ${allData[index].capital}</p>
            <p class="container--2__characteristic--p">Language(s): ${Object.values(allData[index].languages)}</p>  
            <p class="container--2__characteristic--p">Population : ${allData[index].population}</p> 
          </div>
  `;
    container__2.innerHTML = html;
  }
});