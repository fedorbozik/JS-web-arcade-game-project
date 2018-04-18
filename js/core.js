// Funkcia hry bud pre jedneho hraca so zapnutym AI alebo dvoch s vypnutym AI
function startGame() {
    gameStarted = true;

    music2.pause();
    music1.play();

    keys = new KeyListener();

    var framesPerSecond = 30;
    var refreshIntervalId = setInterval(function () {
        if(showingWinScreen || handleQuit) {
            clearInterval(refreshIntervalId);
            if(showingWinScreen){
                showWinScreen();
            }
            else if(handleQuit){
                introScreen();
                handleQuit = false;
                ballReset();
            }
            gameStarted = false;
            player1Score = 0;
            player2Score = 0;
            //Zastav vykonavanie cohokolvek dalsieho v nasledujucej funkcii
            return;
        }
        if(multiplayerEnabled == true){
            keyboardInput();
        }
        moveEveryting();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    if(multiplayerEnabled == false){
        canvas.addEventListener('mousemove',
            function (evt) {
                if(showingWinScreen){
                    return;
                }
                var mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y - (paddle_heigth / 2);
            }
        )
    }
}

// Posun vsetky suradnice/veci + detekcia kolizie
function moveEveryting() {
    if(multiplayerEnabled == false) {
        computerMovement();
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y + paddle_heigth) {
            player.play();

            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y + paddle_heigth / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++; // musi byt pred resetovanim lopty, kvoli skore
            ballReset();
            if(showingWinScreen) {
                return;
            }
        }
    }
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < paddle2Y + paddle_heigth) {
            player.play();

            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + paddle_heigth / 2);
            ballSpeedY = deltaY * 0.35;
        }else{
            player1Score++; // musi byt pred resetovanim lopty, kvoli skore
            ballReset();
            if(showingWinScreen) {
                return;
            }
        }
    }
    if(ballY > canvas.height  ||  ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
}

// Vykresli vsetku grafiku(resp. vsetky elementy hry ako farby na canvas)
function drawEverything() {
    if(showingWinScreen) {
        return;
    }
    // Vybiel plochu
    colorRect(0, 0, canvas.width, canvas.height, '#353535');

    //Vykresli siet
    drawNet();

    // Vykresli hraca na lavej strane
    colorRect(0, paddle1Y, paddle_thickness, paddle_heigth, 'white');

    // Vykresli hraca na pravej strane
    colorRect(canvas.width - paddle_thickness, paddle2Y, paddle_thickness, paddle_heigth, 'white');

    // Vykresli loptu
    colorCircle(ballX, ballY, 9, 'white')

    // Vykresli skore oboch hracov
    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.font = '25px Impact';
    canvasContext.fillText(player1Score, 200, 100);
    canvasContext.fillText(player2Score, canvas.width - 200, 100);

    canvasContext.font = '8px Arial';
    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Kliknite pre navrat na uvodnu obrazovku", canvas.width - 80, 10);
}

// AI pocitaca
function computerMovement() {
    var paddle2YCenter = paddle2Y + (paddle_heigth / 2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    } else if(paddle2YCenter > ballY + 35){
        paddle2Y -= 6;
    }
}

// Zachytavanie pohybu mysi a preratavanie spravnej hodnoty pre canvas
function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX =  evt.clientX - rect.left - root.scrollLeft;
    var mouseY =  evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}

// Zachytenie kliknutia mysi
function handleMouseClick() {
    if(showingWinScreen){
        introScreen();
        showingWinScreen = false;
        return;
    }
    if(showingHighscores){
        showingHighscores = false;
        showingStartScreen = true;
        introScreen();
        return;
    }
    if(gameStarted){
        handleQuit = true;
        return;
    }
}