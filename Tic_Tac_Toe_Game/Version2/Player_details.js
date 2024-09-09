let p1_name, p2_name, pc1, pc2, btn2, dm1, dm2;

p1_name = document.getElementById("p1_name");
p2_name = document.getElementById("p2_name");
pc1 = document.getElementById("pc1");
pc2 = document.querySelector("#pc2");
btn2 = document.getElementById("btn2");
dm1 = document.getElementById("dm1");
dm2 = document.getElementById("dm2");

p2_name.disabled = true;
pc1.disabled = true;
pc2.disabled = true;
btn2.disabled = true;


let msg;


p1_name.addEventListener("change", (evt) => {
    p1_name = evt.target.value;
    if (p1_name !== "") {
        if (p1_name.length >= 11) {
            msg = "*Should not exceed 11 characters";
            dm1.innerText = msg;
            dm1.style.display = "flex";
            pc1.disabled = true;
            document.getElementById("p2_name").disabled = true;
            dm2.style.display = "none";
            btn2.disabled = true;
            pc2.disabled = true;
            document.querySelector("#err_sym1").style.display = "none";
            document.querySelector("#err_sym2").style.display = "none";

        }
        else {
            msg = "*Field cannot be empty";
            dm1.innerText = msg;
            dm1.style.display = "none";
            pc1.disabled = false;
            document.getElementById("p2_name").disabled = false;

            if (document.getElementById("p2_name").value === "") {
                dm2.style.display = "flex";
            }
        }
    }
    else {
        dm1.style.display = "flex";
        msg = "*Field cannot be empty";
        dm1.innerText = msg;
        pc1.disabled = true;
        document.getElementById("p2_name").disabled = true;
        dm2.style.display = "none";
        btn2.disabled = true;
        pc2.disabled = true;
        document.querySelector("#err_sym1").style.display = "none";
        document.querySelector("#err_sym2").style.display = "none";
    }
});



p2_name.addEventListener("change", (evt) => {
    p2_name = evt.target.value;

    if (p2_name !== "") {

        if (p2_name.length >= 11) {
            msg = "*Should not exceed 11 characters";
            dm2.innerText = msg;
            dm2.style.display = "flex";
            pc2.disabled = true;
            btn2.disabled = true;

            document.querySelector("#err_sym1").style.display = "none";
            document.querySelector("#err_sym2").style.display = "none";

        }
        else {
            dm2.style.display = "flex";
            msg = "*Field cannot be empty";
            dm2.innerText = msg;
            pc2.disabled = false;
            btn2.disabled = false;
            dm2.style.display = "none";
        }
    }
    else {
        dm2.style.display = "flex";
        msg = "*Field cannot be empty";
        dm2.innerText = msg;
        btn2.disabled = true;
        pc2.disabled = true;
        dm2.style.display = "flex";
        document.querySelector("#err_sym1").style.display = "none";
        document.querySelector("#err_sym2").style.display = "none";
    }
});


function start() {
    let op1 = document.querySelector("#pc1").value;
    let op2 = document.querySelector("#pc2").value;

    if (op1 === op2) {
        document.querySelector("#err_sym1").style.display = "flex";
        document.querySelector("#err_sym2").style.display = "flex";
    }
    else {
        document.querySelector("#err_sym1").style.display = "none";
        document.querySelector("#err_sym2").style.display = "none";
    }

    console.log(op1, op2);
}
