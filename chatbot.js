/* ============================================================
   HUGAABRIEEL CHATBOT WIDGET — chatbot.js
   Pasang di semua halaman: <script src="chatbot.js"></script>
   Taruh tepat sebelum </body>
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     1. KNOWLEDGE BASE
  ────────────────────────────────────────── */
  const KB = {
    skills: [
      { name: 'Biologi',         level: 90, detail: 'Spesialisasi di anatomi & fisiologi manusia dan hewan. Juara olimpiade biologi nasional berkali-kali!' },
      { name: 'Kimia',           level: 78, detail: 'Passionate di kimia dengan background kompetisi sains. Aktif di olimpiade sains multidisiplin.' },
      { name: 'Bahasa Inggris',  level: 82, detail: 'Profisiensi Intermediate diakui secara nasional. Peserta olimpiade bahasa Inggris nasional.' },
      { name: 'Menulis',         level: 72, detail: 'Hobby menulis — dari catatan harian sampai esai. Pernah ikut lomba esai nasional UGM & Kemenkes RI.' },
    ],
    achievements_shs: [
      { title: 'Olimpiade Nusantara Sains 2024 — Biologi',       org: 'LBPN & HMD Chemistry UI',               medal: '🥇 Gold + Best Award',  date: '23 Nov 2024' },
      { title: 'Olimpiade Sains Prestasi Pelajar — Biologi',      org: 'Lembaga Prestasi Pelajar & HIMAFI ITB', medal: '🥈 Silver',             date: '04 Oct 2025' },
      { title: 'OPPN 6.1 — Biologi, Advanced Level',              org: 'CV. Bee Digital Prestasi Nusantara',    medal: '🥉 Bronze',             date: '24 May 2026' },
      { title: 'OPPN 6.1 — English, Advanced Level',              org: 'CV. Bee Digital Prestasi Nusantara',    medal: '🥉 Bronze',             date: '24 May 2026' },
      { title: 'OPPN 6.1 — Medical Science, Advanced Level',      org: 'CV. Bee Digital Prestasi Nusantara',    medal: '🌟 Grand Finalist',     date: '24 May 2026' },
      { title: 'AMNO 1.0 — English, Intermediate Level',          org: 'PT. Pusat Prestasi Nusantara',          medal: '✨ Participant A+',     date: '11 Aug 2024' },
      { title: 'AMSAC Vol. 2 2025 — Essay',                       org: 'UGM & Kemenkes RI',                     medal: '📝 Participant',        date: '10 May 2025' },
      { title: 'Pituitary Awareness',                             org: 'Yayasan Komunitas Pituitary Indonesia & Kemenkes RSPON', medal: '❤️ Volunteer', date: '29 April 2026' },
    ],
    achievements_jhs: [
      { title: 'Indonesian Student Biology Competition — Biologi', org: 'Pusat Olimpiade Pelajar & Smart Student', medal: '🥇 Gold',   date: '14 May 2023' },
      { title: 'Language Olympiad — Bahasa Indonesia',            org: 'Olimpiade Indonesia & POP',               medal: '🥈 Silver', date: '12 Apr 2023' },
    ],
    interests: [
      { name: 'Menulis ✍️',              desc: 'Hobby yang melelahkan tapi memuaskan. Suka nulis spontan di HP.' },
      { name: 'Biologi Manusia & Hewan 🔬', desc: 'Suka eksplorasi anatomi, fisiologi, sampai ilmu kedokteran. Tumbuhan? Bikin pusing sedikit, haha.' },
      { name: 'K-Pop & Musik 🎵',         desc: 'Le Sserafim dan Ariana Grande adalah artis favorit. Spotify Wrapped tiap tahun basically lagu mereka on repeat!' },
      { name: 'Cat-Holic Person 🐱',      desc: 'Punya kucing di rumah dan sangat menyayangi mereka. Kucing always bikin hari jadi lebih baik, hehe.' },
    ],
    social: {
      instagram:    '@hugaabrieel',
      instagramUrl: 'https://www.instagram.com/hugaabrieel/',
      wa1:          'wa.me/6287719627045',
      wa2:          'wa.me/6285888240764',
    },
  };

  /* ──────────────────────────────────────────
     2. RESPONSE ENGINE
  ────────────────────────────────────────── */
  const RULES = [
    {
      test: /bantuan|manusia|human|tolong|langsung|orang|gabisa|tidak bisa|nggak bisa|help/,
      reply: () => 'Tentu! Kalau butuh bantuan langsung dari Gabriel, ini kontaknya 🙌\n\nSiap dihubungi ya!',
      emoji: '🆘', contact: true,
    },
    {
      test: /kontak|contact|hubungi|reach|social|media|instagram|ig\b|wa\b|whatsapp|dm\b|chat/,
      reply: () => `Bisa banget! Ini cara menghubungi Gabriel 📲\n\n**Instagram:** ${KB.social.instagram}\n\nAtau langsung WhatsApp:\n📱 ${KB.social.wa1}\n📱 ${KB.social.wa2}\n\nDia ramah kok, jangan ragu! 😊`,
      emoji: '📲', contact: true,
    },
    {
      test: /siapa|kamu|kenalin|perkenalan|nama|who are you|introduce|profil|about/,
      reply: () => 'Heyy! Perkenalkan, aku asisten virtual milik **Hugaabrieel** (Gabriel) 👋✨\n\nGabriel adalah pelajar SMA yang passionate banget di sains — khususnya **Biologi & Kimia** 🧬⚗️. Dia juga suka nulis, dengerin musik (Le Sserafim & Ariana Grande!), dan main sama kucing-kucingnya 🐱\n\nMau tahu lebih lanjut? Tanya aja!',
      emoji: '🧬',
    },
    {
      test: /skill|kemampuan|keahlian|bisa|passion|bidang/,
      reply: () => {
        let t = 'Wah, Gabriel punya banyak skill keren nih! 🌟\n\n';
        KB.skills.forEach(s => {
          const filled = Math.floor(s.level / 10);
          const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
          t += `**${s.name}** ${s.level}%\n${bar}\n${s.detail}\n\n`;
        });
        return t.trim();
      },
      emoji: '🔬',
    },
    {
      test: /prestasi|pencapaian|achievement|juara|olimpiade|kompetisi|award|menang|medal/,
      reply: () => {
        let t = 'Wah, Gabriel udah banyak banget prestasinya! 🏆✨\n\n**📚 SMA:**\n';
        KB.achievements_shs.forEach(a => { t += `${a.medal} ${a.title}\n_${a.org}_ · ${a.date}\n\n`; });
        t += '\n**🎒 SMP:**\n';
        KB.achievements_jhs.forEach(a => { t += `${a.medal} ${a.title}\n_${a.org}_ · ${a.date}\n\n`; });
        t += 'Semua level **Nasional** loh! Keren banget kan? 🤩';
        return t;
      },
      emoji: '🏆',
    },
    {
      test: /minat|interest|hobi|hobby|suka|favorit|musik|lagu|kucing|cat|kpop|k-pop/,
      reply: () => {
        let t = 'Di luar lab sains, Gabriel punya hobi & minat yang seru! 🎉\n\n';
        KB.interests.forEach(i => { t += `**${i.name}**\n${i.desc}\n\n`; });
        return t.trim();
      },
      emoji: '🎵',
    },
    {
      test: /biologi|biology|anatomi|fisiologi|sel\b|dna|gen\b|organisme/,
      reply: () => 'Nah, ini topik favorit Gabriel! 🧬❤️\n\nDia spesialisasi di **anatomi & fisiologi manusia dan hewan** — dari sistem organ, genetika, sampai biokimia. Bahkan sudah menang beberapa olimpiade biologi nasional!\n\nKatanya: _"Biologi itu indah — tubuh makhluk hidup kayak mesin yang kompleks tapi elegan."_ 🔬✨',
      emoji: '🧬',
    },
    {
      test: /kimia|chemistry|molekul|reaksi|unsur|senyawa|lab\b/,
      reply: () => 'Kimia juga passion Gabriel banget! ⚗️✨\n\nDia aktif di olimpiade sains multidisiplin dan suka banget dunia reaksi kimia & struktur molekul. Makanya desain websitenya penuh motif molekul dan DNA, haha! 😄\n\nSkill kimia level **78%** — terus berkembang!',
      emoji: '⚗️',
    },
    {
      test: /le sserafim|sserafim|ariana|grande|spotify|wrapped|kpop|k-pop/,
      reply: () => 'Soal musik? Gabriel obsessed sama **Le Sserafim & Ariana Grande** 🎤💜\n\nSpotify Wrapped-nya every year basically full lagu mereka on repeat! Dia dengerin musik sambil belajar biologi — produktif banget ya? 😄🎧',
      emoji: '🎵',
    },
    {
      test: /kucing|cat\b|pets|hewan peliharaan|anabul/,
      reply: () => 'Aww, kamu nanya soal kucing Gabriel! 🐱💕\n\nDia emang cat-holic sejati — punya kucing di rumah dan mereka bisa bikin hari-harinya jadi lebih baik, every single time! Sambil nulis atau belajar pun ditemani kucing-kucingnya. Cute banget kan! 🐾',
      emoji: '🐱',
    },
    {
      test: /nulis|menulis|writing|esai|essay|cerita|tulisan/,
      reply: () => 'Menulis adalah passion Gabriel yang sering underrated! ✍️\n\nDia bilang _"hobby yang melelahkan tapi sangat memuaskan."_ Biasanya langsung nulis di HP — lebih spontan dan bebas. Bahkan pernah ikutan **AMSAC Vol.2 2025 — Essay** yang diadain UGM & Kemenkes RI! 📝',
      emoji: '✍️',
    },
    {
      test: /sma|sekolah|pelajar|siswa|student|belajar/,
      reply: () => 'Gabriel masih pelajar SMA yang super aktif! 📚🌟\n\nSelain belajar reguler, dia rutin ikut olimpiade sains nasional di Biologi, Kimia, dan Bahasa Inggris. Prestasinya udah banyak banget! Ketik **"prestasi"** buat lihat daftarnya 🏆',
      emoji: '📚',
    },
    {
      test: /halo|hai\b|hi\b|hello|hey\b|selamat|alo\b|sup\b/,
      reply: () => {
        const greets = [
          'Haii! Selamat datang di chatbot Hugaabrieel! 👋✨ Aku di sini siap bantu kamu kenalan sama Gabriel. Mau tanya apa?',
          'Heyy! Seneng banget ada yang mampir! 🌟 Aku asisten virtual Gabriel — ada yang bisa aku bantu?',
          'Halo halo! Glad you\'re here! 😊 Aku bisa ceritain soal Gabriel, skill-nya, prestasi-prestasinya, dan masih banyak lagi!',
        ];
        return greets[Math.floor(Math.random() * greets.length)];
      },
      emoji: '👋',
    },
    {
      test: /terima kasih|makasih|thanks|thank you|thx\b|ty\b/,
      reply: () => 'Sama-sama! 😊✨ Seneng bisa bantu! Kalau ada pertanyaan lain, aku selalu di sini ya 💬',
      emoji: '😊',
    },
    {
      test: /keren|wow\b|amazing|hebat|bagus|luar biasa|mantap|gila\b|gokil/,
      reply: () => 'Hehe iya kan! Gabriel emang keren! 😄🔥 Tapi dia tetap humble kok. Mau eksplorasi lebih lanjut tentang dia? Masih banyak hal menarik!',
      emoji: '🔥',
    },
  ];

  const DEFAULT_REPLY = {
    text: 'Hmm, aku belum ngerti nih 🤔💭\n\nCoba tanya soal ini:\n• **Siapa Gabriel?** (profil)\n• **Skills** apa yang dimiliki?\n• **Prestasi** & olimpiade\n• **Minat** & hobi\n• **Kontak** / social media\n\nAtau klik tombol quick reply di bawah! 👇',
    emoji: '🤖',
  };

  function getBotReply(msg) {
    const lower = msg.toLowerCase();
    for (const rule of RULES) {
      if (rule.test.test(lower)) {
        return { text: rule.reply(), emoji: rule.emoji, contact: !!rule.contact };
      }
    }
    return DEFAULT_REPLY;
  }

  /* ──────────────────────────────────────────
     3. HTML INJECTION
  ────────────────────────────────────────── */
  function injectHTML() {
    const WA_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.523 5.824L.057 23.804a.5.5 0 0 0 .61.633l6.083-1.596A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.959 0-3.809-.525-5.408-1.451l-.385-.224-3.993 1.047 1.066-3.888-.252-.402A9.962 9.962 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
    const IG_SVG  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;

    const markup = `
<!-- ═══════════════ HUGAABRIEEL CHATBOT ═══════════════ -->
<button id="cb-toggle" aria-label="Buka chatbot">
  <div id="cb-notif-dot"></div>
  <svg class="cb-icon-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" stroke-width="1.8" stroke-linecap="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="8" cy="10" r="1" fill="#6EE7B7" stroke="none"/>
    <circle cx="12" cy="10" r="1" fill="#6EE7B7" stroke="none"/>
    <circle cx="16" cy="10" r="1" fill="#6EE7B7" stroke="none"/>
  </svg>
  <svg class="cb-icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F9A8D4" stroke-width="2" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</button>

<div id="cb-window" role="dialog" aria-label="Chatbot Hugaabrieel">
  <!-- Header -->
  <div class="cb-header">
    <div class="cb-avatar">🧬<div class="cb-avatar-online"></div></div>
    <div class="cb-header-info">
      <div class="cb-name">Gabriel · Hugaabrieel 🌿</div>
      <div class="cb-status">✦ Online sekarang · Siap ngobrol!</div>
    </div>
    <button class="cb-close-btn" id="cb-close-btn" aria-label="Tutup chatbot">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </div>

  <!-- Messages -->
  <div id="cb-messages" role="log" aria-live="polite"></div>

  <!-- Quick Replies -->
  <div id="cb-quick-replies">
    <button class="cb-qr-btn" data-qr="Siapa kamu?">👋 Siapa kamu?</button>
    <button class="cb-qr-btn" data-qr="Apa skill kamu?">🔬 Skills</button>
    <button class="cb-qr-btn" data-qr="Prestasi apa yang kamu raih?">🏆 Prestasi</button>
    <button class="cb-qr-btn" data-qr="Apa minat kamu?">🎵 Minat</button>
    <button class="cb-qr-btn" data-qr="Bagaimana cara menghubungi kamu?">📲 Kontak</button>
    <button class="cb-qr-btn" data-qr="Butuh bantuan manusia">🆘 Bantuan</button>
  </div>

  <!-- Input -->
  <div class="cb-input-area">
    <textarea id="cb-input" placeholder="Ketik pesan..." rows="1" aria-label="Pesan"></textarea>
    <button class="cb-send-btn" id="cb-send-btn" aria-label="Kirim pesan">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </button>
  </div>
</div>
<!-- ════════════════════════════════════════════ -->`;

    document.body.insertAdjacentHTML('beforeend', markup);
  }

  /* ──────────────────────────────────────────
     4. UI UTILITIES
  ────────────────────────────────────────── */
  function getTime() {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function md(text) {
    // Mini markdown: **bold**, _italic_, newlines
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g,       '<em>$1</em>')
      .replace(/\n/g,             '<br>');
  }

  function buildContactCard() {
    return `
      <div class="cb-contact-card">
        <strong>📲 Hubungi Gabriel langsung:</strong><br><br>
        <a href="${KB.social.instagramUrl}" target="_blank" rel="noopener" class="cb-contact-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          Instagram: ${KB.social.instagram}
        </a><br>
        <a href="https://${KB.social.wa1}" target="_blank" rel="noopener" class="cb-contact-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.523 5.824L.057 23.804a.5.5 0 0 0 .61.633l6.083-1.596A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.959 0-3.809-.525-5.408-1.451l-.385-.224-3.993 1.047 1.066-3.888-.252-.402A9.962 9.962 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          WA: +62 877-1962-7045
        </a><br>
        <a href="https://${KB.social.wa2}" target="_blank" rel="noopener" class="cb-contact-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.523 5.824L.057 23.804a.5.5 0 0 0 .61.633l6.083-1.596A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.959 0-3.809-.525-5.408-1.451l-.385-.224-3.993 1.047 1.066-3.888-.252-.402A9.962 9.962 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          WA: +62 858-8824-0764
        </a>
      </div>`;
  }

  function scrollToBottom() {
    const msgs = document.getElementById('cb-messages');
    setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function addBotMessage(text, emoji, extra) {
    emoji = emoji || '🧬';
    extra = extra || '';
    const msgs = document.getElementById('cb-messages');
    const row = document.createElement('div');
    row.className = 'cb-msg-row cb-bot';
    row.innerHTML = `
      <div class="cb-msg-icon">${emoji}</div>
      <div>
        <div class="cb-bubble cb-bot">${md(text)}${extra}</div>
        <div class="cb-bubble-time">${getTime()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('cb-messages');
    const row = document.createElement('div');
    row.className = 'cb-msg-row cb-user';
    row.innerHTML = `
      <div class="cb-msg-icon">😊</div>
      <div>
        <div class="cb-bubble cb-user">${md(text)}</div>
        <div class="cb-bubble-time">${getTime()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollToBottom();
  }

  function showTyping() {
    const msgs = document.getElementById('cb-messages');
    const row = document.createElement('div');
    row.className = 'cb-typing-row';
    row.id = 'cb-typing';
    row.innerHTML = `
      <div class="cb-msg-icon">🧬</div>
      <div class="cb-typing-bubble">
        <div class="cb-dot"></div>
        <div class="cb-dot"></div>
        <div class="cb-dot"></div>
      </div>`;
    msgs.appendChild(row);
    scrollToBottom();
  }

  function removeTyping() {
    const t = document.getElementById('cb-typing');
    if (t) t.remove();
  }

  /* ──────────────────────────────────────────
     5. CHAT STATE & EVENT HANDLERS
  ────────────────────────────────────────── */
  let isOpen     = false;
  let firstOpen  = true;

  function toggleChat() {
    isOpen = !isOpen;
    const win  = document.getElementById('cb-window');
    const btn  = document.getElementById('cb-toggle');
    const dot  = document.getElementById('cb-notif-dot');

    win.classList.toggle('cb-open', isOpen);
    btn.classList.toggle('cb-open', isOpen);
    if (dot) dot.remove();

    if (isOpen) {
      if (firstOpen) {
        firstOpen = false;
        setTimeout(() => {
          addBotMessage(
            'Heyy! 👋✨ Aku asisten virtual **Hugaabrieel** — senang ketemu kamu!\n\nAku bisa ceritain soal Gabriel: skill, prestasi olimpiadenya yang keren, hobi, sampai cara kontak langsung. Mau mulai dari mana? 😊',
            '🧬'
          );
        }, 400);
      }
      scrollToBottom();
      document.getElementById('cb-input').focus();
    }
  }

  function sendMessage(text) {
    const input = document.getElementById('cb-input');
    const val   = (text !== undefined) ? text : input.value.trim();
    if (!val) return;

    // Clear input only if typing (not quick reply shortcut)
    if (text === undefined) {
      input.value = '';
      input.style.height = 'auto';
    }
    showQuickReplies();

    addUserMessage(val);
    showTyping();

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      removeTyping();
      const res = getBotReply(val);
      const extra = res.contact ? buildContactCard() : '';
      addBotMessage(res.text, res.emoji, extra);
    }, delay);
  }

  function hideQuickReplies() {
    document.getElementById('cb-quick-replies').classList.add('cb-hidden');
  }
  function showQuickReplies() {
    document.getElementById('cb-quick-replies').classList.remove('cb-hidden');
  }

  function bindEvents() {
    // Toggle open/close
    document.getElementById('cb-toggle').addEventListener('click', toggleChat);
    document.getElementById('cb-close-btn').addEventListener('click', toggleChat);

    // Send button
    document.getElementById('cb-send-btn').addEventListener('click', () => sendMessage());

    // Textarea — Enter to send, Shift+Enter for newline
    const input = document.getElementById('cb-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize + show/hide quick replies
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
      input.value.trim().length > 0 ? hideQuickReplies() : showQuickReplies();
    });

    // Quick reply buttons (event delegation)
    document.getElementById('cb-quick-replies').addEventListener('click', (e) => {
      const btn = e.target.closest('.cb-qr-btn');
      if (!btn) return;
      const txt = btn.getAttribute('data-qr');
      if (txt) sendMessage(txt);
    });
  }

  /* ──────────────────────────────────────────
     6. INIT
  ────────────────────────────────────────── */
  function init() {
    injectHTML();
    bindEvents();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); // End IIFE
