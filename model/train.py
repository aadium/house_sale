import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
import pickle

# Step 1: Load and prepare the training data
df = pd.read_csv('machine_data.csv')

# Identify categorical columns
categorical_cols = df.select_dtypes(include=['object']).columns

# Apply one-hot encoding to categorical columns
encoder = OneHotEncoder(sparse_output=False, drop='first')
encoded_categorical_data = encoder.fit_transform(df[categorical_cols])

# Create a DataFrame with the encoded categorical data
encoded_categorical_df = pd.DataFrame(encoded_categorical_data, columns=encoder.get_feature_names_out(categorical_cols))

# Drop original categorical columns and concatenate encoded columns
df = df.drop(categorical_cols, axis=1)
df = pd.concat([df, encoded_categorical_df], axis=1)

# Split the DataFrame into features (X) and target variable (y)
X = df.drop('price', axis=1)
y = df['price']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Step 2: Train the machine learning model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 3: Save the trained model and encoder to disk
with open('saved_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('encoder.pkl', 'wb') as encoder_file:
    pickle.dump(encoder, encoder_file)

print("Model training and saving completed successfully!")

# Step 4: Prediction
# Load the trained model and encoder from disk
with open('saved_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('encoder.pkl', 'rb') as encoder_file:
    encoder = pickle.load(encoder_file)

# Define a new data point for prediction
new_data = {
    'region': 'West',
    'state': 'California',
    'city': 'San Diego',
    'bedrooms': 4,
    'bathrooms': 3,
    'floors': 2,
    'condition': 4,
    'schools_nearby': 2,
    'built_year': 2015,
    'living_area': 2820
}

# Convert the new data point to a DataFrame
new_data_df = pd.DataFrame([new_data])

# Apply one-hot encoding to the new data point
encoded_new_data = encoder.transform(new_data_df[categorical_cols])

# Create a DataFrame with the encoded categorical data
encoded_new_data_df = pd.DataFrame(encoded_new_data, columns=encoder.get_feature_names_out(categorical_cols))

# Drop original categorical columns and concatenate encoded columns
new_data_df = new_data_df.drop(categorical_cols, axis=1)
new_data_df = pd.concat([new_data_df, encoded_new_data_df], axis=1)

# Ensure the new data point has the same feature columns as the training data
new_data_df = new_data_df.reindex(columns=X_train.columns, fill_value=0)

# Make a prediction using the trained model
predicted_price = model.predict(new_data_df)

print(f"Predicted price: ${predicted_price[0]:,.2f}")