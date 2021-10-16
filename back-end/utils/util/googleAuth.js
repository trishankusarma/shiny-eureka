let { google } = require("googleapis");

let OAuth2Data = require("../../credentials.json");

let CLIENT_ID = OAuth2Data.web.client_id;
let CLIENT_SECRET = OAuth2Data.web.client_secret;
let REDIRECT_URL_TEACHER = OAuth2Data.web.redirect_uris[0];
let REDIRECT_URL_STUDENT = OAuth2Data.web.redirect_uris[1];

let oAuth2ClientTeacher = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL_TEACHER
);

let oAuth2ClientStudent = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL_STUDENT
);

// If modifying these scopes, delete token.json.
let SCOPES_TEACHER =
    "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

let SCOPES_STUDENT =
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

module.exports = {
     oAuth2ClientTeacher,
     oAuth2ClientStudent,
     SCOPES_TEACHER,
     SCOPES_STUDENT,
     google
} 