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
    "1A": ["Akmal Hafizh Rivandra", "Afiqah Callista Safaqila", "Maher Hamizan Xavier Raziq", "Bellatrix Ruby Ailova", "Raisya Maulida Zahra", "Humaira Latifa Wibawa", "Anindyaswari Mahira Utomo", "Qalesya Rayhana Adicahya", "Irzaim Abbad Zaki", "Muadz Xavier Athallah", "Rashdansyah Rayyan Azhami", "Aghnia Cyrauza Ramadhan", "Naureen Mafaza Khairani", "Keyzia Zhafira Pramudita", "Abimana Dewangga Dimas", "Muhammad Syarif Hidayatullah", "Ahsan Muhammad Dipa", "Abayomi Natadwija Ahmad", "Muhammad Daffa Arvano Adhitama", "Abrizam Khairunnas Rafisqy", "Kimora Alisya Jasmine", "Akira Gilang Bagaskara", "Marvelia Ameera Hafidzah Wulur", "Shanum Rizki Azzahra", "Hanania Farah Nabila", "Muhammad Adzka Arzaki", "Arkhan Dhanadipati Tiya Prawiro", "Kiemas Arjun Mangku Hasan", "Mimosa Shahia Inshi", "Muhammad Al Fatih Syihab"].sort(),
    "1B": ["Pramudita Nursyifa Aisha", "Aisyah Ambar Pambayun", "Muhammad Arsya Fahrezi", "Muhammad Iqbal Al Azzam Asyadzilly", "Eilynn Raniah Adn", "Adzkira Zulaikha Putri Santoso", "Syafiq Eleno Yusuf", "Feisya Putri Maheswari", "Mikarai Attaki Pribadi", "Muhammad Arkan Nur Wahid", "Sabina Khanza Augustania Putri", "Rasya Frinizar Naufal Afkar", "Tengku Arlana Arsenio Alqawii", "Shanum Hayyin Althafunnisa", "Ahmad Azmi Adnani", "Afnan Muhammad Dhanurendra", "Hanindhiya Nafilah Az Zahra", "Raffazka Athariz Hamizan Andromeda", "Fatima Dyra Azzahra", "Ebony Arkatama Hindarsyah", "Safiyyah Nur Amira Permata", "Khalisa Amizafirah", "Arsenio Putra Wardhana", "Diajeng Jennaira Rumi", "Abizar Alvino Azkandra", "Maulana Khalif Putra Arifin", "Aurellia Kaylee Maheswari Ramadhani", "Hazrina Anandya Azzahra", "Malik Abdur Rohiman", "Abidzar Arrazi Wicaksono"].sort(),
    "1C": ["Aqmar Izza Pramudana", "Reddy Arsakha Johar", "Aluna Gantaribumi Darmawan", "Arkawangi Larasati Majid", "Aiza Khairania Zanna", "Shirin Nusaybah", "Syafia Ishma Tsaqifah", "Wina Rahmatul Dhuha", "Arkenzo Ziandro Khanza Susilo", "Muhammad Hanif Raffasya", "Bondan Aurora Zhafirah", "Abraham Ahmad Gibran Rabbani", "Faradila Dinda Azalia", "Muhammad Sirojul Azmi Afandi", "Kalandra Rashad Mustofa", "Ferzha Razqa Raffasya", "Ghezia Zara Alhamda", "Ezio Fathan Alfarizi", "Yumna Sabira Luvena", "Zivana Aulia Putri Ariyanto", "Arrayyan Azka Arvinza", "Agam Izar Prasetyo", "Khanza Syifa Azahra", "Aiza Aqsha Samanhudi", "Muhammad Husain Basalamah", "Zavier Aktam Dzakiandra", "Irish Aqila Indrabayu", "Nurdaffa Arhabu Rizqi", "Mahera Ansherlo Adjiwisaka", "Azlan Khalid Pua Jiwa"].sort(),
    "1D": ["Makayla Shazfa Shareen", "Arjuna Razzano Subandrio", "Fathiya Rintik Az Zahra", "Zarin Kalila Zahra", "Bil Asabintang Aldhara", "Ghaziel Abizar Mustiko", "Ceisya Geena Rasti Dinata", "Qiana Isvara Nabila", "Aryash Muhammad Zuhud Amartya", "Daffa Muhammad Alfarezi", "Muhammad Alby Rasya Prawira", "Damar Sayyid Abdillah", "Ganapatih Atharrazka Kusumajaya", "Hafizh Muzammil Al Amin", "Athalla Muhammad Arkananta", "Deliana Tama Aurelia Celina", "Rayna Calysta Putriansa", "Muhammad Ali Fatih Ramadhan", "Andhara Jelita Ramadhani", "Salwa Qidzama Humaira", "Aleia Diaro Anasyasheva", "Denta Dzakiandra Hernawan", "Kalaendra Hastanta Mahazura", "Lubna Hanania Nadhifa", "Almirza Zhafir Akihiko", "Beryl Adzkan Maghali", "Khaizuran Ryuzaki Alzar", "Frananda Ramadhani Hermawan", "Muhammad Azka Putra Arleo", "Raffasya Elfatih Prasetyo"].sort(),
    "2A": ["Arzan Kinza Ravindra", "Sarah Kafkamadina Dipasanta", "Namira Mysha Almahyra", "Kanaya Layla Ferhanadya", "Alicia Calista Geraldinee Praworo Putri", "Dzeroun Novero Putra", "Muhammad Abrisam Manaf", "Ezekiel Barraq Alkas", "Ali Ulul Ilmi", "Kaif Artanabil Hariri", "Althaff Benjamin Dzakiandra Susanto", "Muhammad Faiz Darojad", "Muhammad Fayyad Ghassan Hermawan", "Sidnan Muqaddam Fadhli", "Muhammad Fatih Adiputra", "Arsyila Hilda Fauzia", "Nayaka Syazana Andriyanto", "Nafis Syakir Alfatih", "Aretha Billah Nazafarin", "Ahmad Zhafran Arsya Robbi", "Asy Syam Hannan Azwar", "Adeeva Aisyah Puerdinka", "Afnan Husna Salsabila", "Devanka Daffi Maulana Asyari", "Rafif Rizqullah Altamis"].sort(),
    "2B": ["Arvino Shakeel Ibrahim", "Akhtar Xaquille Anas", "Tsamara Rania Chairyza", "Abdurrahman Arrasyiid", "Muhammad Raja Imanulhaq", "Pradhika Fairuz Yazdi", "Abyaz Athaya Mahardika", "Adinda Kirana Kamania", "Khayru Alfaeyza Martasundjaya", "Adeeva Aila Varisha", "Syarifah Hedy Almahyra Putri", "Hafizah Izzati Putri Fadilah", "Kenzo Athar Riza", "Naira Nazneen Arisanti", "Nadhira Almira Azmi", "Muhammad Alman Ramadhan", "Nadam Abiyoso", "Aisa Nurdiana Fazaalloh", "Muhammad Kaysan Alsyazani", "Muhammad Fatih Agil Gudban", "Diana Almahira Nuura Ramadhani", "Elfathan Ripki Ramdan", "M. Alfarizi Reshwara Mumtaz", "Haveza Sareva", "Raihana Dayu Utama", "Muhammad Zhafran Aqila Dirgantara", "Ayra Nur Hafizah"].sort(),
    "2C": ["Dyra Fathia Azkayra", "Naladhipa Ahsana Dzikra", "Shakira Putri Pradhana", "Ahmad Zulhadi Ar-Rasyid", "Anindita Azzahra Jaswinder", "Althafiz Riffa Aldebaran", "Javier Athalla Khalfani", "Salma Adreena Primariayu", "R.P.Maxime Junior Tjakradiputra", "Zafran Latif Maulana", "Hideo Aldric Adyaraka Saputra", "Khansa Alea Zahra", "Aretha Aluna Kenda", "Riddari Alsaki Ganisena", "Agam Mahendra Alfatih", "Dafiqi Zulfikar Alhamiz", "Zivanka Qalesya Alfatih", "Abqori Kenzie Ramadhan", "Ayra Zahra Malika Shaliha", "Mohammad Rayyan", "Reva Nirwasita Putri", "Kai Anindito Pertama", "Muhammad Arkana Chairyzi", "Nayla Clarine Anindyaswari", "Isvara Farzana Hikari", "Mustofa Rajaban Ananta", "Muhammad Sam Sulaiman"].sort(),
    "2D": ["Muhammad Damar Aruna Gemintang", "Quinza Aqila Melody", "Adediivo Ramadhana Nandadhiva", "Firdano Alvaro Rayhan", "Ayesha Mikhayla Adreena Setiawan", "Rafif Alfarezi Laksana", "Hatmia Immi Prasmita", "Sabrina Amadia Anka", "Muhammad Althaf Abidin", "Andyra Cahya Almira", "Muhammad Hafiz Al Ihsan", "Ameera Lovia Kinarian", "Muhammad Tsaqif Adnani Rahman", "Muhammad Haidar Rasyid Dirgantara", "Farezell Uwais Al Fatih", "Gi Pio Affandra Alsaki Muslim", "Narendra Rafa Putra Sugiharto", "Arthur Niam Alfatah", "Harumi Iqlima Azzahra", "Maureen Abelia Thalita", "Abqary Runako Arsenio Romadhoni", "Adreena Shakila Maulidina Arifin", "Diandra Syafira Putri Harjanto", "Kiani Lanika Nurhadhy", "Ihya Syauqi Al Faruq Askha"].sort(),
    "3A": ["Airis Nafi'Ah Khairunnisa", "Arsyaka Fardan Zakki", "Naufa Aida Shaqueena Azkadina Mubarak", "Raisya Sheza Adreena", "Agha Adzriel Fauzi", "Aurora Ghaitsa Arsyva", "Muhammad Zayan Athariz", "Halwa Goeh Capillary", "Keana Chandarabumi Darmawan", "Kianoush Atanara Pribadi", "Fathian Akhmad Raffasya", "Alfatih Kian Kanindra", "Fathiyya Mysha Aleena Fardanah", "Dzulqarnain Latif Wibowo", "Fadhlan Kenzie Hamizan", "Aisha Azzahra Riszaldi", "El Ningrat Putra Bumi", "Kevin Haidar Naraindra", "Ranya Azkadina Soelistianto", "Muhammad Qaishar Fikry", "Rafa Arshad Primadani", "Adreena Zaynalesha Distira", "Shanumindira Sabiya Farrahinas", "Putri Khayla Sylvana Firli", "Adam Haidar Ar-Rizky", "Rafandra Dzaka Pranadipta", "Muhammad Safarez Rashya Ardianto", "Elzafran Tjahya Priyambodo", "Annezikria Nirma Latifa", "Arsenio Sukma Faeyza"].sort(),
    "3B": ["Zinan Maulana Rayvolta", "Elvira Azhar Putri Akhula", "Nadwa Elshanum Abidah", "Muhammad Dzu Alfiqar Arnou Erdogan", "Kaivandra Rezqiano Pratama", "Arzion Seano Zenechka", "In Amul Aufa Al Zamzami", "Muhammad Haidar Alkhalifi", "Nauli Ainun Syahnaz Azzahra Mubarak", "Gwen Edgar Kayosahl El Khalief", "Ibrahim Mahesh Winoto", "Muhammad Faqih Habiburrahman", "Alula Arabella Sudibyo", "Kelvino Elmoza Asyraf", "Rhanayya Callista Putri", "Muhamad Ibrahim Majid Alfatih", "Muhammad Zhian Rafaeyza Wahid", "Muhammad Fakhrial Attarizayn Asyauqi", "Muhammad Rafi Ramadhan", "Nabila Myesha Shakila", "Azzahra Hannan Sanjaya", "Alesha Zahra Ratifa Duski", "Bryan Fatih Aryasatya", "Adeeva Aalinarrahman", "Latifah Khoir Rumi Rohiman", "Endzo Maliq Pangastiting Nalar", "Afiqa Ajwa Maulidya", "Rania Azzahra Putri Arlea", "Brava Louvain Viano Muhammad", "Adelia Cevira Kusumahadi"].sort(),
    "3C": ["Naqia Sakhiya Zaha", "Cut Lashira Syafazea", "Ganaya Arcia Rakhsandrina Kurniawan", "M. Fabian Abiyasta Mumtaz", "Richelle Fredelin Aquina Wijaya", "Sholahuddin Luqman Wibisono", "Kafie Athallah Ghaziy Wirayuda", "Muhammad Raka Athalla", "Khalfani Rifan Zamzami", "Hafizh Irham Ferdiansyah", "Adelio Khrisna Sakti", "Aryanta Rasendria", "Fatimah Nur Izzati", "Arsyila Kirana Shanum", "Nurus Shidqiya Sajidah", "Alifiandra Sachio Mahardika", "Muhammad Al Zhafran Nirwana Arkananta", "Azizah Rizal Ghoniem", "Retno Ayu Purbaningrum Titis Pramana", "Affan Abrar Rajendra", "Arsenio Ravandra Nugraha", "Muhammad Naufal Al Gibran", "Kinan Mikhayla Arsyla", "Panji Naufal Ramadhanis", "Nasyitha Naufalyn Najiyah", "Fanisha Azkadina", "Azmiy Runako Yusuf", "Rois Gholin Al-Isyqy", "Muhammad Safaroz Rafisqy Ardianto"].sort(),
    "3D": ["Aisyah Viona Azkadina", "Mikhayla Avicenna Caliefa Aznii", "Gerda Parama Wisesa Cahyono", "Geasya Raqilla Aliana Hafidzah", "Altaf Mahesa Bimasakti", "Muhammad Ibrahim Nabil Al Habibie", "Ahmad Dharma Avicenna", "Naureen Aisyah Syaqilla Almahyra Mubarak", "Rafardhan Albiansyah Raharjo", "Ezio Abiwara Setyawijaya", "Muhammad Safaraz Rayyan Ardianto", "Muhammad Alfa Rizqi Putra Agung", "Almahyra Isnuna Primadi", "Keanu Naryama Sidqei", "Muhammad Raffa Narya Ramadhan", "Andhara Az Zahra", "Bahiyya Naila Naja", "Raga Muslim Nusantara", "Kyara Keysensia Putri", "Faridz Biyan Al Fatih", "Hanifah Diana Adzkia", "Kenar Daegal Johan", "Muhammad Haykal Abhiseva", "Hasan Musthofa Sanyoto", "Nadine Ardhanareswari", "Mikhayla Hafza Farasti", "Queensha Aishwarya Kharisma", "Barmastya Ruyi Imawan", "Ahda Ikmaluddiin Mu'Izz", "Arzachel Alvaro Naufal"].sort(),
    "4A": ["Mochammad Haikal Azzaky", "Kirana Mutia Azzahra", "Apsari Aulia Madani", "Athaya Maryam Puerdinka", "Alya Azizah Putri", "Dylan Athaya Dzihni", "Amira Fatiha Ghina", "Wara Alvaro Yavea Zamarion", "Faiza Azzahra", "Muhammad Zaidan Syamsudin", "Ganendra Aryasatya Kusumajaya", "Nadia Fairuza Kamila Pribadi", "Tsany Kasyfur Rahman", "Syaqila Assyabiya Yuri Widodo", "Ahmad Bilal Darmadya", "Raisa Arnelita Putri", "Muhammad Ismail Arta", "Almeera Qaireen Ferryanto", "Gibran Vigi Muttaqin", "Hanan Maulana Shiddiq", "Kanaka Arganta Bramantyo", "Muhammad Arrafif Yusufa", "Mahadhiya Utari Ashana", "Arsy Aflahul Ghifary Syahyu", "Hira Nahda Sofyan", "Bimo Alvaronizam Wilbert", "Muhammad Gibran Al Arsy"].sort(),
    "4B": ["Akbar Caesar Nurfattah", "Nurjibril Haidir Admaja", "Mohammed Ibrahim Purbawisesa", "Muhami Abdurrahman Al-Ayyubi", "Arsyira Shangsa Mahdiantoro", "Dhea Ayunda Febimawarni", "Azka Malik Ibrahim", "Khanza Alycia Queen Yosefania", "Sabila Hamda Malki", "Lubna Khairunnisa Putri Indratmo", "Jihan Malihah Putri", "Mohammad Rizky Adam", "Muhammad Saamy Azzuhri", "Nasyauqi Tsabitah Azzahra", "Shabrina Shidqia Arganta", "Zulfan Zahin", "Rakha Ahza Athaya", "Zacky Akthara", "Arkan Al Kahfi", "Celina Leona Thompson", "Diego Zhafran Adelmar Justice", "Bilqis Alesha Via Lobe", "Leora Maureen Aditya", "Muhammad Sauqi Bagaskara", "Raka Rafasya Bachri", "Athmar Frinizzan Shidqie Aldari"].sort(),
    "4C": ["Fawwaz Zamzamy Al-Musthofa", "Syifa Adiba Hasna", "Arina Salsabila Ramadhani", "Quenazahra Laviola Kimora Yuarta", "Muhammad Farid Tattong Bunga", "M. Al-Azizi Zubaydi Maulana", "Ayska Aqila Andhata", "Muhammad Mahdi", "Gauzan Al Khalifi Putraayra", "Dhinastia Bestary", "Fatimah Azzahra Maron", "Arkaizan Mishary Admagrandis", "Shaka Abimanyu Arganta", "Salju Bumi Saariselka", "Asgardio Yusuf", "Jingga Jazila Permana", "Gibran Xavier Kamal", "Muhammad Zidane Alfarizqi", "Aisyah Sarah Rabbani", "Al Irsyad Reifansyah Arif", "Muhammad Asyraf Nizhamuddin", "Almahira Zayyan Makaila", "Achazia Zippora Sachi Hananta", "Muhammad Hafidz Al Fatih", "Izzudin Al Khaizan", "Raisa Ratifa Dewi", "Sabrina Laquisha Yusuf"].sort(),
    "4D": ["Rafli Althaf Ghaisan", "Sandhya Dahayu Nareswari Ridyan", "Lalu Althafurrahman Ircya Putra", "Nayyara Keisya Jenna", "Salasika Tasanee", "Salsabila Putri Azzahra", "Naura Almeira Putri Puji", "Ahmed Ghazali", "Raffahlevi Putra Al Maghribi", "Malvin Aquila Sava Wibowo", "Ralina Sirahlexa Wijanarko", "Dwipha Rakaaji", "Abraham Garrison Santoso", "Kayyisah Azkadina Putri", "Muhammad Wildan Syamsudin", "Sabian Azka Setiawan", "Almahyra Khalisa Putri", "Allister Carleon Iswantopo", "Keiko Adzkiya Farzana Deeba", "Daneswara Kaleaqoba", "Rasyid Ismail Abrisam", "Iqbal Minhajul Abidin Pribadi", "Balya Ahmed Al-Arsy", "Ghealsy Ayudya Rizki", "Abidah Kamila Faiza", "Ardani Dewi Masitoh", "Alya Afiqah Azzahra"].sort(),
    "5A": ["Aisyah Hafidzatul Husna", "Alaric Muhammad Adnicho Romadhoni", "Nabila Khadziqah Aulya Azmi", "Ibrahim Gathan Pradana", "Maulana Neil Amjad", "Altaf Mario Indrabayu", "Najwa Khadijah Damiya", "Shirin", "Hayde Keiz Zidan", "Salsabila Zukhrufi Firdaus", "Kaysa Iffah Najicha", "Jill Allysha Adzkia Amanda", "Amira Ghina Diajeng Askha", "Rania Mazaya Farkhandah", "Afareen Qidzama Nazhaleya", "Muhammad Haydar Senna Ramadhan", "Muhammad Arshaka Raya Wibowo", "Muhammad Nafiz Faris Asyraf", "Muhammad Azzam Zhafran Safaraz", "Muhammad Azzam Irsyady", "Bima Pasha Ariefianto", "Adirajada Wirasena Utomo", "Bagas Rafif Putra Seno", "Maheswara Ali Wijaya", "Ameera Hana Shakira Ramadhani", "Clarisha Anindya Ayu", "Ahmad Wildan Ali Farzani", "Yafiq Althaf Achmad"].sort(),
    "5B": ["Nareswari Zhafirasya Fajrin", "Gillian Abimana Saputra", "Muhammad Bilal Abqari Sanjaya", "Nayla Tanisha Priadini", "Bagus Rafif Putra Seno", "Hafizh Putra Zalia", "Alaric Virzha Ferdiansyah", "Egy Al Qaris Keandre", "Shakilla Naura Azzahra", "Thara Kaylitia Sindu", "Rasendriya Agha Prasetiawan", "Alaric Shabaz Pravistara", "Alisha Shafiyah Akbar", "Haikal Zidan Fachrezi", "Annisa Qollbiyyah", "Tiffany Almeira Praworo Putri", "Muhammad Rafandra Aqlan Wijaya", "Muhammad Athar Rizky Athaya", "Ahmad Zein Al Falah", "Muhammad Raihan Bagaskara Yazdi", "Teuku Muhammad Ammar Alhazeeq", "Alesha Zahra Arie Wicaksono", "Moh Mirza Fatikhurroyan", "Dari Ilham Ramadhan", "Ahmad Averroes Hakky", "Muhammad Nizar Zulmi", "Amira Raisah Kalani"].sort(),
    "5C": ["Muhammad Alif Nabil Al Fatih", "Habibie Al Fatih", "Muhammad Naufal Ramadhan Antara", "Adelina Maheswari Adia", "Muhammad Jibran Ar Rayyan", "Adzkia Khanza Shaufa Anggara", "Al Miftah Faiz Syfa Liriansisbi", "Diandra Arumi Anwar", "Harun Muhammad Dipa", "Reval Akmal El-Azzam", "Naufal Rafanino Indraguna", "Eljunna Sakya Kenda", "Khanza Otylia Rosyidi", "Muhammad Zafran Al Jazari", "Nayla Ainun Humaira", "Muhammad Yusril Zain Al Arsy", "Aswin Bagaskara Firmanda", "Arya Diwangkara Buana", "Fathan Alfarizqy Martasundjaya", "Keenan Ramadhana Nandadhiva", "Aura Gwenalesha Distira", "Nararya Farih Bumi Cahyono", "Rayadh Al Fath", "Haikal Yanuar Rahman", "Sekar Wilujeng Larasati", "Keysha Devina Fitri", "Afifah Nur Syakira", "Muhammad Putra Wirasena Sanjaya"].sort(),
    "5D": ["Aliyya Naufalyn Ramadhina", "Muhammad Raffaza Althaf Baihaqi", "Tristan Avicenna Attila Ahmad", "Reyhan Purnama Al Fatih", "Kiandra Alya Nauli Harahap", "Muhammad Arkan Harith Putra", "Miranda Addaria Yasha Ashila", "Rafa Aufa Athallah Bakhtiar", "Aruna Carientra", "Rajwa Salsabila Kurniawan", "Athiyah Putri Almira", "Muhammad Abrizam Lyfandra Tsaqif", "Achmad Prabu Revolusi", "Alvino Giovani Siregar", "M. Fernando Adelard Adha Df", "Kenzie Hamizan Zamzami", "Lainna Cevira Kusumahadi", "Muhammad Xiza Hariri Assyauqie", "Almira Zafirah Widodo", "Anindya Kayana Salsabila", "Jihan Aqila Khanza Duski", "Muhammad Rafdany Kurniawan", "Muhammad Adzkhan Prawira Negara Hariyadi", "Naura Dzakira Annayla", "Hanan Raziq Angkasa", "Muhammad Afkar Rifqi", "Danish Ahza Arzachel", "Fathiyya Almira Orlin"].sort(),
    "6A": ["Nadhifa Khansa Abidah", "Radithya Nasyief", "Muhammad Alvaro", "Faiz Akhmad Al Ghazali", "Muhammad Ali Arsyad", "Ratuayu Farzana Mahmudah", "Muhammad Danish Ahza Ramadhan", "Syakira Khoirunnisa", "Anindita Syafia Mahardika", "Aptanta Ristiawan Cahyadi", "Azzalea Kianna Akhsan", "Azza Raina Larasati", "Fatih Ammar Rohiman", "Aqila Adeeva Khanza", "Wisnuwardhana Radjasa Amurwabhumi El Munir", "Atfa Kulthoum Al Labiba", "Abdullah Fastaru Hilmy", "Nabila Adele Savana", "Ahmad Thoriq Alzanabi", "Dira Astagina Artanti", "Noah Erawan Putra", "Mahesa Wibawa Putra", "Bianca Salsabilla Azzahra", "Arte Hadi Lesmana", "Azzahra Novrinadia Kharisma", "Nora Salma Elsalsabila", "Hafiza Zakia Mumtaza", "Brian Ghani Ramadhan"].sort(),
    "6B": ["Dzakira Meysha Setyawan", "Qimara Princess Zirka Hutabarat", "Gayatri Putri Sumariyati", "Atiiqah Zahraa Zhaafirah Saksomo", "Zahira Humayra Maron", "Kennzie Sofyan Pratama", "Aradhea Feristha Nabila", "Mochammad Dzakwan Zahran Muttaqin", "Ihsan Zaky Abdillah", "Allea Azqiara Ramza", "Queensha Azalea Khanza Susilo", "Kiana Nashita Sakhi", "Filza Kamila Azizah", "Nuraisyah Kamila", "Maulana Nurdaffa Aydin Wahid", "Aisar Kenrich Borneo", "Muhammad El Azzam Abidin", "Sunan Ahmad Ramadhan", "Zahirah Shanum Pua Jiwa", "Tsabita Aqila Putriayra", "Carissa Almira Priandika", "Karna Ferre Romadhony", "Muhammad Adzka Habibi Arifin", "Ahmad Avin Kayyisi", "Benjani Ruella Nalani", "Aqila Kamaliya Hayunugraha", "Alden Haidar Kenda", "Daffa Ihsan Alvaro"].sort(),
    "6C": ["Zayin Faqiih Afif", "Raisha Putri Prasetya", "Habibi El Rahman", "Namira Abyan Jauhara", "Quinno Alfarizqi Pratama", "Muhammad Ali Arta", "Keisha Azzahra Arsya Sugiharto", "Amira Hilwah Maulidyah Nur", "Andra Prasetya Wiryananta", "Aisyah Putri Kamila", "Aisyah Hadzkya Shakeena", "Najwa Khadijah Karimah", "Jihan Nur Khumairo Az Zahra", "Lovelia Sapphirenna Setiawan", "Aisha Khairani Dewi", "M Reyndra Manggala Bimasakti", "Hisyaam Al Maisan Zhafar", "Queisya Alula Latisha Hananta", "Qonita Sidqiyya Syamsudin", "Mahira Aisha Rofi Putri", "Abrisham Danish Arsakha", "Zivana Hilla Al Aufrida Purba", "Rania Shafa Adzkamillah", "Aqila Putri Azzahra", "Athaya Falah Adzim", "Rasya Muhammad Athaya", "Aqila Azka Adil", "Banyoe Ararya Putra Risdian"].sort(),
    "6D": ["Zivanna Kioko", "Fadhil Anwar Kurniawan", "Nabila Qaireen Almaira Zahra", "Halwa Majdah Izzah", "Bashar Mahesa Emir Akhmad", "Arsya Zarin Ashalina", "Rakha Sahl Zada", "Febrianne Illiyin Sakhi", "Aiko Shadrina Zhufairah", "Senandung Lembayung Senja", "Nadira Ramadina", "Muhamad Al-Fatih Kusumo Subagyo", "Aisha Farah", "Muhammad Ivan Azka Athallah", "Ahmad Nabil Al Akbar Amirullah Asy Syafi'I", "Rahajeng Aira Prawiradita", "Dzakiyah Ghina Rachma", "Naveda Alesha Rifaya", "Muhammad Fabian Rasya Pradipta", "Muhammad Athar Al Naja", "Rayyandra Abyan Afkhar", "Allysia Hana Mori", "Queena Sita Putri Nurhadhy", "Zahid Zubair", "Alfa Syauqi Alaika Muhammad", "Asyifa Kaysha Almeira", "Letisha Adriana Viano", "Razqa Atharayandra"].sort()
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
                alert('Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY in js/registration.js');
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

            // Validate Form
            try {
                validateForm(formData);
            } catch (validationError) {
                alert(validationError.message);
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
                    father_name: formData.get('father_name'),
                    mother_name: formData.get('mother_name'),
                    child_name: childrenList.join(', '), // Storing as comma separated string
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    attendance: formData.get('attendance'), // Capture attendance
                    infaq_status: formData.get('infaq_status'),
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

                    // Generate Professional Ticket
                    try {
                        const ticketData = {
                            father: data.father_name,
                            mother: data.mother_name,
                            children: data.child_name,
                            phone: data.phone,
                            email: data.email,
                            attendance: data.attendance, // Pass to ticket
                            id: registrationId, // Pass ID for QR Code
                            date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
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

                alert('Pendaftaran berhasil! Silahkan unduh E-Ticket Anda.');

            } catch (error) {
                console.error('Error:', error);
                alert('Pendaftaran gagal: ' + (error.message || 'Unknown error'));
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
    ctx.fillStyle = '#ed845e';
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
    ctx.strokeStyle = '#ed845e';
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
        ctx.fillText('(Tidak ada bukti pembayaran)', x, y + 30);
    }

    // Footer
    const footerY = canvas.height - 60;
    ctx.fillStyle = '#ed845e';
    ctx.fillRect(0, footerY - 40, canvas.width, 100);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'italic 24px sans-serif';
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

    if (infaqStatus === 'yes') {
        if (!paymentProof || paymentProof.size === 0) {
            throw new Error("Mohon upload bukti transfer infaq.");
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
            alert('Nomor tersalin!');
        }
    }).catch(err => {
        console.error('Copy failed', err);
        alert('Gagal menyalin.');
    });
};

