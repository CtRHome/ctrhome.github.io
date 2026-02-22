document.addEventListener("DOMContentLoaded", function () {

    // Create wrapper div
    var nav = document.createElement("div");
    nav.className = "topnav";
    nav.id = "myTopnav";

    // Helper to create links
    function createLink(href, text, isImg, imgSrc) {
        var a = document.createElement("a");
        a.href = href;

        if (isImg) {
            var img = document.createElement("img");
            img.src = imgSrc;
            img.className = "navlogo";
            a.appendChild(img);
        } else {
            a.appendChild(document.createTextNode(text));
        }

        return a;
    }

    // Add all links
    nav.appendChild(createLink("https://ctrhome.github.io/", "", true, "https://ctrhome.github.io/img/logo_small.png"));
    nav.appendChild(createLink("https://ctrhome.github.io/games", "Games"));
    nav.appendChild(createLink("https://ctrhome.github.io/about", "About"));
    nav.appendChild(createLink("https://ctrhome.github.io/fan-projects", "Fan Projects"));
    nav.appendChild(createLink("https://ctrhome.github.io/play", "Play Online"));
    nav.appendChild(createLink("https://ctrhome.github.io/extras", "Extras"));

    //holiday stuff
    //const snowScript = document.createElement('script');
    //const snowDiv = document.createElement('div');
    //snowDiv.classList.add('rain');
    //snowScript.src = "https://ctrhome.github.io/js/rain.js";
    //document.body.appendChild(snowDiv);
    //document.body.appendChild(snowScript);

    // Add the hamburger icon
    var iconLink = document.createElement("a");
    iconLink.href = "javascript:void(0)";
    iconLink.className = "icon";

    iconLink.onclick = function () {
        if (nav.className === "topnav") {
            nav.className = "topnav responsive";
        } else {
            nav.className = "topnav";
        }
    };

    var icon = document.createElement("i");
    icon.className = "fa fa-bars";
    iconLink.appendChild(icon);

    nav.appendChild(iconLink);

    // Insert at top of body (prepend replacement)
    var body = document.body;
    body.insertBefore(nav, body.firstChild);

});

(function() {
    function AddStars() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes("⭐")) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(textNode => {
            const parent = textNode.parentNode;
            const text = textNode.textContent;
            const parts = text.split("⭐");
            
            if (parts.length > 1) {
                const fragment = document.createDocumentFragment();
                
                parts.forEach((part, index) => {
                    if (part) {
                        fragment.appendChild(document.createTextNode(part));
                    }
                    
                    if (index < parts.length - 1) {
                        const img = document.createElement("img");
                        img.src = "/img/star.png";
                        img.alt = "⭐";
                        img.style.verticalAlign = "middle";
                        img.style.display = "inline-block";
                        img.style.height = "1em";
                        img.style.paddingBottom = "10px";
                        img.style.width = "auto";
                        img.style.maxWidth = "1.2em";
                        img.style.filter = "drop-shadow(-2px 2px 6px rgba(0,0,0,0.15)) drop-shadow(2px 4px 14px rgba(0,0,0,0.15)) drop-shadow(2px -2px 4px rgba(0,0,0,0.15)) drop-shadow(-2px -2px 4px rgba(0,0,0,0.15))";
                        fragment.appendChild(img);
                    }
                });
                parent.replaceChild(fragment, textNode);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", AddStars);
    } else {
        AddStars();
    }
})();