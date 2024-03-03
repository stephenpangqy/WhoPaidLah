from flask import Flask, request
from flask_restx import Api, Resource, reqparse, Namespace
from flask_cors import CORS
import os
import sys
import logging

import pytesseract
from PIL import Image
from io import BytesIO
import tempfile
# import cv2
# import np

from eden_ocr import send_ocr_scan

app = Flask(__name__)
api = Api(app = app)

CORS(app)

# Loggers for API Activity
logger = logging.getLogger('werkzeug')
handler = logging.FileHandler('terminal.log')
logger.addHandler(handler)

# Comment below line if you dont want any logs to appear in the terminal
logger.addHandler(logging.StreamHandler(sys.stdout))

# # Set PyTesseract PATH to the executable
# pytesseract.pytesseract.tesseract_cmd = r"C:\\Users\\ASUS\\Documents\\Tesseract-OCR\\tesseract.exe"
# # Set PyTesseract Config (https://muthu.co/all-tesseract-ocr-options/)
# pytesseract_config = r'--psm 32 --oem 1'

# Creating Parsers for API Routes that take in parameters (For Swagger)
processImage_parser = reqparse.RequestParser()
processImage_parser.add_argument("image")

## API Endpoint /whopaidlah/processImage  --> Takes in the uploaded receipt image and processes the text to retrieve the necessary items purchased and their prices
class ProcessImage(Resource):
    @api.response(201, "Succcessful ProcessImage")
    @api.response(500, "Internal Error with ProcessImage")
    @api.doc(description="Takes in a JSON of an image file, and processes it to return TBA", parser=processImage_parser)
    def post(self):
        try:
            print(request.files)
            image_file = request.files.get('image')
            print(image_file)
            
            image_path = os.path.join(os.getcwd(), image_file.filename)
            image_file.save(image_path)
            receipt_items = send_ocr_scan(image_path)
            print(receipt_items)

            
            # # Use pytesseract to extract text from the image
            # extracted_text = pytesseract.image_to_string(img, config=pytesseract_config)

            # # Using CV2 and PyTesseract OCR
            # Load the image using OpenCV
            # image = np.array(img)

            # # Convert the image to grayscale
            # gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # # Apply thresholding to preprocess the image
            # _, threshold_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

            # # Perform OCR on the preprocessed image
            # extracted_text = pytesseract.image_to_string(threshold_image)
            
            return {
                'message': 'Success'
            }, 201
        except Exception as e:
            logger.error(f"{os.path.basename(__file__)} : ProcessImage Failed. {e.args[0]}")
            return {
                "message": f"ProcessImage failed. {e.args[0]}"
            }, 500
        finally:
            # Remove the file after processing
            if os.path.exists(image_path):
                os.remove(image_path)
                # print(f'File {image_path} removed successfully')


# Namespaces for API Route Categorization ############################
# Creating Namespaces to categorize APIs
whopaidlah_namespace = Namespace(name='whopaidlah', description='WhoPaidLah API endpoints')

# Add API Routes to Namespace
whopaidlah_namespace.add_resource(ProcessImage, "/processImage")

# Adding Namespace to Swagger
api.add_namespace(whopaidlah_namespace)


if __name__ == "__main__":
    # Start the Flask App
    app.run(host="127.0.0.1", port=5000, debug=True)