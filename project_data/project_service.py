import flask
import pandas as pd
#from flask import jsonify
from flask_cors import CORS,cross_origin
from flask import request
from project_data import *

app = flask.Flask('myservice')
app.config["DEBUG"] = True
CORS(app)

@app.route('/home', methods=['GET'])

def home():
	data = pd.read_csv('titanic_data.csv')
	return data.to_json()

app.run()
