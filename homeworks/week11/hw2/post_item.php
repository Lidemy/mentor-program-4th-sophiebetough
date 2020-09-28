<?php 
	session_start();
	require_once("conn.php");
	require_once("utils.php");

	if (empty($_GET['id'])) {
		header('Location: index.php');
		exit();
	}

	$id = $_GET['id'];

	$sql = "SELECT * FROM sophiechang_articles WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if(!$result) {
		die('Error:' . $conn->error);
	}
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
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
			<article class="post">
				<div class="post__header">
					<div><?php echo escape($row['title']); ?></div>
					<?php if (!empty($_SESSION['username'])) { ?>	
					<div class="post__edit-btn"><a href="update_post.php?id=<?php echo escape($row['id']); ?>">編輯</a></div>
					<?php } ?>
				</div>
				<div class="post__info"><?php echo escape($row['created_at']); ?></div>
				<div class="post__content"><?php echo escape($row['content']); ?></div>
			</article>
		</div>		
	</div>

	<!-- footer -->
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>			
</body>
</html>