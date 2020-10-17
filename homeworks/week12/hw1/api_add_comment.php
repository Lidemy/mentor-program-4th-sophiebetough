<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  //錯誤處理
  if (empty($_POST['content']) || empty($_POST['nickname']) || empty($_POST['site_key']) ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  //成功的話把資料拿進來
  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];
  $content = $_POST['content'];

  $sql = "INSERT INTO sophiechang_board2_comments(nickname, site_key, content) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $site_key, $content);
  $result = $stmt->execute();

    
  if (!$result) {
      $json = array(
          "ok" => false,
          "message" => $conn->error
      );
      $response = json_encode($json);
      echo $response;
      die();
  }

    $json = array(
        "ok" => true,
        "message" => "success",
    );

    $response = json_encode($json);
    echo $response;
?> 
