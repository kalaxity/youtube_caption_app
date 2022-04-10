/** @type {HTMLInputElement} input_image */
const input_image = document.getElementById("input_image"); // 選択されたファイル
const image = document.getElementById("image"); // 読み込んだ画像
const caption_area = document.getElementById("caption_area"); // 字幕描画エリア

const submit = document.getElementById("submit"); // 合成実行ボタン

const cv = document.getElementById("cv"); // スクショ対象エリア
const result = document.getElementById("result"); // 生成画像描画エリア

const reader = new FileReader();

let drawCaption = () => {
    document.getElementById("sample").style = "display: block";

    caption_area.innerHTML = "";
    let p = document.getElementById("textarea").value;
    p.split("\n").forEach(e => {
        let newCap = document.createElement("span");
        newCap.setAttribute("class", "caption");
        newCap.innerText = e;
        caption_area.appendChild(newCap);
        caption_area.appendChild(document.createElement("br"));
    });
}

let doGousei = () => {
    // サンプル画像エリアを表示
    document.getElementById("sample").style = "display: block";

    // https://html2canvas.hertzen.com/getting-started
    html2canvas(document.getElementById("cv")).then((canvas) => {
        result.innerHTML = "<img src='" + canvas.toDataURL() + "'>";
        
        // また非表示に戻す
        document.getElementById("sample").style = "display: none";
    });
}

input_image.addEventListener("change", () => {
    // 選択されたファイル (File型)
    let file = input_image.files[0];
    // そのファイルをData URLとして読み込む
    reader.readAsDataURL(file);

    // Fileを読み込み終わった後の動作
    reader.onload = () => {
        // Data URLをimageに渡す(画像として読み込む)
        image.src = reader.result;
        
        drawCaption();
        doGousei();
    }
});

submit.addEventListener("click", () => {
    drawCaption();
    doGousei();
});

//gousei.addEventListener("click", doGousei);

window.onload = () => {
    drawCaption();
    doGousei();
}