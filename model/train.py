import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor

# Step 2: Load the CSV file into a pandas DataFrame
df = pd.read_csv('machine_data.csv')

# Step 3: Split the DataFrame into features (X) and target (y)
X = df.drop('price', axis=1)
y = df['price']

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Random Forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train the model using the training data
model.fit(X_train, y_train)

# Evaluate the model using the testing data
predictions = model.predict(X_test)
print(predictions)
mse = mean_squared_error(y_test, predictions)

print(f'Mean Squared Error: {mse}')