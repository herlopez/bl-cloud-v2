
$(document).ready(function(){
if($('#menu_dropdown').is(':visible'))
 {
    $('#site_header').addClass("fixedPosition");
 }
 else
 {
    $('#site_header').removeClass("fixedPosition");
}});