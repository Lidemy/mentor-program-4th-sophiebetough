<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if (empty($_POST['content'])) {
		header('Location: ./index.php?errCode=1&id='. $_POST['id']);
		die("資料不齊全");
	};

	$username =	$_SESSION['username'];
	$role = getUserFromUsername($username)['role']; //判斷權限

	//權限
	$sql = "SELECT * FROM sophiechang_comments WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if (!$result) {
		die('資料連線錯誤');
    }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  switch ($role) {
  	case 'BANNED':
  		header("Location: ./index.php");
  		exit();
  		break;
  	case 'NORMAL':
  		if ($row['username'] !== $username) {
  			header("Location: ./index.php");
  			break;	
  		}
  	case 'ADMIN':
  		break;
  }

  $id = $_POST['id'];
	$content = $_POST['content'];

	$sql = "UPDATE sophiechang_comments SET content=? WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $content, $id);
	$result = $stmt->execute();

	if ($result) {
		header("Location: ./index.php");
	} else {
		die("failed" . $conn->error );
	};
?>
