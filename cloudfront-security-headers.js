// CloudFront Function to add security headers
// Deploy this via AWS Console: CloudFront > Functions > Create function
// Then associate it with your distribution's viewer response

function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Strict-Transport-Security: Force HTTPS for 1 year, include subdomains
    headers['strict-transport-security'] = {
        value: 'max-age=31536000; includeSubDomains; preload'
    };

    // X-Content-Type-Options: Prevent MIME type sniffing
    headers['x-content-type-options'] = {
        value: 'nosniff'
    };

    // X-Frame-Options: Prevent clickjacking (allow same origin for embeds)
    headers['x-frame-options'] = {
        value: 'SAMEORIGIN'
    };

    // X-XSS-Protection: Enable XSS filtering (legacy browsers)
    headers['x-xss-protection'] = {
        value: '1; mode=block'
    };

    // Referrer-Policy: Control referrer information
    headers['referrer-policy'] = {
        value: 'strict-origin-when-cross-origin'
    };

    // Permissions-Policy: Restrict browser features
    headers['permissions-policy'] = {
        value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
    };

    // Content-Security-Policy: Prevent XSS and other injection attacks
    // This policy is configured for your specific site with LeadConnector, Google Analytics, GTM, Facebook, LinkedIn, etc.
    headers['content-security-policy'] = {
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.leadconnectorhq.com https://storage.googleapis.com https://cdnjs.cloudflare.com https://connect.facebook.net https://snap.licdn.com https://call.chatra.io https://link.msgsndr.com https://*.msgsndr.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
            "img-src 'self' data: https: blob:",
            "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
            "frame-src 'self' https://*.leadconnectorhq.com https://www.google.com https://www.googletagmanager.com https://www.youtube.com https://link.fastpaydirect.com https://*.fastpaydirect.com https://td.doubleclick.net https://chat.chatra.io https://*.chatra.io",
            "connect-src 'self' https://*.leadconnectorhq.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://*.google.com https://*.googleapis.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://*.google-analytics.com https://region1.google-analytics.com https://services.leadconnectorhq.com https://*.fastpaydirect.com https://connect.facebook.net https://*.facebook.com https://snap.licdn.com https://px.ads.linkedin.com https://call.chatra.io https://*.chatra.io https://*.msgsndr.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self' https://*.leadconnectorhq.com https://services.leadconnectorhq.com",
            "frame-ancestors 'self'",
            "upgrade-insecure-requests"
        ].join('; ')
    };

    return response;
}
