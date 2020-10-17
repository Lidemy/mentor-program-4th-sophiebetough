/* eslint-disable */
/*
- fetch() => Promise
- response.text() => Promise

response.json() => Promise：
(response.text().then(text => {
 	return JSON.parse(text)
}) 

- response.json().then() => Promise 
- response.json() 這個 Promise 的回傳值是 text
*/

const url = 'https://api.twitch.tv/kraken';

fetch(url + '/games/top?limit=5', {
	method: 'GET',
	headers: {
		'Accept': 'application/vnd.twitchtv.v5+json',
		'Client-ID': '4jjphhdum2jypfqzd7hrli6cgf8rpr'
	}
})
.then(response => {
	if(!response.ok) {
		throw Error("HTTP status" + response.status);
	}
	return response.json()
})
.then(data => {
	for (let i = 0; i < data.top.length; i += 1) {
		const topGame = document.querySelector(`.no${i+1}`);
    topGame.innerText = `${data.top[i].game.name}`;
	}
	const gameName = document.querySelector('.stream__info-gameName');
	gameName.innerText = data.top[0].game.name;
	streamBox(data.top[0].game.name);
	
	document.querySelector('.navbar__list')
		.addEventListener('click', function(e) {
			const game = e.target.textContent;
		  gameName.innerText = game;
		  streamBox(game);
	})
})

function streamBox(game) {
	fetch(url + `/streams/?game=${game}&limit=20`, {
		method: 'GET',
		headers: {
			'Accept': 'application/vnd.twitchtv.v5+json',
			'Client-ID': '4jjphhdum2jypfqzd7hrli6cgf8rpr'
		}
	}).then(response => {
		if(!response.ok) {
			throw Error("HTTP status" + response.status);
		}
		return response.json()
	}).then(liveGame => {
		let str = ''
		const streamCard = document.querySelector('.stream__box')
		for (let i = 0; i < liveGame.streams.length; i += 1) {
			str +=
			`<div class="stream__card">
					<div class="stream__image">
						<img src=${liveGame.streams[i].preview.large} />
					</div>
					<div class="stream__content">
						<div class="stream__avatar">
							<img src=${liveGame.streams[i].channel.logo} />
						</div>
						<div class="stream__desc">
							<div class="stream__desc-channel">
								${liveGame.streams[i].channel.status}
							</div>
							<div class="stream__desc-id">
								${liveGame.streams[i].channel.display_name}
							</div>
						</div>
					</div>					
				</div>`
		}
		streamCard.innerHTML = str
	})
}
