// Initialize Supabase - Using global variables from supabase-config.js
// No imports needed since we use <script src="js/supabase-config.js"> in HTML

const supabaseUrl = window.SUPABASE_URL;
const supabaseKey = window.SUPABASE_KEY;

const supabaseClient = (window.supabase && supabaseUrl && supabaseKey)
    ? window.supabase.createClient(supabaseUrl, supabaseKey)
    : null;

const tableBody = document.getElementById('registrations-table-body');
const totalStat = document.getElementById('stat-total');
const verifiedStat = document.getElementById('stat-verified');
const pendingStat = document.getElementById('stat-pending');
const refreshBtn = document.getElementById('btn-refresh');
const searchInput = document.getElementById('search-input');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const exportBtn = document.getElementById('btn-export-csv');

let allRegistrations = [];
let currentFilter = 'all';

// Custom Alert Logic
const alertModal = document.getElementById('custom-alert-modal');
const alertBackdrop = document.getElementById('alert-backdrop');
const alertPanel = document.getElementById('alert-panel');
const alertTitle = document.getElementById('alert-title');
const alertMessage = document.getElementById('alert-message');
const alertIcon = document.getElementById('alert-icon');
const alertIconWrapper = document.getElementById('alert-icon-wrapper');
const btnCloseAlert = document.getElementById('btn-close-alert');

// Custom Confirm Logic
const confirmModal = document.getElementById('custom-confirm-modal');
const confirmBackdrop = document.getElementById('confirm-backdrop');
const confirmPanel = document.getElementById('confirm-panel');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const btnCancelConfirm = document.getElementById('btn-cancel-confirm');
const btnOkConfirm = document.getElementById('btn-ok-confirm');

window.showCustomAlert = function (title, message, type = 'info') {
    if (!alertModal) {
        alert(message); // Fallback
        return;
    }

    alertTitle.innerText = title;
    alertMessage.innerText = message;

    // Reset classes
    alertIconWrapper.className = 'p-4 rounded-full mb-2 border-4 border-white dark:border-[#2c2618] shadow-lg';
    alertIcon.className = 'material-symbols-outlined text-4xl';
    btnCloseAlert.className = 'w-full py-3 font-bold text-sm rounded-xl transition-transform active:scale-95 shadow-lg';

    let iconName = 'info';

    if (type === 'success') {
        iconName = 'check_circle';
        alertIconWrapper.classList.add('bg-green-100');
        alertIcon.classList.add('text-green-600');
        btnCloseAlert.classList.add('bg-green-500', 'text-white', 'hover:bg-green-600', 'shadow-green-500/20');
    } else if (type === 'error') {
        iconName = 'error';
        alertIconWrapper.classList.add('bg-red-100');
        alertIcon.classList.add('text-red-600');
        btnCloseAlert.classList.add('bg-red-500', 'text-white', 'hover:bg-red-600', 'shadow-red-500/20');
    } else if (type === 'warning') {
        iconName = 'warning';
        alertIconWrapper.classList.add('bg-amber-100');
        alertIcon.classList.add('text-amber-600');
        btnCloseAlert.classList.add('bg-amber-500', 'text-white', 'hover:bg-amber-600', 'shadow-amber-500/20');
    } else {
        // Info
        iconName = 'info';
        alertIconWrapper.classList.add('bg-primary/10');
        alertIcon.classList.add('text-primary');
        btnCloseAlert.classList.add('bg-primary', 'text-[#1c180d]', 'hover:bg-primary/90', 'shadow-primary/20');
    }
    alertIcon.innerText = iconName;

    alertModal.classList.remove('hidden');
    alertBackdrop.classList.remove('opacity-0');
    alertPanel.classList.remove('opacity-0', 'scale-95');
};

function closeAlert() {
    alertBackdrop.classList.add('opacity-0');
    alertPanel.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        alertModal.classList.add('hidden');
    }, 300);
}

if (btnCloseAlert) {
    btnCloseAlert.onclick = closeAlert;
}
if (alertBackdrop) {
    alertBackdrop.onclick = closeAlert;
}

// Custom Confirm
window.showCustomConfirm = function (title, message) {
    return new Promise((resolve) => {
        if (!confirmModal) {
            resolve(confirm(message)); // Fallback
            return;
        }

        confirmTitle.innerText = title;
        confirmMessage.innerText = message;

        confirmModal.classList.remove('hidden');
        confirmBackdrop.classList.remove('opacity-0');
        confirmPanel.classList.remove('opacity-0', 'scale-95');

        const closeConfirm = (result) => {
            confirmBackdrop.classList.add('opacity-0');
            confirmPanel.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                confirmModal.classList.add('hidden');
            }, 300);
            resolve(result);
        };

        btnOkConfirm.onclick = () => closeConfirm(true);
        btnCancelConfirm.onclick = () => closeConfirm(false);
        confirmBackdrop.onclick = () => closeConfirm(false);
    });
};

// Edit Modal Elements
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');
const btnSaveEdit = document.getElementById('btn-save-edit');

// Edit & Delete Logic (Global)
window.deleteRegistration = async (id) => {
    const confirmed = await window.showCustomConfirm('Konfirmasi Hapus', 'Apakah Anda yakin ingin menghapus data pendaftaran ini?');
    if (!confirmed) return;

    try {
        // We select the deleted row to ensure it was actually deleted
        const { data, error } = await supabaseClient
            .from('registrations')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        // Check if any row was actually deleted
        if (!data || data.length === 0) {
            throw new Error('Deletion failed. Policy might not allow deleting this record.');
        }

        const deletedRecord = data[0];

        // Delete the proof image from storage if it exists
        if (deletedRecord.proof_url) {
            try {
                // Extract filename from URL
                // URL format: .../registration-proofs/[filename]
                const urlParts = deletedRecord.proof_url.split('/');
                const fileName = urlParts[urlParts.length - 1];

                if (fileName) {
                    const { error: storageError } = await supabaseClient.storage
                        .from('registration-proofs')
                        .remove([fileName]);

                    if (storageError) {
                        console.warn('Failed to delete proof image:', storageError);
                    } else {
                        console.log('Proof image deleted:', fileName);
                    }
                }
            } catch (err) {
                console.warn('Error deleting file from storage:', err);
            }
        }

        // Remove from local array and re-render
        allRegistrations = allRegistrations.filter(r => r.id !== id);
        updateStats();
        renderCharts(allRegistrations);
        renderTable(allRegistrations);
        window.showCustomAlert('Berhasil', 'Data berhasil dihapus.', 'success');

    } catch (error) {
        console.error('Error deleting:', error);
        window.showCustomAlert('Gagal Menghapus', 'Gagal menghapus data: ' + error.message + '. Periksa Supabase RLS policies.', 'error');
    }
};

window.openEditModal = (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    document.getElementById('edit-id').value = data.id;
    document.getElementById('edit-parent').value = data.parent_name;
    document.getElementById('edit-children').value = data.child_name;
    // document.getElementById('edit-attendance').value = data.attendance || 'ayah_saja'; // Removed
    document.getElementById('edit-phone').value = data.phone;
    document.getElementById('edit-email').value = data.email;

    editModal.classList.remove('hidden');
};

function closeEditModal() {
    editModal.classList.add('hidden');
}

if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', closeEditModal);
}

// Verify Payment
window.verifyPayment = async (id, status) => {
    try {
        const { error } = await supabaseClient
            .from('registrations')
            .update({ payment_status: status })
            .eq('id', id);

        if (error) throw error;

        // Update local data
        const index = allRegistrations.findIndex(r => r.id === id);
        if (index !== -1) {
            allRegistrations[index].payment_status = status;
        }

        updateStats();
        renderTable(allRegistrations);

        if (status === 'verified') {
            window.showCustomAlert('Berhasil', 'Pembayaran berhasil diverifikasi!', 'success');
        } else {
            window.showCustomAlert('Berhasil', 'Pembayaran ditolak.', 'warning');
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        window.showCustomAlert('Gagal', 'Gagal memverifikasi pembayaran: ' + error.message, 'error');
    }
};

// ... (Verification Logic omitted) ...

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const btnText = btnSaveEdit.innerHTML;

    btnSaveEdit.disabled = true;
    btnSaveEdit.innerHTML = 'Saving...';

    const updates = {
        parent_name: document.getElementById('edit-parent').value,
        child_name: document.getElementById('edit-children').value,
        // attendance: document.getElementById('edit-attendance').value, // Removed
        phone: document.getElementById('edit-phone').value,
        email: document.getElementById('edit-email').value,
    };

    try {
        const { error } = await supabaseClient
            .from('registrations')
            .update(updates)
            .eq('id', id);

        if (error) throw error;

        // Update local data
        const index = allRegistrations.findIndex(r => r.id == id);
        if (index !== -1) {
            allRegistrations[index] = { ...allRegistrations[index], ...updates };
        }

        renderCharts(allRegistrations);
        renderTable(allRegistrations);
        closeEditModal();
        window.showCustomAlert('Berhasil', 'Data berhasil diperbarui!', 'success');

    } catch (error) {
        // ... error handling
        console.error('Error updating:', error);
        window.showCustomAlert('Gagal Memperbarui', 'Gagal memperbarui data: ' + error.message, 'error');
    } finally {
        btnSaveEdit.disabled = false;
        btnSaveEdit.innerHTML = btnText;
    }
});



// Send E-Ticket (WhatsApp)
window.sendTicket = (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    if (!data.phone) {
        window.showCustomAlert('Info', 'Nomor telepon tidak tersedia untuk pendaftar ini.', 'warning');
        return;
    }

    // Format phone number
    let phone = data.phone.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);

    // Message Content
    const message = `Assalamualaikum Wr. Wb.

Terima kasih Ayah/Bunda *${data.parent_name}* telah mendaftar di acara *Milad Meriah 21th SD Anak Saleh*.

Data Pendaftaran:
Anak: ${data.child_name}
Status: ${data.payment_status === 'verified' ? 'Terverifikasi ✅' : 'Menunggu Verifikasi ⏳'}

Silakan simpan pesan ini sebagai bukti pendaftaran.
E-Ticket Anda akan diverifikasi di meja registrasi.

Sampai jumpa di lokasi!
Wassalamualaikum Wr. Wb.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};


// Format Date Helper
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }).format(date);
}

// Update Stats
function updateStats() {
    totalStat.textContent = allRegistrations.length;
    const verified = allRegistrations.filter(r => r.payment_status === 'verified').length;
    const pending = allRegistrations.filter(r => !r.payment_status || r.payment_status === 'pending').length;
    verifiedStat.textContent = verified;
    pendingStat.textContent = pending;
}

// Filter Logic
function getFilteredData() {
    if (currentFilter === 'all') return allRegistrations;
    if (currentFilter === 'verified') return allRegistrations.filter(r => r.payment_status === 'verified');
    if (currentFilter === 'pending') return allRegistrations.filter(r => !r.payment_status || r.payment_status === 'pending');
    return allRegistrations;
}

// Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-primary', 'text-white');
            b.classList.add('bg-gray-100', 'dark:bg-[#221d10]', 'text-[#1c180d]', 'dark:text-white');
        });
        e.target.classList.add('active', 'bg-primary', 'text-white');
        e.target.classList.remove('bg-gray-100', 'dark:bg-[#221d10]', 'text-[#1c180d]', 'dark:text-white');

        currentFilter = e.target.dataset.filter;
        renderTable(getFilteredData());
    });
});

// Fetch Data
async function fetchRegistrations() {
    if (!supabaseClient) {
        console.error('Supabase not configured');
        tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-red-500">Supabase not configured. Check console.</td></tr>`;
        return;
    }

    try {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<span class="animate-spin material-symbols-outlined text-sm">sync</span> Loading...';

        const { data, error } = await supabaseClient
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        allRegistrations = data || [];
        updateStats();
        renderCharts(allRegistrations);
        renderTable(allRegistrations);

    } catch (error) {
        console.error('Error fetching data:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-8 text-center text-red-500">
                    <p class="font-bold">Error loading data</p>
                    <p class="text-xs">${error.message}</p>
                    ${error.code === '42P01' ? '<p class="text-xs mt-2 text-[#1c180d]/60">Hint: Table "registrations" might not exist yet.</p>' : ''}
                </td>
            </tr>
        `;
    } finally {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '<span class="material-symbols-outlined">refresh</span> Refresh Data';
    }
}

// Chart Instances
let homebaseChartInstance = null;
let classChartInstance = null;

function renderCharts(data) {
    // Process Homebase Data
    const homebaseCounts = { 'Merah': 0, 'Kuning': 0, 'Hijau': 0, 'Biru': 0, 'Ungu': 0 };

    // Process Class Data
    const classCounts = {};

    data.forEach(row => {
        // Homebase
        if (row.homebase) {
            row.homebase.split(',').forEach(hb => {
                const key = hb.trim();
                if (homebaseCounts.hasOwnProperty(key)) {
                    homebaseCounts[key]++;
                }
            });
        }

        // Class
        if (row.child_name) {
            row.child_name.split(',').forEach(child => {
                const match = child.match(/\((.*?)\)/);
                if (match && match[1]) {
                    const cls = match[1].trim();
                    classCounts[cls] = (classCounts[cls] || 0) + 1;
                }
            });
        }
    });

    // Homebase Chart
    const ctxHb = document.getElementById('homebaseChart').getContext('2d');
    if (homebaseChartInstance) homebaseChartInstance.destroy();

    homebaseChartInstance = new Chart(ctxHb, {
        type: 'bar',
        data: {
            labels: Object.keys(homebaseCounts),
            datasets: [{
                label: 'Peserta',
                data: Object.values(homebaseCounts),
                backgroundColor: [
                    '#ef4444', // Merah
                    '#eab308', // Kuning
                    '#22c55e', // Hijau
                    '#3b82f6', // Biru
                    '#a855f7'  // Ungu
                ],
                borderWidth: 0,
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, precision: 0 },
                    grid: { display: true, color: 'rgba(0,0,0,0.05)' },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Class Chart
    const ctxCls = document.getElementById('classChart').getContext('2d');
    if (classChartInstance) classChartInstance.destroy();

    // Sort classes alphanumeric (1A, 1B, 2A...)
    const sortedClasses = Object.keys(classCounts).sort();

    // Create Gradient for Class Chart
    const gradient = ctxCls.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#f78dbb');
    gradient.addColorStop(1, '#f472b6');

    classChartInstance = new Chart(ctxCls, {
        type: 'bar',
        data: {
            labels: sortedClasses,
            datasets: [{
                label: 'Students',
                data: sortedClasses.map(c => classCounts[c]),
                backgroundColor: gradient,
                borderRadius: 4,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, precision: 0 },
                    grid: { display: true, color: 'rgba(0,0,0,0.05)' },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Render Table
function renderTable(data) {
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-[#1c180d]/40 dark:text-white/40">No registrations found yet.</td></tr>`;
        return;
    }

    tableBody.innerHTML = data.map(row => {
        return `
        <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <td class="px-6 py-4 align-top whitespace-nowrap">
                <span class="text-xs font-mono text-[#1c180d]/60 dark:text-white/60">${formatDate(row.created_at)}</span>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-col">
                    <span class="font-bold text-[#1c180d] dark:text-white">${row.parent_name || '-'}</span>
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-wrap gap-1 max-w-[200px]">
                    ${(row.child_name || '').split(',').map(child =>
            `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            ${child.trim()}
                        </span>`
        ).join('')}
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-wrap gap-1 max-w-[150px]">
                     ${(row.homebase || '').split(',').map(hb => {
            const colors = {
                'Merah': 'bg-red-100 text-red-800 border-red-200',
                'Kuning': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                'Hijau': 'bg-green-100 text-green-800 border-green-200',
                'Biru': 'bg-blue-100 text-blue-800 border-blue-200',
                'Ungu': 'bg-purple-100 text-purple-800 border-purple-200',
            };
            const colorClass = colors[hb.trim()] || 'bg-gray-100 text-gray-800 border-gray-200';
            return hb.trim() ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorClass}">${hb.trim()}</span>` : '-';
        }).join('')}
                </div>
            </td>
            <!-- Attendance Removed -->
            <td class="px-6 py-4 align-top">
                <div class="flex flex-col gap-1 text-xs">
                    <a href="https://wa.me/${(row.phone || '').replace(/^0/, '62').replace(/\D/g, '')}" target="_blank" class="flex items-center gap-1 hover:text-green-500 transition-colors font-medium">
                        <span class="material-symbols-outlined text-sm">chat</span>
                        ${row.phone || '-'}
                    </a>
                    <a href="mailto:${row.email}" class="flex items-center gap-1 hover:text-blue-500 transition-colors text-[#1c180d]/60 dark:text-white/60">
                        <span class="material-symbols-outlined text-sm">mail</span>
                        ${row.email || '-'}
                    </a>
                </div>
            </td>
            <td class="px-6 py-4 align-top whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${row.infaq_status === 'yes' || row.proof_url ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} border border-black/5">
                    ${row.infaq_status === 'yes' || row.proof_url ? 'Yes' : 'No'}
                </span>
            </td>
            <td class="px-6 py-4 align-top">
                ${row.proof_url ? `
                    <button onclick="window.previewImage('${row.proof_url}')" class="relative group/img overflow-hidden rounded-lg w-12 h-12 bg-gray-100 border border-black/10 shrink-0">
                        <img src="${row.proof_url}" alt="Proof" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <span class="material-symbols-outlined text-white text-lg">visibility</span>
                        </div>
                    </button>
                ` : '<span class="text-xs text-[#1c180d]/40 italic">Empty</span>'}
            </td>
            <td class="px-6 py-4 align-top whitespace-nowrap">
                ${row.payment_status === 'verified' ? `
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        <span class="material-symbols-outlined text-sm mr-1">check_circle</span>
                        Verified
                    </span>
                ` : `
                    <div class="flex items-center gap-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                            <span class="material-symbols-outlined text-sm mr-1">pending</span>
                            Pending
                        </span>
                        <div class="flex gap-1" title="Quick Verify">
                            <button onclick="window.verifyPayment(${row.id}, 'verified')" 
                                class="w-6 h-6 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded border border-green-200 transition-colors">
                                <span class="material-symbols-outlined text-sm">check</span>
                            </button>
                            <button onclick="window.verifyPayment(${row.id}, 'rejected')" 
                                class="w-6 h-6 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded border border-red-200 transition-colors">
                                <span class="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </div>
                `}
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex items-center justify-start gap-1">
                    <button onclick="window.viewTicket(${row.id})" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download E-Ticket">
                         <span class="material-symbols-outlined text-xl">download</span>
                    </button>
                    <button onclick="window.sendTicket(${row.id})" class="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Send E-Ticket (WA)">
                         <span class="material-symbols-outlined text-xl">confirmation_number</span>
                    </button>
                    <button onclick="window.openEditModal(${row.id})" class="p-1.5 text-[#1c180d]/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <span class="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button onclick="window.deleteRegistration(${row.id})" class="p-1.5 text-[#1c180d]/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <span class="material-symbols-outlined text-xl">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    `}).join('');
}

// ...

// Export CSV
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        const csv = [
            ['Date', 'Parent', 'Children', 'Homebase', 'Phone', 'Email', 'Status'],
            ...allRegistrations.map(r => [
                new Date(r.created_at).toLocaleDateString('id-ID'),
                r.parent_name,
                r.child_name,
                r.homebase || '', // New Column
                r.phone,
                r.email,
                r.payment_status || 'pending'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allRegistrations.filter(row =>
        (row.parent_name || '').toLowerCase().includes(term) ||
        (row.child_name || '').toLowerCase().includes(term) ||
        (row.phone || '').includes(term) ||
        (row.email || '').toLowerCase().includes(term)
    );
    renderTable(filtered);
});

// Image Preview Helper (Global)
window.previewImage = (url) => {
    modalImage.src = url;
    imageModal.classList.remove('hidden');
};

// Refresh Button
refreshBtn.addEventListener('click', fetchRegistrations);

// View/Download Ticket
window.viewTicket = async (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    try {
        const ticketData = {
            parent_name: data.parent_name,
            children: data.child_name,
            phone: data.phone,
            email: data.email,
            // attendance: data.attendance, // Removed
            id: data.id,
            date: new Date(data.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        };

        // Use proof_url as the image source for the ticket
        const ticketUrl = await generateTicket(ticketData, data.proof_url);

        // Open in new tab (or download)
        // Opening generated base64 URL in new tab might remain blank in some browsers due to security
        // So we create a temporary image in a modal or force download.

        // Option A: Force Download
        const link = document.createElement('a');
        link.href = ticketUrl;
        link.download = `E-Ticket_Milad21_${data.phone}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        console.error('Error generating ticket:', err);
        window.showCustomAlert('Gagal', 'Tidak dapat membuat tiket: ' + err.message, 'error');
    }
};

// Helper: Generate Ticket Image (Identical to registration.js)
async function generateTicket(data, proofImgUrl) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 1200;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header Background
    ctx.fillStyle = '#f78dbb';
    ctx.fillRect(0, 0, canvas.width, 180);

    // Load and draw logo
    try {
        const logo = new Image();
        logo.crossOrigin = "Anonymous";
        await new Promise((resolve, reject) => {
            logo.onload = resolve;
            logo.onerror = reject;
            logo.src = './SD Anak Saleh.png';
        });
        // Draw logo on the left side
        ctx.drawImage(logo, 40, 40, 100, 100);
    } catch (e) {
        console.warn('Logo failed to load:', e);
    }

    // Header Text (positioned to the right of logo)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('E-TICKET PARENTING', 160, 75);
    ctx.font = '24px sans-serif';
    ctx.fillText('MILAD 21 TAHUN SD ANAK SALEH', 160, 115);

    // QR Code Generation
    try {
        const qrData = JSON.stringify({ id: data.id, checkin: true });
        const qrUrl = await QRCode.toDataURL(qrData, { width: 200, margin: 1, color: { dark: '#1c180d', light: '#ffffff' } });
        const qrImg = new Image();
        await new Promise((resolve) => {
            qrImg.onload = resolve;
            qrImg.src = qrUrl;
        });
        // Draw QR Code Top Right
        ctx.drawImage(qrImg, canvas.width - 180, 20, 140, 140);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(data.id.toString().slice(0, 8).toUpperCase(), canvas.width - 110, 170);

    } catch (e) {
        console.error('QR Gen Error:', e);
    }

    // Info Section
    ctx.fillStyle = '#1c180d';
    ctx.textAlign = 'left';

    let y = 250;
    const x = 50;
    const lineHeight = 60;

    // Title
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('DETAIL PENDAFTARAN', x, y);

    // Line separator
    ctx.strokeStyle = '#f78dbb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(canvas.width - x, y + 20);
    ctx.stroke();

    y += 80;
    ctx.font = '24px sans-serif'; // Label font

    const drawField = (label, value) => {
        ctx.fillStyle = '#888888';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(label, x, y);

        ctx.fillStyle = '#000000';
        ctx.font = '28px sans-serif';
        ctx.fillText(value || '-', x + 250, y);

        y += lineHeight;
    };

    drawField('Tanggal', data.date);
    drawField('Nama Lengkap', data.parent_name);
    // drawField('Ibu', data.mother); // Removed

    // Handle multi-line children
    const childs = data.children.split(',');
    ctx.fillStyle = '#888888';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Anak', x, y);
    ctx.fillStyle = '#000000';
    ctx.font = '28px sans-serif';
    childs.forEach((child, i) => {
        ctx.fillText((i === 0 ? '' : '') + child.trim(), x + 250, y);
        y += 40;
    });
    y += 20;

    drawField('No HP', data.phone);
    drawField('Email', data.email);

    // Attendance Info Removed

    // Proof Section
    y += 40;
    ctx.fillStyle = '#1c180d';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('BUKTI INFAQ', x, y);
    y += 20;
    // Line separator
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(canvas.width - x, y + 10);
    ctx.stroke();

    y += 50;

    if (proofImgUrl) {
        try {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                // If it takes too long or fails, we just skip drawing it
                img.onerror = resolve;
                img.src = proofImgUrl;
            });

            if (img.width > 0) {
                const maxWidth = canvas.width - 100;
                const maxHeight = 350;
                const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                const w = img.width * ratio;
                const h = img.height * ratio;
                const imgX = (canvas.width - w) / 2;
                ctx.drawImage(img, imgX, y, w, h);
            }
        } catch (e) {
            ctx.fillStyle = '#888888';
            ctx.font = 'italic 20px sans-serif';
            ctx.fillText('(Gambar tidak dapat dimuat)', x, y + 30);
        }
    } else {
        ctx.fillStyle = '#888888';
        ctx.font = 'italic 20px sans-serif';
        ctx.fillText('(Tidak ada bukti pembayaran)', x, y + 30);
    }

    // Footer
    const footerY = canvas.height - 60;
    ctx.fillStyle = '#f78dbb';
    ctx.fillRect(0, footerY - 40, canvas.width, 100);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'italic 24px sans-serif';
    ctx.fillText('Simpan tiket ini dan tunjukkan saat registrasi ulang.', canvas.width / 2, footerY + 10);

    return canvas.toDataURL('image/jpeg', 0.85);
}

// Initial Load
document.addEventListener('DOMContentLoaded', fetchRegistrations);
