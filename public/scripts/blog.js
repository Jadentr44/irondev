console.log("running");
let id = window.location.pathname.replace('/blog/',"")
console.log(id);
async function getBlogs() {
  let response = await fetch(`/api/blog/id/${id}`);
  let data = await response.json();
  generateBlog(data);
  console.log(data);
}
function generateBlog(info) {
  let TitleEl = document.querySelector("#title");
  let contentEl = document.querySelector("#content");
  let imgEl = document.querySelector("#img");
  TitleEl.innerText = info.title
  imgEl.src = info.imgSrc
  getAuthor(info.author)
  info.content.forEach(e=>{
    let eHtml = "";
    // if(e.type == "p") html = console.log(e.text)
    if(e.type == "paragraph") eHtml = `<p class="text-sm sm:text-base ">${e.text}</p>`
    if(e.type == "heading") eHtml = `<h1 class="text-xl pt-4 pb-1 font-semibold">${e.text}</h1>`
    contentEl.innerHTML += eHtml
  })
}
async function getAuthor(authorId){
  let response = await fetch("/api/user/id/" + authorId);
  let data = await response.json();
  console.log(data);
  document.querySelector('#authorLink').setAttribute('href','/profile/'+data.username)
  document.querySelector('#authorName').innerText = data.username || "no author"
  document.querySelector('#authorImg').src = data.imgSrc || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
}
getBlogs();
