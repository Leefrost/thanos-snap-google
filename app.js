import html2canvas from 'html2canvas'
import "./style.sass"

html2canvas(document.querySelector("#target")).then(canvas => {
    let width = canvas.width;
    let height = canvas.height;
    let layerCount = 32;

    let ctx = canvas.getContext('2d');

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = [];

    for (let index = 0; index < layerCount; index++) {
        data.push(ctx.createImageData(width, height));
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            for (let k = 0; k < 2; k++) {

                let pos = 4 * (j * width + i)
                let posLayer = Math.floor(layerCount * (Math.random() + 2 * i / width) / 3);

                for (let k = 0; k < 4; k++) {
                    data[posLayer].data[pos + k] = imageData.data[pos + k];
                }
            }
        }
    }

    data.forEach((img, i) => {
        let cloned = canvas.cloneNode();
        var frameTimeout = i / layerCount;

        cloned.style.transition = `all 1.5s ease-out ${frameTimeout}s`;
        cloned.getContext('2d').putImageData(img, 0, 0);
        document.body.appendChild(cloned);

        setTimeout(() => {
            let angle = (Math.random() - 0.5) * 2 * Math.PI;
            let cosPos = 60 * Math.cos(angle);
            let sinPos = 60 * Math.sin(angle);
            let rotateAngle = 16* (Math.random() - 0.5);
            cloned.style.transform = `rotate(${rotateAngle}deg) translate(${cosPos}px, ${sinPos}px)`;

            cloned.style.opacity = 0;
        })

    })
});