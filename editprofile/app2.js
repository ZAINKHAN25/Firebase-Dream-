const dateofbirthdate = document.querySelector('#dateofbirthdate');
const dateofbirthyear = document.querySelector('#dateofbirthyear');
var dateofbirthmonth = document.querySelector('#dateofbirthmonth');
var gender = document.querySelector('#gender');
let divfordateofbirthmonth = "";
let divforgender = '';
const monthS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const genderS  =["Male","Female"]

dateofbirthdate.addEventListener('keyup',(e)=>{
    if(dateofbirthdate.value > 31 || dateofbirthdate.value < 1){
        alert('Please write words between 1 to 31');
        dateofbirthdate.value = 1;
    }
})

dateofbirthyear.addEventListener('keyup',(e)=>{
    if(dateofbirthyear.value > 2023){
        alert('Please write words less than 2023');
        dateofbirthyear.value = 2008;
    }
});

for (let i = 0; i <= (monthS.length - 1); i++) {
    let divofmonth = `<option>${monthS[i]}</option>`;
    divfordateofbirthmonth += divofmonth; 
}
dateofbirthmonth.innerHTML = divfordateofbirthmonth;
for (let i = 0; i <= (genderS.length - 1); i++) {
    let divofgender = `<option>${genderS[i]}</option>`;
    divforgender += divofgender; 
}

gender.innerHTML = divforgender;