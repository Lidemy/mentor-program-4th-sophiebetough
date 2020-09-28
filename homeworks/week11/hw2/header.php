<?php 
	$uri = $_SERVER['REQUEST_URI'];
	$isAdminPage = (strpos($uri, 'admin.php') !== false);
 ?>

<nav class="navbar">
	<div class="navbar__wrapper">
		<div class="navbar__left">
			<div class="navbar__left-sitename"><a href="index.php">Who's Blog</a></div>
			<ul class="navbar__left-list">
				<li><a href="list_posts.php">文章列表</a></li>
				<li><a href="#">分類專區</a></li>
				<li><a href="#">關於我</a></li>	
			</ul>
		</div>
		<div class="navbar__right">
			<ul class="navbar__right-list">
				<?php if (!empty($_SESSION['username'])) { ?>
					<?php if($isAdminPage) { ?>
						<li><a href="create_post.php">發布文章</a></li>
				  <?php } else { ?>
						<li><a href="admin.php">管理後台</a></li>
					<?php } ?>
					<li><a href="logout.php">登出</a></li>
				<?php } else { ?>
					<li><a href="login.php">登入</a></li>
				<?php } ?>
			</ul>
		</div>
	</div>
</nav>