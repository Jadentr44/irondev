async function getProfile() {
  let username = window.location.pathname.replace("/profile/", "");
  // console.log(username);
  let response = await fetch("/api/user/name/" + username);
  let data = await response.json();
  console.log(data);
  generatePage(data);
}
function generatePage(info) {
  let postArea = document.querySelector("#postArea");
  let nameEl = document.querySelector("#nameEl");
  let bioEl = document.querySelector("#bio");
  let imgEl = document.querySelector("#profileImg")

  imgEl.src = info.imgSrc|| 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  // setting name of profile
  nameEl.innerText = info.username;
  // if there is a bio set it
  bioEl.innerText = info.bio || "no bio";
  // loop through all post liked with account 
  if (info.post.length > 0) {
    info.post.forEach((e) => {
      generatePostCard(e);
    });
  } else {
    // if there are no post tell them
    postArea.innerHTML =
      '<h3 class="text-2xl font-semibold text-center">No Post :(</h3>';
  }
}
async function generatePostCard(id) {
  let response = await fetch(`/api/blog/id/${id}`);
  let data = await response.json();
  document.querySelector("#postArea").innerHTML += `
  <a href="/blog/${id}">
  <div class="border-t-[1px] py-4 flex px-4 hover:bg-gray-50 ">
  <div class="">
  
  <h2 class="md:text-2xl text-lg font-bold">${data.title}</h2>
  <p class="lineMax3 text-gray-500 font-light mg:text-lg">${data.content[0].text}</p>
  </div>
  <img class="md:max-w-[20%] max-w-[30%] aspect-square object-cover w-full" src="${data.imgSrc}" alt="">
  </div></a>
  `;
  // console.log(data);
}
getProfile();
