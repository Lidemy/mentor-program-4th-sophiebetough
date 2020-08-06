/* eslint-disable */
const toDolist = document.querySelectorAll('li')
for(let i = 0; i < toDolist.length; i += 1) {
	const span = document.createElement('span')
	const txt = document.createTextNode('\u00D7')
  span.className = 'close';
  span.appendChild(txt);
  toDolist[i].appendChild(span);
}

const close = document.querySelectorAll('.close');
for (let i = 0; i < close.length; i += 1) {
  close[i].addEventListener('click', function() {
  	const div = close[i].parentElement;
  	div.classList.add('delete');
  })
}

const listClicked = document.querySelector('ul');
listClicked.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
  	e.target.classList.toggle('checked');
  }
})

const btn = document.querySelector('button');
btn.addEventListener('click',  function() {
	const li = document.createElement('li');
	const inputValue = document.querySelector('input[name=list]').value;
	const content = document.createTextNode(inputValue);
	li.appendChild(content);

	if(inputValue === '') {
		alert("記得填入待辦事項");
	} else {
		document.querySelector('ul').appendChild(li);
	}

	const span = document.createElement('span')
	const txt = document.createTextNode('\u00D7')
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);
  
  const close = document.querySelectorAll('.close'); 
  for (let i = 0; i < close.length; i += 1) {
  	close[i].addEventListener('click', function() {
  		const div = close[i].parentElement;
  		div.classList.add('delete');
  	})
	}
});
