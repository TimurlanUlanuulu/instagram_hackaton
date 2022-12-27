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
const addPost = document.getElementsByClassName("add-new-post")[0];
const adminText = document.getElementsByClassName("admin-text")[0];

let password = "";

function checkAdmin() {
  if (password === "123") {
    addPost.style.display = "block";
    adminText.innerText = "Добро пожаловать!";
    //   for (let i of adminPanels) {
    //     i.style.display = "block";
    //   }
  } else {
    addPost.style.display = "none";
    adminText.innerText = "Войти в админку";
    //   for (let i of adminPanels) {
    //     i.style.display = "none";
    //   }
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
  //   render();
  addNameInp.value = "";
  addDescInp.value = "";
  addUrlInp.value = "";
});


