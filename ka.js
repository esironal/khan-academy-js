var ka = (function (document) {
    var _xhr = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP.6.0'),
        _reusable_iframe_ele = document.createElement('iframe'),
        _default_host = 'http://www.khanacademy.org/api/v1/',
        _default_youtube_embed_url = 'http://www.youtube.com/embed/{{id}}',
        _default_iframe_attr = {
            'class': 'youtube-player',
            type: 'text/html',
            width: '640',
            height: '385',
            frameborder: '0'
        },
        _cache = {};

    
    for (var key in _default_iframe_attr) {
        _reusable_iframe_ele.setAttribute(key, _default_iframe_attr[key]);
    }

    
    // asynchronous GET requests because CORS is awesome
    function _get (url, callback, ignoreCache) {
        
        // let's not be wasteful, though
        if (!ignoreCache && _cache[url]) {
            callback(_cache[url]);
            return;
        }

        _xhr.open('GET', url);
        _xhr.onreadystatechange = function () {
            if (_xhr.readyState == 4) {
                if (_xhr.status == 200) {
                    var json_response = JSON.parse(_xhr.responseText);
                    if (!ignoreCache) {
                        _cache[url] = json_response;
                    }
                    callback(json_response);
                }
            }
        };
        _xhr.send(null);
    }
    

    // access an API endpoint
    function _api (endpoint, callback) {
        endpoint = endpoint.replace(/^\/+/, '').replace(/\/+$/, '');
        _get(_default_host + endpoint, callback);
    }


    // embed a YouTube video on a page
    function _embed (ele, youtube_id) {
        var iframe = _reusable_iframe_ele.cloneNode(false);

        if (typeof ele === 'string') {
            ele = document.getElementById(ele);
        } else if (typeof ele === 'object') {
            
            if (!ele.id) {
                throw Error('Must specify an "id" property when passing an object.');
            }

            for (var key in ele) {
                if (ele.hasOwnProperty(key)) {
                    iframe.setAttribute(key, ele[key]);   
                }
            }
            
            youtube_id = ele.youtube_id || youtube_id;
            ele = document.getElementById(ele.id);
        }

        iframe.src = _default_youtube_embed_url.replace('{{id}}', youtube_id);

        ele.appendChild(iframe);       
    }


    return {
        api: _api,
        embed: _embed
    };
}(document));