// In script.js

// You can add JavaScript code here

// For demonstration purposes, let's use a simple array to store cart items
let user = {
  "login" : false,
}
let cart = [];
let cred = [];


if(localStorage.getItem("item")==null){
   localStorage.setItem("item",JSON.stringify(cart));
}
else{
  cart = localStorage.getItem("item");
  cart = JSON.parse(cart);
  updateCart();
}

if(localStorage.getItem("cred")==null){
  localStorage.setItem("cred",JSON.stringify(cred));
}
else{
  cred = localStorage.getItem("cred");
  cred = JSON.parse(cred)
  console.log(cred)
}
if(localStorage.getItem("login")==null){
  
  localStorage.setItem("login",JSON.stringify(user))
}
else{
  user = localStorage.getItem("login");
  user = JSON.parse(user)
  if(user.login){
    document.getElementById("greeting").innerText = "Hello, User";
     var logoutelement = document.getElementsByClassName("logoutuser")
     if(logoutelement.length>0) logoutelement[0].style.display = "block";
      var element = document.getElementsByClassName("d-hidden");
    for(var i=0;i<element.length;i++){
      element[i].style.display = "none";
    }
  }
}
// Function to add an item to the cart
function addToCart(productName, price) {
  const item = { productName, price };
  cart.push(item);
  localStorage.setItem("item",JSON.stringify(cart));
  updateCart();
  notifybar(`Added ${productName} to the cart!`,"green","white")
}

// Function to update the cart display
function updateCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total'); 

  // Clear the previous content
  cartItemsElement.innerHTML = '';

  // Populate the cart items
  cart.forEach((item,index) => {
    const div = document.createElement('div')
    div.id = "cartitem"
    const listItem = document.createElement('li');
    listItem.id = "listitem"

    const span = document.createElement('span');
    span.id = "delete";
    span.setAttribute("onclick","deleteitem(this)")
    span.innerText = "Delete";
    console.log(cart.length)
    span.setAttribute("index",`${index}`)
    listItem.textContent = `${item.productName} - RS.${item.price.toFixed(2)}`;
    div.appendChild(listItem);
    div.appendChild(span)
    cartItemsElement.appendChild(div);
  });

  // Calculate and display the total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalElement.textContent = total.toFixed(2);
}

function Login(){
  var id = document.getElementById('id').value;
  var password = document.getElementById('password').value
  var index = cred.findIndex(item => item.id === id);
  console.log(index)
  if(index==-1 || cred[index].password!=password){
    notifybar("id or password wrong !","red","white")
  }
  else{
    user.login = true;
    localStorage.setItem("login",JSON.stringify(user));

    document.getElementById("greeting").innerText = "Hello, User";
    var logoutelement = document.getElementsByClassName("logoutuser")
     if(logoutelement.length>0) logoutelement[0].style.display = "block";
    var element = document.getElementsByClassName("d-hidden");
    for(var i=0;i<element.length;i++){
      element[i].style.display = "none";
    }
    notifybar("Login Successfull","green","white");
    location.replace("index.html")
  } 
  document.getElementById('id').value = "";
  document.getElementById('password').value = "" ;
}

function SignUp(){
  var id = document.getElementById('id').value;
  var password = document.getElementById('password').value
  console.log(id," ",password)
  var index = cred.findIndex(item => item.id === id);
  if(index!=-1){
    notifybar("id already Used by other user","yellow","black")
  }
  else if(id.length<5 || password.length<5) notifybar("id/password size must be greater than 4","yellow","black")
  else{
    var new_user = {"id" : id,"password" : password}
    cred.push(new_user);
    localStorage.setItem("cred",JSON.stringify(cred));
    notifybar("SignUp Successfull Welcome to Stop&Shop","green","white")
   document.getElementById('id').value = null;
  document.getElementById('password').value = null
  }
  document.getElementById('id').value = null;
  document.getElementById('password').value = null
}

function deleteitem(e){
  var indexForRemoval = e.getAttribute("index");
  notifybar(`${cart[indexForRemoval].productName} Successfully Deleted`,"red","white")
  indexForRemoval = parseInt(indexForRemoval)
  console.log(indexForRemoval)
  cart = cart.slice(0,indexForRemoval).concat(cart.slice(indexForRemoval+1))
  localStorage.setItem("item",JSON.stringify(cart));
  console.log(cart)
  updateCart()

}

function LogOutUser(){
  var element = document.getElementsByClassName("d-hidden");
    for(var i=0;i<element.length;i++){

      element[i].style.display = "flex";
    }

  var logoutelement = document.getElementsByClassName("logoutuser")
  if(logoutelement.length>0) logoutelement[0].style.display = "none";
  user.login = false;  
  localStorage.setItem("login",JSON.stringify(user));
  document.getElementById("greeting").innerText = "";
  notifybar("Logout successfull","green","white")
}

function notifybar(message,bgColor,color){
    var element = document.getElementById("notifybar");
    element.innerText = message
    element.style.backgroundColor = bgColor;
    element.style.color = color;
    setTimeout(() => {
      element.innerText = ""
      element.style.backgroundColor = "white";
      element.style.color = "white";
    }, 3000);
}
function ordered(){
  var txt;
  if (confirm("Press Ok to Confirm the Order")){
    txt ="Order Confirmed";
  }
  else{
    txt="Order Cancelled";
  }
  document.getElementById("ordered").innerHTML = txt;
}



  