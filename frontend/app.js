let flights = [];
let selectedFlight = null;

const costs = { checked: 70000, carryon: 40000, seat: 25000, priority: 30000 };
const money = n => new Intl.NumberFormat("en-US", {style:"currency", currency:"COP", maximumFractionDigits:0}).format(n);

async function loadFlights() {
  flights = await (await fetch("/api/flights")).json();
  renderFlights();
  updateSummary();
}

function renderFlights() {
  document.getElementById("flights").innerHTML = flights.map(f => `
    <article class="flight ${selectedFlight?.id === f.id ? "selected" : ""}" onclick="selectFlight('${f.id}')">
      <div><strong>${f.origin} <i>→</i> ${f.destination}</strong><p>${f.date} · ${f.time} · ${f.duration}</p><small>BASIC FARE · Personal item included</small></div>
      <div class="flightPrice"><small>BASIC</small><strong>${money(f.price)}</strong><span>${selectedFlight?.id === f.id ? "✓ SELECTED" : "SELECT"}</span></div>
    </article>`).join("");
}

function selectFlight(id) {
  selectedFlight = flights.find(f => f.id === id);
  renderFlights();
  updateSummary();
}

function services() {
  return [...document.querySelectorAll("[data-service]:checked")].map(x => x.dataset.service);
}

function updateSummary() {
  const box = document.getElementById("selectedFlight");
  if (!selectedFlight) {
    box.textContent = "Select a flight to continue.";
    box.classList.add("empty");
    ["base","services","total"].forEach(id => document.getElementById(id).textContent = money(0));
    document.getElementById("reserve").disabled = true;
    return;
  }
  box.classList.remove("empty");
  box.innerHTML = `<strong>${selectedFlight.origin} → ${selectedFlight.destination}</strong><br>${selectedFlight.date} · ${selectedFlight.time}<br>Basic fare`;
  const serviceTotal = services().reduce((sum, s) => sum + costs[s], 0);
  document.getElementById("base").textContent = money(selectedFlight.price);
  document.getElementById("services").textContent = money(serviceTotal);
  document.getElementById("total").textContent = money(selectedFlight.price + serviceTotal);
  document.getElementById("reserve").disabled = false;
}

async function reserve() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!selectedFlight) return toast("Select a flight first.");
  if (!name || !email) return toast("Enter the passenger name and email.");

  const btn = document.getElementById("reserve");
  btn.disabled = true; btn.textContent = "Processing...";

  try {
    const r = await fetch("/api/reservations", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({flightId:selectedFlight.id,name,email,services:services()})
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    document.getElementById("successTitle").textContent = `Reservation ${data.code} confirmed`;
    document.getElementById("successDetails").innerHTML = `${data.flight} · ${data.date} · ${data.time}<br>${data.description}<br><strong>Final price: ${money(data.finalPrice)}</strong>`;
    document.getElementById("success").classList.remove("hidden");
    document.getElementById("success").scrollIntoView({behavior:"smooth"});
  } catch(e) { toast(e.message); }
  finally { btn.disabled = false; btn.textContent = "Confirm reservation"; }
}

function toast(message) {
  const t=document.getElementById("toast"); t.textContent=message; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2500);
}

function reset() {
  selectedFlight=null;
  document.querySelectorAll("[data-service]").forEach(x=>x.checked=false);
  document.getElementById("name").value="";
  document.getElementById("email").value="";
  document.getElementById("success").classList.add("hidden");
  renderFlights(); updateSummary(); window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-service]").forEach(x=>x.addEventListener("change",updateSummary));
document.getElementById("reserve").addEventListener("click",reserve);
document.getElementById("new").addEventListener("click",reset);
loadFlights();