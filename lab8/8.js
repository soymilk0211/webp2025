var container = document.getElementById('container');
var wrongCount = 0; // 記錄連續錯誤次數

window.onload = function () {
    container.textContent = add_new_chars(3);
};

function add_new_chars(x) {
    var n = Math.floor(Math.random() * x) + 1;
    var str = '';
    for (let i = 0; i < n; i++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
}

window.addEventListener("keyup", function (e) {
    var firstone = container.textContent.substring(0, 1);

    if (e.key === firstone) {
        // 正確輸入：刪除第一個字、重設錯誤計數
        container.textContent = container.textContent.substring(1);
        wrongCount = 0;
    } else {
        // 錯誤輸入：不顯示錯誤字，增加錯誤計數
        wrongCount++;
    }

    // 補上新的亂數字元
    container.textContent += add_new_chars(3);

    // 如果連錯 3 次，額外補 6 個字並重設錯誤計數
    if (wrongCount >= 3) {
        container.textContent += add_new_chars(6);
        wrongCount = 0;
    }
});
