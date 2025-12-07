

//--Get HTML DOM Element References 
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

let songs = [];


// This runs automatically when the page finishes loading
document.addEventListener('DOMContentLoaded', () => {

    //1) Get From Local Storage
    const storedData = localStorage.getItem('songs');
    //02) if exsist
    if (storedData) {
        // If yes, turn the JSON string back into an Array
        songs = JSON.parse(storedData);
    } else {
        // If no, start with an empty array
        songs = [];
    }

    document.querySelectorAll('input[name="sortOption"]').forEach(radio => {
        radio.addEventListener('change', () => {
            renderSongs();   // resort when clicked
        });
    });

    // SHOW the data
    renderSongs(songs);
});





//User Click the Add Button
form.addEventListener('submit', (e) => {
    //Dont submit the for to the server yey let me handle it here
    e.preventDefault();

    //Read Forms Data
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = Number(document.getElementById('rating').value);
    const existingId = document.getElementById('songId').value;


    if (existingId) {
        // ----- UPDATE MODE -----
        const index = songs.findIndex(song => song.id == existingId);

        if (index !== -1) {
            songs[index].title = title;
            songs[index].url = url;
            songs[index].rating = rating;
            songs[index].youtubeId = getYoutubeId(url);
        }
    } else {
        // ----- ADD MODE -----
        const song = {
            id: Date.now(),
            title: title,
            url: url,
            rating: rating,
            dateAdded: Date.now(),
            youtubeId: getYoutubeId(url)
        };

        songs.push(song);
    }

    saveAndRender();
    //TO DO SAVE  AND RERENDER 

    form.reset();
    document.getElementById('songId').value = '';
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
    submitBtn.classList.remove('btn-warning');
    submitBtn.classList.add('btn-success');
});

//Save to Local storage and  render UI Table
function saveAndRender() {

    localStorage.setItem('songs', JSON.stringify(songs));
    //TODO RELOAD UI 
    renderSongs();
}


//helper function to get id from youtube thumbnail
function getYoutubeId(url) {
    const regExp = /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}


//sorted by date name rating function
function getSortedSongs() {
    const selected = document.querySelector('input[name="sortOption"]:checked').value;
    const sorted = [...songs];

    if (selected === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selected === 'rating') {
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
        sorted.sort((a, b) => b.dateAdded - a.dateAdded);
    }

    return sorted;
}

//Display Song From Current Updated songs array as tale Rows 
function renderSongs() {
    list.innerHTML = ''; // Clear current list

    const sortedSongs = getSortedSongs();

    sortedSongs.forEach(song => {
        const row = document.createElement('tr');

        // if old songs in localStorage don’t have youtubeId yet:
        const ytId = song.youtubeId || getYoutubeId(song.url);
        const thumbUrl = ytId
            ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
            : '';

        row.innerHTML = `
            <td>${song.title}</td>
            <td>
                ${thumbUrl
                ? `<a href="${song.url}" target="_blank">
                           <img src="${thumbUrl}" alt="${song.title}"
                                style="width:120px;height:auto;">
                       </a>`
                : ''}
            </td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td>${song.rating || ''}</td>
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


function deleteSong(id) {
    if (confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}

function editSong(id) {

    const songToEdit = songs.find(song => song.id === id);
    if (!songToEdit) return;


    document.getElementById('title').value = songToEdit.title;
    document.getElementById('url').value = songToEdit.url;
    document.getElementById('rating').value = songToEdit.rating || '';
    document.getElementById('songId').value = songToEdit.id; // Set Hidden ID

    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    submitBtn.classList.replace('btn-success', 'btn-warning');
}

