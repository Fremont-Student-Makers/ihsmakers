document.addEventListener('DOMContentLoaded', async () => {
  const prefix = window.location.pathname.split('/').length > 2 ? '../' : './';
  const dataPath = prefix + 'src/data/members.json';
  const templatePath = prefix + 'components/member-card.html';

  try {
    const [dataRes, tplRes] = await Promise.all([
      fetch(dataPath),
      fetch(templatePath)
    ]);

    if (!dataRes.ok || !tplRes.ok) return;

    const members = await dataRes.json();
    const tplText = await tplRes.text();
    const tmp = document.createElement('div');
    tmp.innerHTML = tplText;
    const template = tmp.querySelector('#member-card-template');

    document.querySelectorAll('.profile-gallery').forEach(container => {
      container.innerHTML = '';
      members.forEach(m => {
        const node = template.content.cloneNode(true);
        const img = node.querySelector('img');
        img.src = m.img;
        img.alt = m.name;
        node.querySelector('.name').textContent = m.name;
        node.querySelector('.role').innerHTML = `<strong>Role:</strong> ${m.role}`;
        node.querySelector('.grade').innerHTML = `<strong>Grade:</strong> ${m.grade}`;
        node.querySelector('.bio').textContent = m.bio;
        container.appendChild(node);
      });
    });
  } catch (e) {
    console.error('Failed to load members:', e);
  }
});
