const header = document.getElementById("header");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

header.innerHTML = "<h1>Welcome to Just Do It</h1>";
footer.innerHTML = "<h3>&#169; Axel Engblom 2021";
main.innerHTML = `<div>
   
    <div id="login" class="login">
    <p>Log in to see your todos!</p>
        <p id="errormsg1"><p>
        <input type='text' id ='email' placeholder="Email"/><br>
        <input type='password' id ='passWord' placeholder="password"/><br>

        <button id="loginbtn">Log In</button>
    </div>
    <div id="createacc" class="createacc">
        
        <p>Create a new account to start with todos!</p>
        <p id="errormsg2"><p>
        <input type='text' id ='userNameNew' placeholder="Username"/><br>
        <input type='password' id ='passWordNew' placeholder="password"/><br>
        <input type='text' id ='emailNew' placeholder="email"/><br>
        
        <button id="createaccbtn">Create Account</button>
    </div>
</div>`;

document.getElementById("loginbtn").addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let passWord = document.getElementById("passWord").value;
  axios
    .post("/users/log-in-user", {
      email: email,
      passWord: passWord,
    })
    .then((response) => {
      if (response.data === false) {
        document.getElementById("errormsg1").innerHTML = "";
        document
          .getElementById("errormsg1")
          .insertAdjacentHTML("afterbegin", "<p>Wrong email or password</p>");
      } else {
        response.data[0].todos.forEach((todo) => {});
        console.log(response.data[0]);
        main.innerHTML = "";
        header.innerHTML = `<h1>Welcome ${response.data[0].userName}</h1>`;
        main.innerHTML = `<h2>Todo lists</h2><ul id ="todos"></ul>`;
        let ul = document.getElementById("todos");
        response.data[0].todos.forEach((todo) => {
          ul.insertAdjacentHTML("beforeend", `<li >${todo.name}</li>`);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

document.getElementById("createaccbtn").addEventListener("click", () => {
  let userName = document.getElementById("userNameNew").value;
  let passWord = document.getElementById("passWordNew").value;
  let email = document.getElementById("email").value;
  axios
    .post("/users/new-user", {
      userName: userName,
      passWord: passWord,
      email: email,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
