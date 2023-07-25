import { db,doc, setDoc,uploadBytes , collection, addDoc, auth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from './firebasconfig.js';


var body = document.querySelector("body");
var dateofbirthdate = document.querySelector('#dateofbirthdate');
var dateofbirthmonth = document.querySelector('#dateofbirthmonth');
var dateofbirthyear = document.querySelector('#dateofbirthyear');
var createaccount = document.querySelector(".createaccount");
var modalbody = document.querySelector(".modalbody");
var existsign = document.querySelector(".existsign");
var signupbtn = document.querySelector(".signupbtn");
var iFirstName = document.querySelector(".iFirstName");
var iSurnameName = document.querySelector(".iSurnameName");
var newpasswordsignup = document.querySelector(".newpasswordsignup");
var mobilenumsignup = document.querySelector(".mobilenumsignup");
var femaleradio = document.querySelector("#femaleradio");
var maleradio = document.querySelector("#maleradio");
var emailforlogin = document.querySelector('#emailforlogin')
var passwordforlogin = document.querySelector('#passwordforlogin')
var malebtn = document.querySelector('.malebtn');
var femalebtn = document.querySelector('.femalebtn')
var loginbtn = document.querySelector('.logIn')

let divfordateofbirthdate = "";
let divfordateofbirthmonth = "";
let divfordateofbirthyear = "";
let dateofbirthdatevalue;
let dateofbirthmonthvalue;
let dateofbirthyearvalue;
let gender = "";

const monthS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const users = JSON.parse(localStorage.getItem('users')) || [];

dateofbirthyear.addEventListener('change', function () {
    countdateofbirthyearvalue(this.value);
});

malebtn.addEventListener('click', removecheckfromfemale)
femalebtn.addEventListener('click', removecheckfrommale)

function removecheckfromfemale() {
    maleradio.checked = true;
    femaleradio.checked = false;
    gender = "Male";
}

function removecheckfrommale() {
    femaleradio.checked = true;
    maleradio.checked = false;
    gender = "Female";
}

function countdateofbirthyearvalue(n) {
    dateofbirthyearvalue = n;
}

dateofbirthdate.addEventListener('change', function () {
    countdateofbirthdatevalue(this.value);
});

function countdateofbirthdatevalue(n) {
    dateofbirthdatevalue = n;
}

dateofbirthmonth.addEventListener('change', function () {
    countdateofbirthmonthvalue(this.value);
});

function countdateofbirthmonthvalue(n) {
    dateofbirthmonthvalue = n;
}

// This code is for date of birth date in the signup form.
for (let i = 1; i <= 31; i++) {
    let divofbirth = `<option>${i}</option>`;
    divfordateofbirthdate += divofbirth;
}

dateofbirthdate.innerHTML = divfordateofbirthdate;

// This code is for date of birth month in the signup form.
for (let i = 0; i <= (monthS.length - 1); i++) {
    let divofmonth = `<option>${monthS[i]}</option>`;
    divfordateofbirthmonth += divofmonth;
}

dateofbirthmonth.innerHTML = divfordateofbirthmonth;

// This code is for date of birth year in the signup form.
for (let i = 2023; i >= 1905; i--) {
    let divofyear = `<option>${i}</option>`;
    divfordateofbirthyear += divofyear;
}

dateofbirthyear.innerHTML = divfordateofbirthyear;

createaccount.addEventListener('click', () => {
    modalbody.classList.remove('none');
    body.classList.add('removeoverflow');
});

existsign.addEventListener('click', () => {
    modalbody.classList.add('none');
});

signupbtn.addEventListener('click', () => {
    if (iFirstName.value === "" || iSurnameName.value === "" || newpasswordsignup.value === "" || mobilenumsignup.value === "" || dateofbirthdatevalue === undefined || dateofbirthmonthvalue === undefined || dateofbirthyearvalue === undefined) {
        alert("Please fill the following form completely");
        return false;
    }

    // let istrue;
    users.forEach(function(element) {
        if (element.iFirstName + element.iSurnameName === iFirstName.value + iSurnameName.value) {
           alert('This name is already exist please write another name for your account name')
           return false
        //    istrue = false;
        }

        if(element.mobilenumsignup === mobilenumsignup.value){
            alert("this email is already in use please try from another email")
            return false
            // istrue = false;
        }
    });
    

    // if(istrue === true){

        
        var user = {
        iFirstName: iFirstName.value,
        iSurnameName: iSurnameName.value,
        newpasswordsignup: newpasswordsignup.value,
        mobilenumsignup: mobilenumsignup.value,
        dateofbirthdatevalue: dateofbirthdatevalue,
        dateofbirthmonthvalue: dateofbirthmonthvalue,
        dateofbirthyearvalue: dateofbirthyearvalue,
        gender: gender
    };

    
    gettingsignupemail();
    

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    modalbody.classList.add('none');
    body.classList.remove('removeoverflow');

});

loginbtn.addEventListener('click', login)

function login(){
    signInWithEmailAndPassword(auth, emailforlogin.value, passwordforlogin.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    localStorage.setItem('lOGINUSER', JSON.stringify(user));

    location.href = "./Dashbord/index.html";
    // ...
  })
  .catch((error) => {
    console.log("nahi chala")

  });
}



async function gettinguserdataintofirebase(uniqueid){
    try {
        await setDoc(doc(db, "user", uniqueid), {
            iFirstName: iFirstName.value,
            iSurnameName: iSurnameName.value,
            newpasswordsignup: newpasswordsignup.value,
            mobilenumsignup: mobilenumsignup.value,
            dateofbirthdatevalue: dateofbirthdatevalue,
            dateofbirthmonthvalue: dateofbirthmonthvalue,
            dateofbirthyearvalue: dateofbirthyearvalue,
            gender: gender
        });

        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}

async function gettingsignupemail(){
    createUserWithEmailAndPassword(auth, mobilenumsignup.value, newpasswordsignup.value)
    .then((userCredential) => {

    const user = userCredential.user;
    gettinguserdataintofirebase(user.uid)
    // ...
     })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    // ..
     });
}