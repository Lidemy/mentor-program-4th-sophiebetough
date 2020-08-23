/* eslint-disable */
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
function prizeBox(cb) {
	const request = new XMLHttpRequest();
	request.open('GET', apiUrl, true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			let data
			try {
			  data = JSON.parse(request.response)
			} catch(err) {
				cb(errorMessage)
				return
			}

			if (!data.prize) {
				cb(errorMessage)
				return
			}

      cb(null, data)
		} else {
			cb(errorMessage)
		}
	} 
  request.onerror = function() {
  	cb(errorMessage)
  }
  request.send();
}

document.querySelector('.lottery-info__btn').addEventListener('click', () => {
	prizeBox(function(err, data) {
		if (err) {
			alert(err)
			return
		}

		let className
		let title
		if (data.prize === 'FIRST') {
			className = 'first-prize'
			title = '恭喜你中頭獎了！日本東京來回雙人遊！'
		} else if (data.prize === 'SECOND') {
			className = 'second-prize'
			title = '二獎！90 吋電視一台！'
		} else if (data.prize === 'THIRD') {
			className = 'third-prize'
			title = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
		} else if (data.prize === 'NONE') {
			className = 'none-prize'
			title = '銘謝惠顧'
		}
		document.querySelector('.lottery').classList.add(className)
		document.querySelector('.lottery-result__title').innerText = title
		document.querySelector('.lottery-info').classList.add('noshow')
		document.querySelector('.lottery-result').classList.remove('noshow')
	})  
})
