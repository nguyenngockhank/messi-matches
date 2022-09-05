from matplotlib import pyplot as plt
# Example: https://matplotlib.org/stable/gallery/lines_bars_and_markers/barh.html
import json
import os

f = open(os.path.abspath('src/analytics/matches.json'))
matches = json.load(f)

totalLeft, totalRight, totalHead, totalOther = 0, 0, 0 , 0
for match in matches:
    totalLeft = totalLeft + match['left']
    totalRight = totalRight + match['right']
    totalHead = totalHead + match['head']
    totalOther = totalOther + match['other']

# set up data
labels = 'Left foot (%d)' % totalLeft, 'Weak foot (%d)' % totalRight, 'Head (%d)' % totalHead, 'Others (%d)' % totalOther
bodyPartGoals = (totalLeft, totalRight, totalHead, totalOther)


fig1, ax1 = plt.subplots()

ax1.set_title("Goals\nby parts of Body")
ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

wedges, texts, autotexts =ax1.pie(bodyPartGoals, labels=labels, autopct='%1.1f%%', startangle=-30)

# store the images
filename = 'body-part-goals.png'
storedpath = os.path.join(os.path.abspath('frontend/img'), filename) 
plt.savefig(storedpath)