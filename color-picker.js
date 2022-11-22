var currentColor = document.getElementById("bg");

function selectColor(button) {
    Telegram.WebApp.HapticFeedback.selectionChanged();
    if (button == currentColor) return;

    let selectColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--tg-theme-button-color");
    // let unselectColor = getComputedStyle(document.querySelector(":root")).getPropertyValue("--tg-theme-secondary-bg-color"); 
    button.style.boxShadow = `0px 0px 0px 5px ${selectColor}`; 
    currentColor.style.boxShadow = `0px 0px 0px 0px transparent`;
    currentColor = button;
}

function initColorPicker() {
    var canvas = document.getElementById('color-picker');
    
    let ctx = canvas.getContext('2d', { willReadFrequently: true })
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, '#ff0000')
    gradient.addColorStop(1 / 6, '#ffff00')
    gradient.addColorStop((1 / 6) * 2, '#00ff00')
    gradient.addColorStop((1 / 6) * 3, '#00ffff')
    gradient.addColorStop((1 / 6) * 4, '#0000ff')
    gradient.addColorStop((1 / 6) * 5, '#ff00ff')
    gradient.addColorStop(1, '#ff0000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0.02, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    canvas.onclick = function(e) {
        Telegram.WebApp.HapticFeedback.selectionChanged();
        const x = (e.offsetX / canvas.clientWidth) * canvas.width;
        const y = (e.offsetY / canvas.clientHeight) * canvas.height;
        let imgData = ctx.getImageData(x, y, 1, 1);
        let rgba = imgData.data;
        let color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
        let cursor = document.getElementById("cursor");
        cursor.style.background = color;
        cursor.style.visibility = "visible";
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
        currentColor.style.background = color;
        currentColor.value = color;
    }
  }
  
  initColorPicker();
