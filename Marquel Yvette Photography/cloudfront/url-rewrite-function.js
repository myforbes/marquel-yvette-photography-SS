function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // If URL ends with .html (except index.html), redirect to clean URL
    if (uri.endsWith('.html') && uri !== '/index.html') {
        var cleanUri = uri.slice(0, -5); // Remove .html extension
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: cleanUri }
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
