// Funkcia na zobrazenie uvodnej obrazovky
function introScreen() {
    document.body.addEventListener('keydown', function(event){
        if (event.keyCode == 13 && gameStarted == false) {
            // Zresetovanie rychlosti lopticky pred zaciatkom hry
            ballSpeedX = 9;
            ballSpeedY = 4;

            startGame();
            showingStartScreen = false;
        }
        else if(event.keyCode == 32 && gameStarted == false){
            showHighscores();
        }

        // Detekcia stlacenia 1,2 alebo 3 na nastavenie obtiaznosti/rychlosti AI
        if (event.keyCode == 49 || event.keyCode == 97 && gameStarted == false) {
            difficulty = 6;
            winning_score = 8;
            speedDifficultyX = 2;
            speedDifficultyY = 1;

        }
        else if (event.keyCode == 50 || event.keyCode == 98 && gameStarted == false) {
            difficulty = 9;
            winning_score = 16;
            speedDifficultyX = 2;
            speedDifficultyY = 1;
        }
        else if (event.keyCode == 51 || event.keyCode == 99 && gameStarted == false) {
            difficulty = 12;
            winning_score = 24;
            speedDifficultyX = 3;
            speedDifficultyY = 2;
        }
        // Detekcia stlacenie 5 alebo 6 pre nastavenie single alebo multiplayera
        else if (event.keyCode == 53 || event.keyCode == 101 && gameStarted == false) {
            multiplayerEnabled = false;

            //colorRect(180, 315, 115, 3, '#FFFFFF');
        }
        else if (event.keyCode == 54 || event.keyCode == 102 && gameStarted == false) {
            multiplayerEnabled = true;
        }
    });

    // Vymena hudby v pozadi
    music1.pause();
    music2.play();

    var grd1 = canvasContext.createLinearGradient(0,0,760,480);
    grd1.addColorStop(0,"red");
    grd1.addColorStop(1,"yellow");

    // Napln gradientom
    canvasContext.fillStyle = grd1;
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    canvasContext.font = '200px Impact';
    canvasContext.fillStyle = '#006C0D';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Pong'd", canvas.width/2, canvas.height/2 - 50);

    canvasContext.fillStyle = '#000000';
    canvasContext.font = '35px Impact';
    canvasContext.fillText('Trochu viac ako Pong', canvas.width/2, canvas.height/2 + 5);

    canvasContext.fillStyle = '#1500FF';
    canvasContext.font = '25px Impact';
    canvasContext.fillText('Stac ENTER pre zacatie hry alebo SPACE pre zobrazenie skore', canvas.width/2, canvas.height/2 + 40);

    canvasContext.fillStyle = '#000000';
    canvasContext.font = '20px Impact';
    canvasContext.fillText('Pre SINGLEPLAYER stlac 5 alebo pre MULTIPLAYER stlac 6', canvas.width/2, canvas.height/2 + 75);
    canvasContext.font = '20px Arial';
    canvasContext.fillText('Hrac nalavo pouziva Q a A', canvas.width/2, canvas.height/2 + 100);
    canvasContext.fillText('Hrac napravo pouziva P a L', canvas.width/2, canvas.height/2 + 125);
    canvasContext.font = '25px Arial';
    canvasContext.fillText('Stlac 1 pre lahku obtiaznost (hra sa do 8)', canvas.width/2, canvas.height/2 + 155);
    canvasContext.fillText('Stlac 2 pre tazsiu obtiaznost (hra sa do 16)', canvas.width/2, canvas.height/2 + 185);
    canvasContext.fillText('Stlac 3 pre najtazsiu obtiaznost (hra sa do 24)', canvas.width/2, canvas.height/2 + 215);
    canvasContext.font = '12px Arial';
    canvasContext.fillStyle = '#000000';
    canvasContext.textAlign = 'center';
    canvasContext.fillText('Pre vypnutie vsetkych zvukov stlac kedykolvek M', 135, 475);
}

// Funkcia na zobrazenie highscores
function showHighscores() {
    showingHighscores = true;
    canvas.addEventListener('mousedown', handleMouseClick);

    var grd1 = canvasContext.createLinearGradient(0,0,760,480);
    grd1.addColorStop(0,"red");
    grd1.addColorStop(1,"yellow");

    // Napln gradientom
    canvasContext.fillStyle = grd1;
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    canvasContext.font = '100px Impact';
    canvasContext.fillStyle = '#006C0D';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("HIGHSCORES", canvas.width/2, canvas.height/2 - 150);

    canvasContext.font = '40px Impact';
    canvasContext.fillStyle = '#000000';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Tvoje najvyssie skore je:", canvas.width/2, canvas.height/2);
    canvasContext.fillText(highscore, canvas.width/2, canvas.height/2 + 60);

    canvasContext.font = '15px Arial';
    canvasContext.fillStyle = '#000000';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Kliknite pre navrat na uvodnu obrazovku", canvas.width/2, canvas.height - 10);
}

// Vykresli endscreen s info o tom, ktory hrac vyhral a moznostou pokracovat
function showWinScreen() {
    showingWinScreen = true;
    colorRect(0, 0, canvas.width, canvas.height, '#353535');
    if(player1Score == winning_score) {
        canvasContext.fillStyle = '#006C0D';
        canvasContext.font = '100px Impact';
        canvasContext.fillText('Hrac 1 VYHRAL', canvas.width/2, canvas.height/2 - 100);
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.font = '50px Arial';
        canvasContext.fillText('Skore 1. hraca je:', canvas.width/2, canvas.height/2);
        canvasContext.fillText(player1Score, canvas.width/2, canvas.height/2 + 60);
    }
    if(player2Score == winning_score){
        canvasContext.fillStyle = '#006C0D';
        canvasContext.font = '100px Impact';
        canvasContext.fillText('Hrac 2 VYHRAL', canvas.width/2, canvas.height/2 - 100);
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.font = '50px Arial';
        canvasContext.fillText('Skore 2. hraca je:', canvas.width/2, canvas.height/2);
        canvasContext.fillText(player2Score, canvas.width/2, canvas.height/2 + 60);
    }

    canvasContext.font = '35px Arial';
    canvasContext.fillText('Kliknite pre navrat na uvodnu obrazovku!', canvas.width/2, canvas.height/2 + 150);

    if(player1Score > highscore){
        highscore = player1Score;
    }
}

// Zresetuj polohu lopty po zvitazeni jedneho z hracov
function ballReset() {
    if(player1Score >= winning_score || player2Score >= winning_score){
        showWinScreen();
    }

    resetBallAudio.play();

    ballSpeedX += 2;
    ballSpeedY += 1;

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

// Vykresli "siet" v strede hracieho pola
function drawNet() {
    for(var i = 0; i < canvas.height; i += 50){
        colorRect(canvas.width / 2 - 2.5, i , 5, 30, 'white');
    }
}

// Vykrasli farebnu kruznicu so vstupnymi argumentami
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

// Vykrasli farebny stvoruholnik so vstupnymi argumentami
function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

// Funckia na nacitanie zvukov hry a premennych pre zvuky + prisposobenie hlasitosti
function loadAudio(){
    var music1 = document.getElementById("music1");
    var music2 = document.getElementById("music2");

    var playerAudio = document.getElementById("player");
    var resetBallAudio = document.getElementById("wall");

    music1.volume = 0.1;
    music2.volume = 0.5;
    resetBallAudio.volume = 0.3;

    music2.play();
}

// Funkcia na zistenie ci su zvuky prave zapnute alebo vypnute a podla toho vypne/zapne zvuky
function muteAudio() {
    if (audioMuted == true) {
        music1.volume = 0;
        music2.volume = 0;
        resetBallAudio.volume = 0;
        playerAudio.volume = 0;
    }
    else {
        music1.volume = 0.1;
        music2.volume = 0.5;
        resetBallAudio.volume = 0.3;
        playerAudio.volume = 1;
    }
}

// Keylistener pre klavesy multiplayer modu
function keyboardInput() {
    if (keys.isPressed(65)) { // DOWN
        if(paddle1Y >= 450){}
        else {
            paddle1Y += 15;
        }
    } else if (keys.isPressed(81)) { // UP
        if(paddle1Y <= -50){}
        else {
            paddle1Y -= 15;
        }
    }

    if (keys.isPressed(76)) { // DOWN
        if(paddle2Y >= 430){}
        else{
            paddle2Y += 15;
        }
    } else if (keys.isPressed(80)) { // UP
        if(paddle2Y <= -50){}
        else {
            paddle2Y -= 15;
        }
    }
}

function KeyListener() {
    this.pressedKeys = [];

    this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
    };

    this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
    };

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(key)
{
    return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
{
    document.addEventListener("keypress", function(e) {
        if (e.keyCode == keyCode)
            callback(e);
    });
};

/*// Funkcia eventlistenera pre ukoncenie hry a navrat do menu
function handleEscape() {
    canvas.addEventListener('keypress', function(event){
        if (event.keyCode == 27 && gameStarted == true) {
            gameStarted = false;
            introScreen();
        }
    });
}*/