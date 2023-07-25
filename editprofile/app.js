import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { onAuthStateChanged, auth, db, getDoc } from '../firebasconfig.js';
import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAM60KWvtkG839mU292mJzblIqWalqkkJo",
  authDomain: "social-media-app-7593f.firebaseapp.com",
  projectId: "social-media-app-7593f",
  storageBucket: "social-media-app-7593f.appspot.com",
  messagingSenderId: "57654938598",
  appId: "1:57654938598:web:616b84298b629aa89d2427"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const firestName = document.querySelector('#firestName');
const surName = document.querySelector('#surName');
const gender = document.querySelector('#gender');
const submit = document.querySelector('#submit');
const dateofbirthdate = document.querySelector('#dateofbirthdate');
const dateofbirthmonth = document.querySelector('#dateofbirthmonth');
const dateofbirthyear = document.querySelector('#dateofbirthyear');

let isLoggedInUser;

const thecurrentuserisloggedin = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      displayUserInfo(uid);
      isLoggedInUser = user;
      loginuserpersonpicfoo(uid)
    } else {
      location.href = '../index.html';
    }
  });
};

thecurrentuserisloggedin();

submit.addEventListener('click', async () => {
  const profilepic = document.querySelector('#profilepic');
  const mountainsRef = ref(storage, `images/${profilepic.files[0].name}`);

  const uploadTask = uploadBytesResumable(mountainsRef, profilepic.files[0]);
  console.log(isLoggedInUser.uid);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        const washingtonRef = doc(db, "user", isLoggedInUser.uid);

        const docRef = doc(db, 'user', isLoggedInUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const iFirstName = firestName.value || data.iFirstName;
          const iSurnameName = surName.value || data.iSurnameName;
          const dateofbirthdatevalue = dateofbirthdate.value || data.dateofbirthdatevalue;
          const dateofbirthyearvalue = dateofbirthyear.value || data.dateofbirthyearvalue;
          const dateofbirthmonthvalue = dateofbirthmonth.value || data.dateofbirthmonthvalue;
          const usergenderdateofbirthyear = gender.value || data.usergenderdateofbirthyear;

          await updateDoc(washingtonRef, {
            iFirstName,
            iSurnameName,
            dateofbirthdatevalue,
            dateofbirthyearvalue,
            dateofbirthmonthvalue,
            usergenderdateofbirthyear,
            profilepic: downloadURL
          });
          location.href = '../Dashbord/index.html'
        }
      });
    }
  );
});

async function displayUserInfo(user) {
  const docRef = doc(db, 'user', user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const iFirstName = firestName.value || data.iFirstName;
    const iSurnameName = surName.value || data.iSurnameName;
    const dateofbirthdatevalue = dateofbirthdate.value || data.dateofbirthdatevalue;
    const dateofbirthyearvalue = dateofbirthyear.value || data.dateofbirthyearvalue;
    const dateofbirthmonthvalue = dateofbirthmonth.value || data.dateofbirthmonthvalue;
    const usergenderdateofbirthyear = gender.value || data.usergenderdateofbirthyear;

    firestName.placeholder = iFirstName;
    surName.placeholder = iSurnameName;
    dateofbirthdate.placeholder = dateofbirthdatevalue + ' Date';
    dateofbirthyear.placeholder = dateofbirthyearvalue + ' Year';
    dateofbirthmonth.value = dateofbirthmonthvalue;
    gender.value = usergenderdateofbirthyear;
    console.log(data);
  } else {
    console.error('No such document!');
  }
}


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