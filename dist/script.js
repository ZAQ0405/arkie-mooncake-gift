const recipients = {
  family: { title: '给家人的圆满', flavors: '蛋黄白莲 · 桂花乌龙', message: '愿岁岁团圆，年年有余。' },
  partner: { title: '给爱人的月光', flavors: '流心奶黄 · 桂花乌龙', message: '愿每一次抬头，都看见同一轮月亮。' },
  friend: { title: '给朋友的相聚', flavors: '抹茶柚子 · 紫薯乳酪', message: '有月有茶有老友，今晚刚刚好。' },
  client: { title: '给客户的长久', flavors: '黑芝麻 · 流心奶黄', message: '月满中秋，合作长久。' },
  self: { title: '给自己的犒赏', flavors: '抹茶柚子 · 紫薯乳酪', message: '辛苦了，今年也值得被好好款待。' }
};

const products = {
  egg: { name: '蛋黄白莲', subtitle: '经典 · 圆满 · 家的味道', description: '咸香蛋黄与细腻白莲蓉相遇，留下熟悉而完整的中秋味道。', image: 'assets/moon-01-white.png', price: 198, tags: ['经典风味', '咸甜平衡'], taste: '绵密咸香', pairing: '热茶分享' },
  tea: { name: '桂花乌龙', subtitle: '清香 · 东方 · 温柔', description: '桂花的轻盈香气落进乌龙茶韵，适合在月下慢慢分享。', image: 'assets/moon-02-beige.png', price: 198, tags: ['茶香馅心', '清甜轻盈'], taste: '柔和清香', pairing: '乌龙茶' },
  custard: { name: '流心奶黄', subtitle: '浓郁 · 细腻 · 惊喜', description: '切开即见金色流心，奶香丰盈，把惊喜留给最想见的人。', image: 'assets/moon-03-golden.png', price: 218, tags: ['金色流心', '奶香浓郁'], taste: '顺滑流心', pairing: '冷泡茶' },
  sesame: { name: '黑芝麻', subtitle: '醇厚 · 沉稳 · 回甘', description: '黑芝麻的醇厚香气与细腻口感，适合一盏茶旁的安静时刻。', image: 'assets/moon-04-black.png', price: 198, tags: ['芝麻香气', '低调醇厚'], taste: '醇厚回甘', pairing: '普洱茶' },
  matcha: { name: '抹茶柚子', subtitle: '清新 · 明亮 · 年轻', description: '抹茶的清苦遇见柚子的明亮，给中秋添一口轻盈的新鲜感。', image: 'assets/moon-05-green.png', price: 198, tags: ['抹茶清苦', '柚香明亮'], taste: '清新微苦', pairing: '桂花茶' },
  purple: { name: '紫薯乳酪', subtitle: '柔软 · 特别 · 甜蜜', description: '紫薯的柔软与乳酪的甜润交织，适合送给喜欢特别风味的那个人。', image: 'assets/moon-06-purple.png', price: 198, tags: ['乳酪馅心', '特别甜润'], taste: '柔软甜润', pairing: '花果茶' }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

$$('.recipient').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.recipient').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const data = recipients[button.dataset.recipient];
    $('#recommendTitle').textContent = data.title;
    $('#recommendCopy').textContent = data.flavors;
    $('#recommendMessage').textContent = data.message;
  });
});

const purchaseModal = $('#purchaseModal');
const productImage = $('#productImage');
const productName = $('#productName');
const productSubtitle = $('#productSubtitle');
const productDescription = $('#productDescription');
const productTags = $('#productTags');
const productTaste = $('#productTaste');
const productPairing = $('#productPairing');
const productIndex = $('#productIndex');
const productQuantity = $('#productQuantity');
const productTotal = $('#productTotal');
const buyButton = $('#buyButton');
const productKeys = Object.keys(products);
let selectedProduct = products.egg;
let selectedProductKey = 'egg';
let lastPurchaseFocus = null;
let lastGalleryFocus = null;
let lastStudioFocus = null;

const updateTotal = () => {
  const quantity = Math.min(9, Math.max(1, Number(productQuantity.value) || 1));
  productQuantity.value = quantity;
  productTotal.textContent = `¥${selectedProduct.price * quantity}`;
};

const openPurchase = (key) => {
  lastPurchaseFocus = document.activeElement;
  selectedProductKey = products[key] ? key : 'egg';
  selectedProduct = products[selectedProductKey];
  productImage.src = selectedProduct.image;
  productImage.alt = `Arkie星火${selectedProduct.name}月饼产品图`;
  productName.textContent = selectedProduct.name;
  productSubtitle.textContent = selectedProduct.subtitle;
  productTags.innerHTML = selectedProduct.tags.map((tag) => `<span>${tag}</span>`).join('');
  productTaste.textContent = selectedProduct.taste;
  productPairing.textContent = selectedProduct.pairing;
  productIndex.textContent = `${String(productKeys.indexOf(selectedProductKey) + 1).padStart(2, '0')} / ${String(productKeys.length).padStart(2, '0')}`;
  productDescription.textContent = selectedProduct.description;
  productQuantity.value = 1;
  buyButton.innerHTML = '查看礼盒方案 <span>↗</span>';
  updateTotal();
  purchaseModal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => { purchaseModal.classList.add('is-open'); $('#closePurchase').focus(); });
};

const stepProduct = (direction) => {
  const currentIndex = productKeys.indexOf(selectedProductKey);
  const nextIndex = (currentIndex + direction + productKeys.length) % productKeys.length;
  openPurchase(productKeys[nextIndex]);
};

const closePurchase = () => {
  purchaseModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => { purchaseModal.hidden = true; lastPurchaseFocus?.focus?.(); }, 220);
};

$$('.flavor-card').forEach((card) => {
  const activate = () => openPurchase(card.dataset.flavor);
  card.addEventListener('click', activate);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
  });
});
$('#closePurchase').addEventListener('click', closePurchase);
$('.purchase-backdrop').addEventListener('click', closePurchase);
$('#prevProduct').addEventListener('click', () => stepProduct(-1));
$('#nextProduct').addEventListener('click', () => stepProduct(1));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !purchaseModal.hidden) closePurchase(); });
document.addEventListener('keydown', (event) => { if (!purchaseModal.hidden && event.key === 'ArrowLeft') stepProduct(-1); if (!purchaseModal.hidden && event.key === 'ArrowRight') stepProduct(1); });
$$('[data-qty]').forEach((button) => {
  button.addEventListener('click', () => {
    productQuantity.value = Number(productQuantity.value || 1) + (button.dataset.qty === 'plus' ? 1 : -1);
    updateTotal();
  });
});
productQuantity.addEventListener('input', updateTotal);
buyButton.addEventListener('click', () => {
  buyButton.innerHTML = '已查看礼盒方案 ✓';
});

const galleryLightbox = $('#galleryLightbox');
const galleryImage = $('#galleryImage');
const galleryCaption = $('#galleryCaption');
const galleryCounter = $('#galleryCounter');
const galleryTiles = $$('[data-gallery-image]');
let galleryIndex = 0;
let galleryTouchStartX = 0;
const showGallery = (index) => {
  galleryIndex = (index + galleryTiles.length) % galleryTiles.length;
  const tile = galleryTiles[galleryIndex];
  galleryImage.src = tile.dataset.galleryImage;
  galleryCaption.textContent = tile.dataset.galleryCaption;
  galleryImage.alt = tile.querySelector('img')?.alt || 'Arkie星火礼盒展示图';
  galleryCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryTiles.length).padStart(2, '0')}`;
};
const closeGallery = () => {
  galleryLightbox.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => { galleryLightbox.hidden = true; lastGalleryFocus?.focus?.(); }, 220);
};
galleryTiles.forEach((tile, index) => {
  tile.addEventListener('click', () => {
    lastGalleryFocus = document.activeElement;
    showGallery(index);
    galleryLightbox.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => { galleryLightbox.classList.add('is-open'); $('#closeGallery').focus(); });
  });
});
$('#closeGallery').addEventListener('click', closeGallery);
$('.gallery-backdrop').addEventListener('click', closeGallery);
$('#prevGallery').addEventListener('click', () => showGallery(galleryIndex - 1));
$('#nextGallery').addEventListener('click', () => showGallery(galleryIndex + 1));
galleryLightbox.addEventListener('touchstart', (event) => { galleryTouchStartX = event.changedTouches[0].clientX; }, { passive: true });
galleryLightbox.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - galleryTouchStartX;
  if (Math.abs(distance) > 45) showGallery(galleryIndex + (distance < 0 ? 1 : -1));
}, { passive: true });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !galleryLightbox.hidden) closeGallery(); });
document.addEventListener('keydown', (event) => { if (!galleryLightbox.hidden && event.key === 'ArrowLeft') showGallery(galleryIndex - 1); if (!galleryLightbox.hidden && event.key === 'ArrowRight') showGallery(galleryIndex + 1); });

const siteToast = $('#siteToast');
let toastTimer;
const showToast = (message) => {
  siteToast.textContent = message;
  siteToast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => siteToast.classList.remove('is-visible'), 2200);
};

const audio = $('#themeAudio');
const audioToggle = $('#audioToggle');
const floatingAudioToggle = $('#floatingAudioToggle');
const floatingAudioLabel = $('.audio-float-label');
const floatingAudioIcon = $('.audio-float-icon');
const audioLabel = $('#audioLabel');
const playIcon = $('.play-icon');
const audioTime = $('#audioTime');
const audioProgress = $('#audioProgress');
let audioManuallyPaused = false;
const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const updateAudioProgress = () => {
  const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
  audioProgress.value = duration ? (audio.currentTime / duration) * 100 : 0;
  audioTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(duration)}`;
};
const syncAudioUI = () => {
  const playing = !audio.paused;
  audioLabel.textContent = playing ? '暂停背景音乐' : '播放背景音乐';
  playIcon.textContent = playing ? 'Ⅱ' : '▶';
  audioToggle.setAttribute('aria-label', playing ? '暂停背景音乐' : '播放背景音乐');
  floatingAudioLabel.textContent = playing ? '暂停音乐' : '背景音乐';
  floatingAudioIcon.textContent = playing ? 'Ⅱ' : '♪';
  floatingAudioToggle.setAttribute('aria-label', playing ? '暂停背景音乐' : '播放背景音乐');
  floatingAudioToggle.setAttribute('aria-pressed', String(playing));
  floatingAudioToggle.classList.toggle('is-playing', playing);
};
const toggleAudio = async () => {
  if (audio.paused) {
    audioManuallyPaused = false;
    try { await audio.play(); syncAudioUI(); } catch { showToast('背景音乐需要点击后才能播放'); }
  } else {
    audioManuallyPaused = true;
    audio.pause();
    syncAudioUI();
  }
};
const tryStartBackground = () => {
  if (!audioManuallyPaused && audio.paused) audio.play().then(syncAudioUI).catch(() => {});
};
audioToggle.addEventListener('click', toggleAudio);
floatingAudioToggle.addEventListener('click', toggleAudio);
window.setTimeout(tryStartBackground, 700);
document.addEventListener('pointerdown', (event) => { if (!event.target.closest('#audioToggle, #floatingAudioToggle')) tryStartBackground(); }, { passive: true });
audioProgress.addEventListener('input', () => { if (audio.duration) audio.currentTime = (Number(audioProgress.value) / 100) * audio.duration; });
audio.addEventListener('loadedmetadata', updateAudioProgress);
audio.addEventListener('timeupdate', updateAudioProgress);
audio.addEventListener('error', () => showToast('主题音乐暂时无法加载'));
audio.addEventListener('ended', () => {
  syncAudioUI();
  updateAudioProgress();
});
syncAudioUI();

const blessingInput = $('#blessingInput');
const charCount = $('#charCount');
const preview = $('#blessingPreview');
const blessingStatus = $('#blessingStatus');
const copyCard = $('#copyCard');
const downloadCard = $('#downloadCard');
const resetCard = $('#resetCard');
let currentBlessing = '';
blessingInput.addEventListener('input', () => { charCount.textContent = `${blessingInput.value.length} / 48`; });
$('#makeCard').addEventListener('click', () => {
  const text = blessingInput.value.trim() || '愿我们抬头时，都看见同一轮月亮。';
  currentBlessing = text.replace(/[<>]/g, '');
  preview.classList.add('is-made');
  preview.innerHTML = `<span>Arkie星火 · MID-AUTUMN</span><strong>把月光装进礼盒</strong><em>${currentBlessing}</em>`;
  copyCard.disabled = false;
  downloadCard.disabled = false;
  blessingStatus.textContent = '祝福卡已生成，可复制或下载展示。';
  showToast('祝福卡已生成');
});
copyCard.addEventListener('click', async () => {
  const text = `Arkie星火 · 把月光装进礼盒\n${currentBlessing}`;
  try {
    await navigator.clipboard.writeText(text);
    blessingStatus.textContent = '祝福文字已复制。';
    showToast('祝福文字已复制');
  } catch { blessingStatus.textContent = '当前浏览器不支持自动复制，请手动选择文字。'; }
});
downloadCard.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 700;
  const context = canvas.getContext('2d');
  context.fillStyle = '#071525'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(217,182,107,.18)'; context.beginPath(); context.arc(950, 160, 210, 0, Math.PI * 2); context.fill();
  context.fillStyle = '#d9b66b'; context.font = '24px sans-serif'; context.fillText('ARKIE · MID-AUTUMN', 90, 115);
  context.fillStyle = '#f5eedf'; context.font = '70px serif'; context.fillText('把月光装进礼盒', 90, 290);
  context.fillStyle = '#d9b66b'; context.font = '34px serif'; context.fillText(currentBlessing.slice(0, 48), 90, 390);
  context.fillStyle = '#8b9da4'; context.font = '20px sans-serif'; context.fillText('Arkie星火月饼专营店 · 展示版祝福卡', 90, 610);
  const link = document.createElement('a'); link.href = canvas.toDataURL('image/png'); link.download = 'arkie-starfire-blessing.png'; link.click();
  showToast('祝福卡已下载');
});
resetCard.addEventListener('click', () => {
  blessingInput.value = '';
  charCount.textContent = '0 / 48';
  currentBlessing = '';
  preview.classList.remove('is-made');
  preview.innerHTML = '<span>Arkie星火</span><strong>把月光装进礼盒</strong><em>写下你的祝福，它会出现在这里。</em>';
  copyCard.disabled = true;
  downloadCard.disabled = true;
  blessingStatus.textContent = '已重置祝福卡。';
});

const menuToggle = $('#menuToggle');
const mainNav = $('.main-nav');
const closeMenu = () => { mainNav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', '打开导航菜单'); };
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
});
$$('.main-nav a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => { if (mainNav.classList.contains('is-open') && !mainNav.contains(event.target) && event.target !== menuToggle) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const studioModal = $('#studioModal');
const openStudio = () => {
  lastStudioFocus = document.activeElement;
  studioModal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => { studioModal.classList.add('is-open'); $('#closeStudio').focus(); });
};
const closeStudio = () => {
  studioModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => { studioModal.hidden = true; lastStudioFocus?.focus?.(); }, 220);
};
$('#studioOpen').addEventListener('click', openStudio);
$('#closeStudio').addEventListener('click', closeStudio);
$('.studio-modal-backdrop').addEventListener('click', closeStudio);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !studioModal.hidden) closeStudio(); });

const serviceLauncher = $('#serviceLauncher');
const servicePanel = $('#servicePanel');
const serviceInput = $('#serviceInput');
const serviceMessages = $('#serviceMessages');
const serviceResponses = {
  '礼盒有几种口味？': '礼盒包含六种风味：蛋黄白莲、桂花乌龙、流心奶黄、黑芝麻、抹茶柚子和紫薯乳酪。',
  '礼盒适合送给谁？': '适合家人团聚、朋友分享、商务赠礼，也适合作为给自己的中秋小礼物。',
  '如何保存月饼？': '建议避光、阴凉保存，开启后尽快食用，具体请以实际包装说明为准。'
};
const appendServiceMessage = (text, role = 'bot') => {
  const item = document.createElement('div');
  item.className = `service-message service-message-${role}`;
  if (role === 'bot') { const badge = document.createElement('span'); badge.textContent = '星'; item.append(badge); }
  const bubble = document.createElement('p'); bubble.textContent = text; item.append(bubble);
  serviceMessages.append(item);
  serviceMessages.scrollTop = serviceMessages.scrollHeight;
};
const serviceReply = (question) => {
  const answer = serviceResponses[question] || '这个问题已收到。当前是展示版客服，建议先浏览礼盒详情和送礼指南，了解完整的中秋礼盒体验。';
  window.setTimeout(() => appendServiceMessage(answer), 420);
};
const openService = () => {
  servicePanel.hidden = false;
  serviceLauncher.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => serviceInput.focus());
};
const closeService = () => {
  servicePanel.hidden = true;
  serviceLauncher.setAttribute('aria-expanded', 'false');
};
serviceLauncher.addEventListener('click', () => servicePanel.hidden ? openService() : closeService());
$('#closeService').addEventListener('click', closeService);
$$('[data-service-question]').forEach((button) => button.addEventListener('click', () => {
  const question = button.dataset.serviceQuestion;
  appendServiceMessage(question, 'user');
  serviceReply(question);
}));
$('#serviceForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const question = serviceInput.value.trim();
  if (!question) return;
  appendServiceMessage(question, 'user');
  serviceInput.value = '';
  serviceReply(question);
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !servicePanel.hidden) closeService(); });

$$('video').forEach((video) => {
  video.addEventListener('error', () => {
    const fallback = video.parentElement.querySelector('.video-fallback');
    if (fallback) fallback.hidden = false;
  });
});

const backToTop = $('#backToTop');
const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 620);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

const scrollProgress = $('#scrollProgress span');
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const navLinks = $$('.main-nav a');
const navSections = navLinks.map((link) => ({ link, section: $(link.getAttribute('href')) })).filter((item) => item.section);
const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  navSections.forEach(({ link, section }) => {
    const active = section === entry.target;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
}), { rootMargin: '-26% 0px -62% 0px', threshold: 0 });
navSections.forEach(({ section }) => navObserver.observe(section));

const trapFocus = (container, event) => {
  if (event.key !== 'Tab') return;
  const focusable = $$('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled])', container).filter((item) => !item.hidden);
  if (!focusable.length) return;
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
};
document.addEventListener('keydown', (event) => {
  if (!purchaseModal.hidden) trapFocus(purchaseModal, event);
  if (!galleryLightbox.hidden) trapFocus(galleryLightbox, event);
  if (!studioModal.hidden) trapFocus(studioModal, event);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: .12 });
$$('.reveal').forEach((item) => observer.observe(item));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  window.addEventListener('scroll', () => {
    const art = $('.hero-art');
    if (!art) return;
    const shift = Math.min(window.scrollY * .06, 38);
    art.style.transform = `translateY(${shift}px)`;
  }, { passive: true });
}
