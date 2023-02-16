const loaderElements = document.getElementById('loaderElements');

const options = {
  method: 'GET',
};

const cardContainer = document.querySelector('.card-container');

const createCard = (finalDataElements) => {
  finalDataElements.map((cardData) => {
    const postCard = document.createElement('div');
    postCard.classList.add('card');
    postCard.innerHTML = `
    <h3 class="card-heading">${cardData.title}</h3>
    `;

    const camera = document.createElement('iframe');
    camera.classList = 'embed-responsive-item';

    let cameraURL = '';
    if (cardData.url.includes('http')) cameraURL = cardData.url;
    else cameraURL = `https://www.youtube.com/embed/${cardData.url}`;

    camera.setAttribute('src', cameraURL);
    camera.setAttribute('allowfullscreen', '');

    postCard.appendChild(camera);

    cardContainer.appendChild(postCard);
  });
};

fetch('/admin/cameras', options)
  .then((res) => res.json())
  .then((dataElements) => {
    const youtubeIDs = dataElements.youtubeIDs;
    const titles = dataElements.titles;

    let dataElementsMap = new Map(youtubeIDs.map((x, i) => [x, titles[i]]));

    const finalDataElements = [];

    for (let [ulr, title] of dataElementsMap) {
      finalDataElements.push({
        url: ulr,
        title: title,
      });
    }

    console.log(finalDataElements.length);

    createCard(finalDataElements);

    loaderElements.className += ' hidden';
  })
  .catch((error) => {
    console.log(`ERROR when fetching data: ${error}`);
  });
