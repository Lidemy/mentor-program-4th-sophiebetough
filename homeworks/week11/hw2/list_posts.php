<?php
	session_start();
	require_once("conn.php");
	require_once("utils.php");


	$sql= "SELECT * FROM sophiechang_articles WHERE is_deleted is NULL ORDER BY created_at DESC";
	$stmt = $conn->prepare($sql);
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

	<!-- categories -->
	<div class="container__wrapper">
    <div class="container">
      <div class="admin-posts">
      	<?php while($row = $result->fetch_assoc()) { ?>
        	<div class="admin-post">
	          <div class="admin-post__title"><?php echo escape($row['title']); ?></div>
	          <div class="admin-post__info">
	          	<div class="admin-post__created-at"><?php echo escape($row['created_at']); ?></div>
	          	<a class="admin-post__btn" href="post_item.php?id=<?php echo escape($row['id']); ?>">看文章</a>
            </div>	
          </div>
        <?php } ?>  
      </div>
    </div>
  </div>

	<!-- articles -->
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>			
</body>
</html>