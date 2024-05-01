
function encryptMessage() {
    var encrypted = CryptoJS.AES.encrypt(
       document.getElementById("message").value,
       document.getElementById("p").value
    );
    document.getElementById("encrypted-message").innerHTML = encrypted;
 }
 function decryptMessage() {
    var decrypted = CryptoJS.AES.decrypt(
       document.getElementById("decm").value,
       document.getElementById("decp").value
    ).toString(CryptoJS.enc.Utf8);
    document.getElementById("decrypted-message").innerHTML = decrypted;
 }