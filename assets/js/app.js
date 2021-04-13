let memoryKeypad = {
    computedPattern: [],

    getComputedPattern(length) {
        let request = new Request('https://www.random.org/integers/?num=' + length + '&min=1&max=9&col=1&base=10&format=plain&rnd=new');
        fetch(request)
            .then(function (response) {
                return response.text().then(function (text) {
                    let numberArray = Array.from(String(text), Number);
                    let filtered = numberArray.filter(function (el) { //Credit: Christian C. Salvadó https://stackoverflow.com/a/281335
                        return el > 0;
                    });
                    memoryKeypad.computedPattern = filtered;
                })
            });
    },
};