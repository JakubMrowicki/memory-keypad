# Memory Keypad - A Memory Mini-Game

![AmIResponsive](https://i.imgur.com/QQIA4EF.png)

[View Project on GitHub Pages](https://jakubmrowicki.github.io/memory-keypad/)


The goal of this website is to create a __fun and simple memory game__. The functionality is inspired by the indie game Among Us.

# Table of Contents
1. [Overview/Description](#1-overviewdescription)
2. [User Stories](#2-user-stories)
3. [User Experience (UX)](#3-user-experienceux)
    * [Strategy Plane](#strategy-plane)
    * [Scope Plane](#scope-plane)
    * [Structure Plane](#structure-plane)
    * [Skeleton Plane](#skeleton-plane)
    * [Surface Plane](#surface-plane)
4. [Features](#4-features)
    * [Future Features](#future-features)
5. [Technologies Used](#5-technologies-used)
6. [Trials & Testing](#6-trials--testing)
7. [Problem Solving](#7-problem-areas--solutions)
8. [Code Validation](#8-code-validation)
9. [Website Deployment](#9-website-deployment)
10. [Credits & Acknowledgments](#10-credits--acknowledgments)
11. [Repository Support](#11-repository-support)

# 1: Overview/Description

This project aims to take the memory mini-game from popular indie game Among Us and extend upon it's functionality by adding a score, life and difficulty system.

The website will play a combination on the keypad and you as the player have to repeat the same combination.

It's a fun memory skill game used to improve your memory.

# 2: User Stories

Below are some user stories which reveal how this website is helpful.
+ 'A user: I want to __practice my memory skills__'
+ 'A user: I want to see how good my memory skills are'
+ 'A user: I want to save my highscore to compare with friends'
+ 'A user: I want a second chance to finish the game'
+ 'An Among Us player: I want to get better at the Among Us mini-game'

# 3: User Experience(UX)
## Strategy Plane
* What is the purpose of this website?
    * The purpose of this project is to create a fun and simple way to practise memorisation skills.
* Who is the user?
    * This game suits all age groups, anybody can use it to practice.
* Value for the user?
    * The user gets to practice their memory in a fun way.
    * Compare high-scores with friends.

---
## Scope Plane
### Function Requirements
* Provide a visual game displaying a combination pattern that is unique.
* Allow the user to find more information about the game.
* Allow the user to save their high score
* Allow the user to reset their saved high score
* Show the user their game progress
### Content Requirements
* Keypad
* Game Start button
* Difficulty settings
* Scoring system
* Life system
* Show game progress
* About section
* Footer
---
## Structure Plane
### Information Architecture
* The website will be lean in terms of written content, however there needs to be an about section with a tutorial to help those who need it.
### Interaction Design
* 3x3 keypad
* Keys will light up in sequence in a pre-generated pattern.
* Click on the keys to input the pattern as shown.
* Button to start the game(The game can also be started by clicking on any of the keys on the keypad)
* Difficulty settings beside the start button. The difficulty will determine how long the pattern is.
* Scoring system that tracks your current score and high-score(saved by cookie)
* Button to reset saved highscore
* Visual effects when either successful or if failed.
* Disable inputs when playing combination.

---
## Skeleton Plane
Wireframes can be found [here](https://github.com/JakubMrowicki/memory-keypad/blob/master/assets/docs/wireframes.pdf)

The website will be laid out over a single page where you can play the game as well as find more information about it.

The footer will contain copyright information and some social media links.

---
## Surface Plane
### Colours
__Primary Colours:__
Colour | Colour Code | Preview
--- | --- | :---:
Light-Blue | #336AFF | ![#F26432](https://via.placeholder.com/15/336AFF/000000?text=+)
Green | #2B9348 | ![!2B9348](https://via.placeholder.com/15/2B9348/000000?text=+)
Red | #D90429 | ![#D90429](https://via.placeholder.com/15/D90429/000000?text=+)
Dark-Grey | #191C24 | ![#191C24](https://via.placeholder.com/15/191C24/000000?text=+)


__Text Body Colours:__
Colour | Colour Code | Preview
--- | --- | :---:
Off-White | #FAFAFA | ![#FAFAFA](https://via.placeholder.com/15/FAFAFA/000000?text=+)


### Typography
"[Zilla Slab Highlight](https://fonts.google.com/specimen/Zilla+Slab+Highlight)" will be used at the top of the page to display the title of the game.

"[Roboto](https://fonts.google.com/specimen/Roboto)" will be used for any headings.

"[Open Sans](https://fonts.google.com/specimen/Open+Sans)" will be used for the body.
# 4: Features
* Start Game by clicking start button or by simply clicking on the keypad itself.
* Select difficulty and get notified of difficulty rules.
* Help button that opens a modal with more information about the game.
    * Ability to reset highscore saved in cookie.
* Pattern Generated using Random.org API.
    * If Random.org API returns an error, the pattern is generated locally so that the game can still be played.
    * If user loses internet access, once again the pattern is generated locally.
* The game will remember your highscore, last difficulty setting used and whether or not you have unlocked the easter egg
* Scoring system that increments exponentially. Meaning that you earn more score for remembering a more complex pattern.
* Life system that allows you to get another chance to beat the game. Using a life however will decrease your score based on the stage(later stage will lose more score if you make a mistake).
* User input will be ignored when the game is playing out the pattern to avoid errors due to misclicks.
* An easter egg that is unlocked by achieving the maximum score in the game. 7700
### Future Features
* A timer. This timer will end the game if it reaches 0. Timer can be reset by user input. Used to prevent idle games/cheating.
* Change the pattern generation method so that the pattern is generated on the fly instead of all at once to help prevent cheating.
* User profiles
* Leaderboard
* Versus Mode to play against friends.
* Sound Effects
* Customisable keypad size(4x3, 4x4 etc)


# 5: Technologies Used
This project uses the following technologies:
* HTML5
* CSS3
* JavaScript
* jQuery
* Bootstrap 4.6
* FontAwesome Icons
* Google Fonts
* Github & Git
* GitPod
* Photoshop
* [Random.org API](https://www.random.org/clients/http/)

# 6: Trials & Testing
* Website was run through the Mobile-Friendly Test by Google and was deemed Mobile Friendly. To further test this, I opened the website on my phone as well as friends and co-workers phones.
    * [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly?id=YtC6Iv3b3o0T8zjpbLbqcw)
* Validated HTML, CSS and JS using validators.
* Checked that all links are working using [deadlinkchecker.com](https://www.deadlinkchecker.com/website-dead-link-checker.asp)
* Ran style.css through [Autoprefixer](https://autoprefixer.github.io/) to add vendor prefixes.
* Used [Color Contrast Accessibility Validator](https://color.a11y.com/Contrast/) to check for Colour Contrast issues.
* Checked and fixed any typos and grammar issues that I could find by using a [Chrome Extension called Webpage Spell-Check](https://chrome.google.com/webstore/detail/webpage-spell-check/mgdhaoimpabdhmacaclbbjddhngchjik).
* Make sure players have the amount of lives as described below keypad.
* Checked that each difficulty setting works and the game responds as expected. Win or loss.
* Checked that the help button works, and that the content in the modal is displaying correctly.
    * Checked that the highscore reset button works as intended.
* Checked that you cannot double click and start the game twice.
* Checked that you cannot input when the game is playing out a pattern.
* Checked that you cannot achieve a negative score by using a life.
* Checked that you can still play the game if you lose internet connection.
* Checked that you can still play the game if Random.org API returns an error.
* Checked that you will get notified of a new best score. Win or lose.
* Checked that the easter egg is unlocked when you reach 7700 score.
    * User notified of unlock.
    * Impossible Difficulty is added.
    * The table in the help section now tells you about the Impossible difficulty.
* Checked that cookies are saved when you:
    * Unlock the easter egg
    * Change difficulty
    * Get a new high score
* Checked that when you refresh the page, the cookies are read and set properly.
    * The difficulty setting used last is set.
    * High score displays saved value.
    * The easter egg is still unlocked after refresh.
* Checked that the GitHub icon in the footer opens in a new tab.
* Checked that you can indeed click on the keypad to start a game.
* Checked that the keypad animation plays on page load, mobile or otherwise.
* Checked that toast notifications can be closed by clicking on them.
* Checked that users with a slow internet connection can see a toast notification telling them that the game is waiting to connect to the random.org api. So that they know why they are waiting.
* Checked that the game.anim.pattern() function properly renders the pattern. Even double clicks.
* Checked that the highscore is only saved at the end of the game. Win or loss.

# 7: Problem Areas & Solutions
* My friends were not sure if the game was active or not when I showed them.
    * __Solution:__ I added a glow to the keypad keys to let users know the game is started.
* The game is diffifcult for some people.
    * __Solution:__ I added a life system, so that players could get another chance at finishing the game.
* The page was a little unsightly with the about section being placed underneath the game area.
    * __Solution:__ I added an Info button that opens a modal. This modal now contains all the about section and how to play instructions.
* It wasn't clear to the user how far they have progressed.
    * __Solution:__ I added a stage section. This lets the user know what stage they are at, and what the last stage is.
* I wanted to give more feedback to the user so they know what's happening while they use the app.
    * __Solution:__ I added toast notifications so players are notified of a new high score or their last score when a game ends.
* If a user lost internet connection and tried to start the game, nothing would happen.
    * __Solution:__ I added functions to catch errors, both connection errors and random.org internal errors which always contain the string 'Error:'. If an error occurs, the game will generate the pattern locally using math.random.
* If a user pressed on a key while the pattern is being played, the game would bug out.
    * __Solution:__ I added a keypause flag. If this flag is set to true, no user input is recorded.
* Because using up a life to continue the game takes away some score, a user can end a game with less score than they had at their peak of that same game. The issue lies in the fact that a highscore was recorded as soon as it was achieved.
    * __Solution:__ Highscore is only set using the score achieved by the end of the game.

# 8: Code Validation
HTML was Validated using the [W3 Validator](https://validator.w3.org/) and returned no errors and 1 warning to be ignored.
![warning](https://i.imgur.com/msqbuIj.png)

The reason why I have prevented users from resizing the page is because on mobiles, double tapping on the screen will zoom into the game. This is undesireable and bad UX.

CSS was Validated using [Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/) and returned no errors.

JavaScript was Validated using [JSHint](https://jshint.com/)

Alicia Ramirez' [Closing Tag Checker for HTML5](https://www.aliciaramirez.com/closing-tags-checker/) was used to further validate the code.

# 9: Website Deployment
This project is deployed to the public by using GitHub Pages.

To deploy the project, the following steps were followed.
* When viewing the repository page, click on the settings button.
* Scroll down to Pages in the sidebar and follow the link.
* Select the master branch and save.
* After about 15 minutes, the website is live.

[View On GitHub Pages](https://jakubmrowicki.github.io/memory-keypad/)

# 10: Credits & Acknowledgments
* Many thanks to my mentor, Ignatius Ukwuoma for his suggestions and overall support of this project.
* Thanks to the Slack CI Peer Review Community for spotting issues, always great to have fresh eyes on a project like this.
* Thanks to [Jason Yaraghi and web-tiki](https://stackoverflow.com/a/20457076) for their response about responsive square divs that maintain their aspect ratio.

### Content
* All written content is written by myself.
# 11: Repository Support
For support please email at [xdshiftblue@gmail.com](mailto:xdshiftblue@gmail.com)