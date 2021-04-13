let game = {

    var: {
        pattern: [],
        input: [],
        difficulty: 2,
        position: 1,
        gamelength: 6,
        live: false,
        keypause: true,
    },

    ui: {
        keypad: $('.keypad')[0],
        key: $('.keypad')[0].children,
        button: $('.btn')[0],
        difficulty: $('#difficultySelect')[0],
        score: $('#score'),
        highscore: $('#highscore'),
    },

    anim: {
        light(element) { //Animation When Key Pressed
            $(element).addClass("light").delay(300).queue(function () { //Credit PetersenDidIt https://stackoverflow.com/a/2510255
                $(element).removeClass("light").dequeue();
            });
        },

        win() { //Animation When Game Won

        },

        loss() { //Animation When Game Lost

        },

        pattern() { //Animation For Playing Pattern
            let i = 0;
            let interval = setInterval(() => {
                if (i == game.var.position - 1) {
                    game.var.keypause = false;
                    clearInterval(interval);
                }
                game.anim.light(game.ui.key[game.var.pattern[i] - 1])
                i++;
            }, 500);
        }
    },

    task: {
        start() { //Start the game using difficulty
            game.task.reset();
            game.task.difficulty(parseInt(game.ui.difficulty.value));
            game.task.pattern(game.var.gamelength);
        },

        reset() {
            game.var.pattern = [];
            game.var.input = [];
            game.var.difficulty = 2;
            game.var.position = 1;
            game.var.gamelength = 6;
            game.var.live = false;
            game.var.keypause = true;
            game.ui.score.text("0");
        },

        difficulty(difficulty) {
            switch (difficulty) {
                case 1:
                    game.var.gamelength = 4;
                    break;
                case 2:
                    game.var.gamelength = 6;
                    break;
                case 3:
                    game.var.gamelength = 8;
                    break;
                case 4:
                    game.var.gamelength = 10;
                    break;
                case 5:
                    game.var.gamelength = 14;
                    break;
                default:
                    game.var.gamelength = 6;
            }
        },

        play() { //Runs on key click, sends clicks for validation

        },

        validate() { //Check player input

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

        onload() {
            for (let i = 0; i < game.ui.key.length; i++) {
                $(game.ui.key[i]).delay(50 * i).animate({ //Credit: Nick Craver https://stackoverflow.com/a/4549418
                    opacity: 1
                }, 500);
                game.anim.light(game.ui.key[i]);
            }
        }
    },

};
$(document).ready(game.task.onload());