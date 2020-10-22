## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS（Domain Name System）又稱為域名名稱系統。這個系統可將人們熟悉的網域寫法（www.happycode.com），轉換成機器可讀取的 IP 地址（123.34.56.1）。

Google Public DNS 是 Google 提供給一般網路用戶使用的免費域名解析服務，使用者可以享受到較快以及穩定的網路體驗；對 google 來說，提供一個免費的服務，除了對品牌的曝光度提升之外，由於使用者在轉換使用 Goole Public DNS 時，同時也能夠存取使用者的上網紀錄，使用者的網路足跡，也可作為後續網路服務優化的相關分析。 

## 什麼是資料庫的 lock？為什麼我們需要 lock？
資料庫的 lock 是在進行交易時，鎖定要存取的資料，避免與其他交易之間產生衝突，而影響資料寫入與讀取的正確性。舉例來說，我們在電商網站要搶購限量商品時，當我們成功進入購物車頁面，資料庫就會將這筆資料予以「鎖定」（lcok），若有其他購買者想要加入搶購，就必須要等待前位購買者完成，才會解鎖，並更新商品數量。


```
require_once('./conn.php')

$conn->autocommit(FALSE);
$conn->begin_transaction();
$stmt = $conn->prepare("SELECT amount FROM products WHERE id = 1 for update"); // for update => lock
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
	echo "amount" . $row['amount'];

	if($row['amount'] > 0) {
		$stmt = $conn->prepare("UPDATE products" SET amount = amount - 1 WHERE id = 1);
		if ($stmt->execute()) {
			echo '購買成功！';
		}
	}
}
```

## NoSQL 跟 SQL 的差別在哪裡？
SQL（Structureed Query Languaga）是一種專門來管理與查詢關聯式資料庫的程式語言，相對應的關聯式資料庫為，像是我們熟悉的 MySQL，透過 SQL 我們能在關聯式資料庫裡實現 CRUD 的操作。

關聯式資料庫，三個特性：<br>
1. 資料會以 table 的形式存放。<br>
2. 資料與資料之間，可以用 `JOIN`語法產生關聯。<br>
3. 關聯式資料褲會以 SQL 語言操作。

NoSQL 的意思是「Not Only SQL」，也就是不限定為「關聯式資料庫」的資料庫管理系統的統稱，相對應的資料庫為：MongoDB，不需要特定的結構（schema-free），所以通常用來存一些結構不固定的資料。


## 資料庫的 ACID 是什麼？
資料庫在寫入／異動資料的過程中，為確保交易（transaction）是正確可靠，必須要符合 ACID 所代表的四個特性：

* 原子性（atomicity）

交易就像原子一樣是不可分割的單元，資料操作不會只有部分完成，一次的 transaction 只會有兩種結果：成功或是失敗。舉例來說，如果我們正在進行購物車的結帳，到了最後一步確認要按下付款按鈕之前，突然反悔按下取消鍵，這次的 transaction 就會回滾（rollback），將之前執行結果全部恢復，當作沒有發生過一樣。

* 一致性（consistency）

資料在交易前後的總數必須保持一致。例如，A 的戶頭有 200 元，B 的戶頭有 300 元，A + B 的總數為 500 元。當雙方進行交易時，A 要轉帳給 B 100 元，當  Ａ 戶頭扣 100 元時（A 戶頭餘額剩 100 元），B 戶頭會加 100 元（B 戶頭總額為 400 元）。這樣的過程，雙方的戶頭相加總數還是 500 元，不會發生扣了 A 戶頭的錢，但沒有加到 B 戶頭的事情發生，這也就是在 transaction 的執行前後都保持雙方資料總數的一致性。

* 隔離性（Isolation）

有多筆交易在進行時，彼此不會交互影響。當我們有一個 transaction 在進行時，這個交易所用到的資料庫資料或是交易進行中途，不會讓其他 transaction 影響或使用，此筆交易會確認完成結束之後，才能讓其他交易使用相關資料庫。

* 耐久性（durability）

每筆交易完成之後，對於資料的操作將會是永久的而且會完整的保存在資料庫中，即使系統故障，寫入的資料也不會憑空不見。


