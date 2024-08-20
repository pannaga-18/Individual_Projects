// Accessing countryList from code.js by importing
import { countryList } from "./codes.js";
// import { exchangeRates } from "./exchange_rates.js";
// const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const base_URL1 = "https://v6.exchangerate-api.com/v6/f91ba2eb980ca62fce682dda/latest/USD";


// initializing select from countrylist
function get_select(c, i) {

    let sel_con = document.querySelector(".select-container" + i);

    let s = document.createElement("select");
    s.setAttribute("name", c);
    s.setAttribute("id", c);
    s.setAttribute("class", "components");

    for (let code in countryList) {
        let op = document.createElement("option");
        op.setAttribute("value", `${code}`);
        op.innerText = `${code}`;

        // USD as default in from section
        if (c === "from") {
            op.innerText = "USD";
            op.selected = "USD";
            s.append(op);
            break;
        }

        // SELECTED WORKS FOR SELECT BUT NOT FOR DATALIST (default option).
        if (c === "to" && code === "INR") {
            op.selected = code;
        }
        s.append(op);
    }
    sel_con.append(s);
}

// Setting up from to divs with country codes as its select options
get_select("from", 1);
get_select("to", 2);

// PROCESS EXPLANATION


{/* selecting the select-container 1 and select-container 2
    creating element input with attributes list, id and appending into select-container div 
    
    input should have list attribute.

    *****creating element DATALIST WITH ATTRIBUTE ID EQUAL TO LIST NAME OF THE INPUT*****

    creating element option which will be appended into datalist.

    at the end datalist will be appended into select-container 1 and 2 respectively.
*/}



// select entries with country codes using (DATALIST)

// function get_select(c, i) {

//     let sel_con = document.querySelector(".select-container"+i);


//     let inp = document.createElement("input");
//     inp.setAttribute("list", c);
//     inp.setAttribute("id", `${c}_country_code`);
//     inp.setAttribute("placeholder", "select country code..");   


//     sel_con.append(inp);

//     let s = document.createElement("datalist");
//     s.setAttribute("id", c);

//     for (let code in countryList) {
//         let op = document.createElement("option");
//         op.setAttribute("value", `${code}`);
//         s.append(op);
//     }
//     sel_con.append(s);
// }


// UPDATES FLAG ON EVENT CHANGE
function update_flag(id, selected_code) {
    let add_img = document.getElementById(id);
    add_img.setAttribute("src", `https://flagsapi.com/${countryList[selected_code]}/shiny/64.png`);
    console.log(selected_code);
    console.log(countryList[selected_code]);
}




{// EVENT LISTENER FOR DATALIST
    // document.getElementById("from_country_code").addEventListener("change", function(event) {
    //     const selected_code = event.target.value;
    //     update_flag("from_img", selected_code);
    // });

    // document.getElementById("to_country_code").addEventListener("change", function(event) {
    //     const selected_code = event.target.value;
    //     update_flag("to_img", selected_code);
    // });
}




//EVENT LISTENER FOR SELECT OPTION TO UPDATE THE FLAG.

// document.getElementById("from").addEventListener("change", function(event) {
//    const selected_code = event.target.value;
//     update_flag("from_img", selected_code);
// });

document.getElementById("to").addEventListener("change", function (event) {
    const selected_code = event.target.value;
    update_flag("to_img", selected_code);
});





// Initial Loading with default message
window.addEventListener("load", () => {
    update_Exchange_Rates();
});





// EVENT LISTENER FOR BUTTON
// ACCESSING BUTTON, FROM, TO
let btn = document.querySelector("button");

const from_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");
console.log("FROM", from_curr.value);


btn.addEventListener("click", function (event) {
    event.preventDefault();

    update_Exchange_Rates();
});


async function update_Exchange_Rates() {
    // INPUT AMOUNT
    let amount = document.querySelector("#amt");
    let amt = amount.value;


    // ERROR HANDLING 
    let status = check_cases(amt);
    if (status === 0)
        return;
    

    else {

        // FETCHING API
        // const URL = `${base_URL}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
        const URL1 = "https://v6.exchangerate-api.com/v6/f91ba2eb980ca62fce682dda/latest/USD";
        let response = await fetch(URL1);
        let data = await response.json();
        console.log(data);

        console.log(data['conversion_rates']);

        console.log(to_curr.value);


        // Calculating by accessing the rates
        //Here rate has the country code, if it is equal to "to-country code", then calculate amt_val

        let amt_val;
        for (let rate in data['conversion_rates']) {
            if (to_curr.value === rate) {
                amt_val = Number(amt) * Number(data['conversion_rates'][rate]);
                break;
            }
        }

        //UPDATING THE FINAL MESSAGE
        let update_mes = document.querySelector("form #message");
        update_mes.innerText = `${amt} USD = ${amt_val} ${to_curr.value}`;
    }
}

function check_cases(amt) {

    if (Number(amt) < 0) {
        alert("Amount should not be Negative.");
        return 0;
    }

    if (amt == "") {
        alert("Amount should not be Blank.");
        return 0;
    }

    if ((amt >= 'a' && amt <= "z") || (amt >= 'A' && amt <= 'Z')) {
        alert("Amount should not contain Alphabets.");
        return 0;
    }
}









