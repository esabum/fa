<?php
//require_once('WriteHTML.php');


// Include the main TCPDF library (search for installation path).
require_once('tcpdf.php');


$html="<!DOCTYPE html>
<html lang='en'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>        
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <style>
            body{font-family:'Courier', 'Open Sans', 'Trebuchet MS', 'Lucida Sans Unicode';color:#4F5155;font-size:11px;}
            table{text-align:justify;}
            input{padding:3px;margin:3px;width:45%;}
            .input_large{width:94%;}
            .input_small{width:20%}
            #invoice_pane{position:fixed;top:0;left:0;width:100%;height:100%;}            

        </style>
    </head>
    <body>
        <div id='invoice_pane'>
            <center>
            <br>
            <table width='750' border='0' cellspacing='0' cellpadding='0'>
				<tbody>
					<tr>
						<td colspan='2' style='text-align: center'><h2 style='margin: 1px; padding: 1px'>Factura electrónica</h2>
							<h3 style='margin: 1px; padding: 0px'>Comprobante # </h3>
							<h3 style='margin: 1px; padding: 0px'>Clave:</h3>
							<h3 style='margin: 1px; padding: 0px'><span id='invoice_date_D'>Mon Sep 24 2018</span></h3>
						</td>
					</tr>
					<tr>					
						<td align='left' valign='top' width='55%'>
							<span id='customer_details'>
								<i><small>Cliente</small></i><br>
								<big><b><span >Gilberto Saborío C</span></b><br>
								<span >Gilberto</span></big><br>
								<span >ID:</span>
								<span >29940383607</span><br>
								<span >Heredia</span>,
								<span >San Rafael</span><br> 
								<span >Santiago</span>,<span id='customer_zip_id_D'>Jardines Universitarios</span><br> 
								<span >Alameda 3, casa 226</span><br>
								<span >dunn_jared@piedpiper.com</span>

							</span>
						</td>
						<td align='right'>
							<b><big><span >Ernesto Saborío</span></big></b><br>
							<span >ID 402090473</span><br>
							<span >San José</span>, <span id='vendor_state_D'>San José</span><br>
							<span >Pavas</span>, <span id='vendor_zip_value_D'>Rohromoser</span><br>
							<span >200m norte y 100m este de la embajada de USA</span><br>
							<u><span >support@example.com</span></u>
						</td>
					</tr>
				</tbody>
			</table>
            <hr width='750'>
            <table width='750' border='0' cellspacing='0' cellpadding='0'>
                <tbody><tr>
                    <td align='left'>
                        <b><span >PAGO DE CONTADO</span></b>
                    </td>
                    <td align='right' valign='top'>
                        <b>Medio de pago: <span>Efectivo</span></b>
                    </td>
                </tr>
            </tbody></table>
            <table width='750' border='1' cellspacing='0' cellpadding='0'>
                <tbody>
					<tr>
						<td valign='top' align='left' width='75%'>
							<table border='1' width='100%' cellspacing='0' cellpadding='0'>
								<thead>						
									<tr align='center'>
										<th>Cantidad</th>
										<th>Unid. Medida</th>								
										<th>Descripción</th>
										<th>Sub total</th>
										<th>Total</th>
										<th>Total línea</th>
									</tr>
								</thead>
								<tbody id='order_items_D'>
									<tr align='center'>
										<td id='item_sl_1_D'>1</td>
										<td id='item_desc_1_D'>1</td>
										<td id='item_rate_1_D'>algo</td>
										<td id='item_units_1_D'>150</td>
										<td id='item_total_1_D'>150</td>
										<td id='item_total_1_D'>150</td>
									</tr>
								</tbody>								
							</table>
						</td>
						<td align='center'>
							<table width='85%' border='0' cellspacing='0' cellpadding='0'>
								<tbody><tr>
									<td align='left' width='50%'><b>Total Units</b></td>
									<td align='left' width='5%'>:</td>
									<td align='left'><b><span id='total_units_D'>2</span></b></td>
								</tr>
								<tr><td colspan='3'>&nbsp;</td></tr>
								<tr>
									<td align='left'><b>Sub Total</b>(+)</td>
									<td align='left'>:</td>
									<td align='left'><b><span id='sub_total_D'>130</span></b></td>
								</tr>
								<tr id='tax_row'>
									<td align='left'>Impuesto: <span id='tax_rate_D'>5.5</span>%(+)</td>
									<td align='left'>:</td>
									<td align='left'><span id='tax_amount_D'>7.15</span></td>
								</tr>
								<tr>
									<td align='left'>Otros(+)</td>
									<td align='left'>:</td>
									<td align='left'><span id='other_charges_D'>0</span></td>
								</tr>
								<tr>
									<td align='left'>Descuento(-)</td>
									<td align='left'>:</td>
									<td align='left'><span id='discount_D'>0</span></td>
								</tr>
								<tr><td colspan='3'>&nbsp;</td></tr>
								<tr>
									<td align='left'><b>TOTAL</b>(=)</td>
									<td align='left'>:</td>
									<td align='left'><b><big><span id='currency_D'>$</span><span id='grand_total_D'>137.15</span></big></b></td>
								</tr>
							</tbody></table>
						</td>
					</tr>
				</tbody>
			</table>
            <br>
            <span id='final_note_D'>Autorizada mediante resolución Nº DGT-R-48-2016 del 7 de octubre de 2016</span><br>
            
            </center>
        </div>    
	</body>
</html>";


// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
/*
// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 048');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');
*/
// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 048', PDF_HEADER_STRING);

// set header and footer fonts
/*
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
*/
// set default monospaced font
//$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
/*
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
*/
// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
//$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', 'B', 20);

// add a page
$pdf->AddPage();

//$pdf->Write(0, 'Example of HTML tables', '', 0, 'L', true, 0, false, false, 0);

$pdf->SetFont('helvetica', '', 8);
// set style for barcode
$style = array(
    'border' => 2,
    'vpadding' => 'auto',
    'hpadding' => 'auto',
    'fgcolor' => array(0,0,0),
    'bgcolor' => false, //array(255,255,255)
    'module_width' => 1, // width of a single module in points
    'module_height' => 1 // height of a single module in points
);




$pdf->writeHTML($html, true, false, false, false, '');
// QRCODE,L : QR-CODE Low error correction
$pdf->write2DBarcode('www.tcpdf.org', 'QRCODE,L', 100, 30, 50, 50, $style, 'N');
$pdf->Text(20, 25, 'QRCODE L');

// -----------------------------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_048.pdf', 'I');

?>
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>