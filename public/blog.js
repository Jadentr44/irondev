console.log("running");
let id = window.location.pathname.replace(/\//g, "");
console.log(id);
async function getBlogs() {
  let response = await fetch(`api/blog/${id}`);
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
  info.content.forEach(e=>{
    let eHtml = "";
    // if(e.type == "p") html = console.log(e.text)
    if(e.type == "paragraph") eHtml = `<p class="text-sm sm:text-base ">${e.text}</p>`
    if(e.type == "heading") eHtml = `<h1 class="text-xl pt-4 pb-1 font-semibold">${e.text}</h1>`
    contentEl.innerHTML += eHtml
  })
}
getBlogs();
