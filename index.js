let mainplay = document.getElementsByClassName('main-play')[0];
let slider = document.getElementsByClassName('slider')[0];
let songbtn = document.getElementsByClassName('song-btn');
let next = document.getElementsByClassName('fa-forward')[0];
let previous = document.getElementsByClassName('fa-backward')[0];

let progress, index = 1;

// by default song 1 will play
let myAudio = new Audio(`Songs/${index}.mp3`);

mainplay.addEventListener('click', () => {
    console.log('Current Time:', myAudio.currentTime);
    if (myAudio.paused || myAudio.currentTime <= 0) {
        console.log("index of current song= " + index);
        myAudio.play();
        mainplay.classList.remove('fa-play');
        mainplay.classList.add('fa-pause');

        // play song-btn in sync with mainplay
        Array.from(songbtn).forEach((element) => {
            if (index == element.id) {
                element.classList.remove('fa-play');
                element.classList.add('fa-pause');
            }
        });
    }
    else {
        myAudio.pause();
        mainplay.classList.remove('fa-pause');
        mainplay.classList.add('fa-play');

        // pause song-btn in sync with mainplay
        Array.from(songbtn).forEach((element) => {
            if (index == element.id) {
                element.classList.remove('fa-pause');
                element.classList.add('fa-play');
            }
        });
    }
});

// updating slider along with song
myAudio.addEventListener('timeupdate', () => {
    progress = (myAudio.currentTime / myAudio.duration) * 100;
    slider.value = progress;
    console.log("progress value" + progress);
});

// updating slider when clicked on particular time
slider.addEventListener('change', () => {
    myAudio.currentTime = (slider.value * myAudio.duration) / 100;
});

// when next song-btn will be clicked previous will get play icon
let prevIconChange = () => {
    Array.from(songbtn).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

// play song when specific song's song-btn clicked
Array.from(songbtn).forEach((element) => {
    element.addEventListener('click', (e) => {
        prevIconChange();
        index = parseInt(e.target.id);
        if (myAudio.paused || myAudio.currentTime <= 0) {
            myAudio.src = `./Songs/${index}.mp3`;
            myAudio.currentTime = 0;
            myAudio.play();
            mainplay.classList.add('fa-pause');
            mainplay.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            e.target.classList.remove('fa-play');
        }
        else {
            myAudio.pause();
            myAudio.classList.remove('fa-pause');
            myAudio.classList.add('fa-play');
            mainplay.classList.remove('fa-pause');
            mainplay.classList.add('fa-play');
        }
    });
});

// go back to previous song
previous.addEventListener('click', () => {
    prevIconChange();
    if (index <= 1) {
        index = 10;
    }
    else {
        index = index - 1;
    }

    // play song-btn in sync with fa-backward
    Array.from(songbtn).forEach((element) => {
        if (index == element.id) {
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
        }
    });

    myAudio.src = `./Songs/${index}.mp3`;
    myAudio.currentTime = 0;
    myAudio.play();
    mainplay.classList.add('fa-pause');
    mainplay.classList.remove('fa-play');
});

// go to next song
next.addEventListener('click', () => {
    prevIconChange();
    if (index >= 10) {
        index = 1;
    }
    else {
        index = index + 1;
    }

    // play song-btn in sync with fa-forward
    Array.from(songbtn).forEach((element) => {
        if (index == element.id) {
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
        }
    });

    myAudio.src = `./Songs/${index}.mp3`;
    myAudio.currentTime = 0;
    myAudio.play();
    mainplay.classList.add('fa-pause');
    mainplay.classList.remove('fa-play');
});
