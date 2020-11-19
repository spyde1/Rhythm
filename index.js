var smin, ssec, stime, ctime;
var emin, esec, etime, ltime;
var sliderVal, pointer, icn, start, end, body, music, dark, slider;

sliderVal = 0;
pointer = 0;
icn = document.getElementById('icn');
dark = document.getElementById('night');
body = document.querySelector('body') ;
slider = document.getElementById('slider');
music = document.getElementById('music');
start = document.getElementById('s-time');
end = document.getElementById('e-time');
var songList = [
  {
    title : "We Don't Talk Anymore",
    path : "src/talk.mp3"},
  {
    title : "Attention",
    path : "src/Attention.mp3"},
  ]
var songIndex = 0;
var upTime;
var menu = document.getElementById('menu');
var mob = document.getElementById('mobile-menu');
var close = document.getElementById('close');
var li = document.createElement('li');
var item = document.querySelectorAll('#list-box li');
var liLength = item.length;
var listBox = document.getElementById('list-box');

var popBox = document.querySelector('.pop-box');
var pop = document.querySelector('.pop');

var ntitle = document.getElementById('new-title');
var nurl = document.getElementById('new-url');


function loadList() {
  for (liLength; liLength < (songList.length); liLength++) {
    console.log(liLength)
    li.innerHTML = songList[liLength].title;
    li.setAttribute('class','tones');
    listBox.appendChild(li.cloneNode(true));
  }
}

loadList()

function loadEvent() {
  var playList = document.querySelectorAll('.tones');
  for (let x = 0; x < playList.length; x++) {

playList[x].addEventListener('click', function () {
  var playListV = playList[x].innerHTML;
  
  for (let i = 0; i < songList.length; i++) {
    if (playListV == songList[i].title) {
      console.log(playListV + ' playing from playList');
      loadSong(i);
      music.play();
      closeMenu();
      break;
    }
  }
})
}
}

loadEvent()

menu.addEventListener('click', menuCome);

function menuCome() {
    if (mob.classList.contains('slide-out')) {
      mob.classList.remove('slide-out');
      setTimeout(function() {
        mob.style.display = 'none'
      }, 500)
    }else{
      mob.style.display = 'block';
      setTimeout(function() {
      mob.classList.add('slide-out');
        
      }, 10);
    }
}

close.addEventListener('click', closeMenu);

function closeMenu() {

      mob.classList.remove('slide-out');
    setTimeout(function() {
        mob.style.display = 'none'
      }, 500)
  
}


music.addEventListener('loadedmetadata', function () {
  console.log("music duration"+music.duration)
  slider.setAttribute('max',music.duration) 
  
  slider.addEventListener('input', changeTo);
  
})

function update() {
    pointer = music.currentTime;
    slider.value = pointer;
    ctime = parseInt(music.currentTime);
    smin = Math.floor(ctime / 60);
    smin = (smin < 10)? "0"+smin : smin;
    
    ssec = Math.floor(ctime % 60);
    ssec = (ssec < 10)? "0"+ssec : ssec;
    
    stime = smin + ":" + ssec;
    start.innerHTML = stime;
    
    ltime = parseInt(music.duration);
    emin = Math.floor(ltime / 60);
    emin = (emin < 10)? "0"+emin : emin;
    
    esec = Math.floor(ltime % 60);
    esec = (esec < 10)? "0"+esec : esec;
    
    etime = emin + ":" + esec;
    end.innerHTML = etime;
    
  }
document.getElementById('pause').addEventListener('click',function() {
  if (isPlaying()) {
    music.play();
  }else{
    music.pause();
  }
  });

dark.addEventListener('click', function () {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    this.style.color = '#fff'
  }else{
    body.classList.add('dark');
    this.style.color = '#37f'
  }
});


function isPlaying() {
  return music.paused;
}

music.addEventListener('pause', function() {
    if (icn.classList.contains('fa-pause')) {
      icn.classList.remove('fa-pause');
      icn.classList.add('fa-play');
    }
    if (body.classList.contains('bg')) {
      body.classList.remove('bg');
    }
  }); 
  
music.addEventListener('play', function() {
    if (icn.classList.contains('fa-play')) {
      icn.classList.remove('fa-play');
      icn.classList.add('fa-pause');
    }
    if (body.classList.contains('bg') == false) {
      body.classList.add('bg');
    }
  });

    

function reset() {
  slider.value = 0;
}

function loadSong(songIndex) {
  clearInterval(upTime);
  music.src = songList[songIndex].path;
  music.load();
  document.getElementById('track').innerHTML = songList[songIndex].title;
  upTime = setInterval(update,100)
  
}
  loadSong(songIndex);

document.getElementById('pre').addEventListener('click', pre);
document.getElementById('nxt').addEventListener('click', nxt);
music.addEventListener('ended', function () {
  nxt();
  console.log('ended');
});

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
function changeTo() {
    sliderVal = slider.value;
    music.currentTime = sliderVal; 
    console.log('updating with slider')
  }
  

document.getElementById('add').addEventListener('click', function () {
  openPop();
  console.log('openPop')
})
document.getElementById('cancel-btn').addEventListener('click', function () {
  closePop();
  console.log('closePop')
})

function openPop() {
  popBox.style.display = 'flex';
  setTimeout(function() {
    popBox.classList.add('pops');
  }, 10);
}
  
function closePop() {
  popBox.classList.remove('pops');
  setTimeout(function() {
    popBox.style.display = 'none';
  }, 500)
}

let n = {};

function subPop() {
  if (ntitle.value.length == 0 || nurl.value.length == 0) {
    alert('please give valid input')
  }else{
    console.log(ntitle.value + "\n" + nurl.value);
    n = {
      title : ntitle.value,
      path : nurl.value
    }
    songList.push(n);
    loadList();
    loadEvent();
    closePop()
  }
}
