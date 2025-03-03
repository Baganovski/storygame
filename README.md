# Collaborative Storytelling Game

This is a simple, web-based game where players take turns adding sentences to create a collaborative story.  It features noun extraction, a back button, a character limit, full-stop validation, and a two-step reset confirmation.

## Features

*   **Turn-Based Gameplay:** Players take turns adding sentences to the story.
*   **Full Stop Validation:**  Each sentence must end with a full stop (`.`) before the player can proceed.
*   **Character Limit:** Each input is limited to 100 characters.
*   **Noun Extraction:** The game attempts to extract key nouns from the story segments and displays them in a "Story Components" list.
*   **Back Button:** Players can go back one turn, retrieving their previous input and removing the last segment from the story.  Going back to the beginning resets the game to the first-turn state.
*   **Finish Story Button:** Players can end the story at any time.
*   **Reset Button (with Confirmation):**  The "Reset" button requires two clicks to confirm, preventing accidental resets.
*   **Responsive Design:**  The game is styled to look like a phone, making it suitable for mobile devices.
*   **Noun Frequency Sorting:** The "Story Components" list is sorted by the frequency of the extracted nouns.
*   **Multi-paragraph placeholder:** Includes a multi-paragraph placeholder.

## How to Play

1.  **Start the Story:**  The first player enters a sentence (up to 100 characters) that begins the story.  The sentence *must* end with a full stop.
2.  **Take Turns:**  Each subsequent player adds a sentence to continue the story, building upon the previous input.
3.  **Story Components:**  The "Story Components" list displays key nouns extracted from the story, providing a quick overview of the story's elements.
4.  **Back Button:** If a player wants to change their last turn, they can click the "Back" button.  This will restore their previous input, remove the last sentence from the story, and update the noun list.
5.  **Finish Story:**  At any point, a player can click the "Finish Story" button to end the game.
6.  **Complete Story:** The complete story is displayed, and the player can reset the game to start a new story.
7.  **Reset Button:** Clicking "Reset" once will change the button text to "Are you sure?". Clicking it again will reset the entire game.

## Technologies Used

*   HTML
*   CSS (with Google Fonts)
*   JavaScript (vanilla – no frameworks)

## File Structure

*   `index.html`:  The main HTML file containing the game structure.
*   `style.css`: The CSS file for styling the game.
*   `script.js`: The JavaScript file containing the game logic.

## How to Run

1.  **Download:** Download the `index.html`, `style.css`, and `script.js` files.  Make sure they are all in the *same* directory.
2.  **Open in Browser:**  Open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge, etc.).  No server is required; you can open it directly from your file system.

## Noun Extraction Details

The noun extraction is a heuristic-based approach (not perfect, but designed to capture many common nouns). It uses the following rules:

1.  **Indicator Words:** Words preceded by indicators like "the," "a," "an," "this," "that," etc., are considered potential nouns.
2.  **Noun-Noun Pairs:**  If two words that are *not* common words or pronouns appear consecutively, the second word is prioritized as a noun.
3.  **Prepositions:** Words followed by prepositions (e.g., "of," "with," "in") are often nouns.
4.  **Basic Verb Check:** Words followed by words ending in "ing," "ed," or "s" are *sometimes* nouns (this is a very basic verb check and is less reliable).
5.  **Word Length and Common Words:** Words shorter than 4 characters and very common words (articles, prepositions, pronouns, etc.) are excluded.
6.  **Frequency Sorting:** Extracted nouns are sorted by frequency of appearance in the story.

## Customization

*   **Styling:**  You can easily modify the appearance of the game by editing the `style.css` file.  Change colors, fonts, spacing, etc., to your liking.
*   **Character Limit:**  Change the `maxlength` attribute of the `textarea` in `index.html` and the corresponding check in `script.js` to adjust the character limit.
*   **Noun Extraction:**  You can refine the noun extraction logic in the `extractAndAddNouns` function in `script.js` to improve its accuracy.
*   **Button text:** The "finish story" button can be changed by adapting line 141 in the javascript.

## Limitations

*   **Noun Extraction Imperfection:**  The noun extraction is heuristic-based and will not be perfect. It may miss some nouns or incorrectly identify non-nouns.
*   **No Server-Side Persistence:**  The game state is not saved. Refreshing the page will reset the game.
*  **No undo after finishing**: Once the story has been finished, it cannot be edited.

## Potential Future Enhancements

*   **Server-Side Storage:**  Implement server-side storage (e.g., using Node.js and a database) to save and load stories.
*   **User Accounts:** Allow users to create accounts and save their stories.
*   **Improved Noun Extraction:** Integrate a more sophisticated natural language processing (NLP) library for better noun extraction.
*   **Collaboration Features:**  Add features for real-time collaboration, such as multiple players editing simultaneously.
*   **Voting/Rating:**  Allow players to vote on or rate completed stories.
*   **Undo functionality on finished stories:** Enable an option to revert the finished story and begin editing again.

This README provides a comprehensive overview of the game. Enjoy!
