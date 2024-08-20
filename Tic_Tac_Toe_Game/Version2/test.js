// Proceed 

// function proceed()
// {   
//     // Details
//     let details_div = document.createElement("div");
//     details_div.setAttribute("class", "details");

//     // Heading
//     let h3 = document.createElement("h3");
//     h3.innerText = "Player's Details";

//     // Player's Details
//     let p_details_div = document.createElement("div");
//     p_details_div.setAttribute("class", "p_details");

//     for(let i=1;i<=2;i++)
//     {
//         let p = document.createElement("p");
//         p.innerHTML = `<p id="p${i}">PLAYER ${i}: <input placeholder="Enter your Name" id="p${i}_name"></p>`;
//         p_details_div.append(p);
//     }

//     // Creating Start Button
//     let btn_div = document.createElement("div");
//     btn_div.setAttribute("class", "btn");

//     let b = document.createElement("button");
//     b.setAttribute("id", "btn2");
//     b.setAttribute("onclick", "start_button()");
//     b.setAttribute("title", "One Time Clickable");
//     b.innerText = "Start Game";

//     btn_div.append(b);

//     // Appending all elements into details div
//     details_div.append(h3);
//     details_div.append(p_details_div);
//     details_div.append(btn_div);


//     // appending into body
//     let body = document.querySelector("body");
//     body.append(details_div);


//     // Allowing button to be clicked once 
//     let disable_proceed = document.querySelector("#btn1");
//     disable_proceed.disabled = true; 
// }


// Proceed Button
function proceed() {
    let details_div = document.getElementById("details");
    details_div.style.display = "block";
    console.log("sd");

    // Allowing button to be clicked once 
    let disable_proceed = document.querySelector("#btn1");
    disable_proceed.disabled = true;
}


//Start Button
function start_button() {
    let player1_name = document.querySelector("#p1_name").value;
    let player2_name = document.querySelector("#p2_name").value;

    let p1_choice = document.getElementById("pc1").value;
    let p2_choice = document.getElementById("pc2").value;


    let status = check_symbols(p1_choice, p2_choice, player1_name, player2_name);


    console.log("P1", player1_name, p1_choice);
    console.log("P2", player2_name, p2_choice);

    // Enabling start button if error is generated.
    if (status === 1) {
        document.querySelector("#btn2").disabled = false;
        return;
    }
    else {
        document.querySelector("#btn2").disabled = true;
    }


    // disabling inputs of the users after starting the game
    document.getElementById('p1_name').disabled = true;
    document.getElementById('pc1').disabled = true;
    document.getElementById('p2_name').disabled = true;
    document.getElementById('pc2').disabled = true;



    //adding turns div upon start_button
    document.getElementById("turns").style.display = "flex";
    document.getElementById("turns").classList.add("#turns");
    document.querySelector(".Container").classList.add(".Container");
    let name;

    for (let i = 1; i <= 2; i++) {
        if (i === 1)
            name = player1_name;
        else
            name = player2_name;

        document.querySelector(`#pp${i}`).innerText = name;
        // p_turn = document.createElement("div");
        // p_turn.setAttribute("id", `p${i}_turn`);
        // p_turn.setAttribute("class", "p_turn");


        // let pt_turn = document.createElement("p");
        // pt_turn.innerHTML = `<p>${name}</p>`;


        // p_turn.append(pt_turn);
        // document.querySelector("#turns").append(p_turn);


        // Setting symbols
        player_symbol1(p1_choice, i - 1);
        player_symbol2(p2_choice, i);
    }
    Game();
}






function check_symbols(p1_choice, p2_choice, p1_name, p2_name) {
    if (p1_name === "" || p2_name === "") {
        // if (p1_name === "")
        //     alert("Player 1 name is Blank, field cannot be blank");
        // if (p2_name === "")
        //     alert("Player 2 name is Blank, field cannot be blank");
        return 1;
    }

    if (p1_choice === p2_choice) {
        // alert("Players cannot have same Symbols, please change.");
        return 1;
    }
}

// player1 gets symbol at flag = 0 
function player_symbol1(p1_choice, flag) {
    let p1_turn;
    let symbol = document.createElement("i");
    symbol.setAttribute("class", "symbol");

    if (p1_choice === "X" && flag === 0) {
        symbol.classList.add("fas", "fa-times");
        p1_turn = document.getElementById("p1_turn");
        // console.log(p1_turn);
        p1_turn.style.border = "2px solid green";
        p1_turn.append(symbol);
    }

    else if (p1_choice === "O" && flag === 0) {
        symbol.classList.add("far", "fa-circle");
        p1_turn = document.getElementById("p1_turn");
        p1_turn.style.border = "2px solid red";
        p1_turn.append(symbol);
    }
}



// player1 gets symbol at flag = 2
function player_symbol2(p2_choice, flag) {
    let p2_turn;
    let symbol = document.createElement("i");
    symbol.setAttribute("class", "symbol");

    if (p2_choice === "X" && flag === 2) {
        symbol.classList.add("fas", "fa-times");
        p2_turn = document.getElementById("p2_turn");
        p2_turn.style.border = "2px solid green";
        p2_turn.append(symbol);
    }

    else if (p2_choice === "O" && flag === 2) {
        symbol.classList.add("far", "fa-circle");
        p2_turn = document.getElementById("p2_turn");
        p2_turn.style.border = "2px solid red";
        p2_turn.append(symbol);
    }
}

// Event Listener for putting symbols for game 1
let evt_lis = (event) => {
    let clicked_id = event.target.id;
    put_symbol(clicked_id);
};




// Start of Game
let c = 1;
function Game() {
    let d1, p;

    for (let i = 1; i <= 9; i++) {

        d1 = document.createElement("div");
        d1.setAttribute("id", `d${i}`);
        d1.setAttribute("class", "divs");

        p = document.createElement("p");
        p.setAttribute("id", `r${i}`);
        p.innerText = "";
        p.style.display = "none";

        d1.append(p);

        // event listener
        d1.addEventListener("click", evt_lis);

        document.querySelector(".d").append(d1);
    }
}


function Again_Game() {
    let d1, p;

    for (let i = 1; i <= 9; i++) {

        d1 = document.createElement("div");
        d1.setAttribute("id", `d${i}`);
        d1.setAttribute("class", "divs");

        p = document.createElement("p");
        p.setAttribute("id", `r${i}`);
        p.innerText = "";
        p.style.display = "none";

        d1.append(p);

        // event listener
        d1.addEventListener("click", evt_lis1);

        document.querySelector(".d").append(d1);
    }
}

// Highlighting turns
function highlight_turns() {
    let p1_choice = document.getElementById("pc1").value;
    let p2_choice = document.getElementById("pc2").value;

    if (p1_choice === "X" && p2_choice === "O" && (c % 2 === 1)) {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }

    if (p1_choice === "X" && p2_choice === "O" && (c % 2 === 0)) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }

    if (p2_choice === "X" && p1_choice === "O" && (c % 2 === 1)) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }
    if (p2_choice === "X" && p1_choice === "O" && (c % 2 === 0)) {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }
}


// Highlighting turns
function highlight_turnsO() {
    let p1_choice = document.getElementById("pc1").value;
    let p2_choice = document.getElementById("pc2").value;

    if ((p1_choice === "X" && p2_choice === "O") && (c % 2 === 1)) {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }

    if ((p1_choice === "X" && p2_choice === "O") && (c % 2 === 0)) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }

    if ((p2_choice === "X" && p1_choice === "O") && (c % 2 === 1)) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }
    if ((p2_choice === "X" && p1_choice === "O") && (c % 2 === 0)) {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }
}


// Highlighting symbols for game 2
function highlight_turns2(f) {
    if (f === 1) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }
    else {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }
}


let collect_symbol;
// Game 1
function put_symbol(get_div) {

    let X, gd, p1;

    // this condition does not overlap symbols
    if (get_div && (c % 2 == 1)) {
        console.log("X");

        // collect_symbol = "x";
        // highlighting the player
        highlight_turns();

        X = document.createElement("i");
        X.classList.add("fas", "fa-times");
        X.style.color = "darkblue";
        X.style.fontSize = "100px";
        X.style.paddingLeft = "10px";
        gd = document.querySelector(`#${get_div}`);
        gd.append(X);


        p1 = document.querySelector(`#${get_div} p`);
        p1.innerText = "x";



        winning_status(get_div, c, "x");

        // count
        c++;
        console.log("c=", c);
    }

    else {
        console.log("O");

        // collect_symbol = "o";
        // highlighting the player
        highlight_turns();


        X = document.createElement("i");
        X.classList.add("far", "fa-circle");
        X.classList.add("large", "icon");
        gd = document.querySelector(`#${get_div}`);
        gd.append(X);


        p1 = document.querySelector(`#${get_div} p`);
        p1.innerText = "o";


        winning_status(get_div, c, "o");

        c++;
        console.log("c=", c);
    }
    document.getElementById(`${get_div}`).removeEventListener("click", evt_lis);
}


function winning_status(get_div, c, winner_symbol) {

    // Accessing all data
    let a1, a2, a3, a4, a5, a6, a7, a8, a9;
    let w = 0;

    a1 = document.querySelector("#r1").innerText;
    a2 = document.querySelector("#r2").innerText;
    a3 = document.querySelector("#r3").innerText;
    a4 = document.querySelector("#r4").innerText;
    a5 = document.querySelector("#r5").innerText;
    a6 = document.querySelector("#r6").innerText;
    a7 = document.querySelector("#r7").innerText;
    a8 = document.querySelector("#r8").innerText;
    a9 = document.querySelector("#r9").innerText;


    collect_symbol = winner_symbol;
    console.log("After 1 st game", collect_symbol);

    // HORIZONTAL
    if ((a1 == "x" && a2 == "x" && a3 == "x") || (a1 == "o" && a2 == "o" && a3 == "o"))
        w = 1;
    if ((a4 == "x" && a5 == "x" && a6 == "x") || (a4 == "o" && a5 == "o" && a6 == "o"))
        w = 1;
    if ((a7 == "x" && a8 == "x" && a9 == "x") || (a7 == "o" && a8 == "o" && a9 == "o"))
        w = 1;


    // VERTICAL
    if ((a1 == "x" && a4 == "x" && a7 == "x") || (a1 == "o" && a4 == "o" && a7 == "o"))
        w = 1;
    if ((a2 == "x" && a5 == "x" && a8 == "x") || (a2 == "o" && a5 == "o" && a8 == "o"))
        w = 1;
    if ((a3 == "x" && a6 == "x" && a9 == "x") || (a3 == "o" && a6 == "o" && a9 == "o"))
        w = 1;


    // DIAGONAL
    if ((a1 == "x" && a5 == "x" && a9 == "x") || (a1 == "o" && a5 == "o" && a9 == "o"))
        w = 1;
    if ((a3 == "x" && a5 == "x" && a7 == "x") || (a3 == "o" && a5 == "o" && a7 == "o"))
        w = 1;



    if (w === 1) {
        let a = document.querySelector(`#${get_div} p`).innerText;

        // Removing Event Listener after winning
        remove_event_listener(evt_lis);
        display_result(a);
    }

    else if (c === 9) {
        remove_event_listener(evt_lis);
        display_result("-");
    }
}



function play_again_winning_status(get_div, c, winner_symbol) {

    // Accessing all data
    let a1, a2, a3, a4, a5, a6, a7, a8, a9;
    let w = 0;

    a1 = document.querySelector("#r1").innerText;
    a2 = document.querySelector("#r2").innerText;
    a3 = document.querySelector("#r3").innerText;
    a4 = document.querySelector("#r4").innerText;
    a5 = document.querySelector("#r5").innerText;
    a6 = document.querySelector("#r6").innerText;
    a7 = document.querySelector("#r7").innerText;
    a8 = document.querySelector("#r8").innerText;
    a9 = document.querySelector("#r9").innerText;


    if (collect_symbol === "x")
        collect_symbol = "o";
    else
        collect_symbol = "x";

    // HORIZONTAL
    if ((a1 == "x" && a2 == "x" && a3 == "x") || (a1 == "o" && a2 == "o" && a3 == "o"))
        w = 1;
    if ((a4 == "x" && a5 == "x" && a6 == "x") || (a4 == "o" && a5 == "o" && a6 == "o"))
        w = 1;
    if ((a7 == "x" && a8 == "x" && a9 == "x") || (a7 == "o" && a8 == "o" && a9 == "o"))
        w = 1;


    // VERTICAL
    if ((a1 == "x" && a4 == "x" && a7 == "x") || (a1 == "o" && a4 == "o" && a7 == "o"))
        w = 1;
    if ((a2 == "x" && a5 == "x" && a8 == "x") || (a2 == "o" && a5 == "o" && a8 == "o"))
        w = 1;
    if ((a3 == "x" && a6 == "x" && a9 == "x") || (a3 == "o" && a6 == "o" && a9 == "o"))
        w = 1;


    // DIAGONAL
    if ((a1 == "x" && a5 == "x" && a9 == "x") || (a1 == "o" && a5 == "o" && a9 == "o"))
        w = 1;
    if ((a3 == "x" && a5 == "x" && a7 == "x") || (a3 == "o" && a5 == "o" && a7 == "o"))
        w = 1;



    if (w === 1) {
        let a = document.querySelector(`#${get_div} p`).innerText;

        // Removing Event Listener after winning
        remove_event_listener(evt_lis1);
        display_result(a);

        // condition to alternate synmbols in play_again.
        if (collect_symbol === "o")
            collect_symbol = "x";
        else
            collect_symbol = "o";
    }

    else if (c === 9) {
        console.log("Draw caa");
        remove_event_listener(evt_lis1);
        display_result("-");

    }
}


//  Displaying Result
function display_result(sym) {

    let msg;
    let f;
    let player1_name = document.querySelector("#p1_name").value;
    let player2_name = document.querySelector("#p2_name").value;

    console.log(player1_name, player2_name)

    let p1_choice = document.getElementById("pc1").value;
    let p2_choice = document.getElementById("pc2").value;


    if (sym === "x" && p1_choice === "X") {
        msg = `Congratulations ${player1_name}, You Won!!`;
        f = 1;
    }

    if (sym === "o" && p1_choice === "O") {
        msg = `Congratulations ${player1_name}, You Won!!`;
        f = 1;
    }

    if (sym === "o" && p2_choice === "O") {
        msg = `Congratulations ${player2_name}, You Won!!`;
        f = 0;
    }

    if (sym === "x" && p2_choice === "X") {
        msg = `Congratulations ${player2_name}, You Won!!`;
        f = 0;
    }

    if (sym === "-") {
        msg = "Game is drawn, Well Played!";
        f = 1;
    }

    let result_p = document.querySelector("#disp_result");
    result_p.innerText = msg;


    // highlighting
    highlight_turns2(f);



    // RESULT SECTION
    document.querySelector(".result").style.display = "flex";

    // FINISH SECTION
    document.getElementById("PAF").style.display = "flex";

    document.querySelector(".finish_again_section").style.display = "flex";
    document.getElementById("btn3").style.display = "flex";
    document.getElementById("btn4").style.display = "flex";

}


// removes event Listener
function remove_event_listener(evt) {
    for (let i = 1; i <= 9; i++) {
        let d1 = document.querySelector(`#d${i}`);
        d1.removeEventListener("click", evt);
    }
}



// Game Ends message
const finish_btn = document.getElementById("btn4");
finish_btn.addEventListener('click', () => {
    game_ends = document.querySelector(".game_ends");
    game_ends.style.display = "flex";
    game_ends.disabled = true;

    document.querySelector("#btn3").disabled = true;

});


function play_again() {
    document.querySelector(".result").style.display = "none";
    document.querySelector("#PAF").style.display = "none";
    document.querySelector(".finish_again_section").style.display = "none";
    document.getElementById("btn3").style.display = "none";
    document.getElementById("btn4").style.display = "none";
    document.querySelector(".game_ends").style.display = "none";

    Game_2();
    c = 0;
    Again_Game();
}






// PLAY AGAIN 
const play_again_btn = document.querySelector("#btn3");
play_again_btn.addEventListener('click', () => {
    play_again();
});





// Highlighting symbols for game 2
function highlight_turns2(f) {
    if (f === 1) {
        document.getElementById("p2_turn").style.border = " 2px solid red";
        document.getElementById("p1_turn").style.border = " 2px solid green";
    }
    else {
        document.getElementById("p1_turn").style.border = " 2px solid red";
        document.getElementById("p2_turn").style.border = " 2px solid green";
    }
}



// Game 2 onwards
function put_symbol2(get_div, collect_symbol) {

    let X, gd, p1;

    console.log("col", collect_symbol);
    // this condition does not overlap symbols
    if (get_div && collect_symbol === "x") {
        console.log("X");

        // collect_symbol = "o";

        console.log("col inside x ", collect_symbol);
        // highlighting the player
        highlight_turnsO();

        X = document.createElement("i");
        X.classList.add("fas", "fa-times");
        X.style.color = "darkblue";
        X.style.fontSize = "100px";
        X.style.paddingLeft = "10px";
        gd = document.querySelector(`#${get_div}`);
        gd.append(X);


        p1 = document.querySelector(`#${get_div} p`);
        p1.innerText = "x";


        // count
        c++;

        play_again_winning_status(get_div, c, collect_symbol);

        
        console.log("c=", c);
    }

    else {
        console.log("O");

        // collect_symbol = "o";

        console.log("col inside o", collect_symbol);
        // highlighting the player
        highlight_turnsO();


        X = document.createElement("i");
        X.classList.add("far", "fa-circle");
        X.classList.add("large", "icon");
        gd = document.querySelector(`#${get_div}`);
        gd.append(X);


        p1 = document.querySelector(`#${get_div} p`);
        p1.innerText = "o";

        c++;
        play_again_winning_status(get_div, c, collect_symbol);
        
        console.log("c=", c);
    }
    document.getElementById(`${get_div}`).removeEventListener("click", evt_lis1);
}

// Event Listener for game 2
let evt_lis1 = (event) => {
    let clicked_id = event.target.id;
    console.log("COLLL", collect_symbol);
    put_symbol2(clicked_id, collect_symbol);
};


// removing 9 divs for setting game 2
function Game_2() {
    let d1;
    for (let i = 0; i < 9; i++) {
        d1 = document.getElementById(`d${i + 1}`);
        d1.remove();
    }
}
