/* eslint-disable */
const url = 'https://api.twitch.tv/kraken';
const request = new XMLHttpRequest();
request.open('GET', url + '/games/top?limit=5', true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader('Client-ID', '4jjphhdum2jypfqzd7hrli6cgf8rpr');
request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		const data = JSON.parse(request.responseText);
		for (let i = 0; i < data.top.length; i += 1) {
			const topGame = document.querySelector(`.no${i+1}`);
      topGame.innerText = `${data.top[i].game.name}`;
		}
		const gameName = document.querySelector('.stream__info-gameName');
		gameName.innerText = data.top[0].game.name
		streamBox(data.top[0].game.name)
		document.querySelector('.navbar__list')
		.addEventListener('click', function(e) {
			const game = e.target.textContent;
		  gameName.innerText = game;
		  streamBox(game);
		});
 	}
};
request.send();



function streamBox(game) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url + `/streams/?game=${game}&limit=20`, true);
	xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	xhr.setRequestHeader('Client-ID', '4jjphhdum2jypfqzd7hrli6cgf8rpr');
	xhr.onload = function() {
		const liveGame = JSON.parse(xhr.responseText);
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
	} 
	xhr.send();
}
