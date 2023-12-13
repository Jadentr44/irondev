async function getBlogs() {
  let query = window.location.search
  let response = await fetch(`api/blogs`+query);
  let data = await response.json();
  if(data .length == 0) return alert("no data")
  generateBlogs(data);
  console.log(data);
}
function generateBlogs(info) {
  let blogEl = document.querySelector("#blogEl");
  info.forEach((blog,index)=>{
    let imgSrc = blog.imgSrc?blog.imgSrc:"https://cdn.shopify.com/s/files/1/0306/6419/6141/articles/coding_languages.png?v=1619126283"
    blogEl.innerHTML +=`
    <div class=" ">
    
   
    <a href="/${index+1}">
    <div class="w-full max-w-[25rem] mx-auto h-full shadow-lg rounded-b-lg blogCard ">
    <div style="background-image: url(${imgSrc});" class="h-[5rem] bg-cover bg-center "></div>
    <div class="p-2">
    <h3 class="md:text-lg mb-auto font-semibold">${blog.title}</h3>
    <p class="lineMax3 md:text-base text-sm text-gray-500 font-light">${blog.content[0].text}</p>
    </div>
    </div>
    </a>
    </div>
    `
  })
}
getBlogs();
