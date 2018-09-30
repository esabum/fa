<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once APPROOT . '/config/accesses/model/clsAccess.php';
$objMenu = new Menus;
$objMenu->set_TypeId(2);
$objMenu->set_UserId(1);//($UserId);
$objMenu->set_LanguageId(1);//($SelLang);
$objMenu->execute();
for ($par = 0; $par < $objMenu->get_Count(); $par++) {
?>
                                <li>
                                    <a href="/<?=APPBASE?><?= ($objMenu->get_URL($par)?$objMenu->get_URL($par):'#') ?>">
                                        <span class="<?= $objMenu->get_Icon($par) ?>"><?= $objMenu->get_Name($par) ?></span>
                                    </a>
                                </li>
<?php
}
?>
