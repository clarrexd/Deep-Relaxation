from flask import Flask

# Create a Flask application
app = Flask(Deep_Relaxation)


@app.route('/')
def home():
    return 'Hello, this is the home page!'


@app.route('/about')
def about():
    return 'This is the about page.'

# Run the application if this file is the main program
if Deep_Relaxation == 'Deep Relaxation':
    app.run(debug=True)
