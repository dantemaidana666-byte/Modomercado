const demoProducts = [
 {name:"Perfume para todos los días",price:8500,category:"Belleza",emoji:"🌸"},
 {name:"Remera básica",price:12000,category:"Indumentaria",emoji:"👕"},
 {name:"Auriculares inalámbricos",price:18500,category:"Tecnología",emoji:"🎧"},
 {name:"Mate y bombilla",price:9500,category:"Hogar",emoji:"🧉"},
 {name:"Combo de cuidado personal",price:15000,category:"Belleza",emoji:"🧴"},
 {name:"Caja de chipá",price:6000,category:"Alimentos",emoji:"🥯"},
 {name:"Lámpara de escritorio",price:11000,category:"Hogar",emoji:"💡"},
 {name:"Mochila urbana",price:22000,category:"Indumentaria",emoji:"🎒"}
];
let selectedCategory = "Todos";
const productsEl = document.querySelector("#products");
const searchEl = document.querySelector("#search");
const countEl = document.querySelector("#count");
const emptyEl = document.querySelector("#empty");
const money = n => new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
function render(){
 const q = searchEl.value.trim().toLocaleLowerCase("es");
 const filtered = demoProducts.filter(p => (selectedCategory==="Todos" || p.category===selectedCategory) && (p.name.toLocaleLowerCase("es").includes(q)||p.category.toLocaleLowerCase("es").includes(q)));
 productsEl.innerHTML = filtered.map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.emoji}</div><div class="product-info"><span class="tag">${p.category.toUpperCase()}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><a class="contact" href="#publicar">Consultar producto</a></div></article>`).join("");
 countEl.textContent = `${filtered.length} ${filtered.length===1?"producto":"productos"}`;
 emptyEl.hidden = filtered.length!==0;
}
document.querySelector("#categories").addEventListener("click",e=>{
 const btn=e.target.closest("button[data-category]"); if(!btn)return;
 selectedCategory=btn.dataset.category;
 document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("active",b===btn));
 render();
});
searchEl.addEventListener("input",render);
document.querySelector("#publishForm").addEventListener("submit",e=>{
 e.preventDefault();
 const d=new FormData(e.currentTarget);
 const name=String(d.get("name")).trim(), price=Number(d.get("price")), category=String(d.get("category")), phone=String(d.get("phone")).replace(/\D/g,"");
 if(!name||!price||phone.length<8){alert("Revisá el nombre, el precio y el WhatsApp de contacto.");return;}
 const msg=`Hola, quiero publicar en Mercado Correntino.%0AProducto: ${encodeURIComponent(name)}%0APrecio: ${encodeURIComponent(money(price))}%0ACategoría: ${encodeURIComponent(category)}`;
 window.open(`https://wa.me/${phone}?text=${msg}`,"_blank","noopener");
});
document.querySelector("#year").textContent=new Date().getFullYear();
render();
