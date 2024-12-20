let selectedPlayer = null;
let gameScore = 0;
let quizScore = 0;
let currentQuestionIndex = 0;
const questions = [
    {
        "question": "¿En qué Gran Premio hizo su debut Franco Colapinto en la Fórmula 1 con el equipo Williams en 2024?",
        "options": ["Gran Premio de Italia", "Gran Premio de Azerbaiyán", "Gran Premio de Singapur"],
        "correctAnswer": "Gran Premio de Italia"
    },
    {
        "question": "¿Cuántos puntos acumuló Franco Colapinto en la temporada 2024 de Fórmula 1?",
        "options": ["8 puntos", "10 puntos", "5 puntos"],
        "correctAnswer": "5 puntos"
    },
    {
        "question": "¿En qué posición finalizó Franco Colapinto en el Gran Premio de Azerbaiyán de 2024, logrando sus primeros puntos en la Fórmula 1?",
        "options": ["Décimo", "Octavo", "Duodécimo"],
        "correctAnswer": "Octavo"
    },
    {
        "question": "¿Qué piloto fue reemplazado por Franco Colapinto en el equipo Williams durante la temporada 2024?",
        "options": ["Logan Sargeant", "Nicholas Latifi", "George Russell"],
        "correctAnswer": "Logan Sargeant"
    },
    {
        "question": "¿En qué circuito sufrió Franco Colapinto un accidente durante la clasificación que resultó en un impacto de 50G en 2024?",
        "options": ["Circuito de Singapur", "Circuito de Las Vegas", "Circuito de Mónaco"],
        "correctAnswer": "Circuito de Las Vegas"
    },
    {
        "question": "¿Qué posición ocupó Franco Colapinto en la clasificación general de pilotos al finalizar la temporada 2024?",
        "options": ["18º", "20º", "19º"],
        "correctAnswer": "19º"
    },
    {
        "question": "¿En qué Gran Premio de 2024 Franco Colapinto se convirtió en el primer argentino en sumar puntos en la Fórmula 1 desde 1982?",
        "options": ["Gran Premio de Italia", "Gran Premio de Azerbaiyán", "Gran Premio de Estados Unidos"],
        "correctAnswer": "Gran Premio de Azerbaiyán"
    },
    {
        "question": "¿Qué piloto argentino había sumado puntos por última vez en la Fórmula 1 antes de Franco Colapinto en 2024?",
        "options": ["Carlos Reutemann", "Juan Manuel Fangio", "José Froilán González"],
        "correctAnswer": "Carlos Reutemann"
    },
    {
        "question": "¿En qué Gran Premio de 2024 Franco Colapinto sufrió un accidente bajo condiciones de lluvia que resultó en una bandera roja?",
        "options": ["Gran Premio de Bélgica", "Gran Premio de Japón", "Gran Premio de Brasil"],
        "correctAnswer": "Gran Premio de Brasil"
    },
    {
        "question": "¿País asiático que da origen al sobrenombre de la famosa actriz argentina con la cuál se relacionó románticamente a Colapinto?",
        "options": ["Tailandia", "China", "Japon"],
        "correctAnswer": "China"
    }
];

// Player Selection
document.querySelectorAll('.playerCard').forEach(card => {
    card.addEventListener('click', () => {
        // Reproducir sonido
        const audio = document.getElementById('audio');
        audio.currentTime = 0; // Reiniciar el sonido
        audio.play();

        document.querySelectorAll('.playerCard').forEach(c => {
            c.classList.remove('selected');
            c.classList.remove('zoomed');
        });
        card.classList.add('selected');
        card.classList.add('zoomed');
        
        selectedPlayer = {
            name: card.dataset.player,
            image: card.querySelector('img').src
        };
        
        selectPlayer(card);
    });
});

function updatePlayerInfo() {
    const playerInfo = document.getElementById('playerInfo');
    const playerAvatar = document.getElementById('playerAvatar');
    const playerName = document.getElementById('playerName');
    
    playerInfo.style.display = 'flex';
    playerAvatar.src = selectedPlayer.image;
    playerName.textContent = selectedPlayer.name;
}

// Memory Game
function startMemoryGame() {
    document.getElementById('playerSelection').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    updatePlayerInfo();
    
    const values = [
        'image1.png', 'image1.png',
        'image2.png', 'image2.png', // Reemplaza con el nombre de tu imagen
        'image3.jpeg', 'image3.jpeg', // Reemplaza con el nombre de tu imagen
        'image4.jpeg', 'image4.jpeg', // Reemplaza con el nombre de tu imagen
        'image5.jpeg', 'image5.jpeg', // Reemplaza con el nombre de tu imagen
        'image6.jpeg', 'image6.jpeg', // Reemplaza con el nombre de tu imagen
        'image7.png', 'image7.png', // Reemplaza con el nombre de tu imagen
        'image8.jpeg', 'image8.jpeg', // Reemplaza con el nombre de tu imagen
        'image9.jpeg', 'image9.jpeg', // Reemplaza con el nombre de tu imagen
        'image10.jpeg', 'image10.jpeg' // Reemplaza con el nombre de tu imagen
    ];
    shuffleArray(values);
    
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    values.forEach(value => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value; // Guardar el nombre de la imagen
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let flippedCards = [];
let canFlip = true;

function flipCard(card) {
    if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    const img = document.createElement('img');
    img.src = card.dataset.value; // Mostrar la imagen
    img.style.width = '100%';
    img.style.height = '100%';
    card.appendChild(img); // Añadir la imagen a la tarjeta
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;
    
    setTimeout(() => {
        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.add('fade-out');
            card2.classList.add('fade-out');
            gameScore += 10;
            document.getElementById('score').textContent = `Score: ${gameScore}`;
            
            if (gameScore >= 99) {
                setTimeout(startQuizGame, 1000);
            }
        } else {
            card1.classList.remove('zoomed');
            card2.classList.remove('zoomed');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }
        
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Quiz Game
function startQuizGame() {
    document.getElementById('memoryGame').style.display = 'none';
    document.getElementById('formula1Quiz').style.display = 'block';
    quizScore = 0;
    currentQuestionIndex = 0;
    document.getElementById('quizScore').textContent = `Score: ${quizScore}/70`;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionContainer = document.getElementById('questionContainer');
        const optionsContainer = document.getElementById('optionsContainer');

        questionContainer.innerHTML = `<h2>${question.question}</h2>`;
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
            optionsContainer.appendChild(button);
        });
    } else {
        checkFinalScore();
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        quizScore += 10;
        document.getElementById('quizScore').textContent = `Score: ${quizScore}/70`;
    }

    currentQuestionIndex++;
    displayQuestion();
}

function checkFinalScore() {
    if (quizScore >= 70) {
        displayWinner();
    } else {
        displayLoser();
    }
}

function displayWinner() {
    const gameOver = document.getElementById('gameOver');
    const message = document.getElementById('gameOverMessage');
    const winnerImage = document.getElementById('winnerImage');
    const restartButton = document.getElementById('restartButton');
    
    gameOver.style.display = 'block';
    message.textContent = '¡Felicitaciones! ¡Has ganado!';
    winnerImage.src = 'Ganador.jpg'; // Asegúrate de que la imagen esté en la ruta correcta
    winnerImage.style.display = 'block';
}

function displayLoser() {
    const gameOver = document.getElementById('gameOver');
    const message = document.getElementById('gameOverMessage');
    const restartButton = document.getElementById('restartButton');
    
    gameOver.style.display = 'block';
    message.textContent = 'No alcanzaste el puntaje necesario. Intenta de nuevo.';
    restartButton.style.display = 'block';
}

document.getElementById('restartButton').addEventListener('click', () => {
    location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
    const bannerText = document.querySelector('.banner-text');
    const text = bannerText.textContent;
    bannerText.innerHTML = ''; // Limpiar el contenido original

    // Dividir el texto en letras y crear elementos span
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'banner-letter';
        span.style.animationDelay = `${index * 0.1}s`; // Retraso para cada letra
        bannerText.appendChild(span);
    });
});

function selectPlayer(card) {
    // Agregar clase de animación
    card.classList.add('spin');

    // Esperar a que termine la animación antes de continuar
    setTimeout(() => {
        // Aquí puedes agregar la lógica para pasar al siguiente juego
        startMemoryGame();
    }, 1000); // Duración de la animación
}