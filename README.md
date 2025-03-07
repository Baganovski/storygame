# The Story Game

## Overview

"The Story Game" is a simple, collaborative web application where users take turns adding sentences to create a unique, and often humorous, story.  The key feature is that players *don't* see what previous players have written, leading to unpredictable and surprising results. The app also attempts to identify and list "Story Components" (nouns) that have been used in the story.

## Features

*   **Collaborative Storytelling:** Multiple users can contribute to a single story, one sentence at a time.
*   **Blind Turns:** Players cannot see the previous contributions, ensuring a surprise element.
*   **Story Component Tracking:** The app attempts to extract nouns from the story and displays them as "Story Components."  This uses a *heuristic* approach (see limitations below).
*   **Back Button:** Allows the current player to go back one step and edit their previous sentence.
*   **Character Limit:** Enforces a 100-character limit per sentence.
*   **Full Stop Requirement:**  Requires sentences to end with a full stop (period).
*   **Reset Functionality:**  Allows the user to reset the game and start a new story.
*   **Confirmation Prompt:** Asks for confirmation before resetting.
*   **Mobile-Friendly Design:**  Styled to resemble a notepad and is responsive to different screen sizes.

## How to Play

1.  **Start the Game:** Click the "Begin Story" button on the title screen.
2.  **First Turn:** The first player enters a sentence (up to 100 characters) to begin the story.  The sentence *must* end with a full stop. Click "Next".
3.  **Subsequent Turns:** Pass the device to the next player.  They will see a blank input box and the list of "Story Components" (nouns that have been detected). They add their sentence (again, ending with a full stop) and click "Next".
4.  **Continue:** Repeat step 3, passing the device between players.
5.  **Back Button:** At any time, the current player can click "Back" to edit their *most recent* sentence. If they click "Back" again, it will go back to the title screen.
6.  **Finish the Story:** When you're ready to end the story, click the "Finish Story" button.
7.  **Read the Result:** The complete, (and likely bizarre!) story will be displayed.
8.  **Reset:** Click the "Reset" button to start a new story. You will be asked to confirm before resetting.

## Technology

*   **HTML:**  Provides the structure of the web page (input boxes, buttons, display areas).
*   **CSS:**  Styles the page to create the notepad appearance and handles responsiveness.
*   **JavaScript:**  Provides the core game logic:
    *   Handling button clicks.
    *   Managing turns.
    *   Validating input (character limit, full stop).
    *   Building the story string.
    *   Extracting and displaying story components (nouns).
    *   Displaying the final story.
    *   Resetting the game.

## Noun Extraction (Story Components) - *Heuristic Approach*

The "Story Components" feature attempts to identify nouns in the story using a *heuristic* approach. This means it uses a set of simple rules based on common grammatical patterns, *not* a full natural language processing (NLP) system.  This approach is *not* perfect and has limitations:

*   **False Positives:** It may incorrectly identify some words as nouns (e.g., adjectives, verbs).
*   **False Negatives:** It may miss some nouns, especially those in unusual sentence structures or those that don't follow common patterns.
* **Pluralization:** The extraction is not sensitive to plurals.

**The Heuristic Rules:**

The noun extraction works by examining each word in the input and applying these rules:

1.  **Clean the Word:** Remove any non-letter characters and convert the word to lowercase.
2.  **Basic Filtering:**
    *   Ignore words shorter than 4 characters.
    *   Ignore words in a predefined list of "common words" (e.g., "the", "and", "a").
    *   Ignore words in a predefined list of pronouns (e.g., "I", "you", "he").
3.  **Pattern Matching:**
    *   **Indicator Words:** If a word is preceded by an "indicator" word (e.g., "the", "a", "an", "this", "that", "my", "your"), it's considered a likely noun.
    *   **Noun Followed by Noun:** If two nouns appear beside each other, extract the second noun.
    *   **Noun Followed by "of" or "with":** If a word is followed by "of" or "with", it's considered a likely noun.
    *   **Noun Followed by Verb (Weak Check):** If a word is followed by a word ending in "ing", "ed", or "s", it's *weakly* considered a likely noun. This rule is less reliable.

## Code Structure

*   **`index.html`:** Contains the HTML structure of the web page.
*   **`style.css`:** Contains the CSS styles for the visual presentation.
*   **`script.js`:** Contains the JavaScript code for the game logic.

### `script.js` - Key Functions:

*   **`beginStory()`:**  Starts the game, hiding the title screen and showing the game screen.
*   **`updateCharacterCount()`:** Updates the character count display and disables/enables the "Next" button based on the character limit.
*   **`nextTurn()`:**  Processes the user's input, adds it to the story, extracts nouns, and updates the display.
*   **`goBack()`:**  Handles the "Back" button functionality, removing the last sentence and restoring it to the input box.
*   **`removeNounsFromSegment(segment)`:** Removes extracted nouns from the `storyNouns` array when the "Back" button is used.
*   **`extractAndAddNouns(text)`:**  The core noun extraction function (described in detail above).
*   **`addNoun(word)`:** Adds a noun to the `storyNouns` array, if it isn't present already, and updates the frequency count.
*   **`updateComponentsDisplay()`:** Updates the "Story Components" list on the screen.
*   **`endGame()`:**  Finalizes the story, hides the game screen, and shows the result screen.
*   **`capitalizeStory(text)`:** Capitalizes the first letter of the story and the first letter after each sentence-ending punctuation mark.
*   **`handleResetClick()`:**  Handles the "Reset" button, showing a confirmation prompt.
*   **`resetGame()`:** Resets all game variables and returns to the title screen.
*   **`cleanWord(word)`:**  Removes non-alphabetic characters and converts a word to lowercase.
*   **`isCommonWord(word)`:**  Checks if a word is in the list of common words.

## Running the App

*  Go to https://baganovski.github.io/thestorygame/ or
*  Save the `index.html`, `style.css`, and `script.js` files in the same directory.
*  Open `index.html` in a web browser.

## Limitations

*   **Noun Extraction Accuracy:** As mentioned above, the noun extraction is heuristic and not perfectly accurate.
*   **No Server-Side Persistence:** The story data is stored only in the browser's memory.  If the page is refreshed, the story is lost.
*   **Single Device:** The game is designed to be played on a single device, passed between players.

## Potential Future Enhancements

*   **Improved Noun Extraction:**  Integrate a more sophisticated Natural Language Processing (NLP) library (e.g., Compromise) for better noun detection.
*   **Filtering of Abstract Nouns:** use a list of abstract nouns.
*   **Server-Side Storage:**  Use a server-side language (like PHP, Node.js, Python) and a database (like MySQL, PostgreSQL, MongoDB) to store stories persistently, allowing users to save and load games.
*   **Multi-Device Play:**  Implement real-time collaboration using WebSockets or a similar technology, allowing players to contribute from different devices.
*   **User Accounts:**  Allow users to create accounts and save their stories.
*   **Theming/Customization:**  Allow users to change the appearance of the app.
*   **More Sophisticated Story Analysis:**  Add features like identifying the most frequent words, sentiment analysis, etc.
* **Accessibility Improvements:** Add ARIA attributes.

This README provides a comprehensive overview of "The Story Game," its features, how to play it, the technology behind it, and its limitations. It also explains the noun extraction process in detail. This should be a helpful resource for understanding and potentially extending the application.
