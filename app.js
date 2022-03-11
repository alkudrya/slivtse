window.onload = function () {
    
    let activeWord = [];
    let theWord = validWords[Math.floor(Math.random() * validWords.length)].split('');
    
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
    }
    createBoxes();

    //screen keyboard for checking
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
                row.appendChild(key);
            }
            screenKeys[0].appendChild(row);
        }

        createRow(firstRow);
        createRow(secondRow);
        createRow(thirdRow);
    }
    createKeyboard();

    //keyboard input
    let letterCounter = 0;
    let wordCounter = 0;
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
       let correctLetters = 0;
       //checking the word
     for (let i = 0; i < 5 ; i++){
         if (theWord[i] == activeWord[i]){
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[i].classList.add('green');
            //document.getElementById(`${activeWord[i]}`).classList.remove('yellow');
            document.getElementById(`${activeWord[i]}`).classList.add('green');
            correctLetters++;
         } else if (theWord.includes(activeWord[i])){
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[i].classList.add('yellow');
            document.getElementById(`${activeWord[i]}`).classList.add('yellow');
         } else {
            document.getElementById(`${activeWord[i]}`).classList.add('grey');
         }
     }

    //starting new line
    activeWord = [];
    wordCounter ++;
    letterCounter = 0;

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
    document.getElementsByClassName('ending')[0].style.opacity = '1';
    let heading = document.getElementsByTagName('h2')[0];
    heading.textContent = text;
    if (answer !== undefined){
        document.getElementsByTagName('h3')[0].textContent = `the word was ${answer.join('')}`;
    }
}

let newGame = document.getElementsByTagName('button')[0];
newGame.addEventListener('mouseup', () => {location.reload()}, true);

let cross = document.getElementById('cross');
cross.addEventListener('mouseup', () => {document.getElementsByClassName('ending')[0].style.opacity = '0'}, true);
 
    
}