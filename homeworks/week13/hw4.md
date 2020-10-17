## Webpack 是做什麼用的？可以不用它嗎？
webpack 是一個「模組打包工具」，透過資料模組化的概念，將眾多模組與資源打包在一起、預先幫我們處理需要編譯的內容，讓我們在網頁開發上更為方便。舉例來說，webpack 可以將專案中的多個 `.js` 結尾的檔案，打包成一個檔案；若是我們檔案內有撰寫 JS ES6 或其他更為新潮的語法，也可以透過 babel loader 轉譯，以便解決瀏覽器不支援的情況發生。

通常會使用 webpack 的情境會是用在大型的應用程式專案，因為大型專案會需要面對眾多不同類型的檔案，所以在開發跟工作流程上，就需要強而有力的 webpack 來做模組相關的檔案處理；相對小型的專案，由於規模較小，可能就不太需要透過 webpack 的幫忙，讓管理專案的部分，可以較為輕巧、明確。


## gulp 跟 webpack 有什麼不一樣？
gulp 是一套「任務管理工具」，將要執行的任務寫成一個腳本，來管理工作流程的每項任務。我們運用 gulp 可以在指定目錄中，對特定檔案進行編譯、組合、壓縮等任務；而 webpack 的工作模式，是將檔案視為一個整體，透過一個入口點（例如：index.js），webpack 從這個入口開始找到你的 index.js 所有依賴的文件，經過不同 loader 去處理，最後打包成為一個瀏覽器識別的 JS 檔案。

兩者雖然有部分功能有重疊，但由於定位的不同，所以 gulp 可以完成許多像是校正時間、定時 call api 等任務，反之 webpack 沒辦法做到；而 webpack 可以將許多檔案 bundle 打包在一起，也是 gulp 沒辦法達成的功能。所以在考量要使用哪個工具之前，要先衡量專案的性質，再來決定要運用哪一個工具，來幫助開發流程的進行。


## CSS Selector 權重的計算方式為何？
CSS 的權重即是說明 CSS 的優先使用權，首先會有兩個大通則需要先了解：

*  在同個檔案中，產生相同的 CSS，後面寫的 CSS 會直接覆蓋前面先寫的 CSS。
*  當兩個選擇器作用在同一個元素，權重高的會覆蓋掉權重低的。

關於權重的計算方式，由左至右，左邊的權重最高，依次降低到最右邊的權重最低：

**!important > inline style > ID > Class/Pseudo-class/attribute > Element/Pseudo-elements > * **

#### * 
我們很常在 CSS 檔案開頭使用的全站預設值：`*`，權重為 0-0-0-0，只要其他權重超過它就可以覆蓋。

#### Element（標籤）/Pseudo-elements（偽元素）
在 html 會使用的元素，會透過標籤形式，例如：`div`、`p`、`u`l、`li` ......，以及偽元素：`:: before`、`:: after`，權重都是 0-0-0-1。

#### Class（類別選擇器）/Pseudo-class（偽類） /attribute（屬性選擇器）
class 在 html 上面會寫成 `class="quote-text"`，在 css 內會寫成 `.quote-text` ；pseudo-class 會寫成：`li:first-child` ； attribute：`h2[title="titan"]`  ，這些權重皆為 0–0–1–0

#### ID
id 在 html 上面會以這樣的方式呈現：id="quote" ，在 css 則會在前面加上井字號 #id。每一個 id 的權重都是 0-1-0-0。

#### inline style
inline style 是寫在 html 檔案內的 style，權重為 1-0-0-0。

### !important
!important 的權重最高，為 1-0-0-0-0，因為會蓋過以上所介紹的權重。為避免造成 CSS 的混亂，實務上也會謹慎使用，