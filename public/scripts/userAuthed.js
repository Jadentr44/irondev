async function checkUser(){
  console.log("checking")
  let response = await fetch('/api/user/login')
  let data = await response.json();
  console.log(data)
  if(!data) return document.querySelectorAll(".unidentified").forEach(e=>e.classList.remove("hidden"))
  document.querySelector('#profile').setAttribute('href','/profile/'+data.username)
  document.querySelector('#profile').innerHTML = `<img id="navImg" src="${data.imgSrc||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}" alt="" class="h-8 w-8 object-cover rounded-full"><h3 >${data.username||"profile"}</h3>`
  document.querySelectorAll(".loggedin").forEach(e=>e.classList.remove("hidden"))
}
checkUser()