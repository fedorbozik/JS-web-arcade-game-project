// Po nacitani okna sa zobrazi intro screen a po stlaceni enter vola hru pri cca 30 FPS
window.onload = function() {
    introScreen();
    loadAudio();
};

// Listener na ovladanie vypnutia/zapnutia zvukov pocas celej hry
document.body.addEventListener('keydown', function(event) {
    if (event.keyCode == 77) {
        if (audioMuted == false) {
            audioMuted =  true;
        }
        else {
            audioMuted = false;
        }

        muteAudio();
    }
});