from flask import Flask, request, jsonify
import pickle

import numpy as np

app = Flask(__name__)

# Load the pickled model
with open('saved_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define an endpoint for model inference
@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    data = request.json.values()
    float_params = [float(param) for param in data]
    final_params = np.array(float_params).reshape(1, -1)

    # Perform predictions using the loaded model
    prediction = model.predict(final_params)

    # Return the prediction as JSON
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)