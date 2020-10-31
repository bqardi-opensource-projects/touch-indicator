function touchIndicator(options = {}){
    var {
        name = "touchIndicator",
        duration = 500,
        size = 150,
        opacity = 0.3,
        scale = 0.2,
        color = "#fff",
        square = false,
        delay = 0,
        ripples = 1,
        interval = 100,
        zIndex = 0
    } = options;

    var head = document.querySelector("head");
    var headStyle = head.querySelector("style");

    if (!headStyle) {
        headStyle = document.createElement("style");
        head.appendChild(headStyle);
    }

    headStyle.innerHTML += `
/* Injected by touchIndicator */
.${name}{
    position: relative;
}
.${name}__container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;${zIndex ? `\n\tz-index: ${zIndex};` : ""}
    overflow: hidden;
}
.${name}__element{
    position: absolute;
    border-radius: ${square ? "0" : "50%"};
    background-color: ${color};
    width: ${size}px;
    height: ${square ? "100%" : size + "px"};
    opacity: ${Math.max(0, Math.min(opacity, 1))};
    transform: scale(${Math.max(0, Math.min(scale, 1))}${square ? ", 1" : ""});
    transition: transform ${duration}ms ease-out, opacity ${duration}ms ease-out;
}
    `;

    var links = document.querySelectorAll(`.${name}`);

    links.forEach(link => {
        link.addEventListener("click", touchClicked);
    });

    function touchClicked(event){
        var link = event.currentTarget;
        var x = event.clientX;
        var y = event.clientY;
        var timeout = delay;
        for (let i = 0; i < ripples; i++) {
            setTimeout(() => {
                createElement(link, x, y);
            }, timeout);
            timeout += interval;
        }
    }
    function createElement(link, x, y){
        var container = document.createElement("span");
        container.classList.add(`${name}__container`);
        var element = document.createElement("span");
        element.classList.add(`${name}__element`);
        container.appendChild(element);
        link.appendChild(container);
        var rect = link.getBoundingClientRect();
        element.style.left = x - rect.left - size / 2 + "px";
        element.style.top = square ? "0" : y - rect.top - size / 2 + "px";
        element.style.transform = "scale(1)";
        element.style.opacity = "0";
        setTimeout(() => {
            container.remove();
        }, duration);
    }
}
export default touchIndicator;