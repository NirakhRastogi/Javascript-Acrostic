$(document).ready(
    function () {
        let url1 = "http://api.wordnik.com:80/v4/words.json/search/";
        let url2 = "?caseSensitive=true&minCorpusCount=1&maxCorpusCount=25&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&skip=1&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        let buttonClickMe = $("#clickMe");
        let container = $("#container");
        buttonClickMe.on('click', function (e) {
            let data = $("#word").val().toString();
            container.empty();
            for (let i = 0; i < data.length; i++) {
                let letter = data.charAt(i);
                getWord(letter);
            }
        });

        function getRandomColorGradient(color) {
            return (color + Math.floor(Math.random() * 256)) % 255;
        }

        function getWord(letter) {
            let url = url1 + letter + url2;
            let req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.onreadystatechange = function () {
                let res = req.responseText.toString();
                let resJson = JSON.parse(res);
                if (resJson !== undefined) {
                    let resultWord = JSON.stringify(resJson.searchResults[Math.floor(Math.random() * 11)].word);
                    let firstLetter = resultWord.charAt(1);
                    resultWord = resultWord.substr(2);
                    //console.log(resultWord);
                    let r = getRandomColorGradient(0);
                    let g = getRandomColorGradient(r);
                    let b = getRandomColorGradient(g);
                    let ra = getRandomColorGradient(b);
                    let ga = getRandomColorGradient(r);
                    let ba = getRandomColorGradient(g);
                    let color = "rgba(" + r + "," + g + "," + b + ",1)";
                    let colora = "rgba(" + ra + "," + ga + "," + ba + ",.1)";
                    console.log(colora);
                    container.append("<div id='myDiv' style='background-color:transparent'><p id='myRainbow' style='color:" + color + "'><b style='font-size:70px'>" + firstLetter + "</b>" + resultWord + "</p></div>");
                }
            };
            req.send();
        }
    }
);