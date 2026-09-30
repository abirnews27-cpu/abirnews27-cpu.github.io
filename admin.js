const KEY="bjmd_db";
let db=JSON.parse(localStorage.getItem(KEY)||"[]");

const email=document.getElementById("email");
const password=document.getElementById("password");
const login=document.getElementById("login");
const panel=document.getElementById("panel");

function showData(){
  if(!panel)return;

  panel.innerHTML=db.map((x,i)=>`
    <div class="card">
      <h3>${x.name||"নাম নেই"}</h3>
      <p>${x.post||""} · ${x.media||""}</p>
      <p>${x.dist||""} · ${x.upa||""}</p>
      <p>${x.verified?"✅ যাচাইকৃত":"⏳ যাচাই হয়নি"}</p>
      <button onclick="verify(${i})">যাচাই করুন</button>
      <button onclick="removeItem(${i})">মুছে ফেলুন</button>
    </div>
  `).join("");
}

function verify(i){
  db[i].verified=true;
  localStorage.setItem(KEY,JSON.stringify(db));
  showData();
}

function removeItem(i){
  if(confirm("এই তথ্যটি মুছে ফেলবেন?")){
    db.splice(i,1);
    localStorage.setItem(KEY,JSON.stringify(db));
    showData();
  }
}

if(login){
  login.addEventListener("click",()=>{
    if(email.value==="admin@bjmd.local" && password.value==="Admin@1234"){
      document.getElementById("loginBox").style.display="none";
      document.getElementById("adminArea").style.display="block";
      showData();
    }else{
      alert("ই-মেইল অথবা পাসওয়ার্ড ভুল।");
    }
  });
}
