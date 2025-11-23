#!/usr/bin/env node

// Photo Gallery Server
// Handles automatic photo uploads and config updates

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const PORT = 3000;
const PHOTOS_CONFIG_PATH = path.join(__dirname, 'config', 'photos.json');

// Serve static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Parse multipart form data
function parseMultipartFormData(req, boundary) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', chunk => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const parts = [];
      const boundaryBuffer = Buffer.from('--' + boundary);

      let start = 0;
      let end = buffer.indexOf(boundaryBuffer, start);

      while (end !== -1) {
        if (start !== 0) {
          const part = buffer.slice(start, end);
          parts.push(part);
        }

        start = end + boundaryBuffer.length;
        end = buffer.indexOf(boundaryBuffer, start);
      }

      const formData = {};

      parts.forEach(part => {
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd === -1) return;

        const headers = part.slice(0, headerEnd).toString();
        const content = part.slice(headerEnd + 4, part.length - 2);

        const nameMatch = headers.match(/name="([^"]+)"/);
        if (!nameMatch) return;

        const name = nameMatch[1];

        const filenameMatch = headers.match(/filename="([^"]+)"/);
        if (filenameMatch) {
          formData[name] = {
            filename: filenameMatch[1],
            data: content
          };
        } else {
          formData[name] = content.toString();
        }
      });

      resolve(formData);
    });

    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle photo upload
  if (req.method === 'POST' && req.url === '/api/upload-photo') {
    try {
      const contentType = req.headers['content-type'];
      const boundary = contentType.split('boundary=')[1];

      const formData = await parseMultipartFormData(req, boundary);

      const section = formData.section;
      const key = formData.key;
      const folder = formData.folder;
      const photo = formData.photo;

      if (!photo || !photo.filename) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No photo uploaded' }));
        return;
      }

      // Save photo to correct directory
      const targetDir = path.join(__dirname, folder);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetPath = path.join(targetDir, photo.filename);
      fs.writeFileSync(targetPath, photo.data);

      console.log(`✓ Saved photo: ${folder}${photo.filename}`);

      // Update photos.json
      const photosConfig = JSON.parse(fs.readFileSync(PHOTOS_CONFIG_PATH, 'utf8'));
      const newPath = folder + photo.filename;

      if (photosConfig[section] && photosConfig[section][key]) {
        const oldPath = photosConfig[section][key].src;
        photosConfig[section][key].src = newPath;

        fs.writeFileSync(PHOTOS_CONFIG_PATH, JSON.stringify(photosConfig, null, 2));
        console.log(`✓ Updated photos.json: ${section}.${key}`);
        console.log(`  Old: ${oldPath}`);
        console.log(`  New: ${newPath}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          path: newPath,
          oldPath: oldPath
        }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid section or key' }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  // Handle S3 upload and CloudFront invalidation
  if (req.method === 'POST' && req.url === '/api/deploy') {
    try {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const { updatedFiles } = JSON.parse(body);

        console.log('\n🚀 Deploying to S3 and CloudFront...\n');

        // Upload photos.json
        console.log('Uploading photos.json...');
        await execPromise('aws s3 cp config/photos.json s3://marquelyvette-website/config/photos.json');
        console.log('✓ Uploaded photos.json');

        // Upload each photo
        for (const file of updatedFiles) {
          console.log(`Uploading ${file}...`);
          const localPath = file;
          const s3Path = `s3://marquelyvette-website/${file}`;
          await execPromise(`aws s3 cp "${localPath}" "${s3Path}"`);
          console.log(`✓ Uploaded ${file}`);
        }

        // Create invalidation (URL-encode paths to handle spaces and special characters)
        const paths = ['/config/photos.json', ...updatedFiles.map(f => `/${f}`)];
        const encodedPaths = paths.map(p => encodeURI(p));
        const pathsStr = encodedPaths.map(p => `"${p}"`).join(' ');

        console.log('\nInvalidating CloudFront cache...');
        const { stdout } = await execPromise(
          `aws cloudfront create-invalidation --distribution-id E50QXXWNUFNYT --paths ${pathsStr}`
        );

        const invalidation = JSON.parse(stdout);
        console.log(`✓ Invalidation created: ${invalidation.Invalidation.Id}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          invalidationId: invalidation.Invalidation.Id
        }));
      });
    } catch (error) {
      console.error('Deploy error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  // Serve static files
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './photo-gallery.html';
  }

  const absolutePath = path.join(__dirname, filePath);

  // Security: prevent directory traversal
  if (!absolutePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  serveStaticFile(res, absolutePath);
});

server.listen(PORT, () => {
  console.log(`\n🎨 Photo Gallery Server running at http://localhost:${PORT}`);
  console.log(`\n📸 Open: http://localhost:${PORT}/photo-gallery.html`);
  console.log(`\nFeatures:`);
  console.log(`  ✓ Auto-save photos to local directories`);
  console.log(`  ✓ Auto-update photos.json`);
  console.log(`  ✓ Deploy to S3 and CloudFront`);
  console.log(`\nPress Ctrl+C to stop\n`);
});
