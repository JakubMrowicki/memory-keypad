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
        keys: $('.keypad')[0].children,
        button: $('.btn')[0],
        difficulty: $('#difficultySelect')[0],
        score: $('#score'),
        highscore: $('#highscore'),
    },

    anim: {
        light() { //Animation When Key Pressed

        },

        win() { //Animation When Game Won

        },

        loss() { //Animation When Game Lost

        },

        pattern() { //Animation For Playing Pattern

        }
    },

    task: {
        start(difficulty) { //Start the game using difficulty
            game.task.difficulty(parseInt(game.ui.difficulty.value));
            game.task.pattern(game.gamelength);
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
                    });
                });
        }
    },

};