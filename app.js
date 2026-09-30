const seed=[{id:1,name:"সাইদুল ইসলাম আবির",post:"উপজেলা প্রতিনিধি",media:"দৈনিক সকালের সময়",kind:"জাতীয় দৈনিক",phone:"",wa:"",mail:"",div:"রাজশাহী",dist:"সিরাজগঞ্জ",upa:"রায়গঞ্জ",verified:true}];

let db=JSON.parse(localStorage.getItem("bjmd_db")||"null")||seed;
localStorage.setItem("bjmd_db",JSON.stringify(db));

const $=x=>document.getElementById(x);

function opts(id,key,label){
 let a=[...new Set(db.map(x=>x[key]).filter(Boolean))];
 if($(id)) $(id).innerHTML='<option value="">'+label+'</option>'+a.map(x=>`<option>${x}</option>`).join("");
}

function render(){
 opts("division","div","সব বিভাগ");
 opts("district","dist","সব জেলা");
 opts("upazila","upa","সব উপজেলা");
 opts("kind","kind","সব মিডিয়া");

 let q=$("q")?.value.trim().toLowerCase()||"";
 let v=$("division")?.value||"";
 let d=$("district")?.value||"";
 let u=$("upazila")?.value||"";
 let k=$("kind")?.value||"";

 let a=db.filter(x=>
   (!q||Object.values(x).join(" ").toLowerCase().includes(q))&&
   (!v||x.div==v)&&(!d||x.dist==d)&&
   (!u||x.upa==u)&&(!k||x.kind==k)
 );

 if($("list")){
  $("list").innerHTML=a.length?
   a.map(x=>`<article class="card">
   <h3>${x.name} ${x.verified?"✓":""}</h3>
   <b>${x.post||""}</b>
   <p>${x.media||""} · ${x.kind||""}</p>
   <p>${x.dist||""}${x.upa?" · "+x.upa:""}</p>
   </article>`).join("")
   :"<div class='card'>কোনো তথ্য পাওয়া যায়নি।</div>";
 }
}

render();
