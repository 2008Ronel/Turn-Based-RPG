const p1 = document.querySelector(".player-1");
const p2 = document.querySelector(".player-2");
const hp1 = document.querySelector(".hp-1");
const hp2 = document.querySelector(".hp-2");
const attackBtn = document.querySelector(".attack");
const drawBtn = document.querySelector(".draw");
const potionEl = document.querySelector(".potion");
drawBtn.classList.add("hidden");

const surprises = ["take20HP", "give50HP", "givePotion"];

const player1 = {
  titleEl: p1,
  HPEl: hp1,
  HP: 500,
  active: true,
  potions: 3,
  maxHP: 500,
  minAttack: 10,
  maxAttack: 110,
  minDefence: 5,
  maxDefence: 10,
};

const player2 = {
  titleEl: p2,
  HPEl: hp2,
  HP: 500,
  active: false,
  potions: 3,
  maxHP: 500,
  minAttack: 10,
  maxAttack: 60,
  minDefence: 25,
  maxDefence: 49,
};

const surprisesIndex = {
  give20HP,
  give50HP,
  givePotion,
};

function getNumberInRange(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
}

function getActivePlayer() {
  if (player1.active) return player1;

  return player2;
}

function getPassivePlayer() {
  if (player1.active) return player2;

  return player1;
}

function givePotion(activePlayer) {
  activePlayer.potions += activePlayer.potions;
}

function give20HP(activePlayer) {
  activePlayer.HP += 20;
  activePlayer.HPEl.textContent = activePlayer.HP;
}

function give50HP(activePlayer) {
  activePlayer.HP += 50;
  activePlayer.HPEl.textContent = activePlayer.HP;
}

function init() {
  player1.HPEl.textContent = player1.HP;
  player2.HPEl.textContent = player2.HP;
  potionEl.classList.add("disabled");
  getActivePlayer().titleEl.classList.add("active");
}

init();

function checkPotionStatus() {
  const activePlayer = getActivePlayer();

  //TODO: Check if active player has potion
  if (activePlayer.HP < 400) {
    potionEl.classList.remove("disabled");
  } else {
    potionEl.classList.add("disabled");
  }
}

attackBtn.addEventListener("click", function () {
  const passivePlayer = getPassivePlayer();
  const activePlayer = getActivePlayer();

  const attack = getNumberInRange(
    activePlayer.minAttack,
    activePlayer.maxAttack
  );

  const defence = getNumberInRange(
    passivePlayer.minDefence,
    passivePlayer.maxDefence
  );

  let damage = attack - defence;
  if (0 > damage) {
    damage = 0;
  }

  passivePlayer.HP -= damage;
  passivePlayer.HPEl.textContent = passivePlayer.HP;

  console.log(attack);
  console.log(defence);
  console.log(damage);

  if (passivePlayer.HP > 0) {
    drawBtn.classList.remove("hidden");
    attackBtn.classList.add("hidden");
  } else {
    attackBtn.classList.add("hidden");
    passivePlayer.HPEl.textContent = 0;

    activePlayer.titleEl.classList.toggle("active");
    activePlayer.titleEl.classList.toggle("winner");
  }
});

drawBtn.addEventListener("click", function () {
  const number = getNumberInRange(0, surprises.length - 1);
  let surprise = surprises[number];

  console.log(surprise);

  const activePlayer = getActivePlayer();
  const passivePlayer = getPassivePlayer();

  surprisesIndex[surprise](activePlayer);

  if (passivePlayer.HP > 0) {
    drawBtn.classList.add("hidden");
    attackBtn.classList.remove("hidden");

    activePlayer.titleEl.classList.toggle("active");
    passivePlayer.titleEl.classList.toggle("active");

    activePlayer.active = false;
    passivePlayer.active = true;

    checkPotionStatus();
  } else {
    drawBtn.classList.add("hidden");
    passivePlayer.HPEl.textContent = 0;
    activePlayer.titleEl.classList.toggle("active");
    activePlayer.titleEl.classList.toggle("winner");
  }
});

potionEl.addEventListener("click", function () {
  const activePlayer = getActivePlayer();

  //TODO: decrement 1 potion
  const percentage = activePlayer.HP * 0.2;
  activePlayer.HP += percentage;
  activePlayer.HPEl.textContent = activePlayer.HP;
  console.log(percentage);
  checkPotionStatus();
});

/*
if ((player1.active, player1.HP < 400)) potionEl.classList.remove("hidden");
potionEl.addEventListener("click", function () {
  const percentage = player1.HP * 0.2;
  player1.HP += percentage;
  player1.HPEl.textContent = player1.HP;
});
*/
