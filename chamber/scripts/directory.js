const membersContainer = document.querySelector('#members');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

const dataUrl = 'data/members.json';

async function getMembers() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error('Could not load members:', error);
    membersContainer.innerHTML = `<p class="error">Member data could not be loaded.</p>`;
  }
}

function membershipLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}

function displayMembers(members) {
  membersContainer.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const address = document.createElement('p');
    address.textContent = member.address;

    const phone = document.createElement('p');
    phone.innerHTML = `<a href="tel:${member.phone.replace(/\s/g, '')}">${member.phone}</a>`;

    const website = document.createElement('p');
    website.innerHTML = `<a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>`;

    const level = document.createElement('p');
    level.classList.add('level');
    level.textContent = `Membership: ${membershipLabel(member.membership)}`;

    
    const img = document.createElement('img');
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = 'lazy';
    img.width = 320;
    img.height = 200;

    card.append(name, img, address, phone, website, level);
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});

getMembers();

