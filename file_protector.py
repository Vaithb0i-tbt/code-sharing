import pyzipper
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/create-protected-zip', methods=['POST'])
def create_encrypted_zip():
    files = request.files.getlist('files')
    password = request.form['password']
    
    if not files or not password:
        return jsonify({"message": "No files or password provided."}), 400
    
    # Create a directory to store the uploaded files temporarily
    upload_dir = './uploads/'
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save the uploaded files
    file_paths = []
    for file in files:
        file_path = os.path.join(upload_dir, file.filename)
        file.save(file_path)
        file_paths.append(file_path)

    # Name for the ZIP file
    zip_filename = './output/protected.zip'
    os.makedirs('./output', exist_ok=True)

    # Create the password-protected ZIP file
    with pyzipper.AESZipFile(zip_filename, 'w', compression=pyzipper.ZIP_DEFLATED) as zipf:
        zipf.setpassword(password.encode())
        for file_path in file_paths:
            zipf.write(file_path, os.path.basename(file_path))
    
    # Clean up uploaded files
    for file_path in file_paths:
        os.remove(file_path)

    return jsonify({"message": "Encrypted ZIP file created successfully.", "zip_url": zip_filename})

if __name__ == '__main__':
    app.run(debug=True)
