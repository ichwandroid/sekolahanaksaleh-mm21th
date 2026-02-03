// Supabase Configuration loaded from supabase-config.js
// Check if variables are set
// Check if variables are set
const supabaseUrl = window.SUPABASE_URL;
const supabaseKey = window.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL and Key not set in js/registration.js. Make sure js/supabase-config.js is loaded.');
}

const supabaseClient = (window.supabase && supabaseUrl && supabaseKey) ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

// Connection Test
// Connection Test
if (supabaseClient) {
    console.log('Testing Supabase Connection...');
    supabaseClient.from('registrations').select('count', { count: 'exact', head: true })
        .then(({ count, error }) => {
            if (error) {
                console.error('Supabase Connection Failed:', error.message);
                if (error.code === '42P01' || error.message.includes('404')) {
                    console.warn('HINT: Did you create the "registrations" table in Supabase? Check the console output or ask the AI for the SQL.');
                }
            } else if (count === null) {
                console.error('Supabase Connected, but "registrations" table might be missing (Count is null).');
                console.warn('HINT: Please create the "registrations" table in your Supabase project.');
            } else {
                console.log('Supabase Connected Successfully! Registration table found.');
            }
        });
}

// Mock Data for Students (Replace with real DB fetch if available)
window.STUDENTS_DATA = {
    // FORMAT BARU (Professional): { name: "Nama Siswa", homebase: "Warna Homebase" }
    "1A": [
        { name: "Abayomi Natadwija Ahmad", homebase: "Merah" },
        { name: "Abimana Dewangga Dimas", homebase: "Ungu" },
        { name: "Abrizam Khairunnas Rafisqy", homebase: "Biru" },
        { name: "Afiqah Callista Safaqila", homebase: "Merah" },
        { name: "Aghnia Cyrauza Ramadhan", homebase: "Biru" },
        { name: "Ahsan Muhammad Dipa", homebase: "Merah" },
        { name: "Akira Gilang Bagaskara", homebase: "Hijau" },
        { name: "Akmal Hafizh Rivandra", homebase: "Ungu" },
        { name: "Anindyaswari Mahira Utomo", homebase: "Kuning" },
        { name: "Arkhan Dhanadipati Tiya Prawiro", homebase: "Merah" },
        { name: "Bellatrix Ruby Ailova", homebase: "Merah" },
        { name: "Hanania Farah Nabila", homebase: "Ungu" },
        { name: "Humaira Latifa Wibawa", homebase: "Hijau" },
        { name: "Irzaim Abbad Zaki", homebase: "Biru" },
        { name: "Keyzia Zhafira Pramudita", homebase: "Hijau" },
        { name: "Kiemas Arjun Mangku Hasan", homebase: "Biru" },
        { name: "Kimora Alisya Jasmine", homebase: "Kuning" },
        { name: "Maher Hamizan Xavier Raziq", homebase: "Kuning" },
        { name: "Marvelia Ameera Hafidzah Wulur", homebase: "Ungu" },
        { name: "Mimosa Shahia Inshi", homebase: "Hijau" },
        { name: "Muadz Xavier Athallah", homebase: "Biru" },
        { name: "Muhammad Adzka Arzaki", homebase: "Kuning" },
        { name: "Muhammad Al Fatih Syihab", homebase: "Hijau" },
        { name: "Muhammad Daffa Arvano Adhitama", homebase: "Hijau" },
        { name: "Muhammad Syarif Hidayatullah", homebase: "Ungu" },
        { name: "Naureen Mafaza Khairani", homebase: "Merah" },
        { name: "Qalesya Rayhana Adicahya", homebase: "Ungu" },
        { name: "Raisya Maulida Zahra", homebase: "Biru" },
        { name: "Rashdansyah Rayyan Azhami", homebase: "Kuning" },
        { name: "Shanum Rizki Azzahra", homebase: "Kuning" }
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "1B": [
        { name: "Abidzar Arrazi Wicaksono", homebase: "Merah" },
        { name: "Abizar Alvino Azkandra", homebase: "Merah" },
        { name: "Adzkira Zulaikha Putri Santoso", homebase: "Ungu" },
        { name: "Afnan Muhammad Dhanurendra", homebase: "Kuning" },
        { name: "Ahmad Azmi Adnani", homebase: "Hijau" },
        { name: "Aisyah Ambar Pambayun", homebase: "Merah" },
        { name: "Arsenio Putra Wardhana", homebase: "Merah" },
        { name: "Aurellia Kaylee Maheswari Ramadhani", homebase: "Kuning" },
        { name: "Diajeng Jennaira Rumi", homebase: "Hijau" },
        { name: "Ebony Arkatama Hindarsyah", homebase: "Ungu" },
        { name: "Eilynn Raniah Adn", homebase: "Kuning" },
        { name: "Fatima Dyra Azzahra", homebase: "Ungu" },
        { name: "Feisya Putri Maheswari", homebase: "Biru" },
        { name: "Hanindhiya Nafilah Az Zahra", homebase: "Hijau" },
        { name: "Hazrina Anandya Azzahra", homebase: "Kuning" },
        { name: "Khalisa Amizafirah", homebase: "Biru" },
        { name: "Malik Abdur Rohiman", homebase: "Ungu" },
        { name: "Maulana Khalif Putra Arifin", homebase: "Biru" },
        { name: "Mikarai Attaki Pribadi", homebase: "Kuning" },
        { name: "Muhammad Arkan Nur Wahid", homebase: "Ungu" },
        { name: "Muhammad Arsya Fahrezi", homebase: "Merah" },
        { name: "Muhammad Iqbal Al Azzam Asyadzilly", homebase: "Biru" },
        { name: "Pramudita Nursyifa Aisha", homebase: "Hijau" },
        { name: "Raffazka Athariz Hamizan Andromeda", homebase: "Ungu" },
        { name: "Rasya Frinizar Naufal Afkar", homebase: "Kuning" },
        { name: "Sabina Khanza Augustania Putri", homebase: "Biru" },
        { name: "Safiyyah Nur Amira Permata", homebase: "Merah" },
        { name: "Shanum Hayyin Althafunnisa", homebase: "Biru" },
        { name: "Syafiq Eleno Yusuf", homebase: "Hijau" },
        { name: "Tengku Arlana Arsenio Alqawii", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "1C": [
        { name: "Abraham Ahmad Gibran Rabbani", homebase: "Merah" },
        { name: "Agam Izar Prasetyo", homebase: "Hijau" },
        { name: "Aiza Aqsha Samanhudi", homebase: "Kuning" },
        { name: "Aiza Khairania Zanna", homebase: "Biru" },
        { name: "Aluna Gantaribumi Darmawan", homebase: "Hijau" },
        { name: "Aqmar Izza Pramudana", homebase: "Merah" },
        { name: "Arkawangi Larasati Majid", homebase: "Biru" },
        { name: "Arkenzo Ziandro Khanza Susilo", homebase: "Kuning" },
        { name: "Arrayyan Azka Arvinza", homebase: "Biru" },
        { name: "Azlan Khalid Pua Jiwa", homebase: "Ungu" },
        { name: "Bondan Aurora Zhafirah", homebase: "Merah" },
        { name: "Ezio Fathan Alfarizi", homebase: "Hijau" },
        { name: "Faradila Dinda Azalia", homebase: "Merah" },
        { name: "Ferzha Razqa Raffasya", homebase: "Biru" },
        { name: "Ghezia Zara Alhamda", homebase: "Kuning" },
        { name: "Irish Aqila Indrabayu", homebase: "Ungu" },
        { name: "Kalandra Rashad Mustofa", homebase: "Kuning" },
        { name: "Khanza Syifa Azahra", homebase: "Ungu" },
        { name: "Mahera Ansherlo Adjiwisaka", homebase: "Merah" },
        { name: "Muhammad Hanif Raffasya", homebase: "Kuning" },
        { name: "Muhammad Husain Basalamah", homebase: "Ungu" },
        { name: "Muhammad Sirojul Azmi Afandi", homebase: "Hijau" },
        { name: "Nurdaffa Arhabu Rizqi", homebase: "Merah" },
        { name: "Reddy Arsakha Johar", homebase: "Ungu" },
        { name: "Shirin Nusaybah", homebase: "Hijau" },
        { name: "Syafia Ishma Tsaqifah", homebase: "Ungu" },
        { name: "Wina Rahmatul Dhuha", homebase: "Biru" },
        { name: "Yumna Sabira Luvena", homebase: "Kuning" },
        { name: "Zavier Aktam Dzakiandra", homebase: "Biru" },
        { name: "Zivana Aulia Putri Ariyanto", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "1D": [
        { name: "Aleia Diaro Anasyasheva", homebase: "Ungu" },
        { name: "Almirza Zhafir Akihiko", homebase: "Merah" },
        { name: "Andhara Jelita Ramadhani", homebase: "Kuning" },
        { name: "Arjuna Razzano Subandrio", homebase: "Hijau" },
        { name: "Aryash Muhammad Zuhud Amartya", homebase: "Hijau" },
        { name: "Athalla Muhammad Arkananta", homebase: "Merah" },
        { name: "Beryl Adzkan Maghali", homebase: "Biru" },
        { name: "Bil Asabintang Aldhara", homebase: "Kuning" },
        { name: "Ceisya Geena Rasti Dinata", homebase: "Biru" },
        { name: "Daffa Muhammad Alfarezi", homebase: "Biru" },
        { name: "Damar Sayyid Abdillah", homebase: "Kuning" },
        { name: "Deliana Tama Aurelia Celina", homebase: "Hijau" },
        { name: "Denta Dzakiandra Hernawan", homebase: "Kuning" },
        { name: "Fathiya Rintik Az Zahra", homebase: "Ungu" },
        { name: "Frananda Ramadhani Hermawan", homebase: "Hijau" },
        { name: "Ganapatih Atharrazka Kusumajaya", homebase: "Kuning" },
        { name: "Ghaziel Abizar Mustiko", homebase: "Biru" },
        { name: "Hafizh Muzammil Al Amin", homebase: "Ungu" },
        { name: "Kalaendra Hastanta Mahazura", homebase: "Hijau" },
        { name: "Khaizuran Ryuzaki Alzar", homebase: "Merah" },
        { name: "Lubna Hanania Nadhifa", homebase: "Hijau" },
        { name: "Makayla Shazfa Shareen", homebase: "Biru" },
        { name: "Muhammad Alby Rasya Prawira", homebase: "Ungu" },
        { name: "Muhammad Ali Fatih Ramadhan", homebase: "Kuning" },
        { name: "Muhammad Azka Putra Arleo", homebase: "Ungu" },
        { name: "Qiana Isvara Nabila", homebase: "Merah" },
        { name: "Raffasya Elfatih Prasetyo", homebase: "Merah" },
        { name: "Rayna Calysta Putriansa", homebase: "Biru" },
        { name: "Salwa Qidzama Humaira", homebase: "Ungu" },
        { name: "Zarin Kalila Zahra", homebase: "Merah" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "2A": [
        { name: "Adeeva Aisyah Puerdinka", homebase: "Biru" },
        { name: "Afnan Husna Salsabila", homebase: "Hijau" },
        { name: "Ahmad Zhafran Arsya Robbi", homebase: "Merah" },
        { name: "Ali Ulul Ilmi", homebase: "Kuning" },
        { name: "Alicia Calista Geraldinee Praworo Putri", homebase: "Ungu" },
        { name: "Althaff Benjamin Dzakiandra Susanto", homebase: "Biru" },
        { name: "Aretha Billah Nazafarin", homebase: "Kuning" },
        { name: "Arsyila Hilda Fauzia", homebase: "Kuning" },
        { name: "Arzan Kinza Ravindra", homebase: "Hijau" },
        { name: "Asy Syam Hannan Azwar", homebase: "Hijau" },
        { name: "Devanka Daffi Maulana Asyari", homebase: "Biru" },
        { name: "Dzeroun Novero Putra", homebase: "Biru" },
        { name: "Ezekiel Barraq Alkas", homebase: "Hijau" },
        { name: "Kanaya Layla Ferhanadya", homebase: "Merah" },
        { name: "Muhammad Abrisam Manaf", homebase: "Ungu" },
        { name: "Muhammad Faiz Darojad", homebase: "Ungu" },
        { name: "Muhammad Fayyad Ghassan Hermawan", homebase: "Ungu" },
        { name: "Nafis Syakir Alfatih", homebase: "Hijau" },
        { name: "Namira Mysha Almahyra", homebase: "Ungu" },
        { name: "Nayaka Syazana Andriyanto", homebase: "Biru" },
        { name: "Rafif Rizqullah Altamis", homebase: "Merah" },
        { name: "Sarah Kafkamadina Dipasanta", homebase: "Merah" },
        { name: "Sidnan Muqaddam Fadhli", homebase: "Merah" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "2B": [
        { name: "Abdurrahman Arrasyiid", homebase: "Merah" },
        { name: "Abyaz Athaya Mahardika", homebase: "Kuning" },
        { name: "Adeeva Aila Varisha", homebase: "Merah" },
        { name: "Adinda Kirana Kamania", homebase: "Kuning" },
        { name: "Aisa Nurdiana Fazaalloh", homebase: "Biru" },
        { name: "Akhtar Xaquille Anas", homebase: "Ungu" },
        { name: "Arvino Shakeel Ibrahim", homebase: "Biru" },
        { name: "Ayra Nur Hafizah", homebase: "Ungu" },
        { name: "Diana Almahira Nuura Ramadhani", homebase: "Hijau" },
        { name: "Elfathan Ripki Ramdan", homebase: "Hijau" },
        { name: "Hafizah Izzati Putri Fadilah", homebase: "Merah" },
        { name: "Haveza Sareva", homebase: "Kuning" },
        { name: "Ilona Probo Airra Meghra", homebase: "Kuning" },
        { name: "Kaif Artanabil Hariri", homebase: "Kuning" },
        { name: "Kenzo Athar Riza", homebase: "Ungu" },
        { name: "Khayru Alfaeyza Martasundjaya", homebase: "Hijau" },
        { name: "M. Alfarizi Reshwara Mumtaz", homebase: "Biru" },
        { name: "Muhammad Alman Ramadhan", homebase: "Merah" },
        { name: "Muhammad Fatih Adiputra", homebase: "Kuning" },
        { name: "Muhammad Fatih Agil Gudban", homebase: "Ungu" },
        { name: "Muhammad Kaysan Alsyazani", homebase: "Biru" },
        { name: "Muhammad Zhafran Aqila Dirgantara", homebase: "Hijau" },
        { name: "Nadhira Almira Azmi", homebase: "Biru" },
        { name: "Naira Nazneen Arisanti", homebase: "Ungu" },
        { name: "Pradhika Fairuz Yazdi", homebase: "Biru" },
        { name: "Raihana Dayu Utama", homebase: "Merah" },
        { name: "Syarifah Hedy Almahyra Putri", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "2C": [
        { name: "Agam Mahendra Alfatih", homebase: "Ungu" },
        { name: "Ahmad Zulhadi Ar-Rasyid", homebase: "Merah" },
        { name: "Althafiz Riffa Aldebaran", homebase: "Kuning" },
        { name: "Anindita Azzahra Jaswinder", homebase: "Merah" },
        { name: "Aretha Aluna Kenda", homebase: "Biru" },
        { name: "Ayra Zahra Malika Shaliha", homebase: "Hijau" },
        { name: "Dafiqi Zulfikar Alhamiz", homebase: "Merah" },
        { name: "Dyra Fathia Azkayra", homebase: "Kuning" },
        { name: "Hideo Aldric Adyaraka Saputra", homebase: "Hijau" },
        { name: "Isvara Farzana Hikari", homebase: "Merah" },
        { name: "Javier Athalla Khalfani", homebase: "Kuning" },
        { name: "Kai Anindito Pertama", homebase: "Biru" },
        { name: "Khansa Alea Zahra", homebase: "Biru" },
        { name: "Mohammad Rayyan", homebase: "Ungu" },
        { name: "Muhammad Arkana Chairyzi", homebase: "Merah" },
        { name: "Muhammad Raja Imanulhaq", homebase: "Kuning" },
        { name: "Muhammad Sam Sulaiman", homebase: "Ungu" },
        { name: "Mustofa Rajaban Ananta", homebase: "Hijau" },
        { name: "Nadam Abiyoso", homebase: "Kuning" },
        { name: "Naladhipa Ahsana Dzikra", homebase: "Ungu" },
        { name: "Nayla Clarine Anindyaswari", homebase: "Hijau" },
        { name: "R.P.Maxime Junior Tjakradiputra", homebase: "Biru" },
        { name: "Riddari Alsaki Ganisena", homebase: "Hijau" },
        { name: "Salma Adreena Primariayu", homebase: "Ungu" },
        { name: "Shakira Putri Pradhana", homebase: "Ungu" },
        { name: "Tsamara Rania Chairyza", homebase: "Kuning" },
        { name: "Zivanka Qalesya Alfatih", homebase: "Biru" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "2D": [
        { name: "Abqary Runako Arsenio Romadhoni", homebase: "Biru" },
        { name: "Abqori Kenzie Ramadhan", homebase: "Kuning" },
        { name: "Adediivo Ramadhana Nandadhiva", homebase: "Biru" },
        { name: "Adreena Shakila Maulidina Arifin", homebase: "Ungu" },
        { name: "Ameera Lovia Kinarian", homebase: "Merah" },
        { name: "Andyra Cahya Almira", homebase: "Hijau" },
        { name: "Arthur Niam Alfatah", homebase: "Ungu" },
        { name: "Ayesha Mikhayla Adreena Setiawan", homebase: "Ungu" },
        { name: "Diandra Syafira Putri Harjanto", homebase: "Merah" },
        { name: "Farezell Uwais Al Fatih", homebase: "Biru" },
        { name: "Firdano Alvaro Rayhan", homebase: "Biru" },
        { name: "Gi Pio Affandra Alsaki Muslim", homebase: "Ungu" },
        { name: "Harumi Iqlima Azzahra", homebase: "Merah" },
        { name: "Hatmia Immi Prasmita", homebase: "Biru" },
        { name: "Ihya Syauqi Al Faruq Askha", homebase: "Hijau" },
        { name: "Kiani Lanika Nurhadhy", homebase: "Kuning" },
        { name: "Maureen Abelia Thalita", homebase: "Biru" },
        { name: "Muhammad Althaf Abidin", homebase: "Hijau" },
        { name: "Muhammad Damar Aruna Gemintang", homebase: "Merah" },
        { name: "Muhammad Hafiz Al Ihsan", homebase: "Ungu" },
        { name: "Muhammad Haidar Rasyid Dirgantara", homebase: "Kuning" },
        { name: "Muhammad Tsaqif Adnani Rahman", homebase: "Merah" },
        { name: "Narendra Rafa Putra Sugiharto", homebase: "Hijau" },
        { name: "Quinza Aqila Melody", homebase: "Kuning" },
        { name: "Rafif Alfarezi Laksana", homebase: "Kuning" },
        { name: "Reva Nirwasita Putri", homebase: "Kuning" },
        { name: "Zafran Latif Maulana", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "3A": [
        { name: "Adam Haidar Ar-Rizky", homebase: "Merah" },
        { name: "Adreena Zaynalesha Distira", homebase: "Ungu" },
        { name: "Agha Adzriel Fauzi", homebase: "Biru" },
        { name: "Airis Nafi'Ah Khairunnisa", homebase: "Merah" },
        { name: "Aisha Azzahra Riszaldi", homebase: "Ungu" },
        { name: "Alfatih Kian Kanindra", homebase: "Kuning" },
        { name: "Annezikria Nirma Latifa", homebase: "Kuning" },
        { name: "Arsenio Sukma Faeyza", homebase: "Ungu" },
        { name: "Arsyaka Fardan Zakki", homebase: "Hijau" },
        { name: "Aurora Ghaitsa Arsyva", homebase: "Biru" },
        { name: "Dzulqarnain Latif Wibowo", homebase: "Kuning" },
        { name: "El Ningrat Putra Bumi", homebase: "Hijau" },
        { name: "Elzafran Tjahya Priyambodo", homebase: "Ungu" },
        { name: "Fadhlan Kenzie Hamizan", homebase: "Ungu" },
        { name: "Fathian Akhmad Raffasya", homebase: "Merah" },
        { name: "Fathiyya Mysha Aleena Fardanah", homebase: "Hijau" },
        { name: "Halwa Goeh Capillary", homebase: "Hijau" },
        { name: "Keana Chandarabumi Darmawan", homebase: "Ungu" },
        { name: "Kevin Haidar Naraindra", homebase: "Kuning" },
        { name: "Kianoush Atanara Pribadi", homebase: "Kuning" },
        { name: "Muhammad Qaishar Fikry", homebase: "Merah" },
        { name: "Muhammad Safarez Rashya Ardianto", homebase: "Merah" },
        { name: "Muhammad Zayan Athariz", homebase: "Kuning" },
        { name: "Naufa Aida Shaqueena Azkadina Mubarak", homebase: "Ungu" },
        { name: "Putri Khayla Sylvana Firli", homebase: "Biru" },
        { name: "Rafa Arshad Primadani", homebase: "Biru" },
        { name: "Rafandra Dzaka Pranadipta", homebase: "Hijau" },
        { name: "Raisya Sheza Adreena", homebase: "Merah" },
        { name: "Ranya Azkadina Soelistianto", homebase: "Biru" },
        { name: "Sabrina Amadia Anka", homebase: "Kuning" },
        { name: "Shanumindira Sabiya Farrahinas", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "3B": [
        { name: "Adeeva Aalinarrahman", homebase: "Kuning" },
        { name: "Adelia Cevira Kusumahadi", homebase: "Ungu" },
        { name: "Afiqa Ajwa Maulidya", homebase: "Merah" },
        { name: "Alesha Zahra Ratifa Duski", homebase: "Merah" },
        { name: "Alula Arabella Sudibyo", homebase: "Hijau" },
        { name: "Arzion Seano Zenechka", homebase: "Biru" },
        { name: "Azzahra Hannan Sanjaya", homebase: "Merah" },
        { name: "Brava Louvain Viano Muhammad", homebase: "Hijau" },
        { name: "Bryan Fatih Aryasatya", homebase: "Kuning" },
        { name: "Elvira Azhar Putri Akhula", homebase: "Kuning" },
        { name: "Endzo Maliq Pangastiting Nalar", homebase: "Ungu" },
        { name: "Gwen Edgar Kayosahl El Khalief", homebase: "Biru" },
        { name: "Ibrahim Mahesh Winoto", homebase: "Biru" },
        { name: "In Amul Aufa Al Zamzami", homebase: "Kuning" },
        { name: "Kaivandra Rezqiano Pratama", homebase: "Ungu" },
        { name: "Kelvino Elmoza Asyraf", homebase: "Kuning" },
        { name: "Latifah Khoir Rumi Rohiman", homebase: "Hijau" },
        { name: "Muhamad Ibrahim Majid Alfatih", homebase: "Ungu" },
        { name: "Muhammad Dzu Alfiqar Arnou Erdogan", homebase: "Kuning" },
        { name: "Muhammad Fakhrial Attarizayn Asyauqi", homebase: "Biru" },
        { name: "Muhammad Faqih Habiburrahman", homebase: "Biru" },
        { name: "Muhammad Haidar Alkhalifi", homebase: "Hijau" },
        { name: "Muhammad Rafi Ramadhan", homebase: "Merah" },
        { name: "Muhammad Zhian Rafaeyza Wahid", homebase: "Ungu" },
        { name: "Nabila Myesha Shakila", homebase: "Hijau" },
        { name: "Nadwa Elshanum Abidah", homebase: "Ungu" },
        { name: "Nauli Ainun Syahnaz Azzahra Mubarak", homebase: "Merah" },
        { name: "Rania Azzahra Putri Arlea", homebase: "Merah" },
        { name: "Rhanayya Callista Putri", homebase: "Kuning" },
        { name: "Zinan Maulana Rayvolta", homebase: "Merah" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "3C": [
        { name: "Adelio Khrisna Sakti", homebase: "Ungu" },
        { name: "Affan Abrar Rajendra", homebase: "Kuning" },
        { name: "Alifiandra Sachio Mahardika", homebase: "Merah" },
        { name: "Arsenio Ravandra Nugraha", homebase: "Hijau" },
        { name: "Arsyila Kirana Shanum", homebase: "Biru" },
        { name: "Aryanta Rasendria", homebase: "Merah" },
        { name: "Azizah Rizal Ghoniem", homebase: "Ungu" },
        { name: "Azmiy Runako Yusuf", homebase: "Merah" },
        { name: "Cut Lashira Syafazea", homebase: "Kuning" },
        { name: "Fanisha Azkadina", homebase: "Biru" },
        { name: "Fatimah Nur Izzati", homebase: "Biru" },
        { name: "Ganaya Arcia Rakhsandrina Kurniawan", homebase: "Biru" },
        { name: "Hafizh Irham Ferdiansyah", homebase: "Hijau" },
        { name: "Kafie Athallah Ghaziy Wirayuda", homebase: "Hijau" },
        { name: "Khalfani Rifan Zamzami", homebase: "Biru" },
        { name: "Kinan Mikhayla Arsyla", homebase: "Merah" },
        { name: "M. Fabian Abiyasta Mumtaz", homebase: "Hijau" },
        { name: "Muhammad Al Zhafran Nirwana Arkananta", homebase: "Biru" },
        { name: "Muhammad Naufal Al Gibran", homebase: "Merah" },
        { name: "Muhammad Raka Athalla", homebase: "Kuning" },
        { name: "Muhammad Safaroz Rafisqy Ardianto", homebase: "Hijau" },
        { name: "Naqia Sakhiya Zaha", homebase: "Ungu" },
        { name: "Nasyitha Naufalyn Najiyah", homebase: "Kuning" },
        { name: "Nurus Shidqiya Sajidah", homebase: "Merah" },
        { name: "Panji Naufal Ramadhanis", homebase: "Hijau" },
        { name: "Retno Ayu Purbaningrum Titis Pramana", homebase: "Ungu" },
        { name: "Richelle Fredelin Aquina Wijaya", homebase: "Ungu" },
        { name: "Rois Gholin Al-Isyqy", homebase: "Kuning" },
        { name: "Sholahuddin Luqman Wibisono", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "3D": [
        { name: "Ahda Ikmaluddiin Mu'Izz", homebase: "Ungu" },
        { name: "Ahmad Dharma Avicenna", homebase: "Merah" },
        { name: "Aisyah Viona Azkadina", homebase: "Kuning" },
        { name: "Almahyra Isnuna Primadi", homebase: "Kuning" },
        { name: "Altaf Mahesa Bimasakti", homebase: "Hijau" },
        { name: "Andhara Az Zahra", homebase: "Hijau" },
        { name: "Arzachel Alvaro Naufal", homebase: "Merah" },
        { name: "Bahiyya Naila Naja", homebase: "Merah" },
        { name: "Barmastya Ruyi Imawan", homebase: "Biru" },
        { name: "Ezio Abiwara Setyawijaya", homebase: "Ungu" },
        { name: "Faridz Biyan Al Fatih", homebase: "Hijau" },
        { name: "Geasya Raqilla Aliana Hafidzah", homebase: "Biru" },
        { name: "Gerda Parama Wisesa Cahyono", homebase: "Kuning" },
        { name: "Hanifah Diana Adzkia", homebase: "Kuning" },
        { name: "Hasan Musthofa Sanyoto", homebase: "Hijau" },
        { name: "Keanu Naryama Sidqei", homebase: "Biru" },
        { name: "Kenar Daegal Johan", homebase: "Ungu" },
        { name: "Kyara Keysensia Putri", homebase: "Ungu" },
        { name: "Mikhayla Avicenna Caliefa Aznii", homebase: "Biru" },
        { name: "Mikhayla Hafza Farasti", homebase: "Kuning" },
        { name: "Muhammad Alfa Rizqi Putra Agung", homebase: "Ungu" },
        { name: "Muhammad Haykal Abhiseva", homebase: "Ungu" },
        { name: "Muhammad Ibrahim Nabil Al Habibie", homebase: "Merah" },
        { name: "Muhammad Raffa Narya Ramadhan", homebase: "Merah" },
        { name: "Muhammad Safaraz Rayyan Ardianto", homebase: "Biru" },
        { name: "Nadine Ardhanareswari", homebase: "Biru" },
        { name: "Naureen Aisyah Syaqilla Almahyra Mubarak", homebase: "Hijau" },
        { name: "Queensha Aishwarya Kharisma", homebase: "Kuning" },
        { name: "Rafardhan Albiansyah Raharjo", homebase: "Hijau" },
        { name: "Raga Muslim Nusantara", homebase: "Ungu" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "4A": [
        { name: "Ahmad Bilal Darmadya", homebase: "Kuning" },
        { name: "Almeera Qaireen Ferryanto", homebase: "Merah" },
        { name: "Alya Azizah Putri", homebase: "Hijau" },
        { name: "Amira Fatiha Ghina", homebase: "Kuning" },
        { name: "Apsari Aulia Madani", homebase: "Ungu" },
        { name: "Arsy Aflahul Ghifary Syahyu", homebase: "Kuning" },
        { name: "Athaya Maryam Puerdinka", homebase: "Merah" },
        { name: "Bimo Alvaronizam Wilbert", homebase: "Hijau" },
        { name: "Dylan Athaya Dzihni", homebase: "Biru" },
        { name: "Faiza Azzahra", homebase: "Ungu" },
        { name: "Ganendra Aryasatya Kusumajaya", homebase: "Merah" },
        { name: "Gibran Vigi Muttaqin", homebase: "Hijau" },
        { name: "Hanan Maulana Shiddiq", homebase: "Merah" },
        { name: "Hira Nahda Sofyan", homebase: "Ungu" },
        { name: "Kanaka Arganta Bramantyo", homebase: "Kuning" },
        { name: "Kirana Mutia Azzahra", homebase: "Ungu" },
        { name: "Mahadhiya Utari Ashana", homebase: "Hijau" },
        { name: "Mochammad Haikal Azzaky", homebase: "Merah" },
        { name: "Muhammad Arrafif Yusufa", homebase: "Biru" },
        { name: "Muhammad Gibran Al Arsy", homebase: "Hijau" },
        { name: "Muhammad Ismail Arta", homebase: "Ungu" },
        { name: "Muhammad Zaidan Syamsudin", homebase: "Ungu" },
        { name: "Nadia Fairuza Kamila Pribadi", homebase: "Biru" },
        { name: "Raisa Arnelita Putri", homebase: "Kuning" },
        { name: "Syaqila Assyabiya Yuri Widodo", homebase: "Biru" },
        { name: "Tsany Kasyfur Rahman", homebase: "Hijau" },
        { name: "Wara Alvaro Yavea Zamarion", homebase: "Ungu" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "4B": [
        { name: "Akbar Caesar Nurfattah", homebase: "Ungu" },
        { name: "Arkan Al Kahfi", homebase: "Ungu" },
        { name: "Arsyira Shangsa Mahdiantoro", homebase: "Hijau" },
        { name: "Athmar Frinizzan Shidqie Aldari", homebase: "Ungu" },
        { name: "Azka Malik Ibrahim", homebase: "Merah" },
        { name: "Bilqis Alesha Via Lobe", homebase: "Hijau" },
        { name: "Celina Leona Thompson", homebase: "Ungu" },
        { name: "Dhea Ayunda Febimawarni", homebase: "Kuning" },
        { name: "Diego Zhafran Adelmar Justice", homebase: "Kuning" },
        { name: "Jihan Malihah Putri", homebase: "Merah" },
        { name: "Khanza Alycia Queen Yosefania", homebase: "Biru" },
        { name: "Leora Maureen Aditya", homebase: "Kuning" },
        { name: "Lubna Khairunnisa Putri Indratmo", homebase: "Merah" },
        { name: "Mohammad Rizky Adam", homebase: "Biru" },
        { name: "Mohammed Ibrahim Purbawisesa", homebase: "Merah" },
        { name: "Muhami Abdurrahman Al-Ayyubi", homebase: "Merah" },
        { name: "Muhammad Saamy Azzuhri", homebase: "Hijau" },
        { name: "Muhammad Sauqi Bagaskara", homebase: "Kuning" },
        { name: "Nasyauqi Tsabitah Azzahra", homebase: "Biru" },
        { name: "Nurjibril Haidir Admaja", homebase: "Kuning" },
        { name: "Raka Rafasya Bachri", homebase: "Hijau" },
        { name: "Rakha Ahza Athaya", homebase: "Kuning" },
        { name: "Sabila Hamda Malki", homebase: "Biru" },
        { name: "Shabrina Shidqia Arganta", homebase: "Hijau" },
        { name: "Zacky Akthara", homebase: "Biru" },
        { name: "Zulfan Zahin", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "4C": [
        { name: "Achazia Zippora Sachi Hananta", homebase: "Biru" },
        { name: "Aisyah Sarah Rabbani", homebase: "Biru" },
        { name: "Al Irsyad Reifansyah Arif", homebase: "Kuning" },
        { name: "Almahira Zayyan Makaila", homebase: "Merah" },
        { name: "Arina Salsabila Ramadhani", homebase: "Hijau" },
        { name: "Arkaizan Mishary Admagrandis", homebase: "Ungu" },
        { name: "Asgardio Yusuf", homebase: "Kuning" },
        { name: "Ayska Aqila Andhata", homebase: "Kuning" },
        { name: "Dhinastia Bestary", homebase: "Hijau" },
        { name: "Fatimah Azzahra Maron", homebase: "Biru" },
        { name: "Fawwaz Zamzamy Al-Musthofa", homebase: "Hijau" },
        { name: "Gauzan Al Khalifi Putraayra", homebase: "Merah" },
        { name: "Gibran Xavier Kamal", homebase: "Biru" },
        { name: "Izzudin Al Khaizan", homebase: "Merah" },
        { name: "Jingga Jazila Permana", homebase: "Merah" },
        { name: "M. Al-Azizi Zubaydi Maulana", homebase: "Hijau" },
        { name: "Muhammad Asyraf Nizhamuddin", homebase: "Ungu" },
        { name: "Muhammad Farid Tattong Bunga", homebase: "Ungu" },
        { name: "Muhammad Hafidz Al Fatih", homebase: "Kuning" },
        { name: "Muhammad Mahdi", homebase: "Merah" },
        { name: "Muhammad Zidane Alfarizqi", homebase: "Biru" },
        { name: "Quenazahra Laviola Kimora Yuarta", homebase: "Kuning" },
        { name: "Raisa Ratifa Dewi", homebase: "Ungu" },
        { name: "Sabrina Laquisha Yusuf", homebase: "Hijau" },
        { name: "Salju Bumi Saariselka", homebase: "Ungu" },
        { name: "Shaka Abimanyu Arganta", homebase: "Biru" },
        { name: "Syifa Adiba Hasna", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "4D": [
        { name: "Abidah Kamila Faiza", homebase: "Biru" },
        { name: "Abraham Garrison Santoso", homebase: "Ungu" },
        { name: "Ahmed Ghazali", homebase: "Hijau" },
        { name: "Allister Carleon Iswantopo", homebase: "Merah" },
        { name: "Almahyra Khalisa Putri", homebase: "Ungu" },
        { name: "Alya Afiqah Azzahra", homebase: "Ungu" },
        { name: "Ardani Dewi Masitoh", homebase: "Merah" },
        { name: "Balya Ahmed Al-Arsy", homebase: "Kuning" },
        { name: "Daneswara Kaleaqoba", homebase: "Merah" },
        { name: "Dwipha Rakaaji", homebase: "Biru" },
        { name: "Ghealsy Ayudya Rizki", homebase: "Biru" },
        { name: "Iqbal Minhajul Abidin Pribadi", homebase: "Biru" },
        { name: "Kayyisah Azkadina Putri", homebase: "Hijau" },
        { name: "Keiko Adzkiya Farzana Deeba", homebase: "Kuning" },
        { name: "Lalu Althafurrahman Ircya Putra", homebase: "Hijau" },
        { name: "Malvin Aquila Sava Wibowo", homebase: "Kuning" },
        { name: "Muhammad Wildan Syamsudin", homebase: "Ungu" },
        { name: "Naura Almeira Putri Puji", homebase: "Kuning" },
        { name: "Nayyara Keisya Jenna", homebase: "Biru" },
        { name: "Raffahlevi Putra Al Maghribi", homebase: "Merah" },
        { name: "Rafli Althaf Ghaisan", homebase: "Hijau" },
        { name: "Ralina Sirahlexa Wijanarko", homebase: "Ungu" },
        { name: "Rasyid Ismail Abrisam", homebase: "Kuning" },
        { name: "Sabian Azka Setiawan", homebase: "Merah" },
        { name: "Salasika Tasanee", homebase: "Kuning" },
        { name: "Salsabila Putri Azzahra", homebase: "Merah" },
        { name: "Sandhya Dahayu Nareswari Ridyan", homebase: "Hijau" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "5A": [
        { name: "Adirajada Wirasena Utomo", homebase: "Merah" },
        { name: "Afareen Qidzama Nazhaleya", homebase: "Merah" },
        { name: "Ahmad Wildan Ali Farzani", homebase: "Ungu" },
        { name: "Aisyah Hafidzatul Husna", homebase: "Hijau" },
        { name: "Alaric Muhammad Adnicho Romadhoni", homebase: "Kuning" },
        { name: "Altaf Mario Indrabayu", homebase: "Kuning" },
        { name: "Ameera Hana Shakira Ramadhani", homebase: "Ungu" },
        { name: "Amira Ghina Diajeng Askha", homebase: "Kuning" },
        { name: "Bagas Rafif Putra Seno", homebase: "Biru" },
        { name: "Bima Pasha Ariefianto", homebase: "Hijau" },
        { name: "Clarisha Anindya Ayu", homebase: "Kuning" },
        { name: "Hayde Keiz Zidan", homebase: "Kuning" },
        { name: "Ibrahim Gathan Pradana", homebase: "Kuning" },
        { name: "Jill Allysha Adzkia Amanda", homebase: "Hijau" },
        { name: "Kaysa Iffah Najicha", homebase: "Biru" },
        { name: "Maheswara Ali Wijaya", homebase: "Biru" },
        { name: "Maulana Neil Amjad", homebase: "Merah" },
        { name: "Muhammad Arshaka Raya Wibowo", homebase: "Ungu" },
        { name: "Muhammad Azzam Irsyady", homebase: "Biru" },
        { name: "Muhammad Azzam Zhafran Safaraz", homebase: "Hijau" },
        { name: "Muhammad Haydar Senna Ramadhan", homebase: "Ungu" },
        { name: "Muhammad Nafiz Faris Asyraf", homebase: "Hijau" },
        { name: "Nabila Khadziqah Aulya Azmi", homebase: "Biru" },
        { name: "Najwa Khadijah Damiya", homebase: "Merah" },
        { name: "Rania Mazaya Farkhandah", homebase: "Merah" },
        { name: "Salsabila Zukhrufi Firdaus", homebase: "Ungu" },
        { name: "Shirin", homebase: "Ungu" },
        { name: "Yafiq Althaf Achmad", homebase: "Merah" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "5B": [
        { name: "Ahmad Averroes Hakky", homebase: "Ungu" },
        { name: "Ahmad Zein Al Falah", homebase: "Kuning" },
        { name: "Alaric Shabaz Pravistara", homebase: "Hijau" },
        { name: "Alaric Virzha Ferdiansyah", homebase: "Biru" },
        { name: "Alesha Zahra Arie Wicaksono", homebase: "Hijau" },
        { name: "Alisha Shafiyah Akbar", homebase: "Biru" },
        { name: "Amira Raisah Kalani", homebase: "Merah" },
        { name: "Annisa Qollbiyyah", homebase: "Kuning" },
        { name: "Bagus Rafif Putra Seno", homebase: "Merah" },
        { name: "Dari Ilham Ramadhan", homebase: "Hijau" },
        { name: "Egy Al Qaris Keandre", homebase: "Ungu" },
        { name: "Gillian Abimana Saputra", homebase: "Kuning" },
        { name: "Hafizh Putra Zalia", homebase: "Ungu" },
        { name: "Haikal Zidan Fachrezi", homebase: "Kuning" },
        { name: "Moh Mirza Fatikhurroyan", homebase: "Merah" },
        { name: "Muhammad Athar Rizky Athaya", homebase: "Hijau" },
        { name: "Muhammad Bilal Abqari Sanjaya", homebase: "Biru" },
        { name: "Muhammad Nizar Zulmi", homebase: "Biru" },
        { name: "Muhammad Rafandra Aqlan Wijaya", homebase: "Ungu" },
        { name: "Muhammad Raihan Bagaskara Yazdi", homebase: "Merah" },
        { name: "Nareswari Zhafirasya Fajrin", homebase: "Kuning" },
        { name: "Nayla Tanisha Priadini", homebase: "Biru" },
        { name: "Rasendriya Agha Prasetiawan", homebase: "Merah" },
        { name: "Shakilla Naura Azzahra", homebase: "Hijau" },
        { name: "Teuku Muhammad Ammar Alhazeeq", homebase: "Ungu" },
        { name: "Thara Kaylitia Sindu", homebase: "Ungu" },
        { name: "Tiffany Almeira Praworo Putri", homebase: "Merah" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "5C": [
        { name: "Adelina Maheswari Adia", homebase: "Biru" },
        { name: "Adzkia Khanza Shaufa Anggara", homebase: "Ungu" },
        { name: "Afifah Nur Syakira", homebase: "Hijau" },
        { name: "Al Miftah Faiz Syfa Liriansisbi", homebase: "Biru" },
        { name: "Arya Diwangkara Buana", homebase: "Hijau" },
        { name: "Aswin Bagaskara Firmanda", homebase: "Ungu" },
        { name: "Aura Gwenalesha Distira", homebase: "Merah" },
        { name: "Diandra Arumi Anwar", homebase: "Hijau" },
        { name: "Eljunna Sakya Kenda", homebase: "Biru" },
        { name: "Fathan Alfarizqy Martasundjaya", homebase: "Merah" },
        { name: "Habibie Al Fatih", homebase: "Merah" },
        { name: "Haikal Yanuar Rahman", homebase: "Merah" },
        { name: "Harun Muhammad Dipa", homebase: "Kuning" },
        { name: "Keenan Ramadhana Nandadhiva", homebase: "Kuning" },
        { name: "Keysha Devina Fitri", homebase: "Kuning" },
        { name: "Khanza Otylia Rosyidi", homebase: "Biru" },
        { name: "Muhammad Alif Nabil Al Fatih", homebase: "Kuning" },
        { name: "Muhammad Jibran Ar Rayyan", homebase: "Biru" },
        { name: "Muhammad Naufal Ramadhan Antara", homebase: "Hijau" },
        { name: "Muhammad Putra Wirasena Sanjaya", homebase: "Ungu" },
        { name: "Muhammad Yusril Zain Al Arsy", homebase: "Ungu" },
        { name: "Muhammad Zafran Al Jazari", homebase: "Merah" },
        { name: "Nararya Farih Bumi Cahyono", homebase: "Ungu" },
        { name: "Naufal Rafanino Indraguna", homebase: "Hijau" },
        { name: "Nayla Ainun Humaira", homebase: "Merah" },
        { name: "Rayadh Al Fath", homebase: "Biru" },
        { name: "Reval Akmal El-Azzam", homebase: "Hijau" },
        { name: "Sekar Wilujeng Larasati", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "5D": [
        { name: "Achmad Prabu Revolusi", homebase: "Merah" },
        { name: "Aliyya Naufalyn Ramadhina", homebase: "Hijau" },
        { name: "Almira Zafirah Widodo", homebase: "Biru" },
        { name: "Alvino Giovani Siregar", homebase: "Biru" },
        { name: "Anindya Kayana Salsabila", homebase: "Biru" },
        { name: "Aruna Carientra", homebase: "Ungu" },
        { name: "Athiyah Putri Almira", homebase: "Hijau" },
        { name: "Danish Ahza Arzachel", homebase: "Hijau" },
        { name: "Fathiyya Almira Orlin", homebase: "Biru" },
        { name: "Hanan Raziq Angkasa", homebase: "Ungu" },
        { name: "Jihan Aqila Khanza Duski", homebase: "Merah" },
        { name: "Kenzie Hamizan Zamzami", homebase: "Kuning" },
        { name: "Kiandra Alya Nauli Harahap", homebase: "Ungu" },
        { name: "Lainna Cevira Kusumahadi", homebase: "Kuning" },
        { name: "M. Fernando Adelard Adha Df", homebase: "Hijau" },
        { name: "Miranda Addaria Yasha Ashila", homebase: "Merah" },
        { name: "Muhammad Abrizam Lyfandra Tsaqif", homebase: "Kuning" },
        { name: "Muhammad Adzkhan Prawira Negara Hariyadi", homebase: "Hijau" },
        { name: "Muhammad Afkar Rifqi", homebase: "Ungu" },
        { name: "Muhammad Arkan Harith Putra", homebase: "Biru" },
        { name: "Muhammad Rafdany Kurniawan", homebase: "Ungu" },
        { name: "Muhammad Raffaza Althaf Baihaqi", homebase: "Merah" },
        { name: "Muhammad Xiza Hariri Assyauqie", homebase: "Biru" },
        { name: "Naura Dzakira Annayla", homebase: "Kuning" },
        { name: "Rafa Aufa Athallah Bakhtiar", homebase: "Merah" },
        { name: "Rajwa Salsabila Kurniawan", homebase: "Kuning" },
        { name: "Reyhan Purnama Al Fatih", homebase: "Merah" },
        { name: "Tristan Avicenna Attila Ahmad", homebase: "Ungu" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "6A": [
        { name: "Abdullah Fastaru Hilmy", homebase: "Hijau" },
        { name: "Ahmad Thoriq Alzanabi", homebase: "Hijau" },
        { name: "Anindita Syafia Mahardika", homebase: "Ungu" },
        { name: "Aptanta Ristiawan Cahyadi", homebase: "Hijau" },
        { name: "Aqila Adeeva Khanza", homebase: "Hijau" },
        { name: "Arte Hadi Lesmana", homebase: "Kuning" },
        { name: "Atfa Kulthoum Al Labiba", homebase: "Ungu" },
        { name: "Azza Raina Larasati", homebase: "Biru" },
        { name: "Azzahra Novrinadia Kharisma", homebase: "Kuning" },
        { name: "Azzalea Kianna Akhsan", homebase: "Merah" },
        { name: "Bianca Salsabilla Azzahra", homebase: "Kuning" },
        { name: "Brian Ghani Ramadhan", homebase: "Merah" },
        { name: "Dira Astagina Artanti", homebase: "Hijau" },
        { name: "Faiz Akhmad Al Ghazali", homebase: "Kuning" },
        { name: "Fatih Ammar Rohiman", homebase: "Merah" },
        { name: "Hafiza Zakia Mumtaza", homebase: "Merah" },
        { name: "Mahesa Wibawa Putra", homebase: "Ungu" },
        { name: "Muhammad Ali Arsyad", homebase: "Biru" },
        { name: "Muhammad Alvaro", homebase: "Biru" },
        { name: "Muhammad Danish Ahza Ramadhan", homebase: "Biru" },
        { name: "Nabila Adele Savana", homebase: "Hijau" },
        { name: "Nadhifa Khansa Abidah", homebase: "Kuning" },
        { name: "Noah Erawan Putra", homebase: "Ungu" },
        { name: "Nora Salma Elsalsabila", homebase: "Biru" },
        { name: "Radithya Nasyief", homebase: "Ungu" },
        { name: "Ratuayu Farzana Mahmudah", homebase: "Merah" },
        { name: "Syakira Khoirunnisa", homebase: "Ungu" },
        { name: "Wisnuwardhana Radjasa Amurwabhumi El Munir", homebase: "Biru" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "6B": [
        { name: "Ahmad Avin Kayyisi", homebase: "Biru" },
        { name: "Aisar Kenrich Borneo", homebase: "Merah" },
        { name: "Alden Haidar Kenda", homebase: "Hijau" },
        { name: "Allea Azqiara Ramza", homebase: "Hijau" },
        { name: "Aqila Kamaliya Hayunugraha", homebase: "Hijau" },
        { name: "Aradhea Feristha Nabila", homebase: "Kuning" },
        { name: "Atiiqah Zahraa Zhaafirah Saksomo", homebase: "Kuning" },
        { name: "Benjani Ruella Nalani", homebase: "Merah" },
        { name: "Carissa Almira Priandika", homebase: "Biru" },
        { name: "Daffa Ihsan Alvaro", homebase: "Kuning" },
        { name: "Dzakira Meysha Setyawan", homebase: "Ungu" },
        { name: "Filza Kamila Azizah", homebase: "Kuning" },
        { name: "Gayatri Putri Sumariyati", homebase: "Biru" },
        { name: "Ihsan Zaky Abdillah", homebase: "Merah" },
        { name: "Karna Ferre Romadhony", homebase: "Biru" },
        { name: "Kennzie Sofyan Pratama", homebase: "Hijau" },
        { name: "Kiana Nashita Sakhi", homebase: "Biru" },
        { name: "Maulana Nurdaffa Aydin Wahid", homebase: "Hijau" },
        { name: "Mochammad Dzakwan Zahran Muttaqin", homebase: "Kuning" },
        { name: "Muhammad Adzka Habibi Arifin", homebase: "Ungu" },
        { name: "Nuraisyah Kamila", homebase: "Merah" },
        { name: "Qimara Princess Zirka Hutabarat", homebase: "Merah" },
        { name: "Queensha Azalea Khanza Susilo", homebase: "Ungu" },
        { name: "Sunan Ahmad Ramadhan", homebase: "Ungu" },
        { name: "Tsabita Aqila Putriayra", homebase: "Hijau" },
        { name: "Zahira Humayra Maron", homebase: "Ungu" },
        { name: "Zahirah Shanum Pua Jiwa", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "6C": [
        { name: "Abrisham Danish Arsakha", homebase: "Merah" },
        { name: "Aisha Khairani Dewi", homebase: "Hijau" },
        { name: "Aisyah Putri Kamila", homebase: "Ungu" },
        { name: "Amira Hilwah Maulidyah Nur", homebase: "Hijau" },
        { name: "Andra Prasetya Wiryananta", homebase: "Kuning" },
        { name: "Aqila Azka Adil", homebase: "Merah" },
        { name: "Aqila Putri Azzahra", homebase: "Merah" },
        { name: "Athaya Falah Adzim", homebase: "Ungu" },
        { name: "Banyoe Ararya Putra Risdian", homebase: "Merah" },
        { name: "Habibi El Rahman", homebase: "Merah" },
        { name: "Hisyaam Al Maisan Zhafar", homebase: "Biru" },
        { name: "Jihan Nur Khumairo Az Zahra", homebase: "Biru" },
        { name: "Keisha Azzahra Arsya Sugiharto", homebase: "Kuning" },
        { name: "Lovelia Sapphirenna Setiawan", homebase: "Biru" },
        { name: "M Reyndra Manggala Bimasakti", homebase: "Ungu" },
        { name: "Mahira Aisha Rofi Putri", homebase: "Biru" },
        { name: "Muhammad Ali Arta", homebase: "Kuning" },
        { name: "Najwa Khadijah Karimah", homebase: "Biru" },
        { name: "Namira Abyan Jauhara", homebase: "Ungu" },
        { name: "Qonita Sidqiyya Syamsudin", homebase: "Hijau" },
        { name: "Queisya Alula Latisha Hananta", homebase: "Hijau" },
        { name: "Quinno Alfarizqi Pratama", homebase: "Kuning" },
        { name: "Raisha Putri Prasetya", homebase: "Hijau" },
        { name: "Rania Shafa Adzkamillah", homebase: "Kuning" },
        { name: "Rasya Muhammad Athaya", homebase: "Ungu" },
        { name: "Zayin Faqiih Afif", homebase: "Ungu" },
        { name: "Zivana Hilla Al Aufrida Purba", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
    "6D": [
        { name: "Ahmad Nabil Al Akbar Amirullah Asy Syafi'I", homebase: "Biru" },
        { name: "Aiko Shadrina Zhufairah", homebase: "Hijau" },
        { name: "Aisha Farah", homebase: "Ungu" },
        { name: "Aisyah Hadzkya Shakeena", homebase: "Kuning" },
        { name: "Alfa Syauqi Alaika Muhammad", homebase: "Biru" },
        { name: "Allysia Hana Mori", homebase: "Hijau" },
        { name: "Arsya Zarin Ashalina", homebase: "Biru" },
        { name: "Asyifa Kaysha Almeira", homebase: "Merah" },
        { name: "Bashar Mahesa Emir Akhmad", homebase: "Merah" },
        { name: "Dzakiyah Ghina Rachma", homebase: "Ungu" },
        { name: "Fadhil Anwar Kurniawan", homebase: "Kuning" },
        { name: "Febrianne Illiyin Sakhi", homebase: "Hijau" },
        { name: "Halwa Majdah Izzah", homebase: "Merah" },
        { name: "Letisha Adriana Viano", homebase: "Kuning" },
        { name: "Muhamad Al-Fatih Kusumo Subagyo", homebase: "Kuning" },
        { name: "Muhammad Athar Al Naja", homebase: "Biru" },
        { name: "Muhammad El Azzam Abidin", homebase: "Ungu" },
        { name: "Muhammad Fabian Rasya Pradipta", homebase: "Hijau" },
        { name: "Muhammad Ivan Azka Athallah", homebase: "Hijau" },
        { name: "Nabila Qaireen Almaira Zahra", homebase: "Hijau" },
        { name: "Nadira Ramadina", homebase: "Merah" },
        { name: "Naveda Alesha Rifaya", homebase: "Biru" },
        { name: "Queena Sita Putri Nurhadhy", homebase: "Ungu" },
        { name: "Rahajeng Aira Prawiradita", homebase: "Ungu" },
        { name: "Rakha Sahl Zada", homebase: "Merah" },
        { name: "Rayyandra Abyan Afkhar", homebase: "Hijau" },
        { name: "Razqa Atharayandra", homebase: "Ungu" },
        { name: "Senandung Lembayung Senja", homebase: "Kuning" },
        { name: "Zahid Zubair", homebase: "Kuning" },
        { name: "Zivanna Kioko", homebase: "Kuning" },
    ].sort((a, b) => (typeof a === 'string' ? a : a.name).localeCompare(typeof b === 'string' ? b : b.name)),
};

window.initRegistration = function () {
    console.log('Initializing Registration Script...');
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
        let colorClass = 'primary';

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

    if (btnCloseAlert) {
        btnCloseAlert.onclick = closeAlert;
    }
    if (alertBackdrop) {
        alertBackdrop.onclick = closeAlert;
    }

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
                STUDENTS_DATA[selectedClass].forEach(student => {
                    const isObject = typeof student === 'object';
                    const name = isObject ? student.name : student;
                    const homebase = isObject ? student.homebase : '';

                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name + (homebase ? ` (${homebase})` : '');
                    option.dataset.homebase = homebase; // Store in data attribute
                    nameSelect.appendChild(option);
                });
            } else {
                nameSelect.disabled = true;
            }
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                div.remove();
                if (typeof updateAttendeeButton === 'function') updateAttendeeButton();
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
                updateAttendeeButton();
            });
        }
    }

    // Attendees Management
    const attendeesContainer = document.getElementById('attendees-container');
    const btnAddAttendee = document.getElementById('btn-add-attendee');
    let autoFillSetup = false; // Flag to track if auto-fill is already setup


    function createAttendeeRow(index) {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-start opacity-0 transform translate-y-2 transition-all duration-300';
        const placeholder = index === 0 ? 'Nama yang akan hadir (otomatis dari Nama Lengkap)' : 'Nama orang kedua yang akan hadir';
        const isReadOnly = index === 0 ? 'readonly' : '';
        const bgClass = index === 0 ? 'bg-gray-100/50 cursor-not-allowed' : 'bg-[#f8f7f5]';

        div.innerHTML = `
            <div class="flex-1">
                <input type="text" name="attendee_name_${index}" placeholder="${placeholder}" required ${isReadOnly}
                    class="w-full ${bgClass} dark:bg-[#221d10] border-0 rounded-xl px-4 py-3 text-sm text-[#1c180d] dark:text-white placeholder:text-[#1c180d]/30 dark:placeholder:text-white/30 focus:ring-2 focus:ring-primary">
            </div>
            ${index > 0 ? `<button type="button" class="btn-remove-attendee text-red-500 hover:text-red-700 p-2"><span class="material-symbols-outlined text-lg">delete</span></button>` : ''}
        `;

        const removeBtn = div.querySelector('.btn-remove-attendee');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                div.remove();
                // Update button visibility
                updateAttendeeButton();
            });
        }

        return div;
    }

    function updateAttendeeButton() {
        if (attendeesContainer && btnAddAttendee) {
            const attendeeCount = attendeesContainer.children.length;

            // Rule: Max 2 attendees allowed regardless of children count
            if (attendeeCount >= 2) {
                btnAddAttendee.style.display = 'none';
            } else {
                btnAddAttendee.style.display = 'flex';
            }
        }
    }

    // Initialize first attendee row
    if (attendeesContainer) {
        const firstRow = createAttendeeRow(0);
        attendeesContainer.appendChild(firstRow);
        // Animate in
        requestAnimationFrame(() => {
            firstRow.classList.remove('opacity-0', 'translate-y-2');
        });

        if (btnAddAttendee) {
            btnAddAttendee.addEventListener('click', () => {
                const count = attendeesContainer.children.length;
                if (count < 2) { // Maximum 2 attendees
                    const newRow = createAttendeeRow(count);
                    attendeesContainer.appendChild(newRow);
                    requestAnimationFrame(() => {
                        newRow.classList.remove('opacity-0', 'translate-y-2');
                    });
                    updateAttendeeButton();
                }
            });
        }
        updateAttendeeButton();
        setupAttendeeAutoFill();
    }

    // Setup auto-fill for first attendee from parent name
    function setupAttendeeAutoFill() {
        if (autoFillSetup) return; // Already setup

        const parentNameInput = document.querySelector('input[name="parent_name"]');
        const firstAttendeeInput = attendeesContainer?.querySelector('input[name="attendee_name_0"]');

        if (parentNameInput && firstAttendeeInput) {
            // Sync on parent name change
            parentNameInput.addEventListener('input', (e) => {
                const currentFirstAttendee = attendeesContainer?.querySelector('input[name="attendee_name_0"]');
                if (currentFirstAttendee) {
                    currentFirstAttendee.value = e.target.value;
                }
            });

            // Initial sync if parent name already has value
            if (parentNameInput.value) {
                firstAttendeeInput.value = parentNameInput.value;
            }

            autoFillSetup = true;
        }
    }

    // Infaq Logic (Radio Buttons)
    const infaqRadios = document.querySelectorAll('input[name="infaq_status"]');
    const infaqContainer = document.getElementById('infaq-container');

    if (infaqRadios.length > 0 && infaqContainer) {
        const fileInput = infaqContainer.querySelector('input[type="file"]');

        infaqRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isYes = e.target.value === 'yes';

                if (isYes) {
                    infaqContainer.classList.remove('hidden');
                    if (window.gsap) {
                        gsap.fromTo(infaqContainer,
                            { height: 0, opacity: 0, marginTop: 0 },
                            { height: 'auto', opacity: 1, marginTop: '12px', duration: 0.3, ease: 'power2.out' }
                        );
                    }
                } else {
                    if (window.gsap) {
                        gsap.to(infaqContainer, {
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                infaqContainer.classList.add('hidden');
                                if (fileInput) fileInput.value = '';
                            }
                        });
                    } else {
                        infaqContainer.classList.add('hidden');
                        if (fileInput) fileInput.value = '';
                    }
                }
            });
        });
    }

    // Payment Method Logic (Transfer vs Cash)
    const paymentMethodRadios = document.querySelectorAll('input[name="payment_method"]');
    const transferSection = document.getElementById('payment-transfer-section');
    const cashSection = document.getElementById('payment-cash-section');

    if (paymentMethodRadios.length > 0 && transferSection && cashSection) {
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const method = e.target.value;
                if (method === 'transfer') {
                    transferSection.classList.remove('hidden');
                    cashSection.classList.add('hidden');
                } else if (method === 'cash') {
                    transferSection.classList.add('hidden');
                    cashSection.classList.remove('hidden');
                }
            });
        });
    }

    // Modal Logic
    function openModal(e) {
        if (e) e.preventDefault();
        console.log('Opening Modal...');
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
        console.log('Button Register Found, adding listener');
        btnRegister.addEventListener('click', openModal);
    } else {
        console.error('Button Register (btn-register-cta) NOT FOUND');
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

            if (!supabaseClient) {
                window.showCustomAlert('Error Sistem', 'Supabase belum dikonfigurasi. Mohon cek file js/supabase-config.js', 'error');
                return;
            }

            // Gather Children Data & Homebases
            const childRows = childrenContainer.querySelectorAll('.flex'); // Select custom rows
            const childrenList = [];
            const homebasesList = [];

            childRows.forEach(row => {
                const cls = row.querySelector('.class-select').value;
                const nameSelect = row.querySelector('.name-select');
                const name = nameSelect.value;

                if (cls && name) {
                    const option = nameSelect.options[nameSelect.selectedIndex];
                    const hb = option.dataset.homebase || '';

                    childrenList.push(`${name} (${cls})`);
                    if (hb) homebasesList.push(hb);
                }
            });

            if (childrenList.length === 0) {
                window.showCustomAlert('Data Tidak Lengkap', 'Mohon tambahkan setidaknya satu data anak.', 'warning');
                return;
            }

            // Gather Attendees Data
            const attendeeRows = attendeesContainer.querySelectorAll('.flex');
            const attendeesList = [];

            attendeeRows.forEach(row => {
                const input = row.querySelector('input[name^="attendee_name"]');
                if (input && input.value.trim()) {
                    attendeesList.push(input.value.trim());
                }
            });

            if (attendeesList.length === 0) {
                window.showCustomAlert('Data Tidak Lengkap', 'Mohon isi nama orang yang akan hadir.', 'warning');
                return;
            }


            // Set Loading State
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">progress_activity</span> Processing...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            // Validate Form
            try {
                validateForm(formData);
            } catch (validationError) {
                window.showCustomAlert('Validasi Gagal', validationError.message, 'warning');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            const file = formData.get('payment_proof');
            let proofUrl = '';

            try {
                // 1. Upload File
                if (file && file.size > 0) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabaseClient.storage
                        .from('registration-proofs')
                        .upload(filePath, file);

                    if (uploadError) throw uploadError;

                    // Get Public URL
                    const { data: { publicUrl } } = supabaseClient.storage
                        .from('registration-proofs')
                        .getPublicUrl(filePath);

                    proofUrl = publicUrl;
                }

                // 2. Insert Data
                const data = {
                    parent_name: formData.get('parent_name'),
                    child_name: childrenList.join(', '), // Storing as comma separated string
                    homebase: homebasesList.join(', '), // Save to new column
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    attendees: attendeesList.join(', '), // Save attendees names
                    infaq_status: formData.get('infaq_status'),
                    payment_method: formData.get('payment_method'), // Added payment_method
                    proof_url: proofUrl,
                    created_at: new Date().toISOString()
                };

                const { data: insertedData, error: insertError } = await supabaseClient
                    .from('registrations')
                    .insert([data])
                    .select(); // Select to get the ID

                if (insertError) throw insertError;

                const registrationId = insertedData[0].id;

                // Success
                submitBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Success!';
                submitBtn.classList.add('bg-green-500', 'text-white');
                submitBtn.classList.remove('bg-primary', 'text-[#1c180d]');

                setTimeout(async () => {
                    closeModal();
                    form.reset();
                    childrenContainer.innerHTML = '';
                    childrenContainer.appendChild(createChildRow(0));
                    attendeesContainer.innerHTML = '';
                    attendeesContainer.appendChild(createAttendeeRow(0));
                    updateAttendeeButton();
                    setupAttendeeAutoFill();


                    // Generate Professional Ticket
                    try {
                        const ticketData = {
                            parent_name: data.parent_name,
                            children: data.child_name,
                            attendees: data.attendees,
                            phone: data.phone,
                            email: data.email,
                            id: registrationId, // Pass ID for QR Code
                            date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                            infaq_status: data.infaq_status,
                            payment_method: formData.get('payment_method')
                        };

                        // Use local file for canvas to avoid CORS issues
                        const proofImgUrl = file ? URL.createObjectURL(file) : null;
                        const ticketUrl = await generateTicket(ticketData, proofImgUrl);

                        const link = document.createElement('a');
                        link.href = ticketUrl;
                        link.download = `E-Ticket_Milad21_${data.phone}.jpg`;
                        link.click();

                    } catch (err) {
                        console.error('Error generating ticket:', err);
                        // Fallback to original proof URL if generation fails
                        if (proofUrl) {
                            window.open(proofUrl, '_blank');
                        }
                    }

                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('bg-green-500', 'text-white');
                        submitBtn.classList.add('bg-primary', 'text-[#1c180d]');
                    }, 500);
                }, 1500);

                window.showCustomAlert('Sukses!', 'Pendaftaran berhasil! Silahkan unduh E-Ticket Anda.', 'success');

            } catch (error) {
                console.error('Error:', error);
                window.showCustomAlert('Pendaftaran Gagal', 'Terjadi kesalahan: ' + (error.message || 'Unknown error'), 'error');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initRegistration);
} else {
    window.initRegistration();
}


// Helper: Generate Ticket Image
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

    // Attendees Info
    if (data.attendees) {
        const attendees = data.attendees.split(',');
        ctx.fillStyle = '#888888';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('Yang Hadir', x, y);
        ctx.fillStyle = '#000000';
        ctx.font = '28px sans-serif';
        attendees.forEach((attendee, i) => {
            ctx.fillText(attendee.trim(), x + 250, y);
            y += 40;
        });
        y += 20;
    }


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

    if (data.infaq_status === 'yes' && data.payment_method === 'cash') {
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('METODE: TUNAI (Wali Kelas)', x, y + 30);
        ctx.font = 'italic 20px sans-serif';
        ctx.fillStyle = '#888888';
        ctx.fillText('Silahkan titipkan infaq kepada Wali Kelas.', x, y + 60);
    } else if (proofImgUrl) {
        try {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if image fails
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
            } else {
                throw new Error("Image load failed");
            }
        } catch (e) {
            ctx.fillStyle = '#888888';
            ctx.font = 'italic 20px sans-serif';
            ctx.fillText('(Gambar tidak dapat dimuat)', x, y + 30);
        }
    } else {
        ctx.fillStyle = '#888888';
        ctx.font = 'italic 20px sans-serif';
        const msg = data.infaq_status === 'yes' ? '(Tidak ada bukti pembayaran)' : '-';
        ctx.fillText(msg, x, y + 30);
    }

    // Footer
    const footerY = canvas.height - 60;
    ctx.fillStyle = '#f78dbb';
    ctx.fillRect(0, footerY - 40, canvas.width, 100);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'italic 24px sans-serif';

    // Calculate number of attendees
    const attendeeCount = data.attendees ? data.attendees.split(',').length : 0;
    const attendeeText = attendeeCount > 0 ? `Tiket ini berlaku untuk ${attendeeCount} orang sesuai nama yang terdaftar` : 'Tiket ini berlaku untuk sesuai nama yang terdaftar';

    ctx.fillText(attendeeText, canvas.width / 2, footerY - 10);
    ctx.fillText('Simpan tiket ini dan tunjukkan saat registrasi ulang.', canvas.width / 2, footerY + 10);


    return canvas.toDataURL('image/jpeg', 0.85);
}

// Helper: Form Validation
function validateForm(formData) {
    const phone = formData.get('phone');
    const email = formData.get('email');

    // Phone validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/;
    if (!phoneRegex.test(phone)) {
        throw new Error("Nomor WhatsApp tidak valid (Gunakan format 08xx/62xx).");
    }

    // Infaq validation
    const infaqStatus = formData.get('infaq_status');
    const paymentProof = formData.get('payment_proof');
    const paymentMethod = formData.get('payment_method'); // 'transfer' or 'cash'

    if (infaqStatus === 'yes') {
        // Only require proof if method is transfer
        if (paymentMethod === 'transfer' || !paymentMethod) { // Default to check if undefined
            if (!paymentProof || paymentProof.size === 0) {
                throw new Error("Mohon upload bukti transfer infaq.");
            }
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Format email tidak valid.");
    }
}

// Helper: Copy to Clipboard
window.copyToClipboard = (text, btnElement) => {
    // Fallback if btnElement is not passed directly (triggered by onclick string)
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
        } else {
            if (window.showCustomAlert) {
                window.showCustomAlert('Berhasil', 'Nomor tersalin!', 'success');
            } else {
                alert('Nomor tersalin!');
            }
        }
    }).catch(err => {
        console.error('Copy failed', err);
        if (window.showCustomAlert) {
            window.showCustomAlert('Gagal', 'Gagal menyalin text.', 'error');
        } else {
            alert('Gagal menyalin.');
        }
    });
};

