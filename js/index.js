let numMosse = 0;
let storicoMosse = 0;

window.onload = async function (){
    let max = await fetch("server/getMaxSequenze.php", {method : 'GET'});
    let n = await max.json();

    let nRandom = Math.floor(Math.random() * n.sequenze[0]["MAX(codSeq)"]) +1;
    let bustaImmagini = await fetch("server/getSequenza.php", {
        method : 'POST',
        body : JSON.stringify({numero:nRandom})
    });
    let immagini = await bustaImmagini.json();

    let arrImmagini = [];
    arrImmagini.push(immagini["sequenze"][0].img1);
    arrImmagini.push(immagini["sequenze"][0].img2);
    arrImmagini.push(immagini["sequenze"][0].img3);

    let immaginiXhtml = shuffle(arrImmagini);

    let HTMLimages = document.getElementsByClassName("img");
    HTMLimages[0].setAttribute("src", immaginiXhtml[0]);
    HTMLimages[2].setAttribute("src", immaginiXhtml[1]);
    HTMLimages[3].setAttribute("src", immaginiXhtml[2]);

    let mosse = document.getElementById("mosse");
    for(let element of HTMLimages){
        element.addEventListener("click", ()=>{
            let blank = document.querySelector(".blank");
            let src = element.getAttribute("src");
            blank.setAttribute("src", src);
            blank.classList.remove("blank");
            blank.classList.add("notBlank");
            element.classList.add("blank");
            element.classList.remove("notBlank");
            element.setAttribute("src", "");
            numMosse++;
            storicoMosse++;
            mosse.innerHTML = storicoMosse;
            HTMLimages = [];
            HTMLimages.push(document.querySelector(".notBlank")[0]);
            
            console.log(HTMLimages);
            if(numMosse > 3){
                alert("Hai Perso, cambio Puzzle...");
                numMosse = 0;
            }
        });
    }
    alert("puzzle caricato !!!");

}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


/*
    PER TUTTE LE PAGINE:
    1.1) Gestire l'aside come menù in maniera corretta, evidenziando la pagina 
        attualmente visualizzata
    1.2) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA
    2) Caricare il puzzle: immagini e titolo prendendone uno a caso da quelli sul db
        Le immagini su db sono ordinate, quindi è NECESSARIO disordinarle. 
        PUNTI: 2

        FATTO

    3) Cercare di presentare sempre puzzle diversi 
        (quando sono stati tutti presentati avvertire l'utente)
        PUNTI: 0.5

        FATTO

    4.1)  Una mossa è definita da un click su una delle immagini,
        effettuato un click l'immagine selezionata viene spostata nella cella vuota
        (il click sulla cella vuota non ha conseguenze)
        PUNTI: 1.5

        FATTO
        
    4.2) Cambiare puzzle dopo tre mosse o quando si è indovinata la sequenza


    5.1) Gestire il tempo di risoluzione, il numero di sequenze/puzzle risolvi,
        il numero di mosse effettuate
        PUNTI: 2.5

*/


