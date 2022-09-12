import json
import os

def read():
    f = open(os.path.abspath('src/analytics/matches.json'))
    matches = json.load(f)
    return matches