const recipients = {
  family: { title: '给家人的圆满', flavors: '蛋黄白莲 · 桂花乌龙', message: '愿岁岁团圆，年年有余。' },
  partner: { title: '给爱人的月光', flavors: '流心奶黄 · 桂花乌龙', message: '愿每一次抬头，都看见同一轮月亮。' },
  friend: { title: '给朋友的相聚', flavors: '抹茶柚子 · 紫薯乳酪', message: '有月有茶有老友，今晚刚刚好。' },
  client: { title: '给客户的长久', flavors: '黑芝麻 · 流心奶黄', message: '月满中秋，合作长久。' },
  self: { title: '给自己的犒赏', flavors: '抹茶柚子 · 紫薯乳酪', message: '辛苦了，今年也值得被好好款待。' }
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
  preview.innerHTML = `<span>星火 · MID-AUTUMN</span><strong>把月光装进礼盒</strong><em>${text.replace(/[<>]/g, '')}</em>`;
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
