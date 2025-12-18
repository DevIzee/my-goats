let goatsData = [];
let isTableView = false;

async function loadGoats() {
  document.getElementById('loading').classList.remove('hidden');
  try {
    const res = await fetch('goats.json');
    goatsData = await res.json();
    renderFilters();
    renderCards();
  } catch (e) {
    console.error(e);
    alert('Erreur chargement données');
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
}

function renderFilters() {
  const types = [...new Set(goatsData.map(g => g.type))];
  const filterType = document.getElementById('filterType');
  filterType.innerHTML = '<option value="">Tous</option>';
  types.forEach(t => filterType.appendChild(new Option(t, t)));

  const plateformes = [...new Set(goatsData.flatMap(g => g.plateformes || []))];
  const filterPlateforme = document.getElementById('filterPlateforme');
  filterPlateforme.innerHTML = '<option value="">Toutes</option>';
  plateformes.forEach(p => filterPlateforme.appendChild(new Option(p, p)));
}

function applyFilters() {
  const typeVal = document.getElementById('filterType').value;
  const classeVal = document.getElementById('filterClasse').value;
  const statutVal = document.getElementById('filterStatut').value;
  const plateformeVal = document.getElementById('filterPlateforme').value;
  const tagsVal = document.getElementById('filterTags').value.toLowerCase();
  const searchVal = document.getElementById('searchInput').value.toLowerCase();

  return goatsData.filter(g => {
    return (!typeVal || g.type === typeVal)
      && (!classeVal || g.classe === classeVal)
      && (!statutVal || g.statut === statutVal)
      && (!plateformeVal || (g.plateformes || []).includes(plateformeVal))
      && (!tagsVal || (g.tags || []).some(tag => tag.toLowerCase().includes(tagsVal)))
      && (!searchVal || g.nom.toLowerCase().includes(searchVal));
  });
}

function renderCards() {
  const container = document.getElementById('cardsContainer');
  const empty = document.getElementById('empty');
  container.innerHTML = '';

  let filtered = applyFilters();
  filtered.sort((a, b) => (b.annee || 0) - (a.annee || 0));

  if (filtered.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  const classeClass = c => c.toLowerCase()
    .replace(/é/g, 'e')
    .replace(/ /g, '')
    .replace('très', 'tres');

  if (!isTableView) {
    filtered.forEach((g, i) => {
      const card = document.createElement('div');
      card.className = 'card fade-in-up';
      card.style.animationDelay = `${i * 80}ms`;
      card.innerHTML = `
        <img src="${g.image}" class="w-full h-80 object-cover object-top rounded-t-xl" alt="${g.nom}">
        <div class="p-5">
          <h3 class="text-2xl font-bold mb-2">${g.nom}</h3>
          <p class="text-sm opacity-80 mb-3">${g.type} • ${g.format} • ${g.annee || 'N/A'}</p>
          <p class="text-sm opacity-80 mb-4">Saisons: ${g.saisons} • Épisode: ${g.episode}</p>
          <div class="mb-4">
            <span class="badge badge-${classeClass(g.classe)}">${g.classe}</span>
            <span class="badge badge-${g.statut.toLowerCase().replace(/é/g,'e').replace(/ /g,'')}">${g.statut}</span>
          </div>
          <p class="text-sm opacity-90">Genres: ${g.genres.join(', ')}</p>
        </div>
      `;
      container.appendChild(card);
    });
  } else {
    const table = document.createElement('table');
    table.className = "w-full bg-gray-900/40 backdrop-blur rounded-xl overflow-hidden";
    table.innerHTML = `
      <thead class="bg-indigo-900/50">
        <tr>
          <th class="p-4 text-left">Nom</th>
          <th class="p-4">Type</th>
          <th class="p-4">Classe</th>
          <th class="p-4">Statut</th>
          <th class="p-4">Saisons</th>
          <th class="p-4">Épisode</th>
          <th class="p-4">Genres</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(g => `
          <tr class="border-t border-indigo-500/20 hover:bg-indigo-900/30 transition">
            <td class="p-4">${g.nom}</td>
            <td class="p-4">${g.type}</td>
            <td class="p-4"><span class="badge badge-${classeClass(g.classe)}">${g.classe}</span></td>
            <td class="p-4"><span class="badge badge-${g.statut.toLowerCase().replace(/é/g,'e').replace(/ /g,'')}">${g.statut}</span></td>
            <td class="p-4">${g.saisons}</td>
            <td class="p-4">${g.episode}</td>
            <td class="p-4">${g.genres.join(', ')}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
}

// Événements
['searchInput','filterType','filterClasse','filterStatut','filterPlateforme','filterTags'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', renderCards);
});

document.getElementById('refreshBtn').addEventListener('click', loadGoats);

document.getElementById('toggleView').addEventListener('click', () => {
  isTableView = !isTableView;
  document.getElementById('toggleView').textContent = isTableView ? "Mode Cartes" : "Mode Tableau";
  renderCards();
});

document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('hidden');
});

loadGoats();