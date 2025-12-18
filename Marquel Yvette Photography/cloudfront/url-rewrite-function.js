function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // 301 Redirects for old/removed pages
    var redirects = {
        '/rates': '/rates-2',
        '/pricing': '/rates-2',
        '/contact': '/request-proposal',
        '/about': '/',
        '/services': '/headshots',
        '/gallery': '/headshots',
        '/portfolio': '/headshots',
        '/book': '/request-proposal',
        '/booking': '/request-proposal'
    };

    // Check if URI matches a redirect (with or without trailing slash)
    var cleanUri = uri.endsWith('/') && uri !== '/' ? uri.slice(0, -1) : uri;
    if (redirects[cleanUri]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: redirects[cleanUri] }
            }
        };
    }

    // If URL ends with .html (except index.html), redirect to clean URL
    if (uri.endsWith('.html') && uri !== '/index.html') {
        var newUri = uri.slice(0, -5); // Remove .html extension
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: newUri }
            }
        };
    }

    // If URI ends with /, append index.html
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    }
    // If URI has no extension, add .html to serve the file
    else if (!uri.includes('.')) {
        request.uri = uri + '.html';
    }

    return request;
}
