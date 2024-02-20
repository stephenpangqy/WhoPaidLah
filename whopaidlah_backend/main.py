from flask import Flask, request
from flask_restx import Api, Resource, reqparse, Namespace
from flask_cors import CORS
import os
import sys
import logging

import pytesseract
from PIL import Image
from io import BytesIO


app = Flask(__name__)
api = Api(app = app)

CORS(app)

# Loggers for API Activity
logger = logging.getLogger('werkzeug')
handler = logging.FileHandler('terminal.log')
logger.addHandler(handler)

# Comment below line if you dont want any logs to appear in the terminal
logger.addHandler(logging.StreamHandler(sys.stdout))

# Creating Parsers for API Routes that take in parameters (For Swagger)
processImage_parser = reqparse.RequestParser()
processImage_parser.add_argument("image")

## API Endpoint /whopaidlah/processImage  --> Takes in the uploaded receipt image and processes the text to retrieve the necessary items purchased and their prices
class ProcessImage(Resource):
    @api.response(201, "Succcessful ProcessImage")
    @api.response(500, "Internal Error with ProcessImage")
    @api.doc(description="Takes in a JSOn of an image file, and processes it to return TBA", parser=processImage_parser)
    def post(self):
        try:
            print(request.files)
            image_file = request.files.get('image')
            print(image_file)
            
            # Read the image data into a PIL Image object
            img = Image.open(BytesIO(image_file.read()))
            
            # Use pytesseract to extract text from the image
            extracted_text = pytesseract.image_to_string(img)

            # Print the extracted text
            print(extracted_text)
            
            return {
                'message': 'Success'
            }, 201
        except Exception as e:
            logger.error(f"{os.path.basename(__file__)} : ProcessImage Failed. {e.args[0]}")
            return {
                "message": f"ProcessImage failed. {e.args[0]}"
            }, 500


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