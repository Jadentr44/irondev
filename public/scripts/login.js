let loginBtn = document.querySelector("#loginBtn");
// document.querySelector("#check").addEventListener('click', async function(){
//   console.log("checking")
//   let response = await fetch('api/user/login')
//   let data = await response.json();
//   console.log(data);


// })
loginBtn.addEventListener("click", async function () {
  let usernameValue = document.querySelector("#username").value;
  let passwordValue = document.querySelector("#password").value;
  if (!usernameValue || !passwordValue) {
    return errorMessage("fill out all fields");
  }
  let info = {
    username: usernameValue,
    password: passwordValue,
  };
  // console.log("loggin in");

  let response = await fetch(`api/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  if(response.status !== 200) return errorMessage("no user found")
  let data = await response.json();

  console.log(data);
  window.location.pathname = '/'
 
});
function errorMessage(message) {
  if (!message) return;
  const errorEl = document.querySelector("#error");
  errorEl.innerText = message;
  errorEl.classList.remove("invisible");
}
