
// Initialize Supabase - USER MUST REPLACE THESE VALUES
const SUPABASE_URL = 'https://gduolkjqwodzrvrgzcrm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdW9sa2tqcXdvZHpydmd6Y3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTU1NzQsImV4cCI6MjA4NDAzMTU3NH0.TJoNbBk7FPmp_U03IXTsW62XvmhG7cBurinZdoSUzz0';

// Check if variables are set
if (SUPABASE_URL === 'https://gduolkjqwodzrvrgzcrm.supabase.co') {
    console.warn('Supabase URL and Key not set in js/registration.js');
}

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Mock Data for Students (Replace with real DB fetch if available)
const STUDENTS_DATA = {
    "1A": ["Ahmad Zulkarnain", "Aisyah Putri", "Budi Santoso"],
    "1B": ["Citra Dewi", "Doni Pratama", "Eka Saputra"],
    "2A": ["Fajar Nugraha", "Gita Pertiwi", "Hadi Susanto"],
    "2B": ["Indah Sari", "Joko Widodo", "Kartika Putri"],
    "3A": ["Lestari", "Muhammad Rizky", "Nadia Safitri"],
    "3B": ["Olivia", "Putu Gede", "Qoriah"],
    "4A": ["Rina Wati", "Samsul Arifin", "Taufik Hidayat"],
    "4B": ["Usman", "Vina Panduwinata", "Wahyu"],
    "5A": ["Xavier", "Yuni Shara", "Zainal Abidin"],
    "5B": ["Abdul Somad", "Bambang Pamungkas", "Cinta Laura"],
    "6A": ["Dedy Corbuzier", "Erik Tohir", "Fatin Shidqia"],
    "6B": ["Gading Marten", "Hesti Purwadinata", "Irfan Hakim"]
};

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById('btn-register-cta');
    const modal = document.getElementById('registration-modal');
    const btnClose = document.getElementById('btn-close-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPanel = document.getElementById('modal-panel');
    const form = document.getElementById('registration-form');
    const submitBtn = document.getElementById('btn-submit-registration');

    // Children Management
    const childrenContainer = document.getElementById('children-container');
    const btnAddChild = document.getElementById('btn-add-child');

    function createChildRow(index) {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-start opacity-0 transform translate-y-2 transition-all duration-300'; // Animation ready
        div.innerHTML = `
            <div class="w-1/3">
                <select class="class-select w-full bg-[#f8f7f5] dark:bg-[#221d10] border-0 rounded-xl px-3 py-3 text-xs text-[#1c180d] dark:text-white focus:ring-2 focus:ring-primary" required>
                    <option value="">Kelas</option>
                    ${Object.keys(STUDENTS_DATA).map(cls => `<option value="${cls}">${cls}</option>`).join('')}
                </select>
            </div>
            <div class="w-2/3 relative">
                <select class="name-select w-full bg-[#f8f7f5] dark:bg-[#221d10] border-0 rounded-xl px-3 py-3 text-xs text-[#1c180d] dark:text-white focus:ring-2 focus:ring-primary disabled:opacity-50" required disabled>
                    <option value="">Pilih Nama Anak</option>
                </select>
            </div>
            ${index > 0 ? `<button type="button" class="btn-remove-child text-red-500 hover:text-red-700 p-2"><span class="material-symbols-outlined text-lg">delete</span></button>` : ''}
        `;

        // Logic for this row
        const classSelect = div.querySelector('.class-select');
        const nameSelect = div.querySelector('.name-select');
        const removeBtn = div.querySelector('.btn-remove-child');

        classSelect.addEventListener('change', () => {
            const selectedClass = classSelect.value;
            nameSelect.innerHTML = '<option value="">Pilih Nama Anak</option>';

            if (selectedClass && STUDENTS_DATA[selectedClass]) {
                nameSelect.disabled = false;
                STUDENTS_DATA[selectedClass].forEach(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    nameSelect.appendChild(option);
                });
            } else {
                nameSelect.disabled = true;
            }
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                div.remove();
            });
        }

        return div;
    }

    // Initialize first child row
    if (childrenContainer) {
        const firstRow = createChildRow(0);
        childrenContainer.appendChild(firstRow);
        // Animate in
        requestAnimationFrame(() => {
            firstRow.classList.remove('opacity-0', 'translate-y-2');
        });

        if (btnAddChild) {
            btnAddChild.addEventListener('click', () => {
                const count = childrenContainer.children.length;
                const newRow = createChildRow(count);
                childrenContainer.appendChild(newRow);
                requestAnimationFrame(() => {
                    newRow.classList.remove('opacity-0', 'translate-y-2');
                });
            });
        }
    }


    // Modal Logic
    function openModal() {
        modal.classList.remove('hidden');
        // Trigger reflow to enable transition
        void modal.offsetWidth;

        modalBackdrop.classList.remove('opacity-0');
        modalPanel.classList.remove('translate-y-full', 'opacity-0');
        modalPanel.classList.add('translate-y-0');

        if (window.gsap) {
            gsap.fromTo(modalPanel, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" });
        }
    }

    function closeModal() {
        modalBackdrop.classList.add('opacity-0');
        modalPanel.classList.remove('translate-y-0');
        modalPanel.classList.add('translate-y-full', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    if (btnRegister) {
        btnRegister.addEventListener('click', openModal);
    }

    if (btnClose) {
        btnClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Form Submission Logic
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!supabase) {
                alert('Supabase client not initialized.');
                return;
            }

            // Gather Children Data
            const childRows = childrenContainer.querySelectorAll('.flex'); // Select custom rows
            const childrenList = [];
            childRows.forEach(row => {
                const cls = row.querySelector('.class-select').value;
                const name = row.querySelector('.name-select').value;
                if (cls && name) {
                    childrenList.push(`${name} (${cls})`);
                }
            });

            if (childrenList.length === 0) {
                alert('Please add at least one child.');
                return;
            }

            // Set Loading State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">progress_activity</span> Processing...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const file = formData.get('payment_proof');
            let proofUrl = '';

            try {
                // 1. Upload File
                if (file && file.size > 0) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('registration-proofs')
                        .upload(filePath, file);

                    if (uploadError) throw uploadError;

                    // Get Public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('registration-proofs')
                        .getPublicUrl(filePath);

                    proofUrl = publicUrl;
                }

                // 2. Insert Data
                const data = {
                    father_name: formData.get('father_name'),
                    mother_name: formData.get('mother_name'),
                    child_name: childrenList.join(', '), // Storing as comma separated string
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    proof_url: proofUrl,
                    created_at: new Date().toISOString()
                };

                const { error: insertError } = await supabase
                    .from('registrations')
                    .insert([data]);

                if (insertError) throw insertError;

                // Success
                submitBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Success!';
                submitBtn.classList.add('bg-green-500', 'text-white');
                submitBtn.classList.remove('bg-primary', 'text-[#1c180d]');

                setTimeout(() => {
                    closeModal();
                    form.reset();
                    // Reset children to just one empty row
                    childrenContainer.innerHTML = '';
                    childrenContainer.appendChild(createChildRow(0));

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('bg-green-500', 'text-white');
                        submitBtn.classList.add('bg-primary', 'text-[#1c180d]');
                    }, 500);
                }, 1500);

                alert('Registration successful! We will contact you soon.');

            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed: ' + (error.message || 'Unknown error'));
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
