
$(document).ready(function () {
    //highlights the selected menu link
    var url = window.location;
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
    $('ul.nav a').filter(function() {
         return this.href == url;
    }).parent().addClass('active');

    //used for the pygments code highlighting.  The line numbers use a table.
    //To make it responsive, the table needs to be wrapped in the 
    //the table-responsive tag as per bootstrap documentation.
    $( ".highlighttable" ).wrap( "<div class='table-responsive'/>");
});


   

   

