'use strict'
//all website pages
let pages = {};

//main page
pages.main = {};
pages.main.content = document.querySelector('.main');

//search page
pages.search = {};
pages.search.content = document.querySelector('.search');

//git page
pages.git = {};
pages.git.content = document.querySelector('.git');

//error page 
pages.error = {};
pages.error.content = document.querySelector('.error');

//setting right page on start of script, fixed bug when home page was alwaws seen after reload
for(let page in pages){
    pages[page].content.classList.remove('active');
}
if(location.hash.substring(1)!=''){
    pages[location.hash.substring(1)].content.classList.add('active');
}else {
    pages.main.content.classList.add('active');
}

//github response
let value;
//functions for each page
let pageFunctions = {};
pageFunctions.main = ()=>{
    console.log('main');
}
pageFunctions.search = ()=>{
    console.log('search');
    let button = document.querySelector('.find-git');
    let input = document.querySelector('.git-name');
    button.addEventListener('click', ()=>{
        value = input.value;
    });
}
pageFunctions.git = ()=>{
    console.log('git');
    //location.hash = "#error";
    getUser(value);


}
pageFunctions.error = ()=>{
    console.log('error');
}
async function getUser(name){
    let span = document.querySelector('.git-info');
    try {
        let userResponse = await fetch(`https://api.github.com/users/${name}`);
        if(userResponse.status ==200){
            let userJson = await userResponse.text();
        span.innerHTML = userJson;
        } else {
            changeHash('#error');
        }
        
    } catch (err){
        changeHash('#error');
    }
}

function changeHash(hash){
    location.hash = hash;
}

//handling function
function routeTo(){
//getting current hash
let path = location.hash.substring(1);

let currentPage = path;
//check if we dont have page like current and set value of it if we need
if(!pages.hasOwnProperty(currentPage)){
    if(path === ''){
        currentPage = 'main';
    }else {
        currentPage = 'error';
    }
}
//setting all page hidden
for(let page in pages){
    pages[page].content.classList.remove('active');
}
//setting current page seen
pages[currentPage].content.classList.add('active');

pageFunctions[currentPage]();
}

window.onhashchange = routeTo;
