const comp_choice_gen = () =>
{
    const a = ["rock", "paper", "scissors"];
    const comp_choice = a[Math.floor(Math.random() * a.length)];
    return comp_choice;
}
    


let u_c = c_c = 0;
function result(s) {

    
    let user_choice = s;
    const comp_choice = comp_choice_gen();

    console.log(user_choice, comp_choice);


    let r1 = document.querySelector(".disp_result");
    let result_div = document.querySelector(".result");
    
    console.log(r1.innerText);


    // User winning scenario
    if ((user_choice == "rock" && comp_choice == "scissors") || (user_choice == "scissors" && comp_choice == "paper") || (user_choice == "paper" && comp_choice == "rock"))
    {
        u_c = ++u_c;
        
        let c = document.getElementById("user_score");
        c.innerText = u_c;
        
        r1.innerText = `You won! ${user_choice} beats ${comp_choice}`;
       
        
        result_div.classList.add("class", "user_background");
        result_div.classList.remove("class", "comp_background");
                
        console.log("user", u_c);
    }


    // Draw case
    else if (user_choice == comp_choice) 
    {
        r1.innerText = "It was a Draw";
        result_div.classList.remove("class", "comp_background");
        result_div.classList.remove("class", "user_background");
    }
    

    // Computer winning scenario
    else 
    {
        if((user_choice == "rock" && comp_choice == "paper") || (user_choice == "scissors" && comp_choice == "rock") || (user_choice == "paper" && comp_choice == "scissors"))
        {
            c_c = ++c_c;
            
            c = document.getElementById("comp_score");
            c.innerText = c_c;
            
            r1.innerText = `You lost! ${comp_choice} beats ${user_choice}`;
            
            // result_div.setAttribute("class", "comp_background");
            
            result_div.classList.add("class", "comp_background");
            result_div.classList.remove("class", "user_background");

            console.log("comp", c_c);
        }
    }
}