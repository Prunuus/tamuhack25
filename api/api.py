from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/licheng": {"origins": "localhost:3000"}})

# @app.route('/licheng')
# def isHOT():
#     response = {'message': 'Lichengyi is HOT!'}
#     return response



if __name__ == '__main__':
    app.run()