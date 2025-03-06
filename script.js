const titleScreenDiv = document.getElementById("titleScreen");
const gameDiv = document.getElementById("game");
const resultDiv = document.getElementById("result");
const beginStoryButton = document.getElementById("beginStoryButton");
const storyInput = document.getElementById("storyInput");
const nextButton = document.getElementById("nextButton");
const resultStory = document.getElementById("resultStory");
const resetButton = document.getElementById("resetButton");
const gameTitle = document.getElementById("gameTitle");
const endStoryButton = document.getElementById("endStoryButton");
const storyComponentsDiv = document.getElementById("storyComponents");
const componentsList = document.getElementById("componentsList");
const backButton = document.getElementById("backButton");
const theEnd = document.getElementById("theEnd");
const charCountDisplay = document.getElementById("charCount");
const charLimitError = document.getElementById("charLimitError");
const fullStopError = document.getElementById("fullStopError");

let story = "";
let firstTurn = true;
let storyNouns = [];
let storySegments = [];
let wordFrequencies = {}; // Track word frequencies
let resetConfirmed = false; // Flag for reset confirmation

beginStoryButton.addEventListener("click", beginStory);
nextButton.addEventListener("click", nextTurn);
resetButton.addEventListener("click", handleResetClick);
endStoryButton.addEventListener("click", endGame);
backButton.addEventListener("click", goBack);
storyInput.addEventListener("input", updateCharacterCount);

function beginStory() {
  titleScreenDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");
  endStoryButton.style.display = "inline-block";
  resetButton.style.display = "none";
  resetButton.textContent = "Reset";
  resetConfirmed = false;
  storyInput.focus();
}

function updateCharacterCount() {
  const currentLength = storyInput.value.length;
  charCountDisplay.textContent = `${currentLength}/100`;

  if (currentLength > 100) {
    charLimitError.classList.remove("hidden");
    nextButton.disabled = true;
    nextButton.style.opacity = 0.5;
  } else {
    charLimitError.classList.add("hidden");
    nextButton.disabled = false;
    nextButton.style.opacity = 1;
  }
}

function nextTurn() {
  const inputText = storyInput.value.trim();

  if (!inputText.endsWith(".")) {
    fullStopError.classList.remove("hidden");
    return;
  }
  fullStopError.classList.add("hidden");

  if (inputText === "") {
    return;
  }

  storySegments.push(inputText);
  story += inputText + " "; // Keep adding the space here
  extractAndAddNouns(inputText);
  updateComponentsDisplay();
  storyInput.value = "";
  updateCharacterCount();
  if (firstTurn) {
    storyInput.placeholder =
      "Now pass to the next player and continue the story. You can finish the story at any time.";
    firstTurn = false;
  }
  storyInput.focus();
}

function goBack() {
  if (storySegments.length > 0) {
    const lastSegment = storySegments.pop();
    story = story.substring(0, story.length - lastSegment.length - 1);
    removeNounsFromSegment(lastSegment);
    updateComponentsDisplay();
    storyInput.value = lastSegment;
    updateCharacterCount();
    storyInput.focus();
    if (storySegments.length === 0) {
      firstTurn = true;
      storyInput.placeholder = "Begin a story about anything and tap next.";
    }
  } else {
    resetGame();
  }
}

function removeNounsFromSegment(segment) {
  const words = segment.split(/\s+/);
  for (const word of words) {
    const cleanedWord = cleanWord(word);
    const index = storyNouns.indexOf(cleanedWord);
    if (index > -1) {
      storyNouns.splice(index, 1);
    }
    if (wordFrequencies[cleanedWord] > 0) {
      wordFrequencies[cleanedWord]--;
    }
  }
}

function extractAndAddNouns(text) {
  const words = text.split(/\s+/);
  const indicators = [
    "the",
    "a",
    "an",
    "this",
    "that",
    "these",
    "those",
    "my",
    "your",
    "his",
    "her",
    "its",
    "our",
    "their",
  ];
  const pronouns = [
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "its",
    "our",
    "their",
    "myself",
    "yourself",
    "himself",
    "herself",
    "itself",
    "ourselves",
    "yourselves",
    "themselves",
  ];
  const adpositions = [
    "above",
    "across",
    "after",
    "against",
    "along",
    "among",
    "around",
    "as",
    "at",
    "before",
    "behind",
    "below",
    "beneath",
    "beside",
    "between",
    "beyond",
    "but",
    "by",
    "concerning",
    "despite",
    "down",
    "during",
    "except",
    "for",
    "from",
    "in",
    "inside",
    "into",
    "like",
    "near",
    "of",
    "off",
    "on",
    "onto",
    "out",
    "outside",
    "over",
    "past",
    "regarding",
    "round",
    "since",
    "through",
    "throughout",
    "till",
    "to",
    "toward",
    "under",
    "underneath",
    "until",
    "unto",
    "up",
    "upon",
    "with",
    "within",
    "without",
  ];

  for (let i = 0; i < words.length; i++) {
    let word = cleanWord(words[i]);

    if (word.length > 3 && !isCommonWord(word) && !pronouns.includes(word)) {
      if (i > 0 && indicators.includes(cleanWord(words[i - 1]))) {
        addNoun(word);
        continue;
      }

      if (i < words.length - 1) {
        let nextWord = cleanWord(words[i + 1]);
        if (
          word.length > 3 &&
          !isCommonWord(nextWord) &&
          !pronouns.includes(nextWord) &&
          !adpositions.includes(nextWord)
        ) {
          addNoun(nextWord);
          i++;
          continue;
        }
      }

      if (
        i < words.length - 2 &&
        adpositions.includes(cleanWord(words[i + 1]))
      ) {
        addNoun(word);
        continue;
      }

      if (i < words.length - 1) {
        let nextWord = cleanWord(words[i + 1]);
        if (
          nextWord.endsWith("ing") ||
          nextWord.endsWith("ed") ||
          nextWord.endsWith("s")
        ) {
          addNoun(word);
          continue;
        }
      }
    }
  }
}

function addNoun(word) {
  if (!storyNouns.includes(word)) {
    storyNouns.push(word);
  }
  wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
}

function isCommonWord(word) {
  const commonWords = [
    "the",
    "and",
    "a",
    "to",
    "of",
    "in",
    "is",
    "it",
    "you",
    "that",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "then",
    "them",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "go",
    "see",
    "number",
    "no",
    "way",
    "could",
    "people",
    "my",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part",
  ];
  return commonWords.includes(word);
}

function updateComponentsDisplay() {
  componentsList.innerHTML = "";
  let sortedNouns = [...storyNouns].sort(
    (a, b) => wordFrequencies[b] - wordFrequencies[a]
  );

  for (const noun of sortedNouns) {
    const nounElement = document.createElement("p");
    nounElement.textContent = noun;
    componentsList.appendChild(nounElement);
  }
}

function endGame() {
  story += storyInput.value + " "; // Add the final input, PLUS A SPACE
  extractAndAddNouns(story); // Extract nouns from the ENTIRE story
  updateComponentsDisplay();

  gameDiv.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  endStoryButton.style.display = "none";
  resetButton.style.display = "inline-block";
  resetButton.textContent = "Reset";
  resetConfirmed = false;

  resultStory.textContent = capitalizeStory(story);
  theEnd.style.display = "block";
}

function capitalizeStory(text) {
  if (!text) {
    return "";
  }

  let result = "";
  let capitalizeNext = true;

  for (let i = 0; i < text.length; i++) {
    let currentChar = text[i];

    if (capitalizeNext && /[a-zA-Z]/.test(currentChar)) {
      // KEY CHANGE: Only capitalize if it's a letter
      currentChar = currentChar.toUpperCase();
      capitalizeNext = false;
    } else if (text[i] === "." || text[i] === "?" || text[i] === "!") {
      // Set capitalizeNext for after punctuation
      capitalizeNext = true;
    }

    result += currentChar;
  }

  result = result.replace(/\bi\b/g, "I");
  return result.trimEnd();
}

function handleResetClick() {
  if (!resetConfirmed) {
    resetButton.textContent = "Are you sure?";
    resetConfirmed = true;
  } else {
    resetGame();
  }
}

function resetGame() {
  story = "";
  firstTurn = true;
  storyNouns = [];
  storySegments = [];
  wordFrequencies = {};
  storyInput.value = "";
  updateCharacterCount();
  resultStory.textContent = "";
  storyInput.placeholder = "Begin a story about anything and tap next.";
  componentsList.innerHTML = "";
  theEnd.style.display = "none";

  gameDiv.classList.add("hidden");
  resultDiv.classList.add("hidden");
  titleScreenDiv.classList.remove("hidden");
  endStoryButton.style.display = "none";
  resetButton.style.display = "none";
  resetConfirmed = false;
}

function cleanWord(word) {
  return word.replace(/[^a-zA-Z]/g, "").toLowerCase();
}
