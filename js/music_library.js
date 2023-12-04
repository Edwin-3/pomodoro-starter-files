// Sample data for music cards
const musicData = [
    {
        imgSrc: '/assets/images/afro lofi.jfif',
        name: 'Song 1',
        artist: "Nyashinski",
        description: 'Chilled | Afro | Beats | Lofi',
        src: "contour",
    },
    {
        imgSrc: '/assets/images/kid lofi.jfif',
        name: 'Song 2',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song3",
    },
    {
        imgSrc: '/assets/images/Afro anime art.jfif',
        name: 'Song 3',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song1",
    },
    {
        imgSrc: '/assets/images/codinglooofi.jpg',
        name: 'Song 4',
        artist: "Urban",
        description: 'Chilled | Gospel | Lofi',
        src: "christian-lofi",
    },
    {
        imgSrc: '/assets/images/gamingLofi.jpg',
        name: 'Song 5',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "stickwitchu",
    },
    {
        imgSrc: '/assets/images/mother earth.jfif',
        name: 'Song 6',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song2",
    },
    {
        imgSrc: '/assets/images/Lofistudy.jpg',
        name: 'Song 7',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "christian-lofi",
    },
    {
        imgSrc: '/assets/images/lovelofi.jfif',
        name: 'Song 8',
        artist: "Urban",
        description: 'Chilled | RnB | Love | Lofi',
        src: "reggaelofi",
    },
    {
        imgSrc: '/assets/images/desktop.jpg',
        name: 'Song 9',
        artist: "Artist 9",
        description: 'Chilled | Dancehall | Beats | Lofi',
        src: "dancehall-inst",
    },
    {
        imgSrc: '/assets/images/codinglofiii.jpg',
        name: 'Song 10',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song2",
    },
    {
        imgSrc: '/assets/images/catlofi.jpg',
        name: 'Song 10',
        artist: "Urban",
        description: 'Chilled | Afro | Jazz | Lofi',
        src: "song2",
    },

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
