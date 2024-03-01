import json
import requests

def send_ocr_scan():
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFiZDkyNzgtNDJlMS00Y2FhLTg1MjYtNGQyNThmYjBkMmFkIiwidHlwZSI6ImFwaV90b2tlbiJ9.vjIVqseQ17TdD331BpqGKrtRN7Fp8EwGfq2aL9dX-zY"}

    url = "https://api.edenai.run/v2/ocr/financial_parser"
    data = {
        "providers": "amazon",
        "document_type" : "receipt",
        "fallback_providers": "",
        "language": "en"
    }
    files = {'file': open("./img/receipt12.jpg", 'rb')}

    response = requests.post(url, data=data, files=files, headers=headers)

    result = json.loads(response.text)
    print(result['amazon']['extracted_data'][0]['item_lines'])
    
    return result['amazon']['extracted_data'][0]['item_lines']
