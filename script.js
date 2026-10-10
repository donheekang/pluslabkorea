const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(restoreFocus = false) {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = expanded;
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? '메뉴 열기' : '메뉴 닫기');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('.copy-email')?.addEventListener('click', async event => {
  const email = event.currentTarget.dataset.email;
  const status = document.querySelector('.copy-status');
  try { await navigator.clipboard.writeText(email); status.textContent = '이메일 주소가 복사되었습니다.'; }
  catch { status.textContent = '주소를 길게 누르거나 선택해 복사해 주세요: ' + email; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
