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