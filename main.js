//SELECTION

//body
var body = document.querySelector('body');

//menu
var menu, mobMenu, closeMenu, addSong, listBox, list, dltList, popup;

menu = document.getElementById('menu');
mobMenu = document.getElementById('mobile-menu');
closeMenu = document.getElementById('close')
listBox = document.querySelector('.list-box');
list = document.querySelector('.list-song-con');
dlt = document.getElementById('plist-dlt')
addSong = document.getElementById('add')

//popup
popUp = document.querySelector('.pop-box');
popUpCancel = document.getElementById('cancel-btn');
popUpAdd = document.getElementById('add-btn');

//dark mode
var night = document.getElementById('night');

//favourite 
var fav = document.getElementById('main-icn');

//song navigation
var stime, etime, slider, music;
stime = document.getElementById('s-time');
slider = document.getElementById('slider');
etime = document.getElementById('e-time');
music = document.getElementById('music');

//song controll
var playBtn, prev, next;
playBtn = document.getElementById('play');
prev = document.getElementById('pre');
next = document.getElementById('nxt');


var songStore = [
  {
    title : "We Don't Talk Anymore",
    path : "src/talk.mp3"},
  {
    title : "Attention",
    path : "src/Attention.mp3"},
  ]

var songList = [];
if(localStorage.getItem('music')) {
  songList = localStorage.getItem('music');
  songList = JSON.parse(songList);
}else{
  songList = songStore;
}
  console.log(songList) 

var songIndex = 0;
var upTime;

//EVENTLISENER
menu.addEventListener('click', maxMenu);
closeMenu.addEventListener('click', minMenu);

listBox.addEventListener('click', listDlt)

addSong.addEventListener('click', openPopUp);
popUpCancel.addEventListener('click', closePopUp);
popUpAdd.addEventListener('click', addNewSong)

night.addEventListener('click', darkMode);

fav.addEventListener('dblclick', addFav);

playBtn.addEventListener('click', pausePlay)
prev.addEventListener('click', pre)
next.addEventListener('click', nxt)

music.addEventListener('play', playAnim);
music.addEventListener('pause', pauseAnim);
music.addEventListener('ended', musicEnded);

//FUNCTIONS 

music.addEventListener('loadedmetadata', function () {
  slider.setAttribute('max', music.duration);
  slider.addEventListener('input', changeSlide);
  loadItems()
})

function cElement() {
  var mainList = document.getElementsByClassName('list-song-con');
  var listLength;
  if (mainList === null) {
    listLength = 0;
  }else{
    listLength = mainList.length;
  }
  
  for (listLength; listLength < (songList.length); listLength++) {
    console.log(listLength)
    var listCon = document.createElement('div');
    var listName = document.createElement('b');
    var listdlt = document.createElement('span');
    
        listCon.classList.add('list-song-con');
    listBox.appendChild(listCon.cloneNode(true))
    
    var listed = document.getElementsByClassName('list-song-con');
    
        listName.classList.add('plist-song-name');
        listName.innerText = songList[listLength].title;
    listed[listLength].appendChild(listName.cloneNode(true))
    
    var listedName = document.getElementsByClassName('plist-song-name');
    
      listedName[listLength].addEventListener('click', function () {
        for (var i = 0; i < songList.length; i++) {
          if (this.innerText == songList[i].title) {
            songIndex = i;
            //loadSong(i)
            music.play();
            minMenu();
            break;
          }
        }
      })
    
        listdlt.classList.add('plist-dlt');
        listdlt.innerHTML = '<i class="fas fa-minus" ></i>';
    listed[listLength].appendChild(listdlt.cloneNode(true))
  //loadSong(songIndex)
  }
}

cElement()

function listDlt(e) {
  var btn = e.target;
  if (btn.classList[0] == "plist-dlt") {
    var blist = btn.parentElement;
    blist.classList.add('list-transform');
    blist.addEventListener('transitionend', function() {
      blist.style.display = 'none';
    })
    dltLocal(blist);
  console.log('list deleted');
  }
}

function dltLocal(blist) {
  var x = blist.children[0];
  for (var r = 0; r < songList.length; r++) {
    if (x.innerText == songList[r].title) {
      console.log(x.innerText)
      songList.splice(r, 1);
      console.log(songList)
      //loadSong(songIndex);
      localStorage.setItem('music', JSON.stringify(songList))
      //break;
    }
  }
  
}

function maxMenu() {
  if (!mobMenu.classList.contains('slide-out') ) {
    mobMenu.style.display = "block" 
    setTimeout(function() {
      mobMenu.classList.add('slide-out');
    }, 10);
  }
}

function minMenu() {
  mobMenu.classList.remove('slide-out');
  mobMenu.addEventListener('transformed', function() {
    mobMenu.style.display = "block"
  })
}


function openPopUp() {
  popUp.style.display = "block";
  setTimeout(function() {
    popUp.classList.add('pops');
  }, 10);
}

function closePopUp() {
  popUp.classList.remove('pops');
  setTimeout(function() {
    popUp.style.display = "none";
  }, 500);
}

function darkMode() {
  if (!body.classList.contains('dark')) {
  body.classList.add('dark')
  } else {
  body.classList.remove('dark')
  }
}

function addFav() {
  let favIcn = document.querySelector('#main-icn i')
  
  var favIn = songIndex;
  console.log(favIn + " " + songList[favIn].title)
  
  var listFav = document.getElementsByClassName('list-song-con')
  
  if (favIcn.classList.contains('fa-music')) {
    favIcn.classList.remove('fa-music');
    favIcn.classList.add('fa-heart')
    listFav[favIn].classList.add('favou');
  } else {
    favIcn.classList.remove('fa-heart')
    favIcn.classList.add('fa-music');
    listFav[favIn].classList.remove('favou');
  }
}

function loadItems() {
  let startSecTime, startMinTime, endSecTime, endMinTime;
  
  startSecTime = Math.floor(music.currentTime % 60);
  startSecTime = parseInt(startSecTime);
    startSecTime = (startSecTime < 10)? "0"+ startSecTime : startSecTime;
  
  startMinTime = Math.floor(music.currentTime / 60);
  startMinTime = parseInt(startMinTime);
    startMinTime = (startMinTime < 10)? "0"+ startMinTime : startMinTime;
  
  endSecTime = Math.floor(music.duration % 60);
  endSecTime = parseInt(endSecTime);
    endSecTime = (endSecTime < 10)? "0"+ endSecTime : endSecTime;
  
  endMinTime = Math.floor(music.duration / 60);
  endMinTime = parseInt(endMinTime);
    endMinTime = (endMinTime < 10)? "0"+ endMinTime : endMinTime;
    
  stime.innerText = startMinTime + ':' + startSecTime;
  etime.innerText = endMinTime + ':' + endSecTime;
  
  let sliderUpdate = music.currentTime;
  slider.value = sliderUpdate;
}

function changeSlide() {
    var sliderVal = slider.value;
    music.currentTime = sliderVal; 
    console.log('updating with slider')
  }



function isPlaying() {
  return music.paused;
}

function reset() {
  slider.value = 0;
}

function pausePlay() {
  if (isPlaying()) {
    music.play();
  }else{
    music.pause();
  }
  }

function nxt(){
  if(songIndex < (songList.length - 1) ) {
    songIndex++
  }else{
    songIndex = 0;
  }
  reset();
  loadSong(songIndex);
  music.play();
}

function pre(){
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = (songList.length - 1);
  }
  reset();
  loadSong(songIndex);
  music.play();
}

function musicEnded() {
  nxt()
}

function pauseAnim() {
  if (icn.classList.contains('fa-pause')) {
    icn.classList.remove('fa-pause');
    icn.classList.add('fa-play');
  }
  if (body.classList.contains('bg')) {
    body.classList.remove('bg');
  }
}

function playAnim() {
  if (icn.classList.contains('fa-play')) {
    icn.classList.remove('fa-play');
    icn.classList.add('fa-pause');
  }
  if (body.classList.contains('bg') == false) {
    body.classList.add('bg');
  }
}

function loadSong(songIndex) {
  clearInterval(upTime);
  music.src = songList[songIndex].path;
  music.load();
  document.getElementById('track').innerHTML = songList[songIndex].title;
  upTime = setInterval(loadItems,100)
}
  loadSong(songIndex);
  
function addNewSong() {
  var ntitle = document.getElementById('new-title');
  var nurl = document.getElementById('new-url');
  let myOb = {}
  
  if (ntitle.value.length > 0 && nurl.value.length > 0) {
    myOb = {
      title : ntitle.value,
      path : nurl.value
    }
    songList.push(myOb);
  
  loadSong(songIndex)
  cElement()
  localStorage.setItem('music', JSON.stringify(songList));
  ntitle.value = "";
  nurl.value = "";
  closePopUp()
  
  }else {
    alert('Please Give Valid Info');
  }
  
}

