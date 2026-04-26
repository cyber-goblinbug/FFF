// ============================================================
// 1. "Explore Now" Button — Smooth Scroll + Glow Highlight
// ============================================================
const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {
  const racesSection = document.getElementById("races");

  // Smooth scroll to races section
  racesSection.scrollIntoView({ behavior: "smooth" });

  // Add glow highlight effect after scroll lands
  setTimeout(() => {
    racesSection.classList.add("section-highlight");
    setTimeout(() => {
      racesSection.classList.remove("section-highlight");
    }, 1800);
  }, 700);
});


// ============================================================
// 2. Live Race Search / Filter Bar
// ============================================================

// Build the search bar and inject it above the card grid
const racesSection = document.getElementById("races");
const cardGrid = racesSection.querySelector(".card-grid");

const searchWrapper = document.createElement("div");
searchWrapper.style.cssText = `
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "raceSearch";
searchInput.placeholder = "🔍 Search a race...";
searchInput.style.cssText = `
  padding: 12px 20px;
  width: 320px;
  border-radius: 8px;
  border: 2px solid #8b5cf6;
  background-color: #1a0f2e;
  color: #ddd;
  font-size: 16px;
  outline: none;
`;

searchWrapper.appendChild(searchInput);
racesSection.insertBefore(searchWrapper, cardGrid);

// Filter race cards as the user types
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = cardGrid.querySelectorAll(".race-card");
  let anyVisible = false;

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    const matches = name.includes(query) || desc.includes(query);
    card.style.display = matches ? "" : "none";
    if (matches) anyVisible = true;
  });

  // Show a "no results" message if nothing matches
  let noResult = cardGrid.querySelector(".no-result-msg");
  if (!anyVisible) {
    if (!noResult) {
      noResult = document.createElement("p");
      noResult.className = "no-result-msg";
      noResult.textContent = "No races found. Try a different search!";
      noResult.style.cssText = `
        color: #c9a0ff;
        text-align: center;
        font-size: 18px;
        grid-column: 1 / -1;
        padding: 20px;
      `;
      cardGrid.appendChild(noResult);
    }
  } else if (noResult) {
    noResult.remove();
  }
});


// ============================================================
// 3. Fantasy Race Quiz — Pop-up Modal
// ============================================================

// Quiz data
const quizQuestions = [
  {
    question: "Where would you most like to live?",
    answers: [
      { text: "A deep, enchanted forest", points: { Elf: 3 } },
      { text: "A mountain fortress carved from stone", points: { Dwarf: 3 } },
      { text: "A shadowy castle at midnight", points: { Vampire: 3 } },
      { text: "High in the clouds above the world", points: { Dragon: 3 } },
    ],
  },
  {
    question: "What is your greatest strength?",
    answers: [
      { text: "Wisdom and patience", points: { Elf: 3 } },
      { text: "Craft and endurance", points: { Dwarf: 3 } },
      { text: "Charm and persuasion", points: { Vampire: 3 } },
      { text: "Raw power and fire", points: { Dragon: 3 } },
      { text: "Eternal renewal", points: { Phoenix: 3 } },
    ],
  },
  {
    question: "What do you fear most?",
    answers: [
      { text: "The destruction of nature", points: { Elf: 3 } },
      { text: "Losing my clan's honor", points: { Dwarf: 3 } },
      { text: "Sunrise", points: { Vampire: 3 } },
      { text: "Being caged", points: { Dragon: 3 } },
      { text: "Never being reborn", points: { Phoenix: 3 } },
    ],
  },
];

// Score tracker
let scores = { Elf: 0, Dwarf: 0, Vampire: 0, Dragon: 0, Phoenix: 0 };
let currentQuestion = 0;

// Create the quiz button
const quizBtn = document.createElement("button");
quizBtn.textContent = "✨ Take the Race Quiz";
quizBtn.id = "quizBtn";
quizBtn.style.cssText = `
  display: block;
  margin: 0 auto 30px auto;
  background-color: #c026d3;
  color: white;
  border: none;
  padding: 13px 28px;
  font-size: 17px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
`;
quizBtn.onmouseover = () => quizBtn.style.backgroundColor = "#a21caf";
quizBtn.onmouseout = () => quizBtn.style.backgroundColor = "#c026d3";

// Insert quiz button above the abilities list
const abilitiesSection = document.getElementById("abilities");
const abilitiesList = abilitiesSection.querySelector(".abilities-list");
abilitiesSection.insertBefore(quizBtn, abilitiesList);

// Create the modal overlay
const modal = document.createElement("div");
modal.id = "quizModal";
modal.style.cssText = `
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.75);
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

const modalBox = document.createElement("div");
modalBox.style.cssText = `
  background: #2c1b4a;
  border-radius: 12px;
  padding: 35px 30px;
  max-width: 480px;
  width: 90%;
  color: #ddd;
  position: relative;
  box-shadow: 0 0 30px #8b5cf6;
`;

// Close button
const closeBtn = document.createElement("button");
closeBtn.textContent = "✕";
closeBtn.style.cssText = `
  position: absolute;
  top: 12px; right: 16px;
  background: none;
  border: none;
  color: #c9a0ff;
  font-size: 22px;
  cursor: pointer;
`;
closeBtn.onclick = () => {
  modal.style.display = "none";
  resetQuiz();
};

const quizTitle = document.createElement("h3");
quizTitle.textContent = "Which Fantasy Race Are You?";
quizTitle.style.cssText = `
  color: #c9a0ff;
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

const questionEl = document.createElement("p");
questionEl.style.cssText = `
  font-size: 17px;
  margin-bottom: 18px;
  text-align: center;
  min-height: 50px;
`;

const answersEl = document.createElement("div");
answersEl.style.cssText = `display: flex; flex-direction: column; gap: 10px;`;

const resultEl = document.createElement("div");
resultEl.style.cssText = `
  display: none;
  text-align: center;
  padding: 15px 0;
`;

const retryBtn = document.createElement("button");
retryBtn.textContent = "🔄 Try Again";
retryBtn.style.cssText = `
  margin-top: 15px;
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
`;
retryBtn.onclick = resetQuiz;

resultEl.appendChild(retryBtn);

modalBox.appendChild(closeBtn);
modalBox.appendChild(quizTitle);
modalBox.appendChild(questionEl);
modalBox.appendChild(answersEl);
modalBox.appendChild(resultEl);
modal.appendChild(modalBox);
document.body.appendChild(modal);

// Render a quiz question
function renderQuestion() {
  resultEl.style.display = "none";
  questionEl.style.display = "block";
  answersEl.style.display = "flex";

  const q = quizQuestions[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.style.cssText = `
      background: #1a0f2e;
      color: #ddd;
      border: 2px solid #8b5cf6;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      text-align: left;
      transition: background 0.2s;
    `;
    btn.onmouseover = () => btn.style.background = "#3b1f6a";
    btn.onmouseout = () => btn.style.background = "#1a0f2e";

    btn.onclick = () => {
      // Add points for this answer
      for (const [race, pts] of Object.entries(answer.points)) {
        scores[race] = (scores[race] || 0) + pts;
      }
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    };

    answersEl.appendChild(btn);
  });
}

// Show quiz result
function showResult() {
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  resultEl.style.display = "block";

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const raceEmojis = {
    Elf: "🌿", Dwarf: "⛏️", Vampire: "🧛", Dragon: "🐉", Phoenix: "🔥"
  };

  const resultText = document.createElement("p");
  resultText.innerHTML = `
    <span style="font-size: 48px">${raceEmojis[winner]}</span><br><br>
    <strong style="color:#c9a0ff; font-size:22px">You are a ${winner}!</strong><br><br>
    <span style="font-size:15px">Your personality, instincts, and spirit match the ${winner} race.</span>
  `;
  resultEl.insertBefore(resultText, retryBtn);
}

// Reset quiz state
function resetQuiz() {
  currentQuestion = 0;
  scores = { Elf: 0, Dwarf: 0, Vampire: 0, Dragon: 0, Phoenix: 0 };
  const oldResult = resultEl.querySelector("p");
  if (oldResult) oldResult.remove();
  renderQuestion();
}

// Open quiz modal on button click
quizBtn.onclick = () => {
  resetQuiz();
  modal.style.display = "flex";
};