let game = {

    /**
     *var:            contains variables that enable the game to be played.
     *pattern:        is used to save the random numbers generated using RANDOM.ORG.
     *input:          is used to keep track of the user's input.
     *lives:          is used to keep track of the amount of lives left.
     *score:          is used to keep track of score.
     *difficulty:     is used to set the game difficulty
     *position:       is used to track the progress of the game.
     *gamelength:     is used to set the length of the pattern/game.
     *live:           is used to verify that a game is in progress.
     *keypause:       is used to allow or disallow user input.
     *newhighscore:   is used to check if a new highscore was achieved.
     *easteregg:      is used to check if the easteregg has been unlocked.
     */

    var: {
        pattern: [],
        input: [],
        lives: 1,
        score: 0,
        difficulty: 1,
        position: 2,
        gamelength: 6,
        live: false,
        keypause: true,
        newhighscore: false,
        easteregg: false
    },

    /**
     *ui: contains frequently used ui elements.
     */

    ui: {
        keypad: $('.keypad')[0],
        key: $('.keypad')[0].children,
        gamecontrol: $('#game-control'),
        button: $('#start-button'),
        difficulty: $('#difficultySelect'),
        lives: $('#lives'),
        score: $('#score'),
        highscore: $('#highscore'),
        stage: $('#stage'),
        maxstage: $('#max-stage')
    },

    /**
     * anim: contains various animations.
     */

    anim: {

        /**
         * light(element, com) is a function that lights up a key on the keypad when pressed(either by user or the com(computer)).
         * @param {string} element - denotes the element to light up on press.
         * @param {boolean} com - denotes whether it was pressed by the computer or by the user.
         */

        light(element, com = false) {
            let className = "light";
            if (com) {
                className = "lightcomputer";
            }
            $(element).addClass(className);
            setTimeout(function () {
                $(element).removeClass(className);
            }, 220);
        },

        /**
         * win(end) is a function that is run when a stage is completed successfully or when the game is ending.
         * It turns the keypad a green colour, increments the score, highscore and stage.
         * Also it calls game.notify.toast() to let a user know if they beat a highscore or if they unlocked the easter egg.
         * @param {boolean} end - denotes whether it is the end of the game or not.
         */

        win(end = false) {
            let duration = 200;
            game.var.score += 100 * game.var.position;
            game.ui.score.text(game.var.score);
            if (end) {
                duration = 400;
                game.ui.stage.text('0');
                game.ui.maxstage.text('0');
                game.ui.gamecontrol.slideDown('fast');
                $('#stage-box').slideUp('fast');
                $('#lives-box').slideUp('fast');
                if (game.var.score > parseInt(game.ui.highscore.text())) {
                    game.var.newhighscore = true;
                    game.ui.highscore.text(game.var.score);
                    game.task.setCookie('highscore', game.var.score, 14);
                    if (parseInt(game.ui.highscore.text()) >= 7700 && !game.var.easteregg) {
                        game.notify.toast('You unlocked the easter egg!', 'You beat the game and unlocked the Impossible Difficulty!');
                        game.task.easteregg();
                    } else {
                        game.notify.toast('Nice!', 'You got a score of ' + game.var.score + ' which is your new personal best!');
                    }
                } else {
                    game.notify.toast('Good going!', 'You got a score of ' + game.var.score + '.');
                }
            }
            $(game.ui.key).addClass('correct').delay(duration).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                $(game.ui.key).removeClass('correct').dequeue();
            });
        },

        /**
         * loss(end) is a function that is run when a mistake is made or if the game has come to an end.
         * It turns the keypad a red colour, updates the score and highscore.
         * Also it calls game.notify.toast() to let a user know if they beat a highscore.
         * @param {boolean} end - denotes whether it is the end of the game or not.
         */

        loss(end = true) {
            if (end) {
                $(game.ui.key).addClass('incorrect').delay(400).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                    $(game.ui.key).removeClass('incorrect').dequeue();
                    game.ui.button.prop('disabled', false);
                    game.ui.difficulty.prop('disabled', false);
                    game.ui.button.text("Start Game");
                    game.var.live = false;
                    $(game.ui.key).removeClass('on');
                    game.ui.stage.text('0');
                    game.ui.maxstage.text('0');
                    game.ui.gamecontrol.slideDown('fast');
                    $('#stage-box').slideUp('fast');
                    $('#lives-box').slideUp('fast');
                    if (game.var.score > parseInt(game.ui.highscore.text())) {
                        game.var.newhighscore = true;
                        game.ui.highscore.text(game.var.score);
                        game.task.setCookie('highscore', game.var.score, 14);
                        game.notify.toast('Nice!', 'You got a score of ' + game.var.score + ' which is your new personal best!');
                    }
                });
            } else {
                $(game.ui.key).addClass('incorrect').delay(400).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                    $(game.ui.key).removeClass('incorrect').dequeue();
                    game.var.input = [];
                    game.anim.pattern();
                });
            }
        },

        /**
         * pattern() is a function that pauses userinput and plays out the pattern on the keypad for the user to remember and repeat after.
         */

        pattern() { //Animation For Playing Pattern
            game.var.keypause = true;
            game.ui.stage.text(game.var.position - 1);
            let i = 0;
            let interval = setInterval(() => {
                if (i == game.var.position - 1) {
                    game.var.keypause = false;
                    clearInterval(interval);
                }
                game.anim.light(game.ui.key[game.var.pattern[i] - 1], true);
                i++;
            }, 500);
        }
    },

    /*
    notify: contains functions to notify the user of a new highscore or a connection issue.
    */

    notify: {

        /**
         * toast(title, message) is a function that shows a toast notification at the top of the screen.
         * @param {string} title - title of toast notification
         * @param {string} message - message body of toast notification
         */

        toast(title, message) {
            $('#toast-title').text(title);
            $('.toast-body').text(message);
            $('.toast').toast('show');
        },

        /**
         * hidetoast(delay) is a function that hides a toast notification instantly or after a delay.
         * @param {number} delay - ms delay before hiding toast
         */
        hidetoast(delay) {
            if (delay) {
                setTimeout(() => {
                    $('.toast').toast('hide');
                }, delay);
            } else {
                $('.toast').toast('hide');
            }
        }
    },

    /*
    task: contains various functions required to run the game.
    */

    task: {

        /**
         * start() this is a function that activates the keypad, sets the difficulty and starts generating the pattern.
         */

        start() { //Start the game
            game.ui.gamecontrol.slideUp('fast');
            game.task.reset();
            game.var.live = true;
            $(game.ui.key).addClass('on');
            game.task.difficulty(parseInt(game.ui.difficulty[0].value));
            game.ui.lives.text(game.var.lives);
            game.task.pattern(game.var.gamelength);
            game.ui.button.prop('disabled', true);
            game.ui.button.text("Game Running");
            game.ui.difficulty.prop('disabled', true);
        },

        /**
         * reset() is a function that resets game variables to defaults.
         */

        reset() {
            game.var.pattern = [];
            game.var.input = [];
            game.var.score = 0;
            game.var.position = 2;
            game.var.gamelength = 6;
            game.var.newhighscore = false;
            game.var.live = false;
            game.var.keypause = true;
            game.ui.score.text("0");
            game.ui.button.text("Start Game");
        },

        /**
         * difficulty(difficulty) is a function that sets the game variables according to the difficulty setting applied by the user.
         * @param {number} difficulty - difficulty value from game.ui.difficulty select options.
         */

        difficulty(difficulty) {
            switch (difficulty) {
                case 1:
                    game.var.difficulty = 1;
                    game.var.gamelength = 6;
                    game.var.lives = 1;
                    break;
                case 2:
                    game.var.difficulty = 2;
                    game.var.gamelength = 8;
                    game.var.lives = 1;
                    break;
                case 3:
                    game.var.difficulty = 3;
                    game.var.gamelength = 10;
                    game.var.lives = 2;
                    break;
                case 4:
                    game.var.difficulty = 4;
                    game.var.gamelength = 12;
                    game.var.lives = 2;
                    break;
                case 5:
                    game.var.difficulty = 5;
                    game.var.gamelength = 50;
                    game.var.lives = 5;
                    break;
                default:
                    game.var.difficulty = 2;
                    game.var.gamelength = 6;
            }
        },

        /**
         * play() is a function that runs when a user clicks the keypad.
         * if the game is not live, then the game will start.
         * if there is no keypause active and the game is in fact live, the user input will be recorded and validated.
         */

        play() {
            if (!game.var.live) {
                game.task.start();
            }
            if (!game.var.keypause && game.var.live) {
                let selected = parseInt($(this).attr('id'));
                game.var.input.push(selected);
                game.anim.light(this);
                game.task.validate();
            }
        },

        /**
         * validate() is a function that compares the player input to the pre-grenerated pattern based on the games progress.
         * It also decides whether the game continues or if the game ends.
         */

        validate() { //Check player input
            let progress = game.var.input.length;
            let correct = game.var.pattern.slice(0, progress);
            //If player input matches the pattern so far
            if (correct.toString() === game.var.input.toString()) {
                //If player input length is the same as the game length then end the game.
                if (game.var.input.length === game.var.gamelength) {
                    game.anim.win(true);
                    game.ui.button.prop('disabled', false);
                    game.ui.difficulty.prop('disabled', false);
                    game.ui.button.text("Start Game");
                    game.var.live = false;
                    $(game.ui.key).removeClass('on');
                }
                //If player input length is same as game position AND player input length does not match game length then continue game.
                if (progress === game.var.position && progress !== game.var.gamelength) {
                    game.anim.win();
                    game.var.position++;
                    game.var.input = [];
                    game.anim.pattern();
                }
            } else { //Otherwise the pattern and player input do not match, meaning the player made a mistake.
                //If the player still has lives left, then allow another turn
                if (game.var.lives > 1) {
                    game.var.keypause = true;
                    game.var.lives--;
                    game.ui.lives.text(game.var.lives);
                    game.var.score -= 50 * game.var.position;
                    if (game.var.score < 0) { //If players score drops below 0, reset score back to 0.
                        game.var.score = 0;
                    }
                    game.ui.score.text(game.var.score);
                    game.anim.loss(false);
                } else { //Player has no lives left hence end the game entirely.
                    game.anim.loss();
                }
            }
        },

        /**
         * offlinepattern(length) is a function that runs if there is something wrong with the connection to RANDOM.ORG.
         * @param {number} length - denotes the length of the pattern.
         */

        offlinepattern(length) {
            game.notify.toast('Connection Failed', 'Could not connect to Random.org. Generating game pattern locally.');
            game.notify.hidetoast(5000);
            let randomNumArray = [];
            for (let i = 0; i < length; i++) {
                let num = Math.floor((Math.random() * 9) + 1);
                randomNumArray.push(num);
            }
            game.var.pattern = randomNumArray;
            game.ui.maxstage.text(length - 1);
            $('#stage-box').slideDown('fast');
            $('#lives-box').slideDown('fast');
            game.anim.pattern();
        },

        /**
         * pattern(length) is a function that makes a request to RANDOM.ORG. The request calls for 'length' amount of numbers as per the difficulty setting.
         * If the response contains 'Error:' that means something is wrong on RANDOM.ORG's side and offlinepattern() is used instead.
         * If the user has lost connection after loading the game, offlinepattern() is called.
         * @param {number} length - denotes the length of the pattern.
         */

        pattern(length) { //Get Random Number Of Length Of length from random.org api
            game.notify.toast('Please Wait', 'Connecting to Random.org');
            let request = new Request('https://www.random.org/integers/?num=' + length + '&min=1&max=9&col=1&base=10&format=plain&rnd=new');
            fetch(request)
                .then(function (response) {
                    response.text().then(function (text) {
                        if (text.indexOf('Error:') == -1) {
                            let array = Array.from(String(text), Number);
                            array = array.filter(function (el) { //Credit: Christian C. Salvadó https://stackoverflow.com/a/281335
                                return el > 0;
                            });
                            game.var.pattern = array;
                            game.ui.maxstage.text(length - 1);
                            $('#stage-box').slideDown('fast');
                            $('#lives-box').slideDown('fast');
                            game.notify.hidetoast();
                            game.anim.pattern();
                        } else {
                            console.log(text); //Show error message in console.
                            game.task.offlinepattern(length);
                        }

                    });
                })
                .catch(error => {
                    console.log(error); //Show error message in console.
                    game.task.offlinepattern(length);
                });
        },

        /**
         * easteregg() is a function that adds a table row to the games help page about the Impossible difficulty
         * It adds the Impossible difficulty to the select, allowing the user to play it.
         * It also sets a cookie so that their award is saved.
         */

        easteregg() {
            let option = `<option value="5">Impossible Difficulty</option>`;
            $(game.ui.difficulty[0]).append(option);

            let tablerow = `<tr>
                                    <td>Impossible</td>
                                    <td>50</td>
                                    <td>127400</td>
                                    <td>5</td>
                                </tr>`;
            $('#tablebody').append(tablerow);
            game.var.easteregg = true;
            game.task.setCookie('easteregg', true, 365);
        },

        /**
         * resethighscore() is a function that allows the user to reset their saved highscore.
         */

        resethighscore() {
            game.task.eraseCookie('highscore');
            location.reload();
        },

        /**
         * init() is a function that is called right when the website loads
         * It checks if any cookies are saved, and loads data from them.
         * Plays an animation to unveil the keypad.
         * Adds event listeners to the keypad keys and the difficulty select.
         */

        init() {
            game.task.checkCookies();
            for (let i = 0; i < game.ui.key.length; i++) {
                $(game.ui.key[i]).delay(50 * i).animate({ //Credit: Nick Craver https://stackoverflow.com/a/4549418
                    opacity: 1
                }, 1000);
            }
            for (let j = 0; j < game.ui.key.length; j++) {
                game.ui.key[j].addEventListener('mousedown', game.task.play);
            }
            game.ui.difficulty[0].addEventListener('change', function () {
                game.task.setCookie('last_dif', game.ui.difficulty[0].value, 14);
                switch (game.ui.difficulty[0].value) {
                    case "1": {
                        let title = 'Easy Difficulty';
                        let message = 'Easy difficulty has a pattern length of 6 and you get 1 life.';
                        game.notify.toast(title, message, 'fast');
                        break;
                    }
                    case "2": {
                        let title = 'Normal Difficulty';
                        let message = 'Normal difficulty has a pattern length of 8 and you get 1 life.';
                        game.notify.toast(title, message);
                        break;
                    }
                    case "3": {
                        let title = 'Hard Difficulty';
                        let message = 'Hard difficulty has a pattern length of 10 and you get 2 lives.';
                        game.notify.toast(title, message);
                        break;
                    }
                    case "4": {
                        let title = 'Expert Difficulty';
                        let message = 'Expert difficulty has a pattern length of 12 and you get 2 lives.';
                        game.notify.toast(title, message);
                        break;
                    }
                    case "5": {
                        let title = 'Impossible Difficulty';
                        let message = 'Impossible difficulty has a pattern length of 50 and you get 5 lives.';
                        game.notify.toast(title, message);
                        break;
                    }
                    default: {
                        let title = 'Error';
                        let message = 'Something has gone wrong.';
                        game.notify.toast(title, message);
                    }
                }
            });
        },

        /**
         * Thanks to Mandeep Janjua & quirksmode.org for the below cookie functions https://stackoverflow.com/a/24103596 https://www.quirksmode.org/js/cookies.html
         * setCookie(name, value, days) is a function that sets a cookie, sets it's value and expiry date.
         * @param {string} name - denotes the name of the cookie
         * @param {string} value - denotes the value of the newly set cookie
         * @param {number} days - denotes the number of days until the cookie will expire
         */

        setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        },

        /**
         * getCookie(name) is a function that retrieves the value saved in the cookie specified.
         * @param {string} name - denotes the cookie name.  
         */

        getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        /**
         * eraseCookie(name) is a function that erases the cookie specified.
         * @param {string} name - denotes the cookie name. 
         */

        eraseCookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },

        /**
         * checkCookies() is a function that checks if any cookies are saved.
         * If they are then the data from them is read and displayed accordingly.
         * This enables the game to remember your last highscore, last selected difficulty and whether or not you have unlocked the easter egg.
         */

        checkCookies() {
            if (game.task.getCookie('highscore') > 0) {
                game.ui.highscore.text(game.task.getCookie('highscore'));
            }
            if (game.task.getCookie('easteregg') === 'true') {
                game.task.easteregg();
            }
            if (game.task.getCookie('last_dif') > 0) {
                game.ui.difficulty[0].value = game.task.getCookie('last_dif');
            }
        }
    },

};
$(document).ready(game.task.init());