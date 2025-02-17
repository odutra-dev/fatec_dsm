<?php
setcookie("cookie", "cookie", time() + 1800);

header("location:dashboard");

?>