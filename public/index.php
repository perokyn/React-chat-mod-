
<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:  POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json; charset=utf-8');

$json = file_get_contents('php://input');

print_r($json);

$obj = json_decode($json);

echo $obj->do;
echo $obj->user;
echo $obj->logintime;

if (isset($obj->do)) {
        switch ($obj->do) {
            case 1:
                $output = fopen("output.txt", "a") or die("Unable to open file!");
                
                fwrite($output, $obj->user . "_");
                fwrite($output, $obj->logintime . "\n");
                fclose($output);
// Use echo keyword to display result 
echo 'CASE EXECUTED';
                break;
        }
    } 
   
