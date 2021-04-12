let memoryKeypad = {
    computedPattern: [],

    getComputedPattern(length) {
        let promise = new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open("GET", 'https://www.random.org/strings/?num=1&len=' + length + '&digits=on&upperalpha=off&loweralpha=off&unique=on&format=plain&rnd=new');
            req.onload = function () {
                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    reject("There is an Error!");
                }
            };
            req.send();
        });
        return promise;
    },

    setComputedPattern(length) {
        this.getComputedPattern(length).then(value => {
            let numbers = value;
            if (value.length > length) {
                numbers = numbers.slice(0, length);
            }
            let numbersArray = Array.from(String(numbers), Number);
            this.computedPattern = numbersArray;
        });
    }
};
memoryKeypad.setComputedPattern(10);
console.log(memoryKeypad.computedPattern);