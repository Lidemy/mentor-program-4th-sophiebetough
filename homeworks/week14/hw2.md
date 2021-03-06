## AWS EC2 部署網站心得

### 前言
進入第十四週的課程時，對於「網站部署」這樣的名詞完全陌生，雖然知道要去買主機、買網域，再將兩者串連起來，僅有這樣的先備知識，還是沒辦法往前踏去第一步。但憑著落後進度之姿（有什麼好得意）、同學們神筆記救援，以及 google 大神的幫助，才比較有信心，展開有時風雨、有時晴的「部署，一場噴 Bug 之旅」。

### AWS EC2 虛擬主機篇
即便心情忐忑，還是要踏出第一步，但要買東西之前，至少要知道自己在買什麼吧！先去 google 了 AWS 提供的服務內容跟所謂的「主機」是什麼。經過一些整理，大概知道 AWS EC2 提供虛擬主機的服務。有這樣的模糊概念，還有學長姐的筆記，一步一步完成主機的建立。

#### 申請帳號
註冊的流程大致順利，介面操作也算熟悉，跟之前申請 Amazon jp 網站流程大致相似，不過要比較注意的是，地址要轉換成英文地址，信用卡沒有提供 JCB 刷卡服務（抖），差點因為沒有 JCB 之外的信用卡而卡關，好在我還有 VISA 的 debit 卡，It works！

註冊流程如下：<br>
1. 註冊帳號<br>
2. 填寫詳細的基本資料<br>
3. 付款資訊<br>
4. 身份認證<br>
5. 完成驗證

#### 設定主機
雖然有筆記的幫忙，但每個步驟出現的名詞都很不熟悉，還有為何要選這個選項也沒什麼概念，所以過程中同時設定主機之餘，還需要同時去查這些名詞代表的意思，相對設定時間就被拉長。幾個關鍵字若是可以先理解： Ubuntu Server、Firewall、SSH 22 port、80 port，會比較清楚自己按鍵之下的每一步。

**Ubuntu Server ：**
Ubuntu 是一種 Linux 作業系統，與一般家用版 Windows 不ㄧ樣，前者是架設伺服器電腦以及優化伺服器效能的作業系統；後者是給一般用戶使用的作業系統。

**Firewall ：**
私有網路以及網際網路之間控制所有進出兩者的資料封包的機制。

**SSH 22 port & 80 port ：**
SSH 是一種加密的網路傳輸協定，可提供安全的傳輸環境服務，而這個服務是開在 port 22；80 port 是為HTTP（超文本傳輸協定）開放的連接埠。

### SSH 連接虛擬主機篇
進入說很熟也不算很熟的終端機介面，想起之前課程一開始就讓我們學習 CLI 的指令，根本先知。至少現在對於介面不會害怕，還有餘力查資料破關。記得當時進行到這一步時，卡關連連，都自暴自棄自稱是麻煩製造大師，現在來還原一下當時的卡關實境：

**卡關ㄧ：密鑰你放在哪裡？**

天真以為照著學長姐、同學們的筆記，就可以順利通關，事情就是不會這麼順利！當時要透過終端機進行連線主機的步驟時，需要知道密鑰檔案的路徑，一直搞不定路徑的輸入（傻眼）。瞎忙一陣，查到資料說只要把檔案拖曳到終端機畫面，就會直接出現路徑，免手動輸入。

**卡關二：PHP 下載中斷記**

麻煩製造大師這時候也是心急，想著自己剛剛好像沒有選到 apache2 的選項，下載途中就是手殘把終端機關掉，後續就是不斷跳出：Could not get lock /var/cache/apt/archives/lock，查了資料，似乎又有簡單暴力法，最後我就把這些檔案刪掉，php 就能繼續安裝了。

**卡關三：HTTP status 錯誤複習**

來到瀏覽器想測試畫面，就此來到 HTTP status 的錯誤複習時間，先噴 404 錯誤，有超強筆記 @krebikshaw 搶救，但緊接著就噴 500，想著應該跟之前中斷記有關，此時此刻有點想回家了。最後重新安裝 php、再連結上伺服器，就這樣繼續推進到下一步。

**卡關四：我的密碼不是我的密碼**
看到登入頁面時，覺得螢幕在發光，但在輸入帳密無法登入之後，立刻黯淡，整個人生！這時不知道哪個機靈的器官想到群組有很多關於部署的發問，立刻去找刷文，真的有啊！重新設置 root 的密碼，即可順利登入。謝謝那些善良、正直、勇健的發問同學跟解惑大師們，只能把所有正面的形容詞都送給你們！

### 設定域名+上傳動態網站檔案篇
由於之前卡關的波濤洶湧，來到購買網域，顯得特別平靜，最重要的事情就是記得跟助教拿折扣碼，拿來購買結尾為` .tw` 的域名。強大的 DNS 設定，也需要我們先確認 Domain（域名）與 IP 地址的雙向對應是否正確，所以必須將我們新建主機的 IPv4，放置在 A Record 的位置，這樣就完成域名串連主機的最重要一步。

最後，我們就可以來上傳之前的動態網站檔案，來看看熱騰騰剛部署完成的網站是不是一切連線正常、顯示畫面。首先要先去 FTP 新增站台，這一部分的操作也很平和，參考著網路上神人們的筆記，建立過程順利；資料庫匯出匯入，到了最後一步上傳檔案，然後在新網站上呈現畫面，一切無事完成（歡呼）！

### 部署之後
從對「部署網站」零知識背景，如今可以整理出一篇心得，到現在還是覺得很神奇，過程中最大最大的收穫，除了知道如何部署一個網站之外，
在處理卡關的過程當中，查詢資料的功力有往前一大步；另外，在觀看 Huli 的部屬示範影片，發現解 bug 也是有一套邏輯，最重要的是心情要穩定。現在還是會因為出現 bug，覺得心慌、想要趕快解答，反而會沒有看清楚錯誤訊息要傳達給的意思，找資料的時間反而拉得更長。

第十七週好像也會在面對部署的課題，雖然完成課程之路遙遙，但最重要是第一階段的部署完成了！後續的問題就等到第十七週再來面對吧。

參考資料：<br>
[AWS EC2 佈署網站：卡關記錄 & 心得](https://nicolakacha.coderbridge.io/2020/09/16/launch-website/)<br>
[「教學」SSH 連線 Amazon EC2 主機](https://diary.taskinghouse.com/posts/310691-ssh-connection-amazon-ec2/)<br>
[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)<br>
[[ 紀錄 ] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://reurl.cc/VXmKDN)<br>
[[AWS] 透過 FileZilla 使用 key-pairs 登入 AWS EC2 存取檔案](https://reurl.cc/gmn9AV)




