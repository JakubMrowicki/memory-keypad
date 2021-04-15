let game = {

    var: {
        pattern: [],
        input: [],
        score: 0,
        difficulty: 1,
        position: 2,
        gamelength: 6,
        live: false,
        keypause: true,
    },

    ui: {
        keypad: $('.keypad')[0],
        key: $('.keypad')[0].children,
        button: $('.btn'),
        difficulty: $('#difficultySelect'),
        score: $('#score'),
        highscore: $('#highscore'),
    },

    anim: {
        light(element, com = false) { //Animation When Key Pressed
            let className = "light";
            if (com) {
                className = "lightcomputer";
            }
            $(element).addClass(className).delay(200).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                $(element).removeClass(className).dequeue();
            });
        },

        win(end = false) { //Animation When Game Won
            let duration = 200;
            if (end) {
                duration = 400;
            }
            $(game.ui.key).addClass('correct').delay(duration).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                $(game.ui.key).removeClass('correct').dequeue();
            });
            game.var.score += 100 * game.var.position;
            game.ui.score.text(game.var.score);
            if (game.var.score > parseInt(game.ui.highscore.text())) {
                game.ui.highscore.text(game.var.score);
                game.task.setCookie('highscore', game.var.score, 14);
            }
        },

        loss() { //Animation When Game Lost
            $(game.ui.key).addClass('incorrect').delay(400).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                $(game.ui.key).removeClass('incorrect').dequeue();
                game.ui.button.prop('disabled', false);
                game.ui.difficulty.prop('disabled', false);
                game.ui.button.text("Start Game");
                game.var.live = false;
                $(game.ui.key).removeClass('on');
            });
        },

        pattern() { //Animation For Playing Pattern
            game.var.keypause = true;
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

    task: {
        start() { //Start the game
            game.task.reset();
            game.var.live = true;
            $(game.ui.key).addClass('on');
            game.task.difficulty(parseInt(game.ui.difficulty[0].value));
            game.task.pattern(game.var.gamelength);
            game.ui.button.prop('disabled', true);
            game.ui.button.text("Game Running");
            game.ui.difficulty.prop('disabled', true);
        },

        reset() {
            game.var.pattern = [];
            game.var.input = [];
            game.var.score = 0;
            game.var.position = 2;
            game.var.gamelength = 6;
            game.var.live = false;
            game.var.keypause = true;
            game.ui.score.text("0");
            game.ui.button.text("Start Game");
        },

        difficulty(difficulty) {
            switch (difficulty) {
                case 1:
                    game.var.difficulty = 1;
                    game.var.gamelength = 6;
                    break;
                case 2:
                    game.var.difficulty = 2;
                    game.var.gamelength = 8;
                    break;
                case 3:
                    game.var.difficulty = 3;
                    game.var.gamelength = 10;
                    break;
                case 4:
                    game.var.difficulty = 4;
                    game.var.gamelength = 12;
                    break;
                case 5:
                    game.var.difficulty = 5;
                    game.var.gamelength = 20;
                    break;
                default:
                    game.var.difficulty = 2;
                    game.var.gamelength = 6;
            }
        },

        play() { //Runs on key click, sends clicks for validation
            if (!game.var.live) {
                game.task.start(); //Start game if click on idle keypad.
                game.anim.light(this);
            }
            if (!game.var.keypause && game.var.live) {
                let selected = parseInt($(this).attr('id'));
                game.var.input.push(selected);
                game.anim.light(this);
                game.task.validate();
            }
        },

        validate() { //Check player input
            let progress = game.var.input.length;
            let correct = game.var.pattern.slice(0, progress);
            if (correct.toString() == game.var.input.toString()) {
                if (game.var.input.length == game.var.gamelength) {
                    game.anim.win(true);
                    game.ui.button.prop('disabled', false);
                    game.ui.difficulty.prop('disabled', false);
                    game.ui.button.text("Start Game");
                    game.var.live = false;
                    $(game.ui.key).removeClass('on');
                }
                if (progress == game.var.position && progress !== game.var.gamelength) {
                    game.anim.win();
                    game.var.position++;
                    game.var.input = [];
                    game.anim.pattern();
                }
            } else {
                game.anim.loss();
            }
        },

        pattern(length) { //Get Random Number Of Length Of length from random.org api
            let request = new Request('https://www.random.org/integers/?num=' + length + '&min=1&max=9&col=1&base=10&format=plain&rnd=new');
            fetch(request)
                .then(function (response) {
                    return response.text().then(function (text) {
                        let array = Array.from(String(text), Number);
                        array = array.filter(function (el) { //Credit: Christian C. Salvadó https://stackoverflow.com/a/281335
                            return el > 0;
                        });
                        game.var.pattern = array;

                        game.anim.pattern();
                    });
                });
        },

        init() {
            let saved_score = game.task.getCookie('highscore');
            let saved_difficulty = game.task.getCookie('last_dif');
            if (saved_difficulty > 0) {
                game.ui.difficulty[0].value = saved_difficulty;
            }
            if (saved_score > 0) {
                game.ui.highscore.text(saved_score);
            }
            game.ui.difficulty[0].addEventListener('change', function () {
                game.task.setCookie('last_dif', game.ui.difficulty[0].value, 14);
            });
            let i = 0;
            for (i = 0; i < game.ui.key.length; i++) {
                $(game.ui.key[i]).delay(50 * i).animate({ //Credit: Nick Craver https://stackoverflow.com/a/4549418
                    opacity: 1
                }, 1000, function () {
                    if (i == game.ui.key.length) {
                        for (let j = 0; j < game.ui.key.length; j++) {
                            game.ui.key[j].addEventListener('mousedown', game.task.play);
                        }
                    }
                });
                game.anim.light(game.ui.key[i]);
            }

        },

        /* Thanks to Mandeep Janjua & quirksmode.org for the below cookie functions https://stackoverflow.com/a/24103596 https://www.quirksmode.org/js/cookies.html */

        setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        },

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

        eraseCookie(name) {
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    },

};
$(document).ready(game.task.init());