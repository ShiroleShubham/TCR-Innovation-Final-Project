console.log("Welcome to Sangeet");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Add the Songs Path 
let songs = [
    {songName: "Zindagi Pyar Ka Geet Hai", filePath: "Music/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dil To Pagal Hai", filePath: "Music/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Koi Ladki Hai (Chak Dum Dum)", filePath: "Music/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kora Kagaz Tha Yeh Man Mera", filePath: "Music/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kudrat-Tune O Rangeele", filePath: "Music/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Pyar Hua Iqrar Hua ", filePath: "Music/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tere Liye (Veer Zaara) ", filePath: "Music/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tumse Milkar Na Jane ", filePath: "Music/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Yeh Galiyan Yeh Chaubara-", filePath: "Music/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Chup Gay Sare Najare", filePath: "Music/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})