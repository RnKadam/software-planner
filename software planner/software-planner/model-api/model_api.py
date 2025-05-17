from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

frontend_model = joblib.load("frontend_model.pkl")
backend_model = joblib.load("backend_model.pkl")
database_model = joblib.load("database_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")

def suggest_tech_stack(input_data):
    encoded_input = {}
    for column in input_data:
        if column in label_encoders:
            try:
                encoded_input[column] = label_encoders[column].transform([input_data[column]])[0]
            except ValueError:
                encoded_input[column] = 0 
        else:
            encoded_input[column] = input_data[column]
    encoded_input_df = pd.DataFrame([encoded_input])

    frontend_pred = frontend_model.predict(encoded_input_df)[0]
    backend_pred = backend_model.predict(encoded_input_df)[0]
    database_pred = database_model.predict(encoded_input_df)[0]

    frontend = label_encoders["Frontend"].inverse_transform([frontend_pred])[0]
    backend = label_encoders["Backend"].inverse_transform([backend_pred])[0]
    database = label_encoders["Database"].inverse_transform([database_pred])[0]

    return {"Frontend": frontend, "Backend": backend, "Database": database}

@app.route("/suggest", methods=["POST"])
def suggest():
    input_data = request.json
    suggested_stack = suggest_tech_stack(input_data)
    return jsonify(suggested_stack)

if __name__ == "__main__":
    app.run(debug=True)
