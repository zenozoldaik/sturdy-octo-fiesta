const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn?.addEventListener('click', () => menu?.classList.toggle('open'));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')));

const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const runCode = document.getElementById('runCode');
const clearCode = document.getElementById('clearCode');
const preview = document.getElementById('preview');

function renderPreview() {
  const doc = `<!doctype html><html><head><style>${cssCode.value}</style></head><body>${htmlCode.value}<script>${jsCode.value}<\/script></body></html>`;
  preview.srcdoc = doc;
}

runCode?.addEventListener('click', renderPreview);
clearCode?.addEventListener('click', () => {
  htmlCode.value = '';
  cssCode.value = '';
  jsCode.value = '';
  renderPreview();
});

renderPreview();

const aiInput = document.getElementById('aiInput');
const aiReply = document.getElementById('aiReply');
const askAi = document.getElementById('askAi');
const speakReply = document.getElementById('speakReply');

function generateSafeReply(prompt) {
  if (!prompt.trim()) return 'اكتب سؤالك أولاً وسأساعدك خطوة بخطوة.';
  if (/اختراق|فيروس|برمجيات خبيثة|malware|hack/i.test(prompt)) {
    return 'لا أستطيع المساعدة في أي نشاط ضار. يمكنني مساعدتك في الحماية واكتشاف الثغرات بشكل قانوني.';
  }
  return `أنا M.Y. 👋
تلقيت طلبك: "${prompt}".
اقتراح سريع:
1) حدد الهدف بدقة.
2) اختر التقنية المناسبة.
3) ابدأ بنموذج أولي بسيط ثم حسّنه.`;
}

askAi?.addEventListener('click', () => {
  aiReply.textContent = generateSafeReply(aiInput.value);
});

speakReply?.addEventListener('click', () => {
  const text = aiReply.textContent.trim();
  if (!text) return;

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  }
});

const locBtn = document.getElementById('locBtn');
const locOut = document.getElementById('locOut');
locBtn?.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locOut.textContent = 'المتصفح لا يدعم تحديد الموقع.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      locOut.textContent = `تم تحديد موقعك: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    },
    () => {
      locOut.textContent = 'تم رفض الإذن أو تعذّر تحديد الموقع.';
    }
  );
});

const fileBtn = document.getElementById('fileBtn');
const fileInput = document.getElementById('fileInput');
const fileOut = document.getElementById('fileOut');
fileBtn?.addEventListener('click', () => fileInput.click());
fileInput?.addEventListener('change', () => {
  if (!fileInput.files.length) return;
  fileOut.textContent = `تم اختيار الملف: ${fileInput.files[0].name}`;
});

const ratingStars = document.getElementById('ratingStars');
const ratingText = document.getElementById('ratingText');
ratingStars?.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const rate = Number(btn.dataset.rate);
    ratingStars.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i < rate);
    });
    ratingText.textContent = `شكرًا! تقييمك: ${rate} من 5.`;
  });
});

const pollForm = document.getElementById('pollForm');
const pollOut = document.getElementById('pollOut');
pollForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = new FormData(pollForm).get('priority');
  pollOut.textContent = `تم استلام رأيك: ${value}`;
  pollForm.reset();
});

const contactForm = document.getElementById('contactForm');
const contactOut = document.getElementById('contactOut');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = new FormData(contactForm).get('name');
  contactOut.textContent = `شكرًا ${name}، تم استلام طلبك.`;
  contactForm.reset();
});


const siteLink = document.getElementById('siteLink');
const copyLink = document.getElementById('copyLink');
const copyOut = document.getElementById('copyOut');

copyLink?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(siteLink.value);
    copyOut.textContent = 'تم نسخ الرابط بنجاح.';
  } catch {
    copyOut.textContent = 'تعذر النسخ التلقائي، انسخ الرابط يدويًا.';
  }
});

const euServerBtn = document.getElementById('euServerBtn');
const serverStatus = document.getElementById('serverStatus');
euServerBtn?.addEventListener('click', () => {
  serverStatus.textContent = 'الحالة الحالية: متصل بالسيرفر الأوروبي (Frankfurt - EU Central).';
  euServerBtn.textContent = 'تم الاتصال';
  euServerBtn.disabled = true;
});
