document.addEventListener('DOMContentLoaded', async () => {
  const prefix = window.location.pathname.split('/').length > 2 ? '../' : './';
  const dataPath = prefix + 'src/data/events.json';

  try {
    const res = await fetch(dataPath);
    if (!res.ok) return;
    const events = await res.json();
    const app = document.getElementById('events-app');
    if (!app) return;

    // Simple calendar for current month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const monthName = now.toLocaleString(undefined, { month: 'long' });
    const header = document.createElement('div');
    header.className = 'events-header';
    header.innerHTML = `<h3>${monthName} ${year}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    const first = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // fill blanks
    for (let i = 0; i < first; i++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell empty';
      grid.appendChild(cell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';
      cell.innerHTML = `<div class="day-num">${d}</div>`;
      const dayEvents = events.filter(e => e.date === iso);
      if (dayEvents.length) {
        const dot = document.createElement('div');
        dot.className = 'event-dot';
        cell.appendChild(dot);
      }
      grid.appendChild(cell);
    }

    const list = document.createElement('div');
    list.className = 'events-list';
    list.innerHTML = '<h4>Upcoming</h4>' + events.map(e => `<div class="evt"><strong>${e.date}</strong><div>${e.title}</div><div class="muted">${e.desc}</div></div>`).join('');

    app.appendChild(header);
    app.appendChild(grid);
    app.appendChild(list);

  } catch (e) {
    console.error('events load failed', e);
  }
});
