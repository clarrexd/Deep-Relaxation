from flask import Flask

app = Flask(Deep_Relaxation)


@app.route('/')
def home():
    return 'Hello, this is the home page!'


@app.route('/about')
def about():
    return 'This is the about page.'

app.run(debug=True)
