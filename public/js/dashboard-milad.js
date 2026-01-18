import { SUPABASE_URL, SUPABASE_KEY } from './supabase-config.js';

// Initialize Supabase
const supabase = (window.supabase && SUPABASE_URL && SUPABASE_KEY)
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

const tableBody = document.getElementById('registrations-table-body');
const totalStat = document.getElementById('stat-total');
const refreshBtn = document.getElementById('btn-refresh');
const searchInput = document.getElementById('search-input');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

let allRegistrations = [];

// Format Date Helper
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }).format(date);
}

// Fetch Data
async function fetchRegistrations() {
    if (!supabase) {
        console.error('Supabase not configured');
        tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-red-500">Supabase not configured. Check console.</td></tr>`;
        return;
    }

    try {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<span class="animate-spin material-symbols-outlined text-sm">sync</span> Loading...';

        const { data, error } = await supabase
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
                <td colspan="6" class="px-6 py-8 text-center text-red-500">
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
        tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-[#1c180d]/40 dark:text-white/40">No registrations found yet.</td></tr>`;
        return;
    }

    tableBody.innerHTML = data.map(row => `
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
                ${row.proof_url ? `
                    <button onclick="window.previewImage('${row.proof_url}')" class="relative group/img overflow-hidden rounded-lg w-16 h-12 bg-gray-100 border border-black/10">
                        <img src="${row.proof_url}" alt="Proof" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <span class="material-symbols-outlined text-white text-lg">visibility</span>
                        </div>
                    </button>
                ` : '<span class="text-xs text-[#1c180d]/40">No proof</span>'}
            </td>
            <td class="px-6 py-4 align-top text-right">
                <button class="text-[#1c180d]/40 hover:text-red-500 transition-colors" title="Delete (coming soon)">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    `).join('');
}

// Update Stats
function updateStats() {
    totalStat.textContent = allRegistrations.length;
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
