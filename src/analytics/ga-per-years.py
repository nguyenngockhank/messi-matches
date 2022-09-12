from matplotlib import pyplot as plt
import numpy as np

import matcheshandling
import imagehandling


plt.rcParams["figure.figsize"] = (10,5)

matches = matcheshandling.read()

goalsPerYear = {}
assistsPerYear = {}

for match in matches:
    year = match['year']
    goalsPerYear[year] = goalsPerYear.get(year, 0) + match['goals']
    assistsPerYear[year] = assistsPerYear.get(year, 0) + match['assists']

allYears = goalsPerYear.keys()
allGoals = goalsPerYear.values()
allAssists = assistsPerYear.values()

x = np.arange(len(allYears))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, allGoals, width, label='Goals')
rects2 = ax.bar(x + width/2, allAssists, width, label='Assists')

# Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('')
ax.set_title('Goal contribution by year')
ax.set_xticks(x, allYears)
ax.legend()

ax.bar_label(rects1, padding=3)
ax.bar_label(rects2, padding=3)

fig.align_xlabels()
fig.tight_layout(pad=0.4, w_pad=0.5, h_pad=1.0)

# plt.show()

imagehandling.store('ga-per-year.png', plt)