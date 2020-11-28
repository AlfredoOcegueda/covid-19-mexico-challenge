import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, redirect, jsonify

# Setup of db
engine = create_engine("sqlite:///covid_db.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)


Covid = Base.classes.covid_mexico

#Setup of Flask

app = Flask(__name__)



@app.route("/")
def index():
    #Mars = mongo.db.Mars.find_one()
    session = Session(engine)
    results = session.query(Covid.State).all()
    session.close()

    states = list(np.ravel(results))

    print(states)
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

# @app.rpute("/states/stateid")
# def stateid():
#     return 

@app.route("/comparison")
def comparison():
    return render_template("comparison.html")


if __name__ == "__main__":
    app.run(debug=True)