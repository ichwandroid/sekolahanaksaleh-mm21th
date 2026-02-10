// Firebase Configuration is loaded in firebase-config.js
// Access globally via window.db and window.storage

window.initForm = function () {
    console.log('Initializing Form Script...');
    const btnRegister = document.getElementById('btn-register-cta');
    const modal = document.getElementById('registration-modal');
    const btnClose = document.getElementById('btn-close-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPanel = document.getElementById('modal-panel');
    const form = document.getElementById('registration-form');
    const submitBtn = document.getElementById('btn-submit-registration');

    // Custom Alert Logic
    const alertModal = document.getElementById('custom-alert-modal');
    const alertBackdrop = document.getElementById('alert-backdrop');
    const alertPanel = document.getElementById('alert-panel');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const alertIcon = document.getElementById('alert-icon');
    const alertIconWrapper = document.getElementById('alert-icon-wrapper');
    const btnCloseAlert = document.getElementById('btn-close-alert');

    window.showCustomAlert = function (title, message, type = 'info') {
        if (!alertModal) {
            alert(message);
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
            btnCloseAlert.classList.add('bg-green-600', 'text-white', 'hover:bg-green-700');
        } else if (type === 'error') {
            iconName = 'error';
            alertIconWrapper.classList.add('bg-red-100');
            alertIcon.classList.add('text-red-600');
            btnCloseAlert.classList.add('bg-red-600', 'text-white', 'hover:bg-red-700');
        } else if (type === 'warning') {
            iconName = 'warning';
            alertIconWrapper.classList.add('bg-yellow-100');
            alertIcon.classList.add('text-yellow-600');
            btnCloseAlert.classList.add('bg-yellow-500', 'text-white', 'hover:bg-yellow-600');
        } else {
            alertIconWrapper.classList.add('bg-primary/10');
            alertIcon.classList.add('text-primary');
            btnCloseAlert.classList.add('bg-primary', 'text-[#1c180d]', 'hover:bg-primary/90');
        }

        alertIcon.innerText = iconName;

        alertModal.classList.remove('hidden');

        // Animations
        if (window.gsap) {
            gsap.killTweensOf(alertPanel);
            gsap.killTweensOf(alertBackdrop);

            // Backdrop
            gsap.fromTo(alertBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });

            // Panel
            gsap.fromTo(alertPanel,
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.75)" }
            );
        } else {
            alertBackdrop.classList.remove('opacity-0');
            alertPanel.classList.remove('opacity-0', 'scale-95');
        }
    };

    function closeAlert() {
        if (window.gsap) {
            gsap.to(alertBackdrop, { opacity: 0, duration: 0.2 });
            gsap.to(alertPanel, {
                scale: 0.9,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    alertModal.classList.add('hidden');
                }
            });
        } else {
            alertBackdrop.classList.add('opacity-0');
            alertPanel.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                alertModal.classList.add('hidden');
            }, 300);
        }
    }

    if (btnCloseAlert) btnCloseAlert.onclick = closeAlert;
    if (alertBackdrop) alertBackdrop.onclick = closeAlert;


    // Infaq and Payment Logic Removed

    // Modal Logic
    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.remove('hidden');
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

    if (btnRegister) btnRegister.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Form Submission Logic
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!window.db || !window.storage) {
                window.showCustomAlert('Error Sistem', 'Firebase belum dikonfigurasi. Mohon cek file js/firebase-config.js', 'error');
                return;
            }

            // Set Loading State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">progress_activity</span> Processing...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                validateForm(formData);
            } catch (validationError) {
                window.showCustomAlert('Validasi Gagal', validationError.message, 'warning');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            try {
                // 1. Insert Data (Firebase Firestore)
                // Mapping fields for KS & Guru
                const schoolName = formData.get('school_name');
                const headmasterName = formData.get('headmaster_name');
                const headmasterStatus = formData.get('headmaster_status');
                const teacherName1 = formData.get('teacher_name');
                const teacherName2 = formData.get('teacher_name_2');

                let attendeesList = [];
                if (teacherName1) attendeesList.push(teacherName1);
                if (teacherName2) attendeesList.push(teacherName2);
                const attendeesString = attendeesList.join(', ');

                const data = {
                    parent_name: headmasterName, // Storing Headmaster Name as Parent Name (Main Contact)
                    child_name: schoolName, // Storing School Name as Child Name
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    attendees: attendeesString, // Storing Teacher Name in Attendees
                    headmaster_status: headmasterStatus,
                    infaq_status: 'no',
                    payment_method: '-',
                    proof_url: '',
                    created_at: new Date().toISOString()
                };

                const docRef = await window.db.collection('registrations').add(data);
                const registrationId = docRef.id;

                // Success
                submitBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Success!';
                submitBtn.classList.add('bg-green-500', 'text-white');
                submitBtn.classList.remove('bg-primary', 'text-[#1c180d]');

                setTimeout(async () => {
                    closeModal();
                    form.reset();

                    // Generate Ticket
                    try {
                        const ticketData = {
                            id: registrationId,
                            school_name: schoolName,
                            headmaster_name: headmasterName,
                            teacher_name: attendeesString,
                            phone: data.phone,
                            email: data.email,
                            date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                            infaq_status: 'no',
                            payment_method: '-'
                        };

                        const ticketUrl = await generateTicket(ticketData, null);

                        const link = document.createElement('a');
                        link.href = ticketUrl;
                        link.download = `E-Ticket_Milad21_KS_${data.phone}.jpg`;
                        link.click();

                    } catch (err) {
                        console.error('Error generating ticket:', err);
                    }

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('bg-green-500', 'text-white');
                        submitBtn.classList.add('bg-primary', 'text-[#1c180d]');
                    }, 500);
                }, 1500);

                window.showCustomAlert('Sukses!', 'Konfirmasi Berhasil! Silahkan unduh E-Ticket Anda.', 'success');

            } catch (error) {
                console.error('Error:', error);
                window.showCustomAlert('Gagal', 'Terjadi kesalahan: ' + (error.message || 'Unknown error'), 'error');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initForm);
} else {
    window.initForm();
}


// Helper: Generate Ticket Image for KS
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
        await new Promise((resolve, reject) => {
            logo.onload = resolve;
            logo.onerror = reject;
            logo.src = './assets/21th Ansal.png';
        });
        ctx.drawImage(logo, 40, 40, 100, 100);
    } catch (e) {
        console.warn('Logo failed to load:', e);
    }

    // Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('E-TICKET UNDANGAN', 160, 75);
    ctx.font = '24px sans-serif';
    ctx.fillText('MILAD 21 TAHUN SD ANAK SALEH', 160, 115);

    // QR Code
    try {
        const qrData = JSON.stringify({ id: data.id, checkin: true, type: 'KS_GURU' });
        const qrUrl = await QRCode.toDataURL(qrData, { width: 200, margin: 1, color: { dark: '#1c180d', light: '#ffffff' } });
        const qrImg = new Image();
        await new Promise((resolve) => {
            qrImg.onload = resolve;
            qrImg.src = qrUrl;
        });
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
    ctx.fillText('DETAIL UNDANGAN', x, y);

    // Line separator
    ctx.strokeStyle = '#f78dbb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(canvas.width - x, y + 20);
    ctx.stroke();

    y += 80;

    // Draw Fields
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
    drawField('Sekolah', data.school_name);
    drawField('Kepala Sekolah', data.headmaster_name);
    drawField('Guru Pendamping', data.teacher_name);

    y += 20;

    drawField('No HP', data.phone);
    drawField('Email', data.email);

    // Proof Section Removed

    // Footer
    const footerY = canvas.height - 60;
    ctx.fillStyle = '#f78dbb';
    ctx.fillRect(0, footerY - 40, canvas.width, 100);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'italic 24px sans-serif';

    ctx.fillText('Tiket khusus untuk Kepala Sekolah & Guru Pendamping', canvas.width / 2, footerY - 10);
    ctx.fillText('Mohon tunjukkan tiket ini saat registrasi.', canvas.width / 2, footerY + 10);

    return canvas.toDataURL('image/jpeg', 0.85);
}

// Helper: Form Validation
function validateForm(formData) {
    const phone = formData.get('phone');
    const email = formData.get('email');
    const school = formData.get('school_name');
    const headmaster = formData.get('headmaster_name');

    if (!school || !headmaster) {
        throw new Error("Mohon lengkapi data Sekolah dan Kepala Sekolah.");
    }

    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
    if (!phoneRegex.test(phone)) {
        throw new Error("Nomor WhatsApp tidak valid (Gunakan format 08xx/62xx).");
    }

    // Infaq validation removed

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Format email tidak valid.");
    }
}

window.copyToClipboard = (text, btnElement) => {
    if (!btnElement && event) btnElement = event.target;
    navigator.clipboard.writeText(text).then(() => {
        if (btnElement) {
            const originalText = btnElement.innerText;
            btnElement.innerText = "Tersalin!";
            btnElement.classList.replace('text-primary', 'text-green-600');
            btnElement.classList.replace('bg-primary/10', 'bg-green-100');
            setTimeout(() => {
                btnElement.innerText = originalText;
                btnElement.classList.replace('text-green-600', 'text-primary');
                btnElement.classList.replace('bg-green-100', 'bg-primary/10');
            }, 2000);
        }
    });
};
