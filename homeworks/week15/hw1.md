## 十一到十五週心得

### 第十一週：資訊安全
複習資訊安全的課程內容，原本以為自己應該在作業實作上，都有考慮到資訊安全的眉角，而進行相關防範，但回頭去檢查作業時，還是有發現有自己疏忽跟大意的地方，回頭去看 Huli 的自我檢討文章，發現更新很多我們常犯錯的地方，所以這次的複習，打算先把一些重要的提醒提點出來，然後再來進行自我複習。

>1. 不要相信任何來自 client 端的資料，保持懷疑精神。
>2. 預設程式碼已經被駭客看光而且被公開，前後台權限管理不能遺漏。
>3. 不要存有僥倖心態， escape、權限管理、prepare statement，做好做滿。
>4. 前端做資料檢查，是為了增進使用者體驗，後端做資料檢查才是真檢查。

#### Cookie 與 Session
發現之前對於這兩個名詞沒有很清楚，所以回頭再重新複習一次。Cookie 與 Session 的差別在於，打個比方，Cookie 就像是以前紙本的電話簿，上面存著朋友的電話；而 Seesion 就是我與電話簿上的朋友能透過打電話保持聯絡的關係；只要確保能夠與電話簿上的朋友連絡上的話，那麼除了能以電話簿記錄電話聯絡之外，也能夠透過信件的往來，來聯絡彼此。Session 就是確保彼此能有連結的關係，中間要靠什麼方式沒有限制。但是，當然選擇打電話聯絡，會是一個訊息傳達較為精確跟快速的方式。

#### session 機制 
以第十一週的留言板作業為範例，使用者登入之後，若沒有 session 機制，提供給瀏覽器內的 cookie 存取，駭客可以隨意更改瀏覽器端 username 名稱，進而偽造身份；另外也要注意，即便是管理員才能進入的後台管理頁面，也要預設駭客都知道你的程式碼，能夠任意操作網頁，所以對於管理員的權限管理還是不能漏掉。要如何運用 PHP 內建 session 機制如下：

* handle_login.php

```php
session_start();  // 宣吿要用 session 機制
$row = $result->fetch_assoc();  // 取得使用者登入資訊
if (password_verify($password, $row['password'])) {
	// 登入成功
	/*
		1. 產生 session id (token)
		2. 把 username 以檔案方式儲存（沒有存入資料庫）
		3. set-cookie: session id (設定到 client 端)
	*/
	$_SESSION['username'] = $username;
	header("Location: index.php");
} else {
	header("Location: login.php?errCode=2");
}
```
* index.php

```php
session_start(); // 宣告要用 session 機制
$username = NULL;
if(!empty($_SESSION['username'])) {
	/*
		1. 從 cookie 裡面讀取 PHPSESSID(token)<- 通行證
		2. 從檔案裡面讀取 session id 的內容
		3. 放到 $_SESSION
	*/
	$username = $_SESSION['username']
}
```
* logout.php

```php
session_start(); // 宣布要用 session 機制
session_destroy(); //刪除 session 資料
header("Location: index.php");
```

#### 雜湊與加密

##### 明文密碼的風險
 透過後端資料庫，我們可以用來儲存會員的密碼資料。但若是有一天遇到駭客入侵，盜取資料之後，會員的密碼沒有經過加密處理，將會產生很大的資安風險。我們都有類似的經驗，當我們登入網站時，如果忘記密碼，按下「忘記密碼」的按鈕，都會請你重設密碼，而不是將原本的密碼透過電子郵件或簡訊回覆提供。背後的原因，有可能是我們的密碼已經過「雜湊」或「加密」的處理，其中的機制跟實際運用，會緊接著詳細說明。

##### 我們不一樣：雜湊與加密
 兩者雖然都有相同的功能：幫使用者的密碼變成亂數排列，但他們根本的差別是：「加密可逆推回到原本的密碼，雜湊不能還原」。雜湊（Hash）是多對一關係，沒辦法從結果回推到原本的密碼，所以有可能會發生「不同的密碼輸入」卻產生「相同的雜湊值」，若有這樣的狀況，稱為碰撞（collision）。如果使用者密碼輸入為「aaa」，透過雜湊的函式，輸出值為「5u8fed7」，短時間內要破解雜湊內建函式的演算機制會有困難，所以也沒辦法推測「5u8fed7」雜湊之前的原本密碼是「aaa」。

 加密（Encrypt）的運作機制是一對一的關係，明文密碼經過加密後會產生密文與金鑰（Key），透過金鑰，可以逆推回去原本的明文密碼。相對於雜湊，容易被駭客破解，所以現代較常透過雜湊來提高密碼的安全性。

##### 雜湊加鹽

 為了防堵駭客使用暴力破解法、並建立常用字串對照雜湊值的表單，來突破雜湊密碼防線，我們可以運用「加鹽」（salting）的方式，在密碼進行雜湊之前，先加入一段固定字串（所謂的加鹽），然後與使用者的密碼結合之後，再把加鹽過後的密碼，拿去進行雜湊，產生新的雜湊值之後，存入資料庫，藉以增加駭客破解密碼的難度。

##### 運用 PHP 內建 Hash 機制，留言板實作如下：

* handle_register.php：透過雜湊函式```password_hash()```進行密碼加密

```php
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
```

* handle_login.php：判斷登入時，透過```password_verify()```輸入密碼與雜湊之後的密碼是否相符

```php
$result = $conn->query($sql);
    if (!$result) {
        die($conn->error);
        }
    // 查無使用者
    if ($result->num_rows === 0) {
        header("Location: login.php?errCode=2");
        exit();
    }
    // 有查到使用者
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {  
    // 登入成功      
        $_SESSION['username'] = $username;
        header("Location: index.php");
    } else {
        header("Location: login.php?errCode=2");
    }
```

#### XSS (Cross-site Scripting)
簡單來說，XSS 即是在別人的網站，執行 JaxaScript 程式碼。在 HTML 裡使用```<script>```的標籤，可以讓網頁有更好的互動跟動態效果；但如果有人透過特定網站寫入任何 JavaScript 程式碼，就有機會讓有心人士竄改網頁、導入釣魚網站竊取使用者敏感資料的疑慮。

##### XSS 攻擊類型，共分成三個類型

###### 1.儲存型 XSS 
 駭客透過網頁上的可輸入資料的欄位寫入惡意程式碼，讓瀏覽器連同惡意程式碼也一起執行；若是惡意程式碼經由使用者輸入之後，存入資料庫裡，後續網站使用者也會看到被惡意程式碼修改過的內容。這樣的攻擊常見於將用戶資料存放資料庫的網站，例如社群網站、或是有提供商品評論、用戶留言的服務的網站，都有機會遭受到儲存型 XSS 的攻擊。
 
###### 2.反射型 XSS
 駭客在網址列上，把惡意程式藏在 URL 裡面，透過 URL 能傳遞參數的機制，透過網址搜尋、狀態顯示、跳轉等功能的操作，誘導使用者點開網址，藉此達到反射型 XSS 的攻擊。反射型與儲存型 XSS 最大的不同是：反射型 XSS 的惡意代碼會出現在 URL 裡面，儲存型 XSS 的惡意代碼，會透過使用者的操作，將含有惡意的程式碼資料存入資料庫。

###### 3.DOM 型 XSS
 DOM 型 XSS 主要會發生在當瀏覽器接收到駭客寫入惡意程式碼，接收執行之後，再由前端的程式碼去執行被植入惡意程式碼的行為。DOM 型 XSS 由於是在瀏覽器端發生，與前端的程式碼維護相關。若是網頁前端中的程式碼內，有使用到 ```.html()``` 或是 ```.innerHTML()``` 等的語法，要特別小心駭客會插入不可信任的程式碼或是連結。 為了避免類似的攻擊 ```.innerText``` 的寫法會比較安全。

##### XSS 的防範：透過 PHP 跳脫字元的內建函式：```htmlspecialchars()```**
 透過跳脫字元函示，把內容轉譯成純文字，而不是程式碼。建議在資料輸出之前進行編碼；存進資料庫，還是以明文儲存，避免之後資料在跨平台使用時（例如：ios、android 等平台系統），原始資料不至於讓人無法解讀。

 特別提醒自己，不要心存僥倖心態，escape 要做好做滿，把任何要輸出資料的地方（例如使用者暱稱），都編碼過後再輸出，確實建立好資安防線。

* utils.php

```php
<?php  
	function escape($str) {
		return htmlspecialchars($str, ENT_QUOTES);
	}
?>
```
* index.php

```php
<p class="card__content"><?php echo escape($row['content']); ?></p>
```

##### 另外補充 Huli 提醒，另外一個需要注意 XSS 攻擊的地方

```php
// 雖然已針對 $link 做過編碼，但若是能夠掌握 $link 輸出的話，就可以控制內容
<a href="<?php echo htmlspecialchars($link) ?>">my blog</a>
<a href="javascript:alert(1)">my blog</a>
```

###### 防範方法

```php
// 禁止使用 JS 代碼、以及非法 scheme 等語法
allowSchemes = ["http", "https"];
valid = isValid( $link,  allowSchemes);

if (valid) {
  <a href="<?php echo htmlspecialchars($link) ?>">
    my blog
  </a>
} else {
  <a href="/404">
    my blog
  </a>
}
```

#### SQL Injection
又被稱為駭客的填字遊戲。意思是指駭客在可以輸入資料的地方，用一些惡意字串來竄改 SQL 語法，來達成竊取資料等非法目的。

##### 防範方式：Prepare Statement（ＭySQL 的內建機制）

```php
$sql = "INSERT INTO sophiechang_users(nickname, username, password) VALUES(?, ?, ?)";  // 把參數改成問號
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $username, $password); // 替換成準備好的參數
$result = $stmt->execute(); // 執行 query 語法
```

#### CSRF (Cross Site Request Forgery)
CSRF 又被稱為跨站請求偽造，是一種在 Web 的攻擊方式。 CSRF 可以在不同的 domain 底下，卻能偽裝成「使用者本人身份發出的 request」。會有這樣新型的攻擊型態，是因為瀏覽器的機制，當發送 request 的時候，會把 cookie 的內容帶上。假設你點入駭客提供的 A 網站連結，其實背後是發到了 B 網站的 request，如果 B 網站你是在登入的狀態，這樣就可以造成像是使用者本人發出的 request ，即便當時你沒有親自造訪 B 網站。

##### 防範方式（推薦）

###### 加上圖形驗證碼、簡訊驗證碼
經常使用在有金流操作的網站，多了一道檢查就可以確保不會被 CSRF 攻擊。
   
###### 加上 CSRF token
產生：Server，儲存：Server
   
在 form 裡面新增 hidden 的程式碼 （註一），裡面所填的值由 server 隨機產	生，並存放在 server 的 session 中。當按下 submit 之後，server 比對表單中的 ```csrftoken```與自己 session 裡存在資料庫的是不是一樣，就可以	確定是不是由本人發出的 request。

（註一）hidden 程式碼
```html	
<input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
```

###### Double Submit Cookie
產生：Server，儲存：Client
	
一樣在表單中放入 CSRF token，但這次參照值不是存放在 server 裡，而是存在 cookie 裡。這個方式是利用 cookie 要相符合的話。就要從相同的 domain 帶上來。攻擊者無法從不同 domain 帶上相同 cookie。
	
###### Client 端生成的 Double Submit Cookie
產生：Client，儲存：Client

若是遇到是以 SPA 為主的專案，要從 sever 端拿到 CSRF token 會有點困難，所以改成從 clinet 生成。由 client 生成的 cookie 只要確保攻擊者無法取得、沒有包含任何敏感資訊的話，就不用擔心安全性考量。   
	   
##### 防範方式（最推薦）
 
###### 瀏覽器端的防禦： SameSite cookie

運作原理就是幫 Cookie 加上一層驗證，不允許跨站請求。意思是除了 A 網站這個 domain 發出的請求，其他 domain 發出的 request 不會帶上此 Cookie。而 ```SameSite``` 有兩  種模式， Lax 與 Strict，默認會是後者。

```
Set-Cookie: session_id=ewfewjf23o1; SameSite=Strict
Set-Cookie: foo=bar; SameSite=Lax
```
**Strict 嚴格**
```<a href="">```、```<form>```、```new XMLHttpRequest```... 等標籤，只要瀏覽器驗證不是在同一個 domain 發出的 request，就不會帶上 cookie。
  
**Lax 寬鬆**
上述的標籤可以帶上 cookie；使用 GET 形式也會帶上 cookie （無法防止	CSRF） ，但若是其他的 POST、DELETE、PUT...都不會帶上 cookie。


### 第十二週：前後端整合
前幾週資料在瀏覽器的網頁上的內容產出方式，是由後端透過 PHP 輸出一個 HTML 的內容然後傳到前端，讓瀏覽器顯示。由於我們都將 PHP 程式碼、商業邏輯跟 HTML 混在一起寫，易讀性差，不容易維護，在 debug 的時候也增加了難度。

第十二週的作業讓我們體驗 SPA，透過 JavaScript 非同步去呼叫用 PHP 撰寫的 API，前端去跟後端拿資料後，接著動態新增頁面。前後端分離的設計模式，後端負責 Server 端資料跟 API 的提供；前端負責 Client 端頁面的呈現，這樣的分工，讓資料歸資料，介面歸介面。除了前、後端權責清楚、程式的易讀性更好之外，也有另一層思考是，現代前後端開發，是不是傾向能以 webpack 形式打包的模組，再將打包好的 template 提供給其他網站或專案享有同樣服務的方向。

#### PHP 實作 API
需要注意資料結構，後端提供給前端資料格式以 JSON 為例，相關實作如下：

* api_ get _comments.php

```php
header('Access-Control-Allow-Origin: *'); // 注意 CORS
header('Content-type:application/json;charset=utf-8'); // 跟瀏覽器說明，是 JSON 格式資料

// 把資料拿回來
$result = $stmt->get_result();
$discussions = array();
while($row = $result->fetch_assoc()) {
  array_push($discussions, array(
    "id" => $row['id'],
    "nickname" => $row['nickname'],
    "content" => $row['content'],
    "created_at" => $row['created_at']
  ));
}
$json = array(
  "ok" => true,
  "discussions" => $discussions
);
$response = json_encode($json); // 將資料從陣列轉換成 JSON 格式
echo $response;
```

前端使用 jQuery 操作 DOM，動態顯示畫面

* index.js

```js
/* 
$(document).ready(function() {
    console.log("ready!");
});  // 當整個 HTML 元素都被載入之後，才開始以下動作
*/

commentsDom.on('click', $('.load-more-btn'), (e) => {
  getComments();
});
/*
原生 JS 寫法
document.querySelector('.comments')
.addEventListener('click', function(e) {
  if (target.matches('.load-more-btn')) {
    getComments();
  }
*/

$('.add-comment-form').submit((e) => {
  e.preventDefault();
  const newCommentData = {
    site_key: 'sophiechang',
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  };
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group1/sophiechang/week12/board_api/api_add_comment.php',
    data: newCommentData
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    };
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')

    addCommentToDom(commentsDom, newCommentData, true)   
  });
}); 

/*
原生 JS 寫法
document.querySelector('.add-comment-form').submit((e) => {
  e.preventDefault();
}
===
ajax = new XMLHttpRequest();
ajax.open( "POST", "api_add_comment.php", true );
ajax.onerror = function(){
  alert("Oops! Something Wrong!");
}
ajax.send(newCommentData);
*/
```

### 第十三週：現代前端工具
這一週的課程主要是介紹現代前端工具的介紹跟實作，藉由複習週，想要針對 CSS 預處理器的學習做些整理，所以這週的心得會以此為主。

#### 什麼是 CSS 預處理器？
我們熟悉的 CSS 的功能，能讓網頁有更好的排版跟畫面呈現；不過隨著專案規模的擴大，在使用 CSS 時會發現，若是遇到邏輯相近的樣式，經常需要重複撰寫，沒有一個較具程式邏輯的語法能夠使用，這樣也造成專案維護的難度。

而 CSS 預處理器的產生即是讓我們能夠寫出更有結構、清楚且更好維護的程式碼。目前市面上較為主流的 CSS 預處理器有三種：Sass/SCSS、Less、Stylus，接著會對 Sass/SCSS 有深入的介紹。 

#### Sass/SCSS 有什麼功能？ 

##### 參數與結構化 CSS
###### 巢狀（Nesting）
解決原本 CSS 需要重複寫多次父層選擇器的方式，透過 sass 寫出類似 HTML 的階層資料結構。

* sass 寫法

```SCSS
.edit-post
  width: 650px
  padding: 30px
  border: solid 1px $light-grey
  &__title 
     font-size: 20px
  &__input-wrapper 
      width: 100%
      margin-top: 28px
```

* 編譯過後的 CSS

```cs
.edit-post {
  width: 650px;
  padding: 30px;
  border: solid 1px #787878;
}
.edit-post__title {
  font-size: 20px;
}
.edit-post__input-wrapper {
  width: 100%;
  margin-top: 28px;
}
```

###### 變數（Variable）
可將定義整個網頁的色碼對應表或是字型等樣式，使用變數來統一屬性，若是要修改時，也較容易做調整。

* sass 寫法

```SCSS
$dark-grey: #333333
$light-grey: #787878
$pure-white: #FFFFFF
$pure-black: #000000

.edit-post
  border: solid 1px $light-grey //直接使用定義好的變數
```
* 編譯過後的 CSS
```cs
.edit-post {
  border: solid 1px #787878;
}
```

##### 模組化 CSS

###### 匯入（Import）
原檔案內的樣式多又複雜的話，通常像是變數、字級等樣式，就會獨立出一個檔案，透過 Import 分拆多個檔案進行管理，然後在主檔案引入。

* 在 main.sass 檔案引入 _variables.sass 檔案(內放變數)

＠_variable.sass

```SCSS
$dark-grey: #333333
$light-grey: #787878
$pure-white: #FFFFFF
$pure-black: #000000
```
@ main.sass

```SCSS
＠import _variable.sass
```

###### 共用（Extend）
想像成一個變數內容對應到多個內容（類似 JS 的物件資料型態），為了不要一直重寫相同的 CSS 樣式，可以使用 extend 來簡化。

* sass 寫法

```SCSS
％btn
  padding: 1rem 2rem
  color: red
  margin: 1rem

.btn
  &-primary
    @extend %btn
  &-secondary
    @extend %btn
```

* 編譯過後的 CSS

```cs
.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  color: red;
  margin: 1rem;
}
```
###### 混入（Mixin）
與 extend 有點相似，都對相同的樣式進行打包，但不同的地方是，Mixin 可以在相同樣式的模組之下，又可以帶上「變數」進行調整。

* sass 寫法

```SCSS
％btn
  padding: 1rem 2rem
  color: red
  margin: 1rem

＠mixin hover-btn($color)
  &:hover
    background: $color

.btn
  &-primary
    @extend %btn
    +hover-btn(red)
  &-secondary
    @extend %btn
    +hover-btn(black)
```

* 編譯過後的 CSS

```cs
.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  color: red;
  margin: 1rem;
}

.btn-primary:hover {
  background: red;
}

.btn-secondary:hover {
  background: black;
}
```

###### 函式（Function）
與 mixin 有點相似，不過 function 可以回傳數值並作運算，也讓開發 Sass 更像在寫程式。

* sass 寫法

```SCSS
@function letter-spacing($font-index) 
  @return $font-index / 10 * 0.2rem

＠mixin hover-btn($color)
  &:hover
    background: $color
    letter-spacing: letter-spacing($font-index)

.btn
  &-primary
    @extend %btn
    +hover-btn(red, 20)
  &-secondary
    +hover-btn(black, 30)
```

* 編譯過後的 CSS

```cs
.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  color: red;
  margin: 1rem;
}

.btn-primary:hover {
  background: red;
  letter-spacing: 0.4rem;
}

.btn-secondary:hover {
  background: black;
  letter-spacing: 0.6rem;
}
```

##### 自動化 CSS
###### @each
像 javaScript 中的 ```forEach()``` 類似，遍歷陣列中的每個元素，並帶入指定的 class。

* sass 寫法

```SCSS
＄direction-type: (center:center, start: flex-start, end: flex-end)

＠each $type, $value in ＄direction-type
  .flex-#{$type}
    display: flex
    justify-content: $value
    align-item: center
```

* 編譯過後的 CSS

```cs
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
```
###### @for
純數字的屬性，像是字級大小、字距...等，可以交給 @for（類似 for loop）的處理。

* sass 寫法

```SCSS
＠for $i from 0 through 2
  .h${5- $i + 1}
    font-size: 1 + 0.2rem * $i
```

* 編譯過後的 CSS

```cs
.h1 {
  font-size: 2rem;
}

.h2 {
  font-size: 1.8rem;
}

.h3 {
  font-size: 1.6rem;
}
```

###### @if / @else
判斷式的範例

* sass 寫法

```SCSS
＠for $i from 0 through 2
  .h${5- $i + 1}
    ＠if &i / 2 == 0
      font-size: 1 + 0.2rem * $i
    @else
      font-size: 1 + 0.3rem * $i
```

* 編譯過後的 CSS

```cs
.h1 {
  font-size: 2.5rem;
}

.h2 {
  font-size: 2.2rem;
}

.h3 {
  font-size: 1.9rem;
}
```

### 複習週總結
進度落後的壓力，原本的想法也跟大部分同學一樣，選擇跳關直接到第十六週，但最後還是決定暫緩跳關的原因，要回到 Huli 在第十六週尾聲、大概 10 月初時的 final call！（對我來說啦）

從那時候開始，就重新調整自己每日讀書的真正投入的時間。之前真的心虛被說中，即便你空出 8 小時讀書，但你的專注力跟精力沒有一起跟上，想要按照規劃的進度完成課程是不可能的；而到現在，讓我現在每天幾乎投入快 10 小時以上的學習，能有產出（交作業節奏控制在一星期之內要交出），應該是現在的我，把所有的目光都放在自己身上了（刪掉手機上的臉書、IG，現在加上了 youtube 的 app）不再分心在社群網站，也就不會去關注別人的生活。剩下自己與自己相處的好處，就是很容易對焦自己現階段最重要的事情是什麼，因為也只剩下這件最重要的事了。

所以這幾週，一邊適應新的讀書節奏、一邊衝刺進度，才發現之前學習的內容跟觀念，也是不夠扎實，所以在面對新的課程跟進度時，那些觀念不時就在呼喚你，像是在十四週的部屬，發現自己網路基礎概念好像忘了不少；寫十二、十三週作業，發現 DOM 操作及事件代理，沒有真正理解透徹，所以寫作業時覺得很崩潰；API 串接的觀念也是在自主練習做小作品時，才知道之前看著老師的示範影片就以為自己懂；資訊安全之前也因為無耐心看補充文章，最後只是知皮毛不知其中內涵。最驚人的是，回呼函式的觀念無處不出現、緊緊跟隨XD 但之前不願面對跟了解，直到 Huli 在第二期的直播影片裡面講到 callback function 的概念，才把過去分享的文章跟影片示範全部串連起來，特別是 twitch 作業示範，我終於可以體會程式重構之美了。當然要做這些複習，也需要時間，所以這週的複習，應該是加三倍量XD

另外一個原因，是第十四週跟第十五週，關於網路瀏覽器、部署、資料架構，以及前後端觀念的全面大爆發，所有觀念就像泡泡一樣，隨時都可以跟過去學習的知識連結，所以第十四週除了部署崩潰之外，另外一方面就是不停地去查資料，溫故又知新。真的只剩下時間才能釐清這些觀念跟知識了。

最後想分享，複習將近十五週的課程有感XD 資訊安全的課程，特別是 XSS 的示範，感覺需要補上更多實際範例（有看到第二期的資訊安全影片，應該列為正規課程！)，有這樣的基礎，去查照資料也比較能看得懂。另外，因為自己心急，有先去看第十六週的影片，覺得 Event Loop 的影片相見恨晚，他就是 callback function 的觀念釐清的最重要關鍵點啊！在複習這個主題的過程，有回頭去找有講到回呼函式的週次，然後再把這些觀念串補起來，也許這些資料，應該可以開個系列，把相關文章、影片一起收集起來，對於初學程式的人，少了碰壁時間，能集中心力一次釐清。



