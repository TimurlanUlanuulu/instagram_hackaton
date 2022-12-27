const API = "http://localhost:8000/posts";

// json-server --watch db.json --port 8000
//add
const addUrlInp = document.getElementsByClassName("add-url-inp")[0];
const addNameInp = document.getElementsByClassName("add-name-inp")[0];
const addDescInp = document.getElementsByClassName("add-descrip-inp")[0];
const displayImg = document.getElementsByClassName("display-img")[0];
const imageForm = document.getElementsByClassName("image")[0];

//add buttons
const addModal = document.getElementsByClassName("add-post__modal")[0];
const openAddModalBtn = document.getElementsByClassName("open-add-modal")[0];
const clsAddModal = document.getElementsByClassName("close-add-modal")[0];
const addNewPost = document.getElementsByClassName("add-post-btn")[0];

// admin
const admin = document.getElementsByClassName("open-admin")[0];
const addPost = document.getElementsByClassName("add-page")[0];
const adminText = document.getElementsByClassName("admin-text")[0];
const displayEdDel = document.getElementsByClassName("edit-delete");

//post
const postSection = document.getElementsByClassName("post")[0];

render();

async function render() {
  const data = await getPostsFromStorage();
  postSection.innerHTML = "";
  data.forEach((post) => {
    postSection.innerHTML += `
    <div class="post-content">
    <div class="post-header">
      <div class="logo">
        <img
          src="./images/glass.svg"
          alt="html5-icon"
          class="header-png"
        />
      </div>
      <div class="title">
        <strong class="title-html5">stogramm</strong>
        <p class="title-username">${post.name}</p>
      </div>
      <div class="edit-delete">
        <img
          src="./img/delete-broom-svgrepo-com.svg"
          alt=""
          class="delete"
          onclick="deletePost(${post.id})"
        />
        <img src="./img/edit-svgrepo-com.svg" alt="" class="edit"
        onclick="handleEdit(${post.id})"
        />
      </div>
    </div>

    <!--post-img-->
    <div class="post-img">
      <img src="${post.url}" alt="post-image" />
    </div>

    <!--post-info-->
    <div class="post-info">
      <div class="likes">
        <img src="./img/heart-svgrepo-com.svg" class="heart-svg" />
        <div>
          <strong> V.V.Putin,V.Zelenskiy,J.Baiden </strong>
          <span> and </span>
          <strong>${post.likes} others</strong>
        </div>
      </div>
      <strong>${post.name}</strong>
      <span> ${post.desription} </span>
    </div>
    <div class="comments">
      <span class="comments_first-child">view all comments(${post.comments})</span>
    </div>
  </div>
        `;
  });
  checkAdmin();
}

let password = "";

function checkAdmin() {
  if (password === "123") {
    addPost.style.display = "block";
    adminText.innerText = "Добро пожаловать!";
    for (let i of displayEdDel) {
      i.style.display = "block";
    }
  } else {
    addPost.style.display = "none";
    adminText.innerText = "Войти в админку";
    for (let i of displayEdDel) {
      i.style.display = "none";
    }
  }
}

admin.addEventListener("click", function () {
  password = prompt("Введите пароль");
  checkAdmin();
});

async function setPostToStorage(newPost) {
  let options = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`${API}`, options);
}

async function getPostsFromStorage() {
  const data = await fetch(`${API}`);
  const reslut = await data.json();
  return reslut;
}

async function getPostById(id) {
  const respons = await fetch(`${API}/${id}`);
  const result = await respons.json();
  return result;
}

//!==================================
openAddModalBtn.addEventListener("click", function () {
  addModal.style.display = "block";
});

clsAddModal.addEventListener("click", () => {
  addModal.style.display = "none";
});

addUrlInp.addEventListener("change", function () {
  imageForm.style.display = "block";
  displayImg.setAttribute("src", `${addUrlInp.value}`);
});
//?===================================

addNewPost.addEventListener("click", async function () {
  if (
    !addNameInp.value.trim() ||
    !addUrlInp.value.trim() ||
    !addDescInp.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }
  let newPost = {
    name: addNameInp.value,
    desription: addDescInp.value,
    url: addUrlInp.value,
    likes: 0,
    comments: 0,
    views: 0,
    reposts: 0,
  };

  await setPostToStorage(newPost);
  addPost.style.display = "none";
  render();
  addNameInp.value = "";
  addDescInp.value = "";
  addUrlInp.value = "";
});
