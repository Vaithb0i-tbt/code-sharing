document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    const files = document.getElementById('files').files;
    const password = document.getElementById('password').value;

    // Add files to the form data
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    formData.append('password', password);
    
    // Use fetch to send data to the server (which could run the Python script)
    const response = await fetch('/create-protected-zip', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('result').textContent = result.message || "Error occurred.";
});
