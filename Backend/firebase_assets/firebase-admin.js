// firebase-admin.js

import admin from "firebase-admin";
const serviceAccount = {
  type: "service_account",
  project_id: "yupp-9f862",
  private_key_id: "7daf943e27f86c56d1a7977ff70d55dcc3bb2005",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYqwMm/yfI34lm\nHU9xhLu7Ake4DQQg9SLYDvTDbodDhUFL9e+DWdR+4nUcD7E2UeIjPSKmyyCsuVaj\nC967iwhs1ZDCWvBVnHyEWuCcZc4SydhPvz938RsGgONJ1dNfLnDteAmlaYtEC/ey\npZSItuRoIj6fJTCCd3Dbsu1vIo58SmFk3KQGN/QwjhiTygdveHU/cvmJl+8+PWEj\nio7HDQPoFp0N17B9Dvt95bnb0x0udkhWKzKPW5v6HfpPdUDhf70iYi76tV5j6DhO\nTPh6zMl3+XYWBMjaYiCGTA0geLjK0WDOIDpJZgp47CFb/Bcbqet9m0a+YEWI0KE6\nKIa1A7ZBAgMBAAECggEALsHxrTfoj3UnN8cyVao5dQU1wgD6ir2JdnLeNBzeAKgH\nX6RrPud8VYA2LeoAdIqPoAtRWZRM5Zm+FyHDjdz/L5YZR+1iPlY3LLJIqJ3lh4ua\nXJJOdgW6KTvAYRTEMBqhK5ngGnFA3g5sRqK/4z9gpSQX2dYiDVNXlXIvliIXUald\nF04BNXZ+cXZfI1mxdsOywutj4FDzJSdKqr28L8I7VgvQdkCORW4skKmIH6BOpNR1\nHdzzBfYi/HQ1oWZP/iE00SWN0vAU1YVQTFzROxz74eX0Daz2IrRx7EOGcbu0ZX6m\nJ8GdylY9k5BMRKYm9XePatmuRHo5rtE0ek/kAOiuIQKBgQDK9Ri4BoNbH48u8zJ7\nN7GS1tpbQp7gAOS+uY2LJ8TqJw0jjFrxr5OeoSsPsb+LnCRNClHbuK+Mx8mebdvo\nrt5Z/F4ifqzjAI8T6vaC7tVhEXjwfR2pLNOBWjj0BuoPugaMDlA2EX0N11NV764G\ngx40DVUhnQ4JgXWrj2zOu3IMqwKBgQDAkUtqK0b3Cf8ByX8ZuzsupQXpHzh6zmfW\n71cFSWPqgmZX6SO3EujRgBuV8naP+b3oSeJOiWsnjKOCeudhu3DiWm4tBtMFD41P\nBC2TIxl/4dYNJwV7Gn6/Z8vYPfSdayeIPr5/hoag4X8Vo8ekSwUSuiG0gnM26e7d\ncLkWWEwwwwKBgC/WO0BM0LMuqhn/2nsucl1Q5OCzwCy+KSxHIfSVqBUkpTUmxNzI\nbHvsMvEdDS/D2s6JyyeFzWLaSExeSoH6jZAaKrnor6lFnXOtYvMThhm9+4p7gv04\nApYvhNMHui2AxEBIs2E7GAWmJg9QUe1ZBEpyhglJMmDNMcYBJT1I8yXHAoGADtsm\ntkogb26V/c1NwO5w4mhYzGNcOB00ZaCRVhcTXkQxIRcbakRLMd5wQmEyRGk//Wu1\nydlQKvzuoGJa928+hjfzyAV+wiUxAaeQ3IkYroT9voYEJjslDB812rjs5jgeFKTC\njZQTTtYWt9Sq0kH3Yjp53zMxMEtb4jmQDelB94ECgYB77ugIJDpJ27iTMKQimoOM\nTE2nhMYiax5JmUdOaArJ4raEYfMdwm5nnp8IZbahtB/xwVgx6G6bTqJB1xhjcMl2\nwzOK1d8Q0vGQCR8da/Uy5BsctIZygY2/UWlofUVq41H8wZRBwdwkwSdprENCTs+o\nCsWmnbVmueyNFTFEAFK0bg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-532ve@yupp-9f862.iam.gserviceaccount.com",
  client_id: "104954972234735582616",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-532ve%40yupp-9f862.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey:
    "AAAAkomH3YY:APA91bHS91fqPILO9Qqe5MjT5KxgOr9yclYrVSQaqswq-1eRIY-nWmLKZG85BEv0k7pMmI6M7NPCU_2A_QF7qHGXxb5IfSzE4LIJ8y-IINJU3EHA-FspHxDrNk1b7DaL9FDO2gU5mD6N",
  projectId: "yupp-9f862",
});

export default admin;
