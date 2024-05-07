function compressAudio() {
    var fileInput = document.getElementById('fileInput');
    var status = document.getElementById("status");
    var file = fileInput.files[0];

    if (!file) {
        status.textContent = "Error: No file selected!";
        return;
    }

    status.textContent = "Compressing...";

    var reader = new FileReader();
    reader.onload = function(e) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(e.target.result, function(buffer) {
            // Proses kompresi audio

            // Setelah kompresi selesai
            status.textContent = "Compression Complete!";
            
            // Tampilkan link unduhan
            var compressedAudio = new File([buffer], 'compressed_' + file.name, { type: file.type });
            var url = URL.createObjectURL(compressedAudio);
            var downloadLink = document.getElementById('downloadLink');
            downloadLink.href = url;
            downloadLink.download = 'compressed_' + file.name;
            downloadLink.style.display = 'block';
        }, function(error) {
            // Tangani kesalahan saat decoding audio
            console.error('Error decoding audio: ', error);
            status.textContent = "Error: Unable to decode audio!";
        });
    };

    reader.readAsArrayBuffer(file);
}

// Set file input value to null when the page is reloaded
window.onload = function() {
    document.getElementById("fileInput").value = null;
};
