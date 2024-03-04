import json
import requests

def send_ocr_scan(image_path):
    print(image_path)
    headers = {"Authorization": "<REMOVED>"}

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
    
    return result['amazon']['extracted_data'][0]['item_lines']
