function compressImage() {
    var imageFile = document.getElementById("imageFile").files[0];
    var status = document.getElementById("status");
    var compressedImage = document.getElementById("compressedImage");
    var downloadLink = document.getElementById("downloadLink");
    var compressedImageSize = document.getElementById("compressedImageSize");
    var originalImageSize = document.getElementById("originalImageSize");

    // Preview image element
    var preview = document.getElementById('imagePreview');

    if (imageFile) {
        status.textContent = "Compressing...";

        var reader = new FileReader();

        reader.onload = function(event) {
            var imageDataURL = event.target.result;
            var img = new Image();

            img.onload = function() {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                var max_width = 500; 
                var scale = max_width / img.width;
                canvas.width = max_width;
                canvas.height = img.height * scale;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                var resizedDataURL = canvas.toDataURL("image/" + imageFile.type.split("/")[1]);

                compressedImage.src = resizedDataURL;
                compressedImage.style.display = "none";

                downloadLink.href = resizedDataURL;
                downloadLink.style.display = "block";

                var fileSizeInKB = (resizedDataURL.length / 1024).toFixed(2);
                compressedImageSize.textContent = "Compressed Image Size: " + fileSizeInKB + " KB";
                compressedImageSize.style.display = "block";

                var originalFileSizeInKB = (imageFile.size / 1024).toFixed(2);
                originalImageSize.textContent = "Original Image Size: " + originalFileSizeInKB + " KB";
                originalImageSize.style.display = "block";

                // Set download filename
                var downloadFilename = "compressed_" + imageFile.name;
                downloadLink.download = downloadFilename;

                status.textContent = "Compression Complete!";
            };

            img.src = imageDataURL;
        };

        reader.onerror = function(event) {
            console.error("Failed to read file:", event.target.error);
            status.textContent = "Failed to read file.";
        };

        reader.readAsDataURL(imageFile);
    } else {
        status.textContent = "Please select an image file.";
    }
}
