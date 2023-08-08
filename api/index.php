<?php

$url_data = "../db/data.json";

$contact_json = file_get_contents($url_data);

echo $contact_json;
