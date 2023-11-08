// Sample data for music cards
const musicData = [
    {
        imgSrc: '/assets/images/catlofi.jpg',
        name: 'Song 1',
        artist: "Nyashinski",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song1",   
    },
    {
        imgSrc: '/assets/images/chilllofi.jpg',
        name: 'Song 2',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song2",
    },
    // Add more music data entries as needed
];

// Reference to the music cards container
const musicCardsContainer = document.getElementById('music-cards-container');

// Generate music cards dynamically
musicData.forEach((data) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.alt = 'Album Cover';

    const name = document.createElement('h5');
    name.textContent = data.name;

    const description = document.createElement('p');
    description.textContent = data.description;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);

    musicCardsContainer.appendChild(card);
});
