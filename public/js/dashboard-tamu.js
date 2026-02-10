// Dashboard Tamu Script
// Displays data from 'registrations' collection

let allData = []; // Store fetched data

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    if (!window.db) {
        console.error('Firebase DB not initialized. Check firebase-config.js');
        const tableBody = document.getElementById('guest-table-body');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-red-500">
                        Error: Konfigurasi Database tidak ditemukan.
                    </td>
                </tr>
            `;
        }
        return;
    }

    // Setup Filter Listeners
    ['filter-school', 'filter-person', 'filter-status', 'filter-attendee', 'filter-contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => renderTable());
        }
    });

    console.log("Listening to registrations...");

    // Subscribe to updates
    window.db.collection('registrations')
        .orderBy('created_at', 'desc')
        .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                allData = [];
                renderTable();
                return;
            }

            allData = [];
            const totalDocs = snapshot.size;

            snapshot.docs.forEach((doc, index) => {
                const data = doc.data();
                allData.push({
                    id: doc.id,
                    data: data,
                    rowNumber: totalDocs - index
                });
            });

            renderTable();

        }, (error) => {
            console.error("Error fetching documents: ", error);
            const tableBody = document.getElementById('guest-table-body');
            let msg = 'Gagal memuat data.';
            if (error.message.includes('requires an index')) {
                msg = 'Firestore Index Required. Check console for link to create index.';
            }

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl m-4">
                        <div class="flex flex-col items-center gap-2">
                             <span class="material-symbols-outlined">warning</span>
                             <span class="font-bold">${msg}</span>
                             <span class="text-xs font-mono opacity-80">${error.message}</span>
                        </div>
                    </td>
                </tr>
            `;
        });
}

function renderTable() {
    const tableBody = document.getElementById('guest-table-body');
    const totalCountEl = document.getElementById('total-count');

    // Get Filter Values
    const fSchool = document.getElementById('filter-school').value.toLowerCase();
    const fPerson = document.getElementById('filter-person').value.toLowerCase();
    const fStatus = document.getElementById('filter-status').value.toLowerCase();
    const fAttendee = document.getElementById('filter-attendee').value.toLowerCase();
    const fContact = document.getElementById('filter-contact').value.toLowerCase();

    let html = '';
    let filteredCountGuests = 0;

    const filteredData = allData.filter(item => {
        const data = item.data;
        // Determine values same as display logic
        const isKBTK = data.type === 'KB_TK_ANAK_SALEH';
        let displaySchool = isKBTK ? (data.school_name || 'KB TK Anak Saleh') : (data.child_name || '-');
        let displayPerson = isKBTK ? (data.child_name || data.participant_name || '-') : (data.parent_name || '-');
        let displayAttendee = isKBTK ? '-' : (data.attendees || '-');
        let displayPhone = data.phone || '';
        let displayStatus = data.headmaster_status || '';

        // Check inclusion
        const matchSchool = displaySchool.toLowerCase().includes(fSchool);
        const matchPerson = displayPerson.toLowerCase().includes(fPerson);
        const matchStatus = fStatus === '' || displayStatus.toLowerCase() === fStatus;
        const matchAttendee = displayAttendee.toLowerCase().includes(fAttendee);
        const matchContact = displayPhone.toLowerCase().includes(fContact);

        return matchSchool && matchPerson && matchStatus && matchAttendee && matchContact;
    });

    if (filteredData.length === 0) {
        if (allData.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="p-8 text-center text-[#1c180d]/40 dark:text-white/40">
                        <div class="flex flex-col items-center gap-2">
                            <span class="material-symbols-outlined text-4xl opacity-20">inbox</span>
                            <span>Belum ada data pendaftar.</span>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="p-8 text-center text-[#1c180d]/40 dark:text-white/40">
                        <div class="flex flex-col items-center gap-2">
                            <span class="material-symbols-outlined text-4xl opacity-20">search_off</span>
                            <span>Tidak ditemukan data yang cocok.</span>
                        </div>
                    </td>
                </tr>
            `;
        }
        totalCountEl.innerText = '0';
        return;
    }

    filteredData.forEach(item => {
        const data = item.data;
        const rowNumber = item.rowNumber;
        const id = item.id;

        // Determine Data Type & Fields
        const isKBTK = data.type === 'KB_TK_ANAK_SALEH';

        let displaySchool = '-';
        let displayPerson = '-';
        let displayAttendee = '-';

        if (isKBTK) {
            displaySchool = data.school_name || 'KB TK Anak Saleh';
            displayPerson = data.child_name || data.participant_name || '-';
            displayAttendee = '-';
        } else {
            displaySchool = data.child_name || '-';
            displayPerson = data.parent_name || '-';
            displayAttendee = data.attendees || '-';
        }

        // Calculate Guests
        let guestsInRow = 0;
        if (isKBTK) {
            guestsInRow = 1;
        } else {
            // Count Headmaster ONLY if status is 'Hadir' and name exists
            if (data.parent_name && data.parent_name !== '-' && (data.headmaster_status === 'Hadir')) {
                guestsInRow++;
            }

            // Count Teachers (Attendees)
            if (data.attendees && data.attendees.trim() !== '-' && data.attendees.trim() !== '') {
                // Split by comma to count multiple teachers
                const teachers = data.attendees.split(',').filter(t => t.trim() !== '');
                guestsInRow += teachers.length;
            }
        }
        filteredCountGuests += guestsInRow;

        // Format Date
        let dateStr = '-';
        if (data.created_at) {
            try {
                const date = new Date(data.created_at);
                dateStr = date.toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                });
            } catch (e) {
                console.warn('Date parsing error', e);
                dateStr = data.created_at;
            }
        }

        html += `
            <tr class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td class="p-4 text-sm text-[#1c180d]/40 dark:text-white/40 font-mono group-hover:text-primary transition-colors">
                    #${rowNumber}
                </td>
                <td class="p-4 text-sm font-bold text-[#1c180d] dark:text-white uppercase">
                    ${escapeHtml(displaySchool)}
                </td>
                <td class="p-4 text-sm text-[#1c180d] dark:text-white capitalize">
                    ${escapeHtml(displayPerson)}
                </td>
                <td class="p-4 text-center">
                    ${(() => {
                const status = data.headmaster_status || '-';
                let badgeClass = 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/60';
                if (status === 'Hadir') {
                    badgeClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
                } else if (status === 'Tidak Hadir') {
                    badgeClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                }
                return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}">
                                ${escapeHtml(status)}
                            </span>`;
            })()
            }
                </td>
                <td class="p-4 text-sm text-[#1c180d] dark:text-white capitalize">
                    ${escapeHtml(displayAttendee)}
                </td>
                <td class="p-4 text-sm">
                    <div class="flex flex-col gap-1">
                        <a href="https://wa.me/${formatPhone(data.phone)}" target="_blank" class="text-[#1c180d] dark:text-white hover:text-green-500 flex items-center gap-1 w-fit">
                            <span class="material-symbols-outlined text-[10px] bg-green-100 text-green-600 rounded-full p-0.5">call</span>
                            ${escapeHtml(data.phone || '-')}
                        </a>
                    </div>
                </td>
                <td class="p-4 text-sm text-[#1c180d]/60 dark:text-white/60 text-xs whitespace-nowrap">
                    ${dateStr}
                </td>
                <td class="p-4 text-center">
                    <button onclick="deleteGuest('${id}')" class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-white/10 p-2 rounded-full transition-colors" title="Hapus Data">
                        <span class="material-symbols-outlined text-lg">delete</span>
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    totalCountEl.innerText = filteredCountGuests;
}

function escapeHtml(text) {
    if (!text) return text;
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatPhone(phone) {
    if (!phone) return '';
    let p = phone.replace(/\D/g, '');
    if (p.startsWith('0')) p = '62' + p.substring(1);
    return p;
}

window.deleteGuest = function (id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        window.db.collection('registrations').doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                // onSnapshot will auto refresh
            }).catch((error) => {
                console.error("Error removing document: ", error);
                alert("Gagal menghapus data: " + error.message);
            });
    }
};
