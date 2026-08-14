/* =========================================
   MUSIC PLAYER
========================================= */


/* =========================================
   SONG DATA
========================================= */

const songs = [

    {
        title: "Bekhudi",
        artist: "Artist One",
        file: "songs/song1.mp3",
        image: "images/album1.jpg"
    },

    {
        title: "Toota jo kabhi tara",
        artist: "Artist Two",
        file: "songs/song2.mp3",
        image: "images/album2.jpg"
    },

    {
        title: "Shiddat title track song",
        artist: "Artist Three",
        file: "songs/song3.mp3",
        image: "images/album3.jpg"
    },

    {
        title: "Jeene laga hoon",
        artist: "Artist Four",
        file: "songs/song4.mp3",
        image: "images/album4.jpg"
    },

    {
        title: "I love you",
        artist: "Artist Five",
        file: "songs/song5.mp3",
        image: "images/album5.jpg"
    }

];


/* =========================================
   AUDIO OBJECT
========================================= */

const audio = new Audio();


/* =========================================
   GET HTML ELEMENTS
========================================= */

const playButton = document.getElementById("play-btn");

const previousButton =
    document.getElementById("previous-btn");

const nextButton =
    document.getElementById("next-btn");

const albumCover =
    document.getElementById("album-cover");

const songTitle =
    document.getElementById("song-title");

const artistName =
    document.getElementById("artist-name");

const progressBar =
    document.getElementById("progress-bar");

const currentTimeElement =
    document.getElementById("current-time");

const durationElement =
    document.getElementById("duration");

const volumeBar =
    document.getElementById("volume-bar");

const muteButton =
    document.getElementById("mute-btn");

const albumContainer =
    document.querySelector(".album-container");

const playlistItems =
    document.querySelectorAll(".playlist-item");


/* =========================================
   VARIABLES
========================================= */

let currentSongIndex = 0;

let isPlaying = false;

let isMuted = false;


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    audio.src = song.file;

    audio.load();


    /* Update active playlist */

    playlistItems.forEach((item, itemIndex) => {

        item.classList.remove("active");

        if (itemIndex === index) {
            item.classList.add("active");
        }

    });

}


/* =========================================
   PLAY SONG
========================================= */

function playSong() {

    audio.play();

    isPlaying = true;

    playButton.textContent = "⏸";

    playButton.title = "Pause";

    albumContainer.classList.add("playing");

}


/* =========================================
   PAUSE SONG
========================================= */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playButton.textContent = "▶";

    playButton.title = "Play";

    albumContainer.classList.remove("playing");

}


/* =========================================
   PLAY / PAUSE BUTTON
========================================= */

playButton.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(Math.random() * songs.length);

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex);

    playSong();

}


/* =========================================
   PREVIOUS SONG
========================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

}


/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener("click", () => {

    nextSong();

});


/* =========================================
   PREVIOUS BUTTON
========================================= */

previousButton.addEventListener("click", () => {

    previousSong();

});


/* =========================================
   UPDATE PROGRESS
========================================= */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }


    const progress =
        (audio.currentTime / audio.duration) * 100;


    progressBar.value = progress;


    currentTimeElement.textContent =
        formatTime(audio.currentTime);

});


/* =========================================
   LOAD DURATION
========================================= */

audio.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(audio.duration);

});


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "00:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0")
        + ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================================
   SEEK SONG
========================================= */

progressBar.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }


    const seekTime =
        (progressBar.value / 100) * audio.duration;


    audio.currentTime = seekTime;

});


/* =========================================
   VOLUME
========================================= */

audio.volume = 1;

volumeBar.value = 1;


volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value;


    if (audio.volume === 0) {

        muteButton.textContent = "🔇";

        isMuted = true;

    } else {

        muteButton.textContent = "🔊";

        isMuted = false;

    }

});


/* =========================================
   MUTE
========================================= */

muteButton.addEventListener("click", () => {

    if (isMuted) {

        audio.muted = false;

        muteButton.textContent = "🔊";

        isMuted = false;

    } else {

        audio.muted = true;

        muteButton.textContent = "🔇";

        isMuted = true;

    }

});


/* =========================================
   SONG ENDED
========================================= */

audio.addEventListener("ended", () => {

    if (isRepeat) {

        audio.currentTime = 0;

        playSong();

    } else {

        nextSong();

    }

});


/* =========================================
   PLAYLIST CLICK
========================================= */

playlistItems.forEach((item) => {

    item.addEventListener("click", () => {

        const index =
            Number(item.dataset.index);


        currentSongIndex = index;


        loadSong(currentSongIndex);

        playSong();

    });

});


/* =========================================
   LOAD FIRST SONG
========================================= */

loadSong(currentSongIndex);
/* =========================================
   SHUFFLE
========================================= */

const shuffleButton =
    document.getElementById("shuffle-btn");

let isShuffle = false;

shuffleButton.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffleButton.classList.toggle(
        "active",
        isShuffle
    );

});


/* =========================================
   REPEAT
========================================= */

const repeatButton =
    document.getElementById("repeat-btn");

let isRepeat = false;

repeatButton.addEventListener("click", () => {

    isRepeat = !isRepeat;

    repeatButton.classList.toggle(
        "active",
        isRepeat
    );

});


/* =========================================
   FAVORITE
========================================= */

const favoriteButton =
    document.getElementById("favorite-btn");

let isFavorite = false;

favoriteButton.addEventListener("click", () => {

    isFavorite = !isFavorite;

    if (isFavorite) {

        favoriteButton.textContent =
            "♥ Favorite";

        favoriteButton.classList.add("active");

    } else {

        favoriteButton.textContent =
            "♡ Favorite";

        favoriteButton.classList.remove("active");

    }

});
/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", (event) => {

    /* Space = Play / Pause */

    if (event.code === "Space") {

        event.preventDefault();

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }


    /* Arrow Right = Next */

    if (event.code === "ArrowRight") {

        nextSong();

    }


    /* Arrow Left = Previous */

    if (event.code === "ArrowLeft") {

        previousSong();

    }

});
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});