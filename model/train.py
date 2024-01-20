import pickle
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
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

# Scatter plot of observed vs predicted values
plt.scatter(y_test, predictions)
plt.xlabel('True Values')
plt.ylabel('Predictions')
plt.title('True Values vs Predictions')
plt.grid(True)
plt.show()

# Save the trained model as a pickle string.
saved_model = pickle.dumps(model)

# Save the model to disk
with open('saved_model.pkl', 'wb') as file:
    pickle.dump(model, file)