//--page to navigate when clicked menu item
//page : from HTML CLICK  Example : /page:/01/demos/index.html



function loadPage(page) {
    //get reference for the html element by its ID
    //contentFrame : is iframe element type 
    let iframeElement = document.getElementById("contentFrame");

    //give the iframe the HTML address
    iframeElement.src = page;

    // Close sidebar on mobile
    document.getElementById("sidebar").classList.remove("show");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
}