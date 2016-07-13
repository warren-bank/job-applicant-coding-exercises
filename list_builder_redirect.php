<?php
	header('Content-Type: text/html; charset=utf-8');
?>
<html>
<head>
	<meta charset="utf-8" />
	<title>SumoMe: The Best Website Traffic Tools</title>
	<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
	<link rel="canonical" href="http://sumome.warren-r-bank.appspot.com/list_builder_redirect" />
	<link rel="stylesheet" type="text/css" href="/static/css/style.css" />

	<style type="text/css">
body .content div.section {
	margin-top: 1em;
}
body .content div.email {
	margin-left: 1em;
}
body .content div.email span {
	background-color: #eee;
	padding: 0.75em;
	text-style: italic;
	display: inline-block;
}
body .content a,
body .content a:link {
	text-decoration: none;
	color: inherit;
	display: inline;
	padding-bottom: 5px;
}
body .content a:hover {
	border-bottom: 1px dashed #ccc;
}
	</style>
</head>
<body>
	<div class="content">
		<h2>Good Job! You're on the list..</h2>

		<div class="section">When awesome things happen, you'll be among the first to know.</div>

<?php if (! empty($_POST['email'])){ ?>
		<div class="section">We'll send all of this wonderful information to your email address:
			<div class="email">
				<span><?php echo $_POST['email']; ?></span>
			</div>
		</div>
<?php } ?>

		<div class="section">
			<div>
				<a href="/">Ready for more Sumo fun? &hellip;</a>
			</div>
		</div>
	</div>
</body>
</html>
