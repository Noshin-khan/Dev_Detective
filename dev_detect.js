const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const url = "https://api.github.com/users/";
const noresults = document.getElementById("no-results");
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text");
const modeicon = document.getElementById("mode-icon");
const btnsubmit =document.getElementById ("submit");
const input = document.getElementById("input");
const avatar = document.getElementById("avatar");
const userName = document.getElementById("name");
const user = document.getElementById("user");
const date = document.getElementById("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const user_location = document.getElementById("location");
const page = document.getElementById("page");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");

let darkMode=false;
btnsubmit.addEventListener("click",function (){
    if(input.value!==""){
        getUserData(url + input.value);
    }
});

btnmode.addEventListener("click",function(){
    if(darkMode == false){
        darkModeProperties();
    }
    else{
        lightModeProperties();
    }
});

input.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        if(input.value!==""){
            getUserData(url + input.value);
        }
    }
},
false
);

input.addEventListener("input",function(){
    noresults.style.display = "none";
});

async function getUserData(gitUrl){
    try{
   const response =await fetch(gitUrl);
   const data = await response.json();
   console.log(data);
   updateProfile(data);
    }
    catch(error){
        throw error;
    }

}

function updateProfile(data){
  if(data.message !== "Not Found"){
    noresults.style.display= "none";
    function checkNull(param1,param2){
        if(param1 === "" || param1===null ){
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
          } else {
            return true;
          }

        }
        avatar.src=`${data.avatar_url}`;
        userName.innerText=data.name === null ? data.login : data.name;
        user.innerText=`@${data.login}`;
        user.href = `${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
      } else {
        noresults.style.display = "block";
      }
    }
    //SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "assets/sun-icon.svg" ;
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    console.log("darkmode changed to " + darkMode);
    localStorage.setItem("dark-mode", true);  console.log("setting dark mode to false");
  
    console.log("setting dark mode to true");
  
  }
  
  //SWITCH TO LIGHT MODE - activateLightMode()
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "assets/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    console.log("darkmode changed to " + darkMode);
  
    localStorage.setItem("dark-mode", false);
    console.log("setting dark mode to false");
  }
  
  
  //INITIALISE UI
  function init() {
    //initialise dark-mode variable to false;
    //darkMode = true -> dark mode enable karna h 
    //darMode = false -> light mode enable karna h 
    darkMode = false;
  
    //HW
  // const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null k andar");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer k andar");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false k andar");
      lightModeProperties();
    }
  
  
    //by default, pranaygupta ki info show krre h UI pr
    getUserData(url + "thepranaygupta");
  }
  
  init();
    

    
  




