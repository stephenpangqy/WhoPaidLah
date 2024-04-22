import json
import requests
import os

from dotenv import load_dotenv

load_dotenv()

authorization_token = "Bearer " + (os.environ['AUTHORIZATION_TOKEN'])

def send_ocr_scan(image_path):
    
    headers = {"Authorization": authorization_token}

    url = "https://api.edenai.run/v2/ocr/financial_parser"
    data = {
        "providers": "amazon",
        "document_type" : "receipt",
        "fallback_providers": "",
        "language": "en"
    }
    files = {'file': open(image_path, 'rb')}

    response = requests.post(url, data=data, files=files, headers=headers)
    
    result = json.loads(response.text)
    
    return result['amazon']['extracted_data']
