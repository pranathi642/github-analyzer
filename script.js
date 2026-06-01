let input=document.getElementById("username");
let btn=document.getElementById("btn");
let results=document.getElementById("results");
btn.addEventListener("click",async ()=>{
    results.innerHTML="";
    let username=input.value;
    if(username.trim()===""){
        alert("Enter valid input!!");
        return;
    }
    results.innerHTML = "<p class='loading'>Fetching profile...</p>";
    await displayData(username);
    input.value="";
});
input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        btn.click();
    }
});
async function displayData(username){
    results.innerHTML="";
    let res=await fetch(`https://api.github.com/users/${username}`);
    let data= await res.json();
    //console.log(data.message);
    if(data.message==="Not Found"){
        let error=document.createElement("p");
        error.innerText="The user does not exist!";
        results.appendChild(error);
        return;
    }
    //console.log(data);
    let title=document.createElement("p");
    title.className = "profile-title";
    let img=document.createElement("img");
    let name=document.createElement("p");
    let bio=document.createElement("p");
    let followers=document.createElement("p");
    let following=document.createElement("p");
    let repo_count=document.createElement("p");
    let loc=document.createElement("p");
    let div=document.createElement("div");
    let div1=document.createElement("div");
    div1.className="div1";
    div.className="div";
    title.innerText=username;
    img.src=data.avatar_url;
    name.innerText=`Name : ${data.name}`;
    if(data.bio===null){
        bio.innerText=`Bio : Bio not available`;
    }
    else{
        bio.innerText=`Bio : ${data.bio}`;
    }
    followers.innerText=`Followers : ${data.followers}`;
    following.innerText=`Following : ${data.following}`;
    repo_count.innerText=`Repo Count : ${data.public_repos}`;
    if(data.location===null){
        loc.innerText=`Location : Not available`;
    }
    else{
        loc.innerText=`Location : ${data.location}`;
    }
    results.appendChild(title);
    div1.appendChild(img);
    div.appendChild(name);
    div.appendChild(bio);
    div.appendChild(followers);
    div.appendChild(following);
    div.appendChild(repo_count);
    div.appendChild(loc);
    div1.appendChild(div);
    results.appendChild(div1);
    let content=document.createElement("p");
    content.innerText="Top 3 Repositories :";
    results.appendChild(content);
    content.className="content";
    //results.appendChild(document.createElement("p").innerText="Top 3 Repositaries :")
    let reposDiv = await getRepos(username);
    reposDiv.className = "repos";
    results.appendChild(reposDiv);

}
async function getRepos(username){
    let res=await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=4`);
    let data=await res.json();
    console.log(data);
    let repos=document.createElement("div");
    //repos.className="repos";
    //data=[];
    data.forEach((obj)=>{
        let repo=document.createElement("div");
        repo.className="repo";
        let name=document.createElement("p");
        let star=document.createElement("p");
        let desc=document.createElement("p");
        let lang=document.createElement("p");
        name.innerText="Repository Name : "+obj.name;
        star.innerText="Star Count : "+obj.stargazers_count;
        if(obj.description===null){
            desc.innerText="Description : Not available";
        }
        else{
            desc.innerText="Description : "+obj.description;
        }
        lang.innerText="Language :  "+obj.language;
        repo.appendChild(name);
        repo.appendChild(star);
        repo.appendChild(desc);
        repo.appendChild(lang);
        repos.appendChild(repo);
    });
    return repos;
}
