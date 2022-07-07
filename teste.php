<?php
    $array = array(
        1    => "a",
        "1"  => "b",
        1.5  => "c",
        true => "d",
    );

    print_r(array_filter($array, "c"));
?>