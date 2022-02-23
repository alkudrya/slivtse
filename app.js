window.onload = function () {
    

    let field = document.getElementsByClassName('grid');
    let activeWord = [];

    let theWord = validWords[Math.floor(Math.random() * validWords.length)];
    
    function createBoxes () {
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

    let letterCounter = 0;
    let wordCounter = 0;
    window.addEventListener("keyup", function(event) {
        if (event.key == 'Enter' && activeWord.length == 5) {
            letterCounter = 0;
            checkWord();
            activeWord = [];
            wordCounter ++;
        } else if ( event.key == 'Backspace'){
            activeWord.pop();
            letterCounter --;
            let element = document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter];
            element.removeChild(element.firstChild);
            
            
        } else if (letterCounter === 5) {
            return;
        } else {
            const p = document.createElement("p");
            p.textContent = `${event.key}`.toUpperCase();
            document.getElementsByClassName('guess')[wordCounter].getElementsByClassName("letter")[letterCounter].appendChild(p);
            activeWord.push(`${event.key}`);
            letterCounter ++;
        }
        
        
      }, true);



   function checkWord () {
     
   }


    createBoxes();
}