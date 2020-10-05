<?php 
	session_start();
	require_once("conn.php");
	require_once("utils.php");

	$page = 1;
	if (!empty($_GET['page'])) {
	  $page = intval($_GET['page']);
	}
	$items_per_page = 5;
	$offset = ($page - 1) * $items_per_page;

	$sql= "SELECT A.id AS id, A.content AS content, A.title AS title, A.created_at AS created_at, U.username AS username FROM sophiechang_articles AS A LEFT JOIN sophiechang_users AS U ON A.username = U.username WHERE A.is_deleted is NULL ORDER BY A.created_at DESC LIMIT ? offset ? ";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ii', $items_per_page, $offset);
	$result = $stmt->execute();
	if(!$result) {
		die('Error:' . $conn->error);
	}
	$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="normalize.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>部落格</title>
</head>

<body>
	<!-- navbar -->
	<?php include_once('header.php') ?>

	<!-- banner -->
	<section class="banner">
		<h1>技術存放之地</h1>
		<div>Welcome to my blog</div>		
	</section>	

	<!-- articles -->
	<div class="container__wrapper">
		<div class="posts">
			<?php while($row = $result->fetch_assoc()) { ?>
				<article class="post">
					<div class="post__header">
						<div><?php echo escape($row['title']); ?></div>
						<?php if (!empty($_SESSION['username'])) { ?>	
						<div class="post__edit-btn"><a href="update_post.php?id=<?php echo escape($row['id']); ?>">編輯</a></div>
						<?php } ?>
					</div>
					<div class="post__info"><?php echo escape($row['created_at']); ?></div>
					<div class="post__content"><?php echo substr(escape($row['content']), 0, 320); ?></div>
					<a class="post__read-more-btn" href="post_item.php?id=<?php echo $row['id']?>">READ MORE</a>	
				</article>
			<?php } ?>	
		</div>		
	</div>

<!-- pages -->
	<?php 
		$stmt = $conn->prepare("SELECT count(id) AS count FROM sophiechang_articles WHERE is_deleted is NULL");
		$result = $stmt->execute(); 
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$count = $row['count'];
		$total_page = ceil($count / $items_per_page);
	?>	

	<div class="page__info">
		<span>總共有<?php echo $count ?>筆留言，</span><span><?php echo $page ?> / <?php echo $total_page ?></span>
	</div>
	<div class="paginator">
		<?php if ($page != 1) { ?>
			<a href="index.php?page=1">首頁</a>
			<a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
		<?php } ?>
		<?php if ($page != $total_page) { ?>
			<a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
			<a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>	
  	<?php } ?>
  </div>

	<!-- footer -->
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>			
</body>
</html>