function generateAESKey(size) {
    var keySize = size / 6; // Fix size division
    var key = CryptoJS.lib.WordArray.random(keySize);
    return key.toString();
  }
  function encryptImage() {
    const fileInput = document.getElementById('encryptFileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result.split(',')[1];
      const encryptionKey = generateAESKey(256);


      const encryptedImageData = CryptoJS.AES.encrypt(imageData, encryptionKey).toString();
      const encryptedImageBlob = new Blob([encryptedImageData], { type: 'text/plain' });
      const downloadLink = document.getElementById('encryptDownloadLink');
      downloadLink.href = URL.createObjectURL(encryptedImageBlob);
      downloadLink.style.display = 'block';

      // Download link for encryption key
      const encryptionKeyBlob = new Blob([encryptionKey], { type: 'text/plain' });
      const keyDownloadLink = document.createElement('a');
      keyDownloadLink.href = URL.createObjectURL(encryptionKeyBlob);
      keyDownloadLink.download = 'encryption_key.txt';
      keyDownloadLink.style.display = 'none';
      document.body.appendChild(keyDownloadLink);
      keyDownloadLink.click();
      document.body.removeChild(keyDownloadLink);
    };
    reader.readAsDataURL(file);
  }


  function decryptImage() {
    const imageFileInput = document.getElementById('decryptFileInput');
    const keyFileInput = document.getElementById('decryptKeyInput');
    const imageFile = imageFileInput.files[0];
    const keyFile = keyFileInput.files[0];

    if (!imageFile || !keyFile) {
      alert('Please select both the encrypted image file and the decryption key file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const encryptedImageData = event.target.result;

      const keyReader = new FileReader();
      keyReader.onload = function (keyEvent) {
        const key = keyEvent.target.result;

        try {
          const decryptedData = CryptoJS.AES.decrypt(encryptedImageData, key).toString(CryptoJS.enc.Utf8);
          if (!decryptedData) {
            alert('Decryption failed.');
            return;
          }

          const decryptedImageSrc = 'data:image/jpeg;base64,' + decryptedData;
          const decryptedImage = new Image();
          decryptedImage.src = decryptedImageSrc;
          decryptedImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = decryptedImage.width;
            canvas.height = decryptedImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(decryptedImage, 0, 0);
            const decryptedImageDataURI = canvas.toDataURL('image/jpeg');
            const downloadLink = document.createElement('a');
            downloadLink.href = decryptedImageDataURI;
            downloadLink.download = 'decrypted_image.jpeg';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          };

        } catch (error) {
          alert('Error during decryption: ' + error.message);
        }
      };
      keyReader.readAsText(keyFile);
    };
    reader.readAsText(imageFile);
  }
