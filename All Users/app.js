import { getDocs, onAuthStateChanged, auth, collection, db, setDoc, doc, getDoc ,signOut} from '../firebasconfig.js';

let isLoggedInUser;

var loginPostImages = document.querySelectorAll('.loginuserpostimage');

const thecurrentuserisloggedin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      isLoggedInUser = uid;
      loginuserpersonpicfoo(uid)
      // Call followhandler here, after isLoggedInUser is set
      // Example:
      // followhandler('some_unique_id');
    } else {
      location.href = '../index.html';
    }
  });
};




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

var navbarScrollingDropdowntag = document.querySelector('.navbarScrollingDropdowntag');
navbarScrollingDropdowntag.addEventListener('click', navbarScrollingDropdown);

async function loginuserpersonpicfoo(uniqueid) {
  try {
    var loginpersonpics = document.querySelectorAll('.loginpersonpic');

    const docRef = doc(db, "user", uniqueid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      var userData = docSnap.data();
      var profilePicSrc = userData.profilepic || "https://firebasestorage.googleapis.com/v0/b/social-media-app-7593f.appspot.com/o/images%2Favatar.png?alt=media&token=eb081e88-6772-4d92-85a5-a623b4671927";

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
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle any errors that occurred during the fetch process
  }
}

async function unfollowhandler(uniqueid) {
  try {
    const docRef = doc(db, "user", uniqueid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const existingFollowers = userData.followers || [];

      // Check if the logged-in user's UID is in the followers array
      const index = existingFollowers.indexOf(isLoggedInUser);

      if (index !== -1) {
        // Remove the logged-in user's UID from the followers array
        existingFollowers.splice(index, 1);

        // Update the Firestore document with the updated followers array
        await setDoc(docRef, { followers: existingFollowers }, { merge: true });

        // Log the 'uniqueid' to the console for testing purposes
        console.log("Unfollow user with ID:", uniqueid);
        displayUsers();
      } else {
        // The logged-in user is not in the followers array, so no need to unfollow
        console.log("User is not following user with ID:", uniqueid);
      }
    } else {
      // The target user document doesn't exist or couldn't be retrieved
      console.log("No such user document with ID:", uniqueid);
    }
  } catch (error) {
    console.error("Error handling unfollow:", error);
    // Handle any errors that occurred during the unfollow process
  }
}

async function followhandler(uniqueid) {
  try {
    const docRef = doc(db, "user", uniqueid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const existingFollowers = userData.followers || [];

      // Check if the logged-in user's UID is already in the followers array
      const isAlreadyFollowing = existingFollowers.includes(isLoggedInUser);

      if (!isAlreadyFollowing) {
        // Prevent the logged-in user from following themselves
        if (uniqueid === isLoggedInUser) {
          console.log("Cannot follow yourself.");
          return;
        }

        // Add the logged-in user's UID to the followers array
        existingFollowers.push(isLoggedInUser);

        // Update the Firestore document with the updated followers array
        await setDoc(docRef, { followers: existingFollowers }, { merge: true });

        // Log the 'uniqueid' to the console for testing purposes
        console.log("Follow user with ID:", uniqueid);
        displayUsers();
      } else {
        // The logged-in user is already following the target user
        console.log("Already following user with ID:", uniqueid);
      }
    } else {
      // The target user document doesn't exist or couldn't be retrieved
      console.log("No such user document with ID:", uniqueid);
    }
  } catch (error) {
    console.error("Error handling follow:", error);
    // Handle any errors that occurred during the follow process
  }
}


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

// Attach functions to the global object so they can be called from HTML onclick attribute
window.unfollowhandler = unfollowhandler;
window.followhandler = followhandler;
window.logout = logout;

// Function to fetch and display user data
// Function to fetch and display user data
async function displayUsers() {
  const querySnapshot = await getDocs(collection(db, "user"));
  var bodyofdiv = document.querySelector('.body');
  bodyofdiv.innerHTML = '';

  querySnapshot.forEach((doc) => {
    if(doc.data().uniqueid !== isLoggedInUser){

      let btn;
    const { iFirstName, iSurnameName, mobilenumsignup, profilepic, followers } = doc.data();
    console.log();
    if (followers && followers.includes(isLoggedInUser)) {
      btn = `<button onclick="unfollowhandler('${doc.id}')">Unfollow</button>`;
    } else {
      btn = `<button onclick="followhandler('${doc.id}')">Follow</button>`;
    }

    // Get the number of followers or set it to 0 if 'followers' is undefined
    const numFollowers = followers ? followers.length : 0;

    bodyofdiv.innerHTML += `<div class="card">
      <img src="${profilepic || 'https://firebasestorage.googleapis.com/v0/b/social-media-app-7593f.appspot.com/o/images%2Favatar.png?alt=media&token=eb081e88-6772-4d92-85a5-a623b4671927'}">
      <h1>${iFirstName} ${iSurnameName}</h1>
      <p>${mobilenumsignup}</p>
      <p>${numFollowers} followers</p>
      ${btn}
      </div>`;
    }
    });
}


// Call thecurrentuserisloggedin to check if the user is logged in and set the isLoggedInUser variable
thecurrentuserisloggedin();

// Call displayUsers to fetch and display user data
displayUsers();
