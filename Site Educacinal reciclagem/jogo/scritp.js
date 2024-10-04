let points = 0;

const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const scoreDisplay = document.getElementById('points');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

// Função para iniciar o arrasto
items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', dropItem);
});

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dropItem(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text');
  const item = document.getElementById(itemId);

  // Verificar se o item corresponde à lixeira
  if (e.target.id.includes(itemId.split('-')[0])) {
    e.target.appendChild(item);
    updateScore(10); // Aumenta a pontuação por acerto
    displayMessage('Você acertou!', true);
    correctSound.play(); // Toca som de acerto
  } else {
    updateScore(-5); // Penalidade por erro
    displayMessage('Tente novamente!', false);
    incorrectSound.play(); // Toca som de erro
  }
}

function updateScore(value) {
  points += value;
  scoreDisplay.textContent = points;
}

// Função de feedback instantâneo
function displayMessage(message, success) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.color = success ? 'green' : 'red';
  feedback.style.fontSize = '20px';
  document.body.appendChild(feedback);
  
  // Remove a mensagem após 2 segundos
  setTimeout(() => {
    feedback.remove();
  }, 2000);
}
