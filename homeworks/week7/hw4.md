## 什麼是 DOM？

DOM 是能將 HTML 上所寫的資料，轉換成類似物件式階層排列的模型。
當我們想要更改 HTML 上的資料，會透過 JavaScript 拿到 DOM 階層排列的節點去調整；也就是說，瀏覽器與 JavaScript 之間，因為有了 DOM 這個橋梁，讓我們可以用 JavaScript 跟瀏覽器進行溝通，並在網頁上產生豐富的互動效果，


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

* 事件傳遞機制的順序：
  1. 捕獲階段
  2. 點擊的目標
  3. 冒泡階段

* 什麼是補獲：
DOM 的事件傳遞，會先從 ```window```（網頁）開始往下傳遞到點擊的目標（```target```），這個階段會被稱為 ```CAPTURING_PHASE```，又稱為捕獲階段。

* 什麼是冒泡：
當事件傳達到點擊的目標（```target```）之後，再由下往傳回去 ```window```，這個階段叫做 ```BUBBLING_PHASE```，冒泡階段。


## 什麼是 event delegation，為什麼我們需要它？


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
