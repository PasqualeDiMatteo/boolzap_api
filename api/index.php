<?php

$url_data = "../db/data.json";

$contact_json = file_get_contents($url_data);

$contacts = json_decode($contact_json, true);

$current_id = $_POST["id"] ?? null;
$new_message = $_POST["message"] ?? null;

if ($current_id && $new_message) {
    foreach ($contacts as $i => $contact) {
        if ($contact["id"] == $current_id) {
            $new_message_data = [
                "id" => uniqid(),
                "status" => "sent",
                "message" => $new_message,
                "date" => date("d/m/Y H:i:s")
            ];
            $contacts[$i]["messages"][] = $new_message_data;
            $message_json = json_encode($new_message_data);
        }
    }
    file_put_contents($url_data, json_encode($contacts));
} else {
    $message_json = $contact_json;
}

echo $message_json;
