var container = document.getElementById('container');

container.addEventListener("click", function() {
    container.focus();
});

document.addEventListener("keyup", function(e) {
    
    if (!e.key.match(/^[a-zA-Z]$/) && e.key !== "Escape" && e.key !== "Backspace") {
        return;
    }

    if (e.key === 'Escape') {
        container.textContent = "";
    } 
    else if (e.key === 'Backspace') {
        var str = container.textContent;
        if (str.length > 0) {
            container.textContent = str.substring(0, str.length - 1);
        }
    } 
    else {
        container.textContent += e.key;
    }
});
