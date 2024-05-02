from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn import svm


app = Flask(__name__)
cors = CORS(app, resources={r"/predict/*": {"origins": "http://localhost:5173"}})

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Load the three pre-trained models from the .sav files
with open('diabetes_model.sav', 'rb') as model_file:
    diabetes = pickle.load(model_file)

with open('heart_disease_model.sav', 'rb') as model_file:
    heartdiasease = pickle.load(model_file)

with open('parkinsons_model.sav', 'rb') as model_file:
    parkinsons = pickle.load(model_file)

# Define routes for the three models
@app.route('/predict/diabetes', methods=['POST'])
def predict_model1():
    data = request.get_json(force=True)
    gender = int(data['gender'])
    age = int(data['age'])
    hypertension = int(data['hypertension'])
    heart_disease = int(data['heart_disease'])
    BMI = float(data['BMI'])
    Hb1c_level = float(data['Hb1c_level'])
    Blood_glucose = float(data['Blood_glucose'])

    # Create a DataFrame from the input data
    input_data = pd.DataFrame([[gender, age, hypertension, heart_disease, BMI, Hb1c_level, Blood_glucose]],
                              columns=['gender', 'age', 'hypertension', 'heart_disease', 'BMI', 'Hb1c_level',
                                       'Blood_glucose'])
    prediction = diabetes.predict(input_data)[0]
    print(prediction)
    prediction=int(prediction)
    return jsonify({'prediction': prediction})

@app.route('/predict/heartdisease', methods=['POST'])
def predict_model2():
    data = request.get_json(force=True)
    bmi = float(data["bmi"])
    smoking = float(data["smoking"])
    drinking = float(data["drinking"])
    stroke = float(data["stroke"])
    difficult = float(data["difficult"])
    sex = float(data["sex"])
    diabetic = float(data["diabitic"])
    physical = float(data["physical"])
    sleeptime = float(data["sleeptime"])
    asthma = float(data["asthma"])
    kideny = float(data["kideny"])
    age = float(data["age"])
    prediction = heartdiasease.predict([[bmi, smoking, drinking, stroke, difficult, sex, diabetic, physical, sleeptime, asthma, kideny, age]])[0]
    prediction = int(prediction)
    return jsonify({'prediction': prediction})

@app.route('/predict/parkinsons', methods=['POST'])
def predict_model3():
    data = request.get_json(force=True)
    MDVPFo = float(data['MDVPFo'])
    MDVP_Fhi = float(data['MDVP-Fhi'])
    MDVP_Flo = float(data['MDVP-Flo'])
    MDVP_Jitter = float(data['MDVP-Jitter(%)'])
    MDVP_Jitter_Abs = float(data['MDVP-Jitter(Abs)'])
    MDVP_RAP = float(data['MDVP-RAP'])
    MDVP_PPQ = float(data['MDVP-PPQ'])
    Jitter_DDP = float(data['Jitter-DDP'])
    MDVP_Shimmer = float(data['MDVP-Shimmer'])
    MDVP_Shimmer_dB = float(data['MDVP-Shimmer(dB)'])
    Shimmer_APQ3 = float(data['Shimmer-APQ3'])
    Shimmer_APQ5 = float(data['Shimmer-APQ5'])
    MDVP_APQ = float(data['MDVP-APQ'])
    Shimmer_DDA = float(data['Shimmer-DDA'])
    NHR = float(data['NHR'])
    HNR = float(data['HNR'])
    RPDE = float(data['RPDE'])
    DFA = float(data['DFA'])
    spread1 = float(data['spread1'])
    spread2 = float(data['spread2'])
    D2 = float(data['D2'])
    PPE = float(data['PPE'])
    prediction = parkinsons.predict([[MDVPFo, MDVP_Fhi, MDVP_Flo, MDVP_Jitter, MDVP_Jitter_Abs, MDVP_RAP, MDVP_PPQ,
                                   Jitter_DDP, MDVP_Shimmer, MDVP_Shimmer_dB, Shimmer_APQ3, Shimmer_APQ5, MDVP_APQ,
                                   Shimmer_DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]])[0]
    prediction = int(prediction)
    return {"prediction" : prediction}

if __name__ == '__main__':
    app.run(debug=True)
