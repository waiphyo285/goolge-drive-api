const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URL = '';

const REFRESH_TOKEN = '';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const filePath =  path.join(__dirname, 'public/images/', 'test.png');

async function uploadFile() {
    try {
        
        const response = await drive.files.create({
            requestBody: {
                name: "test.png",
                mimeType: 'image/png'
            },
            media: {
                mimeType: "image/png",
                body: fs.createReadStream(filePath)
            }
        });

        console.log(response.data);

    }
    catch(error) {
        console.log(error);
    }
}

// uploadFile();

async function deleteFunction() {
    try {
        const response = await drive.files.delete({
            fileId: "14nuHLBHluEz-OLESFU72HPjMGlYUjCMP"
        });

        console.log(response.data, response.status);
    } catch (error) {
        console.log(error);
    }
}

// deleteFunction();

async function generatePublicURL() {
    try {

        const fileId = '1aTSuBMiMGJ4tslqYJj4mWe2PMGd5-T8U';

        await drive.files.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });

        console.log(result.data);

    } catch (error) {
        console.log(error);
    }
}

generatePublicURL();