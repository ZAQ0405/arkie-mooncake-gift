const recipients = {
  family: { title: '给家人的圆满', flavors: '蛋黄白莲 · 桂花乌龙', message: '愿岁岁团圆，年年有余。' },
  partner: { title: '给爱人的月光', flavors: '流心奶黄 · 桂花乌龙', message: '愿每一次抬头，都看见同一轮月亮。' },
  friend: { title: '给朋友的相聚', flavors: '抹茶柚子 · 紫薯乳酪', message: '有月有茶有老友，今晚刚刚好。' },
  client: { title: '给客户的长久', flavors: '黑芝麻 · 流心奶黄', message: '月满中秋，合作长久。' },
  self: { title: '给自己的犒赏', flavors: '抹茶柚子 · 紫薯乳酪', message: '辛苦了，今年也值得被好好款待。' }
};

const products = {
  egg: { name: '蛋黄白莲', subtitle: '经典 · 圆满 · 家的味道', description: '咸香蛋黄与细腻白莲蓉相遇，留下熟悉而完整的中秋味道。', image: 'assets/moon-01-white.png', price: 198 },
  tea: { name: '桂花乌龙', subtitle: '清香 · 东方 · 温柔', description: '桂花的轻盈香气落进乌龙茶韵，适合在月下慢慢分享。', image: 'assets/moon-02-beige.png', price: 198 },
  custard: { name: '流心奶黄', subtitle: '浓郁 · 细腻 · 惊喜', description: '切开即见金色流心，奶香丰盈，把惊喜留给最想见的人。', image: 'assets/moon-03-golden.png', price: 218 },
  sesame: { name: '黑芝麻', subtitle: '醇厚 · 沉稳 · 回甘', description: '黑芝麻的醇厚香气与细腻口感，适合一盏茶旁的安静时刻。', image: 'assets/moon-04-black.png', price: 198 },
  matcha: { name: '抹茶柚子', subtitle: '清新 · 明亮 · 年轻', description: '抹茶的清苦遇见柚子的明亮，给中秋添一口轻盈的新鲜感。', image: 'assets/moon-05-green.png', price: 198 },
  purple: { name: '紫薯乳酪', subtitle: '柔软 · 特别 · 甜蜜', description: '紫薯的柔软与乳酪的甜润交织，适合送给喜欢特别风味的那个人。', image: 'assets/moon-06-purple.png', price: 198 }
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
const productQuantity = $('#productQuantity');
const productTotal = $('#productTotal');
const buyButton = $('#buyButton');
let selectedProduct = products.egg;

const updateTotal = () => {
  const quantity = Math.min(9, Math.max(1, Number(productQuantity.value) || 1));
  productQuantity.value = quantity;
  productTotal.textContent = `¥${selectedProduct.price * quantity}`;
};

const openPurchase = (key) => {
  selectedProduct = products[key] || products.egg;
  productImage.src = selectedProduct.image;
  productImage.alt = `Arkie星火${selectedProduct.name}月饼产品图`;
  productName.textContent = selectedProduct.name;
  productSubtitle.textContent = selectedProduct.subtitle;
  productDescription.textContent = selectedProduct.description;
  productQuantity.value = 1;
  buyButton.innerHTML = '确认购买 <span>↗</span>';
  updateTotal();
  purchaseModal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => purchaseModal.classList.add('is-open'));
};

const closePurchase = () => {
  purchaseModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.setTimeout(() => { purchaseModal.hidden = true; }, 220);
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
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !purchaseModal.hidden) closePurchase(); });
$$('[data-qty]').forEach((button) => {
  button.addEventListener('click', () => {
    productQuantity.value = Number(productQuantity.value || 1) + (button.dataset.qty === 'plus' ? 1 : -1);
    updateTotal();
  });
});
productQuantity.addEventListener('input', updateTotal);
buyButton.addEventListener('click', () => {
  buyButton.innerHTML = '已加入购买清单 ✓';
});

const audio = $('#themeAudio');
const audioToggle = $('#audioToggle');
const audioLabel = $('#audioLabel');
const playIcon = $('.play-icon');
audioToggle.addEventListener('click', async () => {
  if (audio.paused) {
    await audio.play();
    audioLabel.textContent = '暂停主题音乐';
    playIcon.textContent = 'Ⅱ';
    audioToggle.setAttribute('aria-label', '暂停品牌音乐');
  } else {
    audio.pause();
    audioLabel.textContent = '播放主题音乐';
    playIcon.textContent = '▶';
    audioToggle.setAttribute('aria-label', '播放品牌音乐');
  }
});
audio.addEventListener('ended', () => {
  audioLabel.textContent = '播放主题音乐';
  playIcon.textContent = '▶';
});

const blessingInput = $('#blessingInput');
const charCount = $('#charCount');
const preview = $('#blessingPreview');
blessingInput.addEventListener('input', () => { charCount.textContent = `${blessingInput.value.length} / 48`; });
$('#makeCard').addEventListener('click', () => {
  const text = blessingInput.value.trim() || '愿我们抬头时，都看见同一轮月亮。';
  preview.classList.add('is-made');
  preview.innerHTML = `<span>Arkie星火 · MID-AUTUMN</span><strong>把月光装进礼盒</strong><em>${text.replace(/[<>]/g, '')}</em>`;
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
