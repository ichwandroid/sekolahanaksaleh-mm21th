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



// Send E-Ticket (WhatsApp)
window.sendTicket = (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    if (!data.phone) {
        alert('No phone number available for this registrant.');
        return;
    }

    // Format phone number
    let phone = data.phone.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);

    // Message Content
    const message = `Assalamualaikum Wr. Wb.

Terima kasih Ayah/Bunda *${data.father_name} / ${data.mother_name}* telah mendaftar di acara *Milad Meriah 21th SD Anak Saleh*.

Data Pendaftaran:
Anak: ${data.child_name}
Kehadiran: ${data.attendance || '-'}
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
                <div class="flex flex-wrap gap-1 max-w-[200px]">
                    ${(row.child_name || '').split(',').map(child =>
            `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            ${child.trim()}
                        </span>`
        ).join('')}
                </div>
            </td>
            <td class="px-6 py-4 align-top whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${attendanceClass} border border-black/5">
                    ${attendanceLabel}
                </span>
            </td>
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

// View/Download Ticket
window.viewTicket = async (id) => {
    const data = allRegistrations.find(r => r.id === id);
    if (!data) return;

    try {
        const ticketData = {
            father: data.father_name,
            mother: data.mother_name,
            children: data.child_name,
            phone: data.phone,
            email: data.email,
            attendance: data.attendance,
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
        alert('Could not generate ticket. ' + err.message);
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
    drawField('Ayah', data.father);
    drawField('Ibu', data.mother);

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

    // Attendance Info
    let attendanceText = '-';
    if (data.attendance === 'ayah_saja') attendanceText = 'Ayah Saja';
    else if (data.attendance === 'ibu_saja') attendanceText = 'Ibu Saja';
    else if (data.attendance === 'ayah_bunda') attendanceText = 'Ayah & Bunda';

    drawField('Hadir', attendanceText);

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
