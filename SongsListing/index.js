console.log('JS FILE LOADED');

// Grab elements
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');

// Just to be sure:
console.log('form =', form);
console.log('list =', list);

// Load from localStorage
let songs = JSON.parse(localStorage.getItem('playlist') || '[]');
console.log('Loaded from localStorage:', songs);

// Render existing songs on load
renderSongs();

// Handle form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('🔔 FORM SUBMIT');

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    console.log('title =', title, 'url =', url);

    if (!title || !url) {
        alert('Fill both fields');
        return;
    }

    const song = {
        id: Date.now(),
        title,
        url,
        dateAdded: Date.now()
    };

    songs.push(song);
    console.log('songs after push:', songs);

    // Save + re-render
    localStorage.setItem('playlist', JSON.stringify(songs));
    renderSongs();

    form.reset();
});

// Render function
function renderSongs() {
    console.log('🎨 renderSongs');

    list.innerHTML = '';

    songs.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.title}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}

// Make these global so onclick="" works
window.deleteSong = function (id) {
    songs = songs.filter(s => s.id !== id);
    localStorage.setItem('playlist', JSON.stringify(songs));
    renderSongs();
};

window.editSong = function (id) {
    const s = songs.find(x => x.id === id);
    if (!s) return;

    titleInput.value = s.title;
    urlInput.value = s.url;

    songs = songs.filter(x => x.id !== id);
    localStorage.setItem('playlist', JSON.stringify(songs));
    renderSongs();
};
