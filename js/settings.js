// Canvas premenna a nastavenia lopty
var canvas = document.getElementById('gameCanvas');;
var canvasContext = canvas.getContext('2d');;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 9;
var ballSpeedY = 4;

// Nastavenia skore
var player1Score = 0;
var player2Score = 0;
var winning_score = 6;
var highscore = 0;

// Booleans pre zobrazenie roznych obrazoviek
var showingWinScreen = false;

var showingHighscores = false;

var showingStartScreen = true;

// Boolean pre priebeh hry
var gameStarted = false;
var handleQuit = false;

// Boolean pre multiplayer
var multiplayerEnabled = false;

// Nastavenia hracov
var paddle1Y = 250;
var paddle2Y = 250;
var paddle_thickness = 10;
var paddle_heigth = 100;

// Premenne pre audio elementy
var audioMuted = false;

var music1 = document.getElementById("music1");
var music2 = document.getElementById("music2");

var playerAudio = document.getElementById("player");
var resetBallAudio = document.getElementById("wall");

// Premenne pre nastavenie obtiaznosti AI - hry pocitaca
var difficulty = 6;
var speedDifficultyX = 2;
var speedDifficultyY = 1;