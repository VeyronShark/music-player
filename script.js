const songs = [
  {
    songIndex: "0",
    songName: "Baby By Me",
    songAuthor: "50Cent",
    songDuration: "03:33", // Fill this in
    songLocation: "songs/baby-by-me.mp3",
    songCover: "covers/baby-by-me-cover.jpeg"
  },
  {
    songIndex: "1",
    songName: "Bam Bam",
    songAuthor: "Camilla Cabello",
    songDuration: "03:25", // Fill this in
    songLocation: "songs/bam-bam.mp3",
    songCover: "covers/bam-bam-cover.png"
  },
  {
    songIndex: "2",
    songName: "Good Feeling",
    songAuthor: "Rhys Lewis",
    songDuration: "03:36", // Fill this in
    songLocation: "songs/good-feeling.mp3",
    songCover: "covers/good-feeling-cover.jpeg"
  },
  {
    songIndex: "3",
    songName: "Hass Hass",
    songAuthor: "Diljit Dosanjh",
    songDuration: "2:33", // Fill this in
    songLocation: "songs/hass-hass.mp3",
    songCover: "covers/hass-hass-cover.jpg"
  },
  {
    songIndex: "4",
    songName: "Homecoming",
    songAuthor: "Kanye West",
    songDuration: "03:24", // Fill this in
    songLocation: "songs/homecoming.mp3",
    songCover: "covers/homecoming-cover.jpg"
  },
  {
    songIndex: "5",
    songName: "Just Can't Get Enough",
    songAuthor: "Black Eyed Pease",
    songDuration: "03:39", // Fill this in
    songLocation: "songs/just-cant-get-enough.mp3",
    songCover: "covers/just-cant-get-enough-cover.jpg"
  },
  {
    songIndex: "6",
    songName: "Legends Never Die",
    songAuthor: "League of Legends",
    songDuration: "03:55", // Fill this in
    songLocation: "songs/legends-never-die.mp3",
    songCover: "covers/legends-never-die-cover.jpeg"
  },
  {
    songIndex: "7",
    songName: "Timeless",
    songAuthor: "The Weeknd",
    songDuration: "04:16", // Fill this in
    songLocation: "songs/timeless.mp3",
    songCover: "covers/timeless-cover.jpeg"
  }
];


const songContainer = document.querySelector('.songs-container');

songs.forEach((song, index) => {
  newSongCapsule = document.createElement("div");
  newSongCapsule.classList.add("song-capsule");
  newSongCapsule.id = `${index}`;
  newSongCapsule.innerHTML = `
        <div class="song-details">
          <img class="song-cover" src=${song.songCover} alt="">

          <div class="song-name">${song.songName}</div>
        </div>
        
        <div class="song-duration-n-play">
          <div class="song-duration">${song.songDuration}</div>

          <div class="song-play"><img class="song-play-icon" src="images/master-play.svg" alt=""></div>
        </div>`;
  songContainer.appendChild(newSongCapsule);
});

const songCapsules = document.querySelectorAll(".song-capsule");
const currentPlaying = new Audio();
const currentSongName = document.querySelector(".current-song-name");
const currentSongAuthor = document.querySelector(".current-song-author");
const progressBar = document.querySelector(".progress-bar");
const masterPlay = document.querySelector("#play-pause");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
let currentPlayingObject = undefined;

songCapsules.forEach((songCapsule) =>{
  songCapsule.addEventListener('click', () =>{
    playSong(songs[parseInt(songCapsule.id)]);
  });
});

function playSong(songObject) {
  currentPlaying.src = songObject.songLocation;
  currentPlaying.play();
  currentPlayingObject = songObject;
  //changing song icon
  masterPlay.src = "./images/master-pause.svg";
  
  //setting song name display
  currentSongName.innerText = songObject.songName;
  currentSongAuthor.innerText = songObject.songAuthor;

  //setting current song box shadow 
  for (let songCapsule of songCapsules) {
    if (songCapsule.id == songObject.songIndex){
      songCapsule.classList.add("active");
    } else {
      songCapsule.classList.remove("active");
    }
  }

  // Resetting all side music play buttons and setting correct music play icon to pause icon
  document.querySelectorAll('.song-play-icon').forEach((icon) => {
    if (icon.parentElement.parentElement.parentElement.id === songObject.songIndex){
      icon.src = "images/master-pause.svg";
    } else {
      icon.src = "images/master-play.svg";
    }
  });
}
 updateProgressBarStyle();

//setting progress bar max
currentPlaying.addEventListener('loadedmetadata', () => {
  progressBar.max = currentPlaying.duration;
  updateProgressBarStyle();
})

//updating progress bar
currentPlaying.addEventListener('timeupdate', () => {
  progressBar.value = currentPlaying.currentTime;
  updateProgressBarStyle();
});

//changing song seek based on range input
progressBar.addEventListener('input', () => {
  currentPlaying.currentTime = progressBar.value;
  updateProgressBarStyle();
})

//adding pause-play functionality
masterPlay.addEventListener('click', () => {
  if (currentPlaying.src){
    if (currentPlaying.paused) {
      currentPlaying.play();
      masterPlay.src = "./images/master-pause.svg";
    } else {
      currentPlaying.pause();
      masterPlay.src = "./images/master-play.svg";
    }
  } else {
    playSong(songs[0]);
  }
})

//adding next and previous track functionality along with auto next

function playNextSong() {
  if (currentPlaying.src){
    let nextSongIndex = parseInt(currentPlayingObject.songIndex) + 1;
    if (nextSongIndex === songs.length){
      nextSongIndex = 0;
    }
    nextSongObject = songs[nextSongIndex];
    playSong(nextSongObject);
  }
}

next.addEventListener('click', playNextSong);
currentPlaying.addEventListener('ended', playNextSong);

previous.addEventListener('click', () => {
  if (currentPlaying.src) {
    if (currentPlaying.currentTime < 3){
      let prevSongIndex = parseInt(currentPlayingObject.songIndex) - 1;
      if (prevSongIndex === -1){
        prevSongIndex = songs.length - 1;
      }
      prevSongObject = songs[prevSongIndex];
      playSong(prevSongObject);
    } else {
      currentPlaying.currentTime = 0;
    }
  }
})

function updateProgressBarStyle() {
  const value = progressBar.value;
  const max = progressBar.max;

  const percentage = (value / max) * 100;

  progressBar.style.background = `linear-gradient(to right, #fff 0%, #fff ${percentage}%, #333 ${percentage}%, #333 100%)`;
}

