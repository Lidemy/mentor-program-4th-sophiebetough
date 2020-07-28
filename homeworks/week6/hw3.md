## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

* <hr />：區分段落的水平分隔線
* <b />：粗體字
* <select />：有多重選項的下拉式選單



## 請問什麼是盒模型（box modal）

當我們透過 HTML 編寫網頁時，每個元素可以都看成是一個「盒模型」，並能以 CSS 調整盒子的屬性。 「盒模型」的基本組成為：width、height、padding、border、margin。

若是我們透過 CSS 設定元素的寬與高，可能會與專案協作同事的認知有所差異。舉例來說，設計師希望元素的總寬高為：W200 x H100，若是後續要調整加入 padding 或是 border 時，元素在網頁上呈現的總寬高，就不會是 Ｗ200 x H100，而會隨著 padding 或是 border 的數字而增加，會與原本設想的總寬高有落差。

為了解決這樣的問題，我們會在 CSS 加上 ```box-sizing``` 屬性，並選擇用 ```border-box``` 模式，這個模式會將 padding 和 border 包含到元素所要呈現的總寬高，這樣就不會因為 padding 或是 border 的更動，而影響元素大小，總寬高仍會維持 W200 x H100。而至於 content 的大小，就會隨 padding 和 border 的數字，而有相對應的呈現範圍。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* display:block
我們常見的標籤：div、h1、p、ul、li 等稱為區塊元素（block），若以 Chrome DevTools 檢查會發現元素佔滿了一整行。block 的特性是可以自由設定高度、寬度、網頁上方及下方的距離，但即便調整了，每個元素仍會換行呈現，並不會並排。

* display:inline
我們常見的標籤：span、a、img 等稱為行內元素（inline）。若是調整高度、寬度都沒有作用，元素的寬度會以文字或圖片所佔的寬度來呈現，而且並排不換行。若有設定 margin 和 padding ，所調整元素的上下並不會把其他行推開，反而會覆蓋到其他行。

* display:inline-block
inline-block 結合了 block 和 inline 的優點，以 inline 的方式呈現，但同時擁有 block 的屬性。對外可以像 inline 一樣併排，對內可以調整高度、寬度、網頁上下方的距離，元素上下會不會覆蓋到其他行的資料，會把其他行推開。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* static：網頁預設的定位方式。如果 position 的值是被設定為 static 的話，那麼設定 top、bottom、left 和 right 的值都不會影響元素的位置。

* relative：根據元素原本的位置，進行相對定位。移動的位置，會依 top、bottom、left 和 right 的值偏移。

* absolute：會依照一個參考點來進行定位。參考點會往上一層搜尋不是 static 的元素，即為參考點，之後會依 top、bottom、left 和 right 的值來進行定位。

* fixed：相對於瀏覽器（viewport）做定位，會依 top、bottom、left 和 right 的值來決定位置。當我們將網頁往下拉時，元素的位置也不會改變。


