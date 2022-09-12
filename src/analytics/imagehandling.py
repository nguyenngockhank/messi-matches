import os

def store(filename, plt): 
    storedpath = os.path.join(os.path.abspath('frontend/img'), filename) 
    plt.savefig(storedpath)