import html2canvas from 'html2canvas'
import "./style.sass"

html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
    
});