(() => {
    const shareElements = document.querySelectorAll('[data-provider]');

    shareElements.forEach((share, index) => {
        let provider = share.dataset.provider;
        let postUrl = window.location.href;
        let postTitle = share.dataset.title ? share.dataset.title : document.title;
        share.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (provider == 'copy-url') {
                copyURL(share);
            } else {
                let strWindowFeatures = 'height=450, width=550, top=' + (window.innerHeight / 2 - 275) + ', left=' + (window.innerWidth / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0';
                window.open(shareLink(provider, postUrl, postTitle), "_blank", strWindowFeatures);
            }
        }
    });

    function shareLink(provider, postUrl, postTitle) {
        switch (provider) {
            case 'facebook': return "https://www.facebook.com/sharer.php?u=" + postUrl + "&t=" + postTitle + "&v=3";
            case 'linkedin': return "https://www.linkedin.com/shareArticle?mini=true&url=" + postUrl + "&title=" + postTitle;
            case 'twitter': return "https://twitter.com/intent/tweet?text=" + postTitle + " " + postUrl;
            case 'pinterest': return "https://pinterest.com/pin/create/button/?url=" + postUrl + "&media=${media_link}&description=" + postTitle;
            case 'email': return "mailto:?subject=" + postTitle + "&body=Link: " + postUrl;
            case 'reddit': return "http://reddit.com/submit?url=" + postUrl + "&title=" + postTitle;
            case 'gmail': return "https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&su=" + postTitle + "&body=Link: " + postUrl;
            case 'tumblr': return "https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=" + postUrl + "&title=" + postTitle + "&caption=";
            case 'yc_hacker_news': return "http://news.ycombinator.com/submitlink?u=" + postUrl + "&t=" + postTitle;
            case 'aol_mail': return "http://webmail.aol.com/25045/aol/en-us/Mail/compose-message.aspx?subject=" + postTitle + "&body=" + postUrl;
            case 'yahoo_mail': return "http://compose.mail.yahoo.com/?Subject=" + postTitle + "&body=Link: " + postUrl;
            case 'flipboard': return "https://share.flipboard.com/bookmarklet/popout?v=2&url=" + postUrl + "&title=" + postTitle;
            case 'pocket': return "https://readitlaterlist.com/save?url=" + postUrl + "&title=" + postTitle;
            case 'line': return "https://social-plugins.line.me/lineit/share?url=" + postUrl;
            case 'whatsapp':
                let appTypeURl = (navigator.userAgent.indexOf("Mobi") == -1) ? "api.whatsapp.com" : "web.whatsapp.com";
                return "https://" + appTypeURl + "/send?text=" + postTitle + " " + postUrl;
            case 'telegram': return "https://telegram.me/share/url?url=" + postUrl + "&text=" + postTitle;
            default: return 'undefined provider';
        }
    }

    function copyURL(share) {
        let elm = document.createElement('textarea');
        elm.style.fontSize = '12pt';
        elm.style.border = '0';
        elm.style.padding = '0';
        elm.style.margin = '0';
        elm.style.position = 'absolute';
        elm.style['left'] = '-9999px';
        let yPosition = window.pageYOffset || document.documentElement.scrollTop;
        elm.style.top = `${yPosition}px`;
        elm.setAttribute('readonly', '');
        elm.value = window.location.href;
        share.appendChild(elm);
        elm.select();
        document.execCommand('copy');
        elm.remove();
    }
})()