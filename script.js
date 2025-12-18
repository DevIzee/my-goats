let goatsData = [];
let isTableView = false;

async function loadGoats() {
  try {
    const res = await fetch('goats.json');
    goatsData = await res.json();
    renderFilters();
    renderCards();
  } catch (e) { console.error("Erreur chargement goats.json:", e); }
}

function renderFilters() {
  const types = [...new Set(goatsData.map(g=>g.type))];
  const filterType = document.getElementById('filterType');
  types.forEach(t => filterType.appendChild(new Option(t,t)));

  const plateformes = [...new Set(goatsData.flatMap(g=>g.plateformes))];
  const filterPlateforme = document.getElementById('filterPlateforme');
  plateformes.forEach(p => filterPlateforme.appendChild(new Option(p,p)));
}

function applyFilters() {
  const typeVal = document.getElementById('filterType').value;
  const classeVal = document.getElementById('filterClasse').value;
  const statutVal = document.getElementById('filterStatut').value;
  const plateformeVal = document.getElementById('filterPlateforme').value;
  const tagsVal = document.getElementById('filterTags').value.toLowerCase();
  const searchVal = document.getElementById('searchInput').value.toLowerCase();

  return goatsData.filter(g => {
    return (!typeVal || g.type===typeVal)
      && (!classeVal || g.classe===classeVal)
      && (!statutVal || g.statut===statutVal)
      && (!plateformeVal || g.plateformes.includes(plateformeVal))
      && (!tagsVal || g.tags.some(tag=>tag.toLowerCase().includes(tagsVal)))
      && (!searchVal || g.nom.toLowerCase().includes(searchVal));
  });
}

function renderCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  let filtered = applyFilters();
  filtered.sort((a,b)=>(b.annee||0)-(a.annee||0));

  if(!isTableView){
    filtered.forEach(g => {
      const card = document.createElement('div');
      card.className = "card bg-white rounded shadow p-4 fade-in";
      card.innerHTML = `
        <img src="${g.image||'https://via.placeholder.com/300x150?text='+encodeURIComponent(g.nom)}" class="w-full h-40 object-cover rounded mb-2">
        <h3 class="font-bold text-lg">${g.nom}</h3>
        <p class="text-sm text-gray-600">${g.type} | ${g.format} | ${g.annee||'N/A'}</p>
        <p class="text-sm">Saisons: ${g.saisons} | Episode: ${g.episode}</p>
        <p class="text-sm">
          <span class="badge badge-${g.classe.toLowerCase().replace(' ','')}">${g.classe}</span>
          <span class="badge badge-${g.statut.toLowerCase().replace(' ','')}">${g.statut}</span>
        </p>
        <p class="text-sm text-gray-700">Genres: ${g.genres.join(', ')}</p>
      `;
      container.appendChild(card);
    });
  } else {
    const table = document.createElement('table');
    table.className = "min-w-full table-auto bg-white rounded shadow overflow-hidden";
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr class="bg-gray-200"><th class="p-2">Nom</th><th>Type</th><th>Classe</th><th>Statut</th><th>Saisons</th><th>Épisode</th><th>Genres</th></tr>`;
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    filtered.forEach(g=>{
      const tr = document.createElement('tr');
      tr.className="hover:bg-gray-100 transition-colors duration-200 fade-in";
      tr.innerHTML=`
        <td class="border px-2 py-1">${g.nom}</td>
        <td class="border px-2 py-1">${g.type}</td>
        <td class="border px-2 py-1"><span class="badge badge-${g.classe.toLowerCase().replace(' ','')}">${g.classe}</span></td>
        <td class="border px-2 py-1"><span class="badge badge-${g.statut.toLowerCase().replace(' ','')}">${g.statut}</span></td>
        <td class="border px-2 py-1">${g.saisons}</td>
        <td class="border px-2 py-1">${g.episode}</td>
        <td class="border px-2 py-1">${g.genres.join(', ')}</td>
      `;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
  }
}

document.getElementById('searchInput').addEventListener('input', renderCards);
document.getElementById('filterType').addEventListener('change', renderCards);
document.getElementById('filterClasse').addEventListener('change', renderCards);
document.getElementById('filterStatut').addEventListener('change', renderCards);
document.getElementById('filterPlateforme').addEventListener('change', renderCards);
document.getElementById('filterTags').addEventListener('input', renderCards);
document.getElementById('refreshBtn').addEventListener('click', loadGoats);
document.getElementById('toggleView').addEventListener('click', ()=>{
  isTableView=!isTableView;
  document.getElementById('toggleView').textContent=isTableView?"Mode Cartes":"Mode Tableau";
  renderCards();
});

loadGoats();
