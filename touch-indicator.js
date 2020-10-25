function touchIndicator(options){
    options = options || {};
    options.name = options.name || "touchIndicator";
    options.duration = options.duration || 500;
    options.size = options.size || 150;
    options.opacity = options.opacity || 0.3;
    options.scale = options.scale || 0.2;
    options.color = options.color || "#fff";
    options.square = options.square || false;
    options.delay = options.delay || 0;
    options.ripples = options.ripples || 1;
    options.interval = options.interval || 100;

    var head = document.querySelector("head");
    var headStyle = head.querySelector("style");

    if (!headStyle) {
        headStyle = document.createElement("style");
        head.appendChild(headStyle);
    }

    headStyle.innerHTML += `
/* Injected by touchIndicator */
.${options.name}{
    position: relative;
}
.${options.name}__container{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;${options.zIndex ? `\n\tz-index: ${options.zIndex};` : ""}
    overflow: hidden;
}
.${options.name}__element{
    position: absolute;
    border-radius: ${options.square ? "0" : "50%"};
    background-color: ${options.color};
    width: ${options.size}px;
    height: ${options.square ? "100%" : options.size + "px"};
    opacity: ${Math.max(0, Math.min(options.opacity, 1))};
    transform: scale(${Math.max(0, Math.min(options.scale, 1))}${options.square ? ", 1" : ""});
    transition: transform ${options.duration}ms ease-out, opacity ${options.duration}ms ease-out;
}
    `;

    var links = document.querySelectorAll(`.${options.name}`);

    links.forEach(link => {
        link.addEventListener("click", touchClicked);
    });

    function touchClicked(event){
        var link = event.currentTarget;
        var x = event.clientX;
        var y = event.clientY;
        var timeout = options.delay;
        for (let i = 0; i < options.ripples; i++) {
            setTimeout(() => {
                createElement(link, x, y);
            }, timeout);
            timeout += options.interval;
        }
    }
    function createElement(link, x, y){
        var container = document.createElement("span");
        container.classList.add(`${options.name}__container`);
        var element = document.createElement("span");
        element.classList.add(`${options.name}__element`);
        container.appendChild(element);
        link.appendChild(container);
        var rect = link.getBoundingClientRect();
        element.style.left = x - rect.left - options.size / 2 + "px";
        element.style.top = options.square ? "0" : y - rect.top - options.size / 2 + "px";
        element.style.transform = "scale(1)";
        element.style.opacity = "0";
        setTimeout(() => {
            container.remove();
        }, options.duration);
    }
}
export default touchIndicator;