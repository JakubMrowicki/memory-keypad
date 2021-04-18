let game = {

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

    anim: {
        light(element, com = false) { //Animation When Key Pressed
            let className = "light";
            if (com) {
                className = "lightcomputer";
            }
            $(element).addClass(className);
            setTimeout(function () {
                $(element).removeClass(className);
            }, 220);
        },

        win(end = false) { //Animation When Game Won
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

        loss(end = true) { //Animation When Game Lost
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

    notify: {
        toast(title, message) {
            $('#toast-title').text(title);
            $('.toast-body').text(message);
            $('.toast').toast('show');
        },

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

    task: {
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

        play() { //Runs on key click, sends clicks for validation
            if (!game.var.live) {
                game.task.start(); //Start game if click on idle keypad.
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
                if (game.var.lives > 0) {
                    game.var.keypause = true;
                    game.var.lives--;
                    game.ui.lives.text(game.var.lives);
                    game.var.score -= 50 * game.var.position;
                    if (game.var.score < 0) {
                        game.var.score = 0;
                    }
                    game.ui.score.text(game.var.score);
                    game.anim.loss(false);
                } else {
                    game.anim.loss();
                }
            }
        },

        pattern(length) { //Get Random Number Of Length Of length from random.org api
            game.notify.toast('Please Wait', 'Connecting to Random.org');
            let request = new Request('https://www.random.org/integers/?num=' + length + '&min=1&max=9&col=1&base=10&format=plain&rnd=new');
            fetch(request)
                .then(function (response) {
                    response.text().then(function (text) {
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
                    });
                })
                .catch(error => {
                    game.notify.toast('Connection Failed', 'Could not connect to Random.org. Generating game pattern locally.');
                    game.notify.hidetoast(5000);
                    console.log(error);
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
                });
        },

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

        init() {
            if (game.task.getCookie('highscore') > 0) {
                game.ui.highscore.text(game.task.getCookie('highscore'));
            }
            if (game.task.getCookie('easteregg') === 'true') {
                game.task.easteregg();
            }
            if (game.task.getCookie('last_dif') > 0) {
                game.ui.difficulty[0].value = game.task.getCookie('last_dif');
            }
            game.ui.difficulty[0].addEventListener('change', function () {
                game.task.setCookie('last_dif', game.ui.difficulty[0].value, 14);
                switch (game.ui.difficulty[0].value) {
                    case "1": {
                        let title = 'Easy Difficulty';
                        let message = 'Easy difficulty has a pattern length of 6 and you get 1 life.'
                        game.notify.toast(title, message, 'fast');
                        break;
                    }
                    case "2": {
                        let title = 'Normal Difficulty';
                        let message = 'Normal difficulty has a pattern length of 8 and you get 1 life.'
                        game.notify.toast(title, message);
                        break;
                    }
                    case "3": {
                        let title = 'Hard Difficulty';
                        let message = 'Hard difficulty has a pattern length of 10 and you get 2 lives.'
                        game.notify.toast(title, message);
                        break;
                    }
                    case "4": {
                        let title = 'Expert Difficulty';
                        let message = 'Expert difficulty has a pattern length of 12 and you get 2 lives.'
                        game.notify.toast(title, message);
                        break;
                    }
                    case "5": {
                        let title = 'Impossible Difficulty';
                        let message = 'Impossible difficulty has a pattern length of 50 and you get 5 lives.'
                        game.notify.toast(title, message);
                        break;
                    }
                    default: {
                        let title = 'Error';
                        let message = 'Something has gone wrong.'
                        game.notify.toast(title, message);
                    }
                }

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