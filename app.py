import numpy as np
import json
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

    return render_template("index.html", states = states)


@app.route("/mexico")
def mexico():
    # Visualize confirmed cases in a heatmap of the country
    session = Session(engine)
    results = session.query(func.sum(Covid.Confirmed)).all()
    # results2 = session.query(Covid.Negatives).count()
    # results3 = session.query(Covid)
    session.close()

    confirmed_cases = list(np.ravel(results))

    print(confirmed_cases)

    return render_template("mexico.html", confirmed = confirmed_cases)


@app.route("/states")
def states():

    session = Session(engine)
    results = session.query(Covid.State, Covid.Confirmed, Covid.Negatives, Covid.Suspicious, Covid.Deaths).filter(Covid.State == 1)
    session.close()
    print(results)

    all_states = []
    for state, confirmed, negatives, suspicious, deaths in results:
        state_dict = {}
        state_dict["state"] = state
        state_dict["confirmed"] = confirmed
        state_dict["negatives"] = negatives
        state_dict["suspicious"] = suspicious
        state_dict["deaths"] = deaths
        all_states.append(state_dict)


    return render_template("states.html", states=all_states)

@app.route("/states/<state_id>")
def states_info(state_id):
    session = Session(engine)
    results = session.query(Covid.State, Covid.Confirmed, Covid.Negatives, Covid.Suspicious, Covid.Deaths).filter(Covid.State == int(state_id))
    session.close()
    print(results)

    filtered_states = []
    for state, confirmed, negatives, suspicious, deaths in results:
        state_dict = {}
        state_dict["state"] = state
        state_dict["confirmed"] = confirmed
        state_dict["negatives"] = negatives
        state_dict["suspicious"] = suspicious
        state_dict["deaths"] = deaths
        filtered_states.append(state_dict)

    print(filtered_states)
    #jsonify(all_states)    

    return jsonify (filtered_states)

@app.route("/comparison")
def comparison():
    return render_template("comparison.html")


if __name__ == "__main__":
    app.run(debug=True)