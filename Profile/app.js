import { db, auth, collection, updateDoc, addDoc, onAuthStateChanged, signOut, getDoc, getDocs, deleteDoc, serverTimestamp,orderBy,query } from "../firebasconfig.js";

import { doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

var body = document.querySelector('body');
var modalbody = document.querySelector('.modalbody');
var modaltwoboy = document.querySelector('.modaltwoboy');
var modalbodyofedit = document.querySelector('.modalbodyofedit')
var modalofedit = document.querySelector('.modalofedit')
let uidofedit;
let isLoggedInUser;


const thecurrentuserisloggedin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      displayUserInfo(uid);
      loginuserpersonpicfoo(uid)
      isLoggedInUser = user;
    } else {
      location.href = '../index.html';
    }
  });
};

async function loginuserpersonpicfoo(uniqueid) {
  var loginpersonpics = document.querySelectorAll('.loginpersonpic');

  const docRef = doc(db, "user", uniqueid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    var userData = docSnap.data();
    var profilePicSrc = userData.profilepic ? userData.profilepic : "https://firebasestorage.googleapis.com/v0/b/social-media-app-7593f.appspot.com/o/images%2Favatar.png?alt=media&token=eb081e88-6772-4d92-85a5-a623b4671927";

    loginpersonpics.forEach((element) => {
      element.src = profilePicSrc;
    });
  } else {
    // User data doesn't exist or couldn't be retrieved
    // Set default avatar for all elements with class loginpersonpic
    var defaultAvatarSrc = "https://firebasestorage.googleapis.com/v0/b/social-media-app-7593f.appspot.com/o/images%2Favatar.png?alt=media&token=eb081e88-6772-4d92-85a5-a623b4671927";
    loginpersonpics.forEach((element) => {
      element.src = defaultAvatarSrc;
    });
  }
}

thecurrentuserisloggedin();

document.getElementById('nikalnahhai').addEventListener('click', function () {
  var postInputBox = document.getElementById('postInputBox');
  postInputBox.focus();
});

async function displayUserInfo(user) {
  const docRef = doc(db, "user", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    var { iFirstName, iSurnameName, email, mobilenumsignup, gender, description } = docSnap.data();

    document.getElementById("userName").textContent = iFirstName + ' ' + iSurnameName;
    document.getElementById("emailAddress").textContent = email;
    document.getElementById("mobNum").textContent = mobilenumsignup;
    document.getElementById("gender").textContent = gender;
    document.getElementById("description").textContent = description || "No Description Added";
  } else {
    console.error("No such document!");
  }
}

var no2pagalhaiyebutton = document.querySelector('.no2pagalhaiyebutton');
no2pagalhaiyebutton.addEventListener('click', postHandler);

async function postHandler() {
  const nikalnahhai = document.querySelector('#nikalnahhai');
  const postInput = document.getElementById("postInputBox");
  const postContent = postInput.value;

  nikalnahhai.focuses = postContent.focuses;

  if (postContent.trim() !== "") {

    const docRef = doc(db, "user", await thecurrentusertwoisloggedin());
    const docSnap = await getDoc(docRef);
    const uniqueid = await thecurrentusertwoisloggedin();
    if (docSnap.exists()) {
      const { iFirstName, iSurnameName, mobilenumsignup } = docSnap.data();
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          content: postContent,
          email: mobilenumsignup,
          userNameu: iFirstName + " " + iSurnameName,
          description: "No description Added",
          timestamp: serverTimestamp(),
          uniqueid: uniqueid
        });
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    } else {
      console.error("Something went wrong");
    }


    await displayPosts();

    postInput.value = "";
    body.classList.remove('overflowhidden');
    modalbody.classList.add('none');
  }
}



var logoutbtn = document.querySelector('.logoutbtn');
logoutbtn.addEventListener("click", logout);

function logout() {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("LOGINUSER");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error(error);
    });
}

var navbarScrollingDropdowntag = document.querySelector('.navbarScrollingDropdowntag');

navbarScrollingDropdowntag.addEventListener('click', navbarScrollingDropdown);

function navbarScrollingDropdown() {
  var dropdownItems = document.querySelectorAll('.dropdown-item');
  var dropdownkeclickperanewalelist = document.querySelectorAll('.dropdownkeclickperanewalelist');

  dropdownItems.forEach(function (item) {
    item.classList.toggle("none");
  });

  dropdownkeclickperanewalelist.forEach(function (item) {
    item.classList.toggle('removeborderandbackground');
  });
}

var no1pagalhaiyebutton = document.querySelector('.no1pagalhaiyebutton');
no1pagalhaiyebutton.addEventListener('click', removemodalfoo);

function removemodalfoo() {
  modalbody.classList.add('none');
  body.classList.remove('overflowhidden');
}

var openmodalofpostimgbtn = document.querySelector('.openmodalofpostimgbtn');
openmodalofpostimgbtn.addEventListener('click', openmodalfoo);

async function openmodalfoo() {
  try {
    var modalbody = document.querySelector('.modalbody');
    var userName = document.querySelector('.infonamemodal h2');
    var userMobNum = document.querySelector('.infonamemodal p');

    const docRef = doc(db, "user", await thecurrentusertwoisloggedin());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { iFirstName, iSurnameName, mobilenumsignup } = docSnap.data();
      userName.textContent = iFirstName + " " + iSurnameName;
      userMobNum.textContent = mobilenumsignup;
    } else {
      console.error("Something went wrong");
    }

    body.classList.add('overflowhidden');
    modalbody.classList.remove('none');
  } catch (error) {
    console.error(error);
  }

}

var oipensecondmodalbtn = document.querySelector(".oipensecondmodalbtn");
oipensecondmodalbtn.addEventListener('click', opensecondmodalfoo);

function opensecondmodalfoo() {
  var modaltwoboy = document.querySelector('.modaltwoboy');

  body.classList.add('overflowhidden');
  modaltwoboy.classList.remove('none');
}

function removemodaltwofoo() {
  var modaltwoboy = document.querySelector('.modaltwoboy');

  body.classList.remove('overflowhidden');
  modaltwoboy.classList.add('none');
}



var profilePictureUpperWala = document.querySelector('.profilePictureuppperwala');
var modalTwoBoy = document.querySelector('.modaltwoboy');
var loginPostImages = document.querySelectorAll('.loginuserpostimage');

profilePictureUpperWala.addEventListener('click', function () {
  modalTwoBoy.classList.remove('none');
});

function updateLoginProfile(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var imageSrc = e.target.result;

    loginPostImages.forEach(function (image) {
      image.src = imageSrc;
    });
  };

  reader.readAsDataURL(file);
}

var closeModalTwoBtn = document.querySelector('.closeModalTwoBtn');
closeModalTwoBtn.addEventListener('click', closeModalTwoFoo);

function closeModalTwoFoo() {
  var modaltwoboy = document.querySelector('.modaltwoboy');

  body.classList.remove('overflowhidden');
  modaltwoboy.classList.add('none');
}

async function thecurrentusertwoisloggedin() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        location.href = '../index.html';
        reject("User not logged in");
      }
    });
  });
}

(async () => {
  try {
    const uid = await thecurrentusertwoisloggedin();
    // console.log(uid + " checking");
  } catch (error) {
    console.error(error);
  }
})();

displayPosts();

function timeAgo(timestamp) {
  const currentTime = new Date().getTime();
  const postTime = timestamp.toMillis(); // Assuming `timestamp` is a Firestore Timestamp object

  const timeDifference = currentTime - postTime;

  const seconds = timeDifference / 1000;
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? 's' : ''} ago`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? 's' : ''} ago`;
  }

  const days = hours / 24;
  if (days < 30) {
    return `${Math.floor(days)} day${Math.floor(days) !== 1 ? 's' : ''} ago`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months)} month${Math.floor(months) !== 1 ? 's' : ''} ago`;
  }

  const years = months / 12;
  return `${Math.floor(years)} year${Math.floor(years) !== 1 ? 's' : ''} ago`;
}

async function displayPosts() {
  const postArea = document.getElementById("postAreaId");
  postArea.innerHTML = "";

  const q = query(collection(db, "posts"), orderBy("timestamp"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (data) => {
    try {
      var useruid = data.data().uniqueid;
      const docRef = doc(db, "user", useruid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var againdata = docSnap.data();
        var div = document.createElement("div");
        div.className = "post";
        let deleteoredittruefalse;
        var profilePicSrc = againdata.profilepic ? againdata.profilepic : "https://firebasestorage.googleapis.com/v0/b/social-media-app-7593f.appspot.com/o/images%2Favatar.png?alt=media&token=eb081e88-6772-4d92-85a5-a623b4671927";

        if (data.data().uniqueid == isLoggedInUser.uid) {
  
          // Get the Firestore Timestamp object from the document
          const timestamp = data.data().timestamp;
          // Use the timeAgo() function to calculate the time difference
          const timeDifferenceString = timeAgo(timestamp);
  
          div.innerHTML = `
            <div class="firstdivofpost">
              <div class="imgarea">
                <img src="${profilePicSrc}" class="postimg loginuserpostimage" alt="">
              </div>
              <div class="colomnwalakam">
                <div class="span1offirslline">${againdata.iFirstName} ${againdata.iSurnameName}</div>
                <div class="span2offirslline">${data.data().email}</div>
                <div class="span3offirslline">${timeDifferenceString}</div>
              </div>
              <div class="deleteoreditdiv">
              <i class="fa-solid fa-ellipsis-vertical"></i>
              <ul class="deleteoreditdropdown">
                <li onclick="openeditmodalfoo('${data.id}')">Edit</li>
                <li onclick="deletepostfoo('${data.id}')">Delete</li>
              </ul>
            </div>
            </div>
            <div class="seconddivofpost">${data.data().content}</div>
            <div class="thirddivofpost">
              <span><i class="fa-regular gapfromside fa-heart"></i>PHOTOS</span>
              <span><i class="fa-solid fa-share-from-square"></i>SHARE</span>
              <span><i class="fa-regular gapfromside fa-comment-dots"></i>COMMENT</span>
            </div>
          `;
          postArea.prepend(div);
        }

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  });
}


async function deletepostfoo(postid) {
  await deleteDoc(doc(db, "posts", postid));
  displayPosts();
};


async function editpostfoo() {
  const washingtonRef = doc(db, "posts", uidofedit);

  var editpostInputBox = document.querySelector('#editpostInputBox');


  await updateDoc(washingtonRef, {
    content: editpostInputBox.value
  });
  removeeditmodalfoo();
  displayPosts();
};


function openeditmodalfoo(uidofpost) {

  uidofedit = uidofpost;
  var userName = document.querySelector('.infonamemodalofeditdelete h2');
  var userMobNum = document.querySelector('.infonamemodalofeditdelete p');

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var { iFirstName, iSurnameName } = docSnap.data();
        userName.innerHTML = iFirstName + " " + iSurnameName

      } else {
        console.error("No such document!");
      }
    }
  });

  userMobNum.innerHTML = isLoggedInUser.email


  modalbodyofedit.classList.remove('none');
  body.classList.add('overflowhidden');
}

// bhai is se modal nikal jaiga in edit wala

function removeeditmodalfoo() {
  modalbodyofedit.classList.add('none');
  body.classList.remove('overflowhidden');
}


// bhai function bulai hai in module

window.deletepostfoo = deletepostfoo
window.editpostfoo = editpostfoo
window.openeditmodalfoo = openeditmodalfoo
window.removeeditmodalfoo = removeeditmodalfoo