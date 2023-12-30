//Create a copy of the original array
const songData = musicData;

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");

//music controls
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const repeatBtn = document.querySelector(".repeat");
const shuffleBtn = document.querySelector(".shuffle");
const volumeSlider = document.getElementById('volumeSlider');
const volumeBars = document.querySelectorAll('.volume-bar');


//music display
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");
const coverArtist = document.querySelector(".cover span:nth-child(1)");
const coverName = document.querySelector(".cover span:nth-child(2)");

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;
let isDragging = false;
let currentBar = null;

audio.volume = volumeSlider.value / 100;

window.addEventListener("load", () => {
    loadSong(songIndex);
})

const loadSong = (index) => {
    songName.textContent = songData[index].name;
    songArtist.textContent = songData[index].artist;
    audio.src = `assets/music/${songData[index].src}.mp3`;
};

const playSong = () => {
    container.classList.add('pause');
    playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
    audio.play();
};

const pauseSong = () => {
    container.classList.remove('pause');
    playPauseBtn.firstElementChild.className = "fa-solid fa-play";
    audio.pause();
};

playPauseBtn.addEventListener("click", () => {
    if (container.classList.contains("pause")) {
        pauseSong();
    } else {
        playSong();
    }
});

const prevSongPlay = () => {
    if (isRepeat) {
        // If repeat is enabled, replay the current song
        loadSong(songIndex);
        playSong();
    } else {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songData.length - 1;
        }
        loadSong(songIndex);
        playSong();
    }
}

const nextSongPlay = () => {
    if (isRepeat) {
        // If repeat is enabled, replay the current song
        loadSong(songIndex);
        playSong();
    } else {
        songIndex++;
        if (songIndex === songData.length) {
            songIndex = 0;
        }
        loadSong(songIndex);
        playSong();
    }

}

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('text-gradient', isShuffle);
    if (isShuffle) {
        // Get the current song index
        const currentSongIndex = songIndex;

        // Create a temporary array starting from the next song
        const tempArray = [...songData.slice(currentSongIndex + 1), ...songData.slice(0, currentSongIndex + 1)];

        // Shuffle the temporary array
        shuffleArray(tempArray);

        // Combine the shuffled part and the remaining part
        const shuffledArray = [...tempArray.slice(-currentSongIndex - 1), ...tempArray.slice(0, -currentSongIndex - 1)];

        // Update the songData array with the shuffled order
        for (let i = 0; i < songData.length; i++) {
            songData[i] = shuffledArray[i];
        }

        // If currently playing a song, reload the song with the new shuffled array
        if (container.classList.contains('pause')) {
            loadSong(songIndex);
            playSong();
        }
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('text-gradient', isRepeat);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;

});

volumeBars.forEach((bar, index) => {
    bar.addEventListener('click', () => {
        const volume = (index + 1) * 20 / 100;
        audio.volume = volume;
        volumeBars.forEach((bar, i) => {
            if ((i + 1) * 20 <= volume * 100) {
                bar.classList.add('green');
            } else {
                bar.classList.remove('green');
            }
        });
    });
    bar.style.left = `${index * (100 / 5)}%`;
});

audio.addEventListener('volumechange', () => {
    const volume = audio.volume;
    volumeBars.forEach((bar, index) => {
        bar.classList.remove('green');
        if ((index + 1) * 20 <= volume * 100) {
            bar.classList.add('green');
        }
    });
});

audio.addEventListener('volumechange', () => {
    const volume = audio.volume;
    volumeBars.forEach((bar, index) => {
        bar.classList.remove('green');
        if ((index + 1) * 20 <= volume * 100) {
            bar.classList.add('green');
        }
    });
});

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let currentTimeWidth = (currentTime / duration) * 100;
    songProgress.style.width = `${currentTimeWidth}%`;

    let songCurrentTime = document.querySelector(".time span:nth-child(1)");
    let songDuration = document.querySelector(".time span:nth-child(2)");

    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration;
        let totalMinutes = Math.floor(audioDuration / 60).toString().padStart(2, "0");
        let totalSeconds = Math.floor(audioDuration % 60).toString().padStart(2, "0");

        songDuration.textContent = `${totalMinutes}:${totalSeconds}`
    })
    let currentMinutes = Math.floor(currentTime / 60).toString().padStart(2, "0");
    let currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, "0");

    songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`


});

songTime.addEventListener("click", (e) => {
    let progressWidth = songTime.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

    playSong();
});

audio.addEventListener("ended", nextSongPlay);


//Music Library
const libraryPage = document.querySelector(".music-library");
const playerFooter = document.querySelector('.player-footer');
const closePage = document.querySelector('.back_btn');
const cards = document.querySelectorAll('.library-wrapper .card');

const openLibrary = () => {
    libraryPage.classList.toggle('active');
}

const closeLibrary = () => {
    libraryPage.classList.remove('active');
}

const playSelectedCard = (index) => {
    songIndex = index;
    console.log("SELECTED CARD" + songIndex);
    loadSong(index);
    playSong();
}

playerFooter.addEventListener("click", openLibrary);
closePage.addEventListener("click", closeLibrary);
cards.forEach((card, index) => (
    card.addEventListener("click", () => playSelectedCard(index))
));

