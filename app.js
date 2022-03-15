window.onload = function () {
    
    let activeWord = [];
    let theWord = validWords[Math.floor(Math.random() * validWords.length)].split('');
    let letterCounter = 0;
    let wordCounter = 0;
    
    //grid creation
    function createBoxes () {
        let field = document.getElementsByClassName('grid');
        for (let i = 1; i <= 6; i++){
            let guess = document.createElement('div');
            guess.classList.add(i, 'guess');
            
            for (let j = 1; j <= 5; j++){
                let letter = document.createElement('div');
                letter.classList.add ('letter');
                guess.appendChild(letter);
            }
            field[0].appendChild(guess)   
        }
        for (letters of document.getElementsByClassName('guess')[0].children){
            letters.classList.add('activeWord');
        }
    }
    createBoxes();

    //screen keyboard 
    function createKeyboard(){
        let screenKeys = document.getElementsByClassName('keyboard');
        const firstRow = 'йцукенгшщзхї'.split('');
        const secondRow = 'фівапролджє'.split('');
        const thirdRow = 'ґячсмитьбю'.split('');
        
        function createRow (arr) {
            let row = document.createElement('div');
            for (let i = 0; i < arr.length; i++){
                let key = document.createElement('p');
                key.id = arr[i];
                key.textContent = `${arr[i]}`;
                key.addEventListener('mouseup', () => screenInput(key.id), true);
                row.appendChild(key);
            }
            row.classList.add('row');
            screenKeys[0].appendChild(row);
        }

        createRow(firstRow);
        createRow(secondRow);
        createRow(thirdRow);
        
        //add enter and backspace keys
        function addSpecialKey(name, source, before){
            let key = document.createElement('p');
            let icon = document.createElement('img');
            icon.src = source;
            key.classList.add('specialKey', name);
            key.appendChild(icon);
            if (before !== undefined){
                document.getElementsByClassName('row')[2].insertBefore(key, document.getElementById(`${before}`));
            } else {
                document.getElementsByClassName('row')[2].appendChild(key);
            }
        }

        addSpecialKey('enter', './images/enter.png', 'ґ');
        addSpecialKey('backspace', './images/backspace.png');

    }

    createKeyboard();

    function screenInput (input){
         if (letterCounter === 5) {
            return;
        } else  {
            const p = document.createElement("p");
            p.classList.add(input);
            p.textContent = `${input}`.toUpperCase();
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter].appendChild(p);
            activeWord.push(`${input}`);
            letterCounter ++;
        }
    
    }

    //actions for enter and backspace screen keys
   document.getElementsByClassName('enter')[0].addEventListener('mouseup', () => {
       if (activeWord.length == 5) checkWord();
   }, true);

   document.getElementsByClassName('backspace')[0].addEventListener('mouseup', () => {
       if (letterCounter > 0) {
        activeWord.pop();
        letterCounter --;
        let element = document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter];
        element.removeChild(element.firstChild);
       }
   }, true);


    //keyboard input
    window.addEventListener("keyup", function(event) {
        if (event.key == 'Enter' && activeWord.length == 5) {
            checkWord();
        } else if ( event.key == 'Backspace' && letterCounter > 0){
            activeWord.pop();
            letterCounter --;
            let element = document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter];
            element.removeChild(element.firstChild);

        } else if (letterCounter === 5) {
            return;

        } else if (event.key.toLowerCase().match(/[а-яієїґ\']+/ig)){
            const p = document.createElement("p");
            p.classList.add(event.key);
            p.textContent = `${event.key}`.toUpperCase();
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter].appendChild(p);
            activeWord.push(`${event.key}`);
            letterCounter ++;
        }
      }, true);

   function checkWord () {
    //word validation
    if (!validWords.includes(activeWord.join(''))){
        showMessage('спробуй ще', 2000);
        return;
    }
    //checking the word
    let correctLetters = 0;
    for (let i = 0; i < 5 ; i++){
         if (theWord[i] == activeWord[i]){
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[i].classList.add('green');
            document.getElementById(`${activeWord[i]}`).classList.add('green');
            correctLetters++;
         } else if (theWord.includes(activeWord[i])){
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[i].classList.add('yellow');
            document.getElementById(`${activeWord[i]}`).classList.add('yellow');
         } else {
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[i].classList.add('grey');
            document.getElementById(`${activeWord[i]}`).classList.add('grey');
         }
    }

    for (letters of document.getElementsByClassName('guess')[wordCounter].children){
        letters.classList.remove('activeWord');
    }
    
    //starting new line
    activeWord = [];
    wordCounter ++;
    letterCounter = 0;
    
    if (wordCounter < 6){   
      for (letters of document.getElementsByClassName('guess')[wordCounter].children){
        letters.classList.add('activeWord');
      }
    }
    
    //evaluation
     if (correctLetters == 5){
         endCard('you win!');
     } else if (wordCounter == 6){
         endCard('you suck!', theWord);
     }
   }

function showMessage (str, time){
    let message = document.createElement('div');
    message.classList.add('message');
    message.textContent = str;
    document.getElementsByClassName('grid')[0].appendChild(message);
    if (time !== undefined){
      setTimeout(() => {document.getElementsByClassName('message')[0].parentElement.removeChild(document.getElementsByClassName('message')[0])}, time)
    }
}

function endCard (text, answer){
    document.getElementsByClassName('ending')[0].classList.add('visible');
    let heading = document.getElementsByTagName('h2')[0];
    heading.textContent = text;
    if (answer !== undefined){
        document.getElementsByTagName('h3')[0].textContent = `the word was ${answer.join('')}`;
    }
}

//actions for pop-up window's buttons
let newGame = document.getElementsByTagName('button')[0];
newGame.addEventListener('mouseup', () => {location.reload()}, true);

let cross = document.getElementsByClassName('cross');
cross[0].addEventListener('mouseup', () => {document.getElementsByClassName('ending')[0].classList.remove('visible')}, true);
cross[1].addEventListener('mouseup', () => {document.getElementsByClassName('rules')[0].classList.remove('visible')}, true);

let help = document.getElementsByClassName('help')[0];
help.addEventListener('mouseup', () =>  {document.getElementsByClassName('rules')[0].classList.add('visible')}, true);
 
    
}