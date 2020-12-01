import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect, jsonify
# Setup of db
engine = create_engine("sqlite:///Data/covid_db.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
Covid = Base.classes.covid_mexico
States = Base.classes.states_info
#Ages = Base.classes.ages_distribution
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
    results = session.query(Covid.State_ID, States.State_Name, Covid.Confirmed, Covid.Negatives, Covid.Suspicious, Covid.Deaths, States.Latitude, States.Longitude).filter((Covid.State_ID == States.State_ID) & (Covid.State_ID == 1))
    session.close()
    print(results)
<<<<<<< HEAD
=======

>>>>>>> 4fc7a36786f7d5ccc0f5416501c26c1e35ab5cb0
    state2 = []
    for state, statename, confirmed, negatives, suspicious, deaths, latitude, longitude in results:
        state_dict = {}
        state_dict["state"] = state
        state_dict["state_name"] = statename
        state_dict["confirmed"] = confirmed
        state_dict["negatives"] = negatives
        state_dict["suspicious"] = suspicious
        state_dict["deaths"] = deaths
        state_dict["latitude"] = latitude
        state_dict["longitude"] = longitude
        state2.append(state_dict)
<<<<<<< HEAD
    return render_template("states.html", states=state)
=======


    return render_template("states.html", states=state)

>>>>>>> 4fc7a36786f7d5ccc0f5416501c26c1e35ab5cb0
@app.route("/states/<state_id>")
def states_info(state_id):
    session = Session(engine)
    results = session.query(Covid.State_ID, States.State_Name, Covid.Confirmed, Covid.Negatives, Covid.Suspicious, Covid.Deaths, States.Latitude, States.Longitude).filter((Covid.State_ID == States.State_ID) & (Covid.State_ID == state_id))
    session.close()
    print(results)
    filtered_states = []
    for state, statename, confirmed, negatives, suspicious, deaths, latitude, longitude in results:
        state_dict = {}
        state_dict["state"] = state
        state_dict["state_name"] = statename
        state_dict["confirmed"] = confirmed
        state_dict["negatives"] = negatives
        state_dict["suspicious"] = suspicious
        state_dict["deaths"] = deaths
        state_dict["latitude"] = latitude
        state_dict["longitude"] = longitude
        filtered_states.append(state_dict)
    print(filtered_states)
    #jsonify(all_states)    
    return jsonify (filtered_states)
<<<<<<< HEAD
=======

>>>>>>> 4fc7a36786f7d5ccc0f5416501c26c1e35ab5cb0
@app.route("/states/all")
def states_all():
    session = Session(engine)
    results = session.query(Covid.State_ID, States.State_Name, Covid.Confirmed, Covid.Negatives, Covid.Suspicious, Covid.Deaths, States.Latitude, States.Longitude).all()
    session.close()
    print(results)
<<<<<<< HEAD
=======

>>>>>>> 4fc7a36786f7d5ccc0f5416501c26c1e35ab5cb0
    all_states = []
    for state, statename, confirmed, negatives, suspicious, deaths, latitude, longitude in results:
        state_dict = {}
        state_dict["state"] = state
        state_dict["state_name"] = statename
        state_dict["confirmed"] = confirmed
        state_dict["negatives"] = negatives
        state_dict["suspicious"] = suspicious
        state_dict["deaths"] = deaths
        state_dict["latitude"] = latitude
        state_dict["longitude"] = longitude
        all_states.append(state_dict)
<<<<<<< HEAD
    print(all_states)
    #jsonify(all_states)    
    return jsonify (all_states)
=======

    print(all_states)
    #jsonify(all_states)    

    return jsonify (all_states)

>>>>>>> 4fc7a36786f7d5ccc0f5416501c26c1e35ab5cb0
@app.route("/comparison")
def comparison():
    return render_template("comparison.html")
if __name__ == "__main__":
    app.run(debug=True)