from flask import Flask, render_template, redirect
#from flask_pymongo import PyMongo
#import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
#app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
#mongo = PyMongo(app)


@app.route("/")
def index():
    #Mars = mongo.db.Mars.find_one()
    return render_template("index.html")#, mars=Mars)


@app.route("/mexico")
def mexico():
    return render_template("mexico.html")
    # Mars = mongo.db.Mars
    # Mars_Dict = scrape_mars.scrape()
    # Mars.update({}, Mars_Dict, upsert=True)
    # return redirect("/", code=302)

@app.route("/states")
def states():
    return render_template("states.html")

@app.route("/comparison")
def comparison():
    return render_template("comparison.html")


if __name__ == "__main__":
    app.run(debug=True)