// ファイル名と大きさを表示するだけで、中身は読まず、どこにも送信しない。
(function () {
  "use strict";

  var list = document.getElementById("file-list");

  function showFiles(files) {
    list.textContent = "";
    Array.prototype.forEach.call(files, function (f) {
      var li = document.createElement("li");
      li.textContent = f.name + "（" + f.size.toLocaleString() + " バイト）を受け付けました";
      list.appendChild(li);
    });
  }

  document.getElementById("file-input").addEventListener("change", function (e) {
    showFiles(e.target.files);
  });

  var zone = document.getElementById("drop-zone");
  zone.addEventListener("dragover", function (e) {
    e.preventDefault();
    zone.classList.add("over");
  });
  zone.addEventListener("dragleave", function () {
    zone.classList.remove("over");
  });
  zone.addEventListener("drop", function (e) {
    e.preventDefault();
    zone.classList.remove("over");
    showFiles(e.dataTransfer.files);
  });

  document.querySelectorAll("button[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = document.getElementById(btn.getAttribute("data-copy")).textContent;
      navigator.clipboard.writeText(text).then(
        function () { btn.textContent = "コピーしました"; },
        function () { btn.textContent = "コピーできませんでした（手で選択してください）"; }
      );
    });
  });

  document.getElementById("print-button").addEventListener("click", function () {
    window.print();
  });
})();
