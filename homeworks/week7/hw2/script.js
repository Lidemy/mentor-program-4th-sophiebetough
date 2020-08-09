/* eslint-disable */
document.querySelector('.section__faq')
.addEventListener('click', function(e) {
  const element = e.target.closest('.section__faq-desc');
  if (element) {
    element.classList.toggle('no-show');
  }
})