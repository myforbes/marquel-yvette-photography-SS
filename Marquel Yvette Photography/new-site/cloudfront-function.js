function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check if the URI is missing a file extension
    if (!uri.includes('.')) {
        // Add .html extension
        request.uri = uri + '.html';
    }
    // If URI ends with /, append index.html
    else if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    }

    return request;
}
