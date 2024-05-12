
# import os
# from firebase_admin import credentials, firestore, storage
# import firebase_admin


# cred = credentials.Certificate("certifications/certificate_firebase.json")  
# firebase_admin.initialize_app(cred, {
#     'storageBucket': 'datnsentiment.appspot.com'  
#     }
# )


# # Tải lên tệp
# def upload_file(file_path):
#      # Tạo bucket object
#     bucket = storage.bucket()
#     file_name ="aaaaaa"
#     # Tạo blob object với đường dẫn đến nơi lưu trữ trên Firebase Storage
#     blob = bucket.blob(f"file/{file_name}")
    
#     # Upload file binary lên Firebase Storage
#     blob.upload_from_file(file_path, content_type='text/svg')
    
#     print("File đã được upload lên Firebase Storage")


