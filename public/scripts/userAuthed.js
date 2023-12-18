async function checkUser(){
  console.log("checking")
  let response = await fetch('/api/user/login')
  let data = await response.json();
  if(!data) return document.querySelectorAll(".unidentified").forEach(e=>e.classList.remove("hidden"))
  document.querySelector('#profile').setAttribute('href','/profile/'+data.username)
  document.querySelectorAll(".loggedin").forEach(e=>e.classList.remove("hidden"))
}
checkUser()