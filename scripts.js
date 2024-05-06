document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '96fcdfaf28704d83b2487f5cc1ed4f58'; // Replace 'YOUR_API_KEY' with your actual News API key
    const apiUrl = 'https://newsapi.org/v2/everything?q=anime manga&apiKey=' + apiKey;

    const carouselIndicators = document.getElementById('carousel-indicators');
    const carouselInner = document.getElementById('carousel-inner');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.articles.length === 0) {
                throw new Error('No news articles found');
            }
            displayCarousel(data.articles);
        })
        .catch(error => {
            console.error('There was a problem fetching the news:', error);
            carouselInner.innerHTML = '<div class="carousel-item active"><h5 class="text-center">Failed to fetch news. Please try again later.</h5></div>';
        });

    function displayCarousel(articles) {
        articles.forEach((article, index) => {
            const carouselIndicator = document.createElement('li');
            carouselIndicator.setAttribute('data-target', '#carouselExampleIndicators');
            carouselIndicator.setAttribute('data-slide-to', index.toString());
            if (index === 0) {
                carouselIndicator.classList.add('active');
            }
            carouselIndicators.appendChild(carouselIndicator);

            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const imgSrc = article.urlToImage ? article.urlToImage : 'placeholder.jpg';
            const carouselImage = `<img src="${imgSrc}" class="d-block w-100" alt="${article.title}">`;
            const carouselCaption = `
                <div class="carousel-caption d-none d-md-block">
                    <h5>${article.title}</h5>
                    <p>${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                </div>
            `;
            carouselItem.innerHTML = carouselImage + carouselCaption;
            carouselInner.appendChild(carouselItem);
        });
    }
});
