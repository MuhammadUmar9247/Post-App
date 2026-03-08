function showSignup(){

loginPage.classList.add("hidden")
signupPage.classList.remove("hidden")

}

function showLogin(){

signupPage.classList.add("hidden")
loginPage.classList.remove("hidden")

}



function signup(){

let email=signupEmail.value
let password=signupPassword.value

let user={email,password}

localStorage.setItem("user",JSON.stringify(user))

Swal.fire({
icon:'success',
title:'Account Created Successfully'
})

showLogin()

}



function login(){

let email=loginEmail.value
let password=loginPassword.value

let savedUser=JSON.parse(localStorage.getItem("user"))

if(savedUser && email===savedUser.email && password===savedUser.password){

Swal.fire({
icon:'success',
title:'Login Successful'
})

loginPage.classList.add("hidden")
dashboard.classList.remove("hidden")

displayPosts()

}else{

Swal.fire({
icon:'error',
title:'Invalid Login'
})

}

}



function previewFile(){

let file=fileInput.files[0]

let reader=new FileReader()

reader.onload=function(){

if(file.type.includes("image")){

preview.innerHTML=`<img src="${reader.result}">`

}else{

preview.innerHTML=`<iframe src="${reader.result}"></iframe>`

}

}

reader.readAsDataURL(file)

}



function addPost(){

let text=postText.value
let file=fileInput.files[0]

let posts=JSON.parse(localStorage.getItem("posts"))||[]

if(file){

let reader=new FileReader()

reader.onload=function(){

let post={

text:text,
file:reader.result,
type:file.type

}

posts.push(post)

localStorage.setItem("posts",JSON.stringify(posts))

displayPosts()

}

reader.readAsDataURL(file)

}else{

posts.push({text:text})

localStorage.setItem("posts",JSON.stringify(posts))

displayPosts()

}

postText.value=""
fileInput.value=""
preview.innerHTML=""

}



function displayPosts(){

let posts=JSON.parse(localStorage.getItem("posts"))||[]

postsDiv=document.getElementById("posts")

postsDiv.innerHTML=""

posts.forEach((post,index)=>{

let preview=""

if(post.file){

if(post.type.includes("image")){

preview=`<img src="${post.file}">`

}else{

preview=`<iframe src="${post.file}"></iframe>`

}

}

postsDiv.innerHTML+=`

<div class="post">

<p>${post.text}</p>

${preview}

<br>

<button onclick="editPost(${index})">Edit</button>

<button onclick="deletePost(${index})">Delete</button>

</div>

`

})

}



function deletePost(index){

let posts=JSON.parse(localStorage.getItem("posts"))

posts.splice(index,1)

localStorage.setItem("posts",JSON.stringify(posts))

displayPosts()

}



function editPost(index){

let posts=JSON.parse(localStorage.getItem("posts"))

Swal.fire({

title:'Edit Post',
input:'text',
inputValue:posts[index].text,
showCancelButton:true

}).then(result=>{

if(result.value){

posts[index].text=result.value

localStorage.setItem("posts",JSON.stringify(posts))

displayPosts()

}

})

}
