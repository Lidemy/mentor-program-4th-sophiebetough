/* eslint-disable */
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nickname = document.querySelector('input[name=nickname]').value;
  const email = document.querySelector('input[name=e-mail]').value;
  const phone = document.querySelector('input[name=phone]').value;
  const reason = document.querySelector('input[name=reason]').value;
  const choice = document.querySelectorAll('input[name=type]');
  const advice = document.querySelector('input[name=advice]');

  if (nickname === '') {
    document.querySelector('input[name=nickname]')
      .parentNode.parentNode.classList.remove('hidden');
  } else {
    document.querySelector('input[name=nickname]')
      .parentNode.parentNode.classList.add('hidden');
  }

  if (email === '') {
    document.querySelector('input[name=e-mail]')
      .parentNode.parentNode.classList.remove('hidden');
  } else {
    document.querySelector('input[name=e-mail]')
      .parentNode.parentNode.classList.add('hidden');
  }

  if (phone === '') {
    document.querySelector('input[name=phone]')
      .parentNode.parentNode.classList.remove('hidden');
  } else {
    document.querySelector('input[name=phone]')
      .parentNode.parentNode.classList.add('hidden');
  }

  if (reason === '') {
    document.querySelector('input[name=reason]')
      .parentNode.parentNode.classList.remove('hidden');
  } else {
    document.querySelector('input[name=reason]')
      .parentNode.parentNode.classList.add('hidden');
  }

  if (choice[0].checked === false && choice[1].checked === false) {
    document.querySelector('input[name=type]')
      .parentNode.parentNode.parentNode.classList.remove('hidden');
  } else {
    document.querySelector('input[name=type]')
      .parentNode.parentNode.parentNode.classList.add('hidden');
  }

  if (nickname !== '' && email !== '' && phone !== '' && reason !== '' && choice[0].checked !== false) {
    alert(`
      暱稱：${nickname}
      email：${email}
      手機號碼：${phone}
      報名類型：躺在床上用力想像實作
      如何知道活動 ：${reason}
      其他建議：${advice.value}
    `);
  } else if (nickname !== '' && email !== '' && phone !== '' && reason !== '' && choice[1].checked !== false) {
    alert(`
      暱稱：${nickname}
      email：${email}
      手機號碼：${phone}
      報名類型：趴在地上滑手機找現成的
      如何知道活動 ：${reason}
      其他建議：${advice.value}
    `);
  }
});
