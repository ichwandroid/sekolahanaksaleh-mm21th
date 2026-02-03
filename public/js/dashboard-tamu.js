// Dashboard Tamu Script
// Displays data from 'registrations' collection

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

    const tableBody = document.getElementById('guest-table-body');
    const totalCountEl = document.getElementById('total-count');

    console.log("Listening to registrations...");

    // Subscribe to updates
    window.db.collection('registrations')
        .orderBy('created_at', 'desc')
        .onSnapshot((snapshot) => {
            if (snapshot.empty) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="p-8 text-center text-[#1c180d]/40 dark:text-white/40">
                            <div class="flex flex-col items-center gap-2">
                                <span class="material-symbols-outlined text-4xl opacity-20">inbox</span>
                                <span>Belum ada data pendaftar.</span>
                            </div>
                        </td>
                    </tr>
                `;
                totalCountEl.innerText = '0';
                return;
            }

            let totalGuests = 0;
            const totalDocs = snapshot.size;
            let html = '';

            snapshot.docs.forEach((doc, index) => {
                const data = doc.data();
                const rowNumber = totalDocs - index; // 5, 4, 3, 2, 1 for newest first

                // Calculate Guests for this registration
                let guestsInRow = 0;
                if (data.parent_name) guestsInRow++;
                if (data.attendees && data.attendees.trim() !== '-' && data.attendees.trim() !== '') guestsInRow++;

                totalGuests += guestsInRow;

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
                            ${escapeHtml(data.child_name || '-')}
                        </td>
                        <td class="p-4 text-sm text-[#1c180d] dark:text-white capitalize">
                            ${escapeHtml(data.parent_name || '-')}
                        </td>
                        <td class="p-4 text-sm text-[#1c180d] dark:text-white capitalize">
                            ${escapeHtml(data.attendees || '-')}
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
                            <button onclick="deleteGuest('${doc.id}')" class="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-white/10 p-2 rounded-full transition-colors" title="Hapus Data">
                                <span class="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </td>
                    </tr>
                `;
            });

            totalCountEl.innerText = totalGuests;
            tableBody.innerHTML = html;

        }, (error) => {
            console.error("Error fetching documents: ", error);

            // Check for index error (common with compound queries)
            let msg = 'Gagal memuat data.';
            if (error.message.includes('requires an index')) {
                msg = 'Firestore Index Required. Check console for link to create index.';
            }

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-8 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl m-4">
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
                // No need to reload, onSnapshot will handle it
            }).catch((error) => {
                console.error("Error removing document: ", error);
                alert("Gagal menghapus data: " + error.message);
            });
    }
};
