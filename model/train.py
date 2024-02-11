import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

# Step 1: Load and prepare the training data
df = pd.read_csv('model/machine_data.csv')

# Split the DataFrame into features (X) and target variable (y)
X = df.drop('price', axis=1)
y = df['price']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Step 2: Train the machine learning model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 3: Save the trained model to disk
with open('model/saved_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

# Step 4: Prediction
# Load the trained model from disk
with open('model/saved_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define new house data for prediction
new_house_data = {
    'bathrooms': 1,
    'house_condition': 3,
    'house_grade': 6,
    'schools_nearby': 0,
    'built_year': 1935,
    'house_area': 860,
    'inflation_rate': -0.9,
    'bedrooms': 3,
    'floors': 1,
    'living_area': 1140,
}

# Convert new house data to DataFrame and reshape for prediction
new_house_df = pd.DataFrame([new_house_data])
predicted_price = model.predict(new_house_df)

print("Predicted price for the new house:", predicted_price)
