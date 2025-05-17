import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load dataset
data = pd.read_csv("tech_stack_dataset.csv")

# Encode categorical data
label_encoders = {}
for column in data.columns:
    if data[column].dtype == 'object':
        le = LabelEncoder()
        data[column] = le.fit_transform(data[column])
        label_encoders[column] = le

# Split data
X = data.drop(["Frontend", "Backend", "Database"], axis=1)
Y_frontend = data["Frontend"]
Y_backend = data["Backend"]
Y_database = data["Database"]

X_train, X_test, Y_frontend_train, Y_frontend_test = train_test_split(X, Y_frontend, test_size=0.2, random_state=42)
_, _, Y_backend_train, Y_backend_test = train_test_split(X, Y_backend, test_size=0.2, random_state=42)
_, _, Y_database_train, Y_database_test = train_test_split(X, Y_database, test_size=0.2, random_state=42)

# Train models
frontend_model = RandomForestClassifier(random_state=42)
backend_model = RandomForestClassifier(random_state=42)
database_model = RandomForestClassifier(random_state=42)

frontend_model.fit(X_train, Y_frontend_train)
backend_model.fit(X_train, Y_backend_train)
database_model.fit(X_train, Y_database_train)

# Evaluate models
Y_frontend_pred = frontend_model.predict(X_test)
Y_backend_pred = backend_model.predict(X_test)
Y_database_pred = database_model.predict(X_test)

print("Frontend Model Accuracy:", accuracy_score(Y_frontend_test, Y_frontend_pred))
print("Backend Model Accuracy:", accuracy_score(Y_backend_test, Y_backend_pred))
print("Database Model Accuracy:", accuracy_score(Y_database_test, Y_database_pred))

print("\nFrontend Classification Report:\n", classification_report(Y_frontend_test, Y_frontend_pred))
print("\nBackend Classification Report:\n", classification_report(Y_backend_test, Y_backend_pred))
print("\nDatabase Classification Report:\n", classification_report(Y_database_test, Y_database_pred))

# Suggest tech stack
def suggest_tech_stack(input_data):
    encoded_input = {}
    for column in input_data:
        if column in label_encoders:
            try:
                encoded_input[column] = label_encoders[column].transform([input_data[column]])[0]
            except ValueError:
                # Handle unseen labels
                encoded_input[column] = 0  # Default value
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


# Save the trained models and label encoders
joblib.dump(frontend_model, "frontend_model.pkl")
joblib.dump(backend_model, "backend_model.pkl")
joblib.dump(database_model, "database_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

print("Models and label encoders have been saved.")

# Example usage
new_project = {
    "Project Type": "E-commerce Platform",
    "Requirements": "Payment Processing, User Authentication",
    "Industry": "Retail",
    "Other Tools": "AWS",
    "Scale": "Medium"
}

suggested_stack = suggest_tech_stack(new_project)
print("\nSuggested Tech Stack:", suggested_stack)
