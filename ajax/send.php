<?php
header("Access-Control-Allow-Orgin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json;");
$result = ["status" => "500", "error" => "request method != post", "content" => "empty"];
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    $content = '';
    if(!empty($_POST)) {
        foreach ($_POST as $k => $v) {
            if (empty($v)) {
                $result["error"] = "пустой POST";
                echo json_encode($result);
                return;
            }
            foreach ($v as $i => $val){
                $content .= "{$i}:{$val};";
            }
        }
        $result["status"] = "200";
        $result["error"] = "0";
        $result["content"] = $content;
    } else {
        $content .= date('Y-m-d / H:i:s') . "\nPOST не дошел!";
        $result["error"] = $content;
        echo json_encode($result);
        return;
    }

}
echo json_encode($result);