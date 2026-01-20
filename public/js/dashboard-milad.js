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

// Edit Modal Elements
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const btnCancelEdit = document.getElementById('btn-cancel-edit');
const btnSaveEdit = document.getElementById('btn-save-edit');

// Edit & Delete Logic (Global)
window.deleteRegistration = async (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;

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
        renderTable(allRegistrations);
        alert('Data deleted successfully.');

    } catch (error) {
        console.error('Error deleting:', error);
        alert('Failed to delete: ' + error.message + '\n\nHint: Check Supabase RLS policies.');
    }
};

window.openEditModal = (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    document.getElementById('edit-id').value = data.id;
    document.getElementById('edit-father').value = data.father_name;
    document.getElementById('edit-mother').value = data.mother_name;
    document.getElementById('edit-children').value = data.child_name;
    document.getElementById('edit-attendance').value = data.attendance || 'ayah_saja'; // Default
    document.getElementById('edit-phone').value = data.phone;
    document.getElementById('edit-email').value = data.email;

    editModal.classList.remove('hidden');
};

// ... (Verification Logic omitted) ...

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const btnText = btnSaveEdit.innerHTML;

    btnSaveEdit.disabled = true;
    btnSaveEdit.innerHTML = 'Saving...';

    const updates = {
        father_name: document.getElementById('edit-father').value,
        mother_name: document.getElementById('edit-mother').value,
        child_name: document.getElementById('edit-children').value,
        attendance: document.getElementById('edit-attendance').value,
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

        renderTable(allRegistrations);
        closeEditModal();
        alert('Update successful!');

    } catch (error) {
        // ... error handling
        console.error('Error updating:', error);
        alert('Failed to update: ' + error.message);
    } finally {
        btnSaveEdit.disabled = false;
        btnSaveEdit.innerHTML = btnText;
    }
});



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

// Render Table
function renderTable(data) {
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-[#1c180d]/40 dark:text-white/40">No registrations found yet.</td></tr>`;
        return;
    }

    tableBody.innerHTML = data.map(row => {
        let attendanceLabel = '-';
        let attendanceClass = 'bg-gray-100 text-gray-600';

        if (row.attendance === 'ayah_saja') {
            attendanceLabel = 'Ayah Saja';
            attendanceClass = 'bg-blue-100 text-blue-700';
        } else if (row.attendance === 'ibu_saja') {
            attendanceLabel = 'Ibu Saja';
            attendanceClass = 'bg-pink-100 text-pink-700';
        } else if (row.attendance === 'ayah_bunda') {
            attendanceLabel = 'Ayah & Bunda';
            attendanceClass = 'bg-purple-100 text-purple-700';
        }

        return `
        <tr class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            <td class="px-6 py-4 align-top whitespace-nowrap">
                <span class="text-xs font-mono text-[#1c180d]/60 dark:text-white/60">${formatDate(row.created_at)}</span>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-col">
                    <span class="font-bold text-[#1c180d] dark:text-white">${row.father_name || '-'}</span>
                    <span class="text-xs text-[#1c180d]/60 dark:text-white/60">Mother: ${row.mother_name || '-'}</span>
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-col gap-1">
                    ${(row.child_name || '').split(',').map(child =>
            `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary w-fit">
                            ${child.trim()}
                        </span>`
        ).join('')}
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${attendanceClass}">
                    ${attendanceLabel}
                </span>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex flex-col gap-1 text-sm">
                    <a href="https://wa.me/${(row.phone || '').replace(/^0/, '62').replace(/\D/g, '')}" target="_blank" class="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <span class="material-symbols-outlined text-sm">chat</span>
                        ${row.phone || '-'}
                    </a>
                    <a href="mailto:${row.email}" class="flex items-center gap-1 hover:text-blue-500 transition-colors text-[#1c180d]/60 dark:text-white/60 text-xs">
                        <span class="material-symbols-outlined text-sm">mail</span>
                        ${row.email || '-'}
                    </a>
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${row.infaq_status === 'yes' || row.proof_url ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                    ${row.infaq_status === 'yes' || row.proof_url ? 'Yes' : 'No'}
                </span>
            </td>
            <td class="px-6 py-4 align-top">
                ${row.proof_url ? `
                    <button onclick="window.previewImage('${row.proof_url}')" class="relative group/img overflow-hidden rounded-lg w-16 h-12 bg-gray-100 border border-black/10">
                        <img src="${row.proof_url}" alt="Proof" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <span class="material-symbols-outlined text-white text-lg">visibility</span>
                        </div>
                    </button>
                ` : '<span class="text-xs text-[#1c180d]/40">No proof</span>'}
            </td>
            <td class="px-6 py-4 align-top">
                ${row.payment_status === 'verified' ? `
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <span class="material-symbols-outlined text-sm mr-1">check_circle</span>
                        Verified
                    </span>
                ` : `
                    <div class="flex flex-col gap-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 w-fit">
                            <span class="material-symbols-outlined text-sm mr-1">pending</span>
                            Pending
                        </span>
                        <div class="flex gap-1">
                            <button onclick="window.verifyPayment(${row.id}, 'verified')" 
                                class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-bold transition-colors"
                                title="Approve">
                                ✓
                            </button>
                            <button onclick="window.verifyPayment(${row.id}, 'rejected')" 
                                class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold transition-colors"
                                title="Reject">
                                ✗
                            </button>
                        </div>
                    </div>
                `}
            </td>
            <td class="px-6 py-4 align-top text-right">
                <div class="flex justify-end gap-2">
                    <button onclick="window.openEditModal(${row.id})" class="text-[#1c180d]/40 hover:text-primary transition-colors" title="Edit">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button onclick="window.deleteRegistration(${row.id})" class="text-[#1c180d]/40 hover:text-red-500 transition-colors" title="Delete">
                        <span class="material-symbols-outlined">delete</span>
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
            ['Date', 'Father', 'Mother', 'Children', 'Attendance', 'Phone', 'Email', 'Status'],
            ...allRegistrations.map(r => [
                new Date(r.created_at).toLocaleDateString('id-ID'),
                r.father_name,
                r.mother_name,
                r.child_name,
                r.attendance || '-',
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
        (row.father_name || '').toLowerCase().includes(term) ||
        (row.mother_name || '').toLowerCase().includes(term) ||
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

// Initial Load
document.addEventListener('DOMContentLoaded', fetchRegistrations);
