<?php
	require_once("./conn.php");

	function getUserFromUsername($username) {
		global $conn;
		$sql = "SELECT * FROM sophiechang_users WHERE username=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('s', $username);
		$result = $stmt->execute();
		if(!$result) {
			die('Error:' . $conn->error);
		}

		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		return $row; //id, username
	}

	function escape($str) {
		return htmlspecialchars($str, ENT_QUOTES);
	}
?>
