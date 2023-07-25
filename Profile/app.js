var body = document.querySelector('body');
var modalbody = document.querySelector('.modalbody');
let isLoggedInUser = JSON.parse(localStorage.getItem("lOGINUSER")) || {};

document.addEventListener("DOMContentLoaded", function () {
  if (Object.keys(isLoggedInUser).length > 0) {
    displayUserInfo(isLoggedInUser);
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    displayPosts(posts);
  } else {
    console.log(isLoggedInUser);
    window.location.href = "../index.html";
  }
});

document.getElementById('nikalnahhai').addEventListener('click', function () {
  if (Object.keys(isLoggedInUser).length > 0) {
    var postInputBox = document.getElementById('postInputBox');
    postInputBox.focus();
  }
});

function displayUserInfo(user) {
  document.getElementById("userName").textContent = user.iFirstName + ' ' + user.iSurnameName;
  document.getElementById("emailAddress").textContent = user.email;
  document.getElementById("mobNum").textContent = user.mobilenumsignup;
  document.getElementById("gender").textContent = user.gender;
  document.getElementById("description").textContent = user.description || "No Description Added";
}

function postHandler() {
  if (Object.keys(isLoggedInUser).length > 0) {
    const nikalnahhai = document.querySelector('#nikalnahhai');
    const postInput = document.getElementById("postInputBox");
    const postContent = postInput.value;

    nikalnahhai.focuses = postContent.focuses;

    if (postContent.trim() !== "") {
      const post = {
        id: Date.now(),
        content: postContent,
        email: isLoggedInUser.mobilenumsignup,
        userNameu: isLoggedInUser.iFirstName + " " + isLoggedInUser.iSurnameName,
        description: isLoggedInUser.description,
        date: new Date().getDate()
      };

      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));

      displayPosts(posts);

      postInput.value = "";
      body.classList.remove('overflowhidden');
      modalbody.classList.add('none');
    }
  }
}

function displayPosts(posts) {
    const postArea = document.getElementById("postAreaId");
    postArea.innerHTML = "";
  
    for (let post of posts) {
      if (post.email === isLoggedInUser.mobilenumsignup) {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <div class="firstdivofpost">
            <div class="imgarea">
              <img src="../assests/avatar.png" class="postimg" alt="">
            </div>
            <div class="colomnwalakam">
              <div class="span1offirslline">${post.userNameu}</div>
              <div class="span2offirslline">No description added</div>
              <div class="span3offirslline">5 hours ago</div>
            </div>
          </div>
          <div class="seconddivofpost">${post.content}</div>
          <div class="thirddivofpost">
            <span><i class="fa-regular gapfromside fa-heart"></i>Like</span>
            <span><i class="fa-solid fa-share-from-square"></i>SHARE</span>
            <span><i class="fa-regular gapfromside fa-comment-dots"></i>COMMENT</span>
          </div>
        `;
        postArea.prepend(div);
      }
    }
  }
  

function logout() {
  localStorage.removeItem("lOGINUSER");
  window.location.href = "../index.html";
}

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

function removemodalfoo() {
  modalbody.classList.add('none');
  body.classList.remove('overflowhidden');
}

function openmodalfoo() {
  var modalbody = document.querySelector('.modalbody');
  var userName = document.querySelector('.infonamemodal h2');
  var userMobNum = document.querySelector('.infonamemodal p');

  // Update the username and mobile number dynamically
  userName.textContent = isLoggedInUser.iFirstName + " " + isLoggedInUser.iSurnameName;
  userMobNum.textContent = isLoggedInUser.mobilenumsignup;
  body.classList.add('overflowhidden');
  modalbody.classList.remove('none');
}

function bgmovewalafoo(id) {
  var divofid = document.querySelector(`.${id}`);
  divofid.classList.add('removebgcolor');
}

function autobackgroundfoo(id) {
  var divofid = document.querySelector(`.${id}`);
  divofid.classList.remove('removebgcolor');
}
