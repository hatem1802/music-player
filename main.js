const musics = [
  {
    id: 1,
    name: "Mekanın Sahibi",
    artist: "Norm Ender",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
    favorited: false
  },
  {
    id: 2,
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
    url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
    favorited: true
  },
  {
    id: 3,
    name: "Extreme Ways",
    artist: "Moby",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false
  },
  {
    id: 4,
    name: "Butterflies",
    artist: "Sia",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
    url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
    favorited: false
  },
  {
    id: 5,
    name: "The Final Victory",
    artist: "Haggard",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
    favorited: true
  },
  {
    id: 6,
    name: "Genius ft. Sia, Diplo, Labrinth",
    artist: "LSD",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
    favorited: false
  },
  {
    id: 7,
    name: "The Comeback Kid",
    artist: "Lindi Ortega",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
    url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
    favorited: true
  },
  {
    id: 8,
    name: "Overdose",
    artist: "Grandson",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
    url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
    favorited: false
  },
  {
    id: 9,
    name: "Rag'n'Bone Man",
    artist: "Human",
    cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
    source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
    url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
    favorited: false
  }
];


const play = document.getElementById("play");
const pause = document.getElementById("pause");
const playPause = document.getElementById("pause-play")
const progressContainer = document.getElementById("progress-bar");
const progressBar = document.getElementById("progress-current");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("current-time");
const mediaName = document.getElementById("name");
const mediaArtist = document.getElementById("artist");
const mediaImage = document.getElementById("media-image");
const favourite = document.getElementById("favourite");
const link = document.getElementById("link");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const albume = document.getElementById("albume");

let currentMusic = musics[Math.floor(Math.random() * 10)];
let audio = new Audio(currentMusic.source);

playPause.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
})

favourite.addEventListener("click", () => {
  favourite.classList.toggle("true");
})

next.addEventListener("click", changeMusic);

previous.addEventListener("click", changeMusic);

audio.addEventListener("loadedmetadata", function () {
  playMusic(currentMusic, audio)
});

progressContainer.addEventListener("click", updateProgressOnClick);


// set up media player
const played = setInterval(() => {
  if (!audio.paused) {
    play.style.display = 'none';
    pause.style.display = 'block';
    // set progress bar and current time
    const progress = setInterval(() => {
      progressBar.style.width = `${(audio.currentTime/audio.duration)*100}%`
      currentTime.textContent = `${audio.currentTime < 6000 ? "0" : ""}${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60) < 10 ? "0" : ""}${Math.floor(audio.currentTime%60)}`;
      if (audio.paused) {
        clearInterval(progress);
      }
    }, 1000);
  } else {
    pause.style.display = 'none';
    play.style.display = 'block';
  }
}, 1);

// insert the current music into media players
function playMusic(currentMusic, audio) {
  mediaName.innerHTML = currentMusic.name;
  mediaArtist.innerHTML = currentMusic.artist;
  mediaImage.src = currentMusic.cover;
  link.href= currentMusic.url
  duration.innerHTML = `${audio.duration < 6000 ? "0" : ""}${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60) < 10 ? "0" : ""}${Math.floor(audio.duration%60)}` || "00:00";
  favourite.classList.toggle('true', currentMusic.favorited === true);
  audio.play();
};

function changeMusic() {
  audio.pause();
  currentMusic = musics[Math.floor(Math.random() * 10)];
  audio = new Audio(currentMusic.source);
  audio.addEventListener("loadedmetadata", () => {
    playMusic(currentMusic, audio)
  });
  audio.play();
}

// update progress due to click position
function updateProgressOnClick(e) {
  const rect = progressContainer.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percentage = (offsetX / rect.width) * 100;

  progressBar.style.width = `${percentage}%`;
  audio.currentTime = (percentage / 100) * audio.duration;
  audio.play();
}


// insert musics into albume
for (let i = 0; i < musics.length; i++) {
  const mediaBox = document.createElement("div")
  const image = document.createElement("img");
  const mediaInfo = document.createElement("div")
  const name = document.createElement("h2");
  const artist = document.createElement("h3");

  image.src = musics[i].cover;
  name.append(`${musics[i].name}`);
  artist.append(`${musics[i].artist}`);

  mediaBox.classList.add("mediaBox");
  mediaInfo.classList.add("mediaInfo");

  mediaInfo.append(name);
  mediaInfo.append(artist);

  mediaBox.append(image);
  mediaBox.append(mediaInfo);

  albume.append(mediaBox);
}

// insert current music into media player on click the music
let mediaBox = document.getElementsByClassName("mediaBox")
for (let i = 0; i < mediaBox.length; i++) {
  mediaBox[i].addEventListener("click", function () {
    audio.pause();
    currentMusic = musics[i];
    audio = new Audio(currentMusic.source);
    audio.addEventListener("loadedmetadata", () => {
      playMusic(currentMusic, audio)
    });
  })
}