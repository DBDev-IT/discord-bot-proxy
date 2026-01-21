# Usage
## GET method:
```javascript
const endpoint = "/users/@me";
const token = "TOKEN";
fetch(
    `https://discord-bot-proxy.vercel.app/req?endpoint=${encodeURIComponent(endpoint)}&token=${token}`
).then(async response => console.log(await response.json()));
```