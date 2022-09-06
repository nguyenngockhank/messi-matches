import _ from '../lodash';
import { matchesToEvents } from '../transformers/matchesToEvents'
import { competitionLogoMap } from '../data/competitionLogoMap'
import { goalContributrionBgColor } from '../transformers/goalContributrionBgColor'
import { goalContributionTitle } from '../transformers/goalContributionTitle'
import { matchDetailModalTitle } from '../transformers/match-modal/matchDetailModalTitle'
import { matchDetailModalBody } from '../transformers/match-modal/matchDetailModalBody'
import { createGaFilter } from './gaFilter'

const displayNoneClass = 'd-none';

export function bootstrapCalendar() {
    const $matchModal = new bootstrap.Modal(document.getElementById('matchDetail'))

    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
  
      var events = matchesToEvents();
      
      const gaFilter = createGaFilter((filter) => {
        calendar.render();
      })
      
      var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,matchesOnMonth',
          // right: 'dayGridMonth,matchesOnYear,matchesOnMonth'
        },
        views: {
          dayGridMonth: {
            buttonText: "Calendar",
          },
          matchesOnYear: {
            type: 'listYear',
            buttonText: 'Year M'
          },
          matchesOnMonth: {
            type: 'listMonth',
            buttonText: 'Month Matches'
          },
        },
        slotDuration: '01:30:00',
        expandRows: true,
        // 
        navLinks: true, 
        editable: false,
        selectable: true,
        weekends: true,
        displayEventTime: false,
        eventDisplay: 'list-item',
        events:  events,
        initialDate: _.first(events).start,
        eventOrder: "-start",
        visibleRange: function(){
          const startMatch = _.last(events);
          const endMatch = _.first(events);
          return { 
            start: new Date(startMatch.start), 
            end: new Date(endMatch.start) 
          }
        },
        eventDidMount: function(arg) {
          const {event: { extendedProps: match, _def }, el} = arg;
          $(el).css('background', goalContributrionBgColor(match))
          $(el).prop('title', goalContributionTitle(match))
          
          addSocialIcon(el, match);
          addCompetitionIcon(el, match);

          // competitionLogoMap
          $(el).click(() => {
            const currentShownMatchId  = $('#matchDetail').data('match-id');
            if (currentShownMatchId !== match.id) {
              $('#matchDetail').data('match-id', match.id);
              // change title
              $('#matchDetail .modal-title').html( matchDetailModalTitle(match))
              // change body 
              $('#matchDetail .modal-body').html(matchDetailModalBody(match));
            }
  
            $matchModal.show();
          })
        },
        eventClassNames: function(arg) {
          if(_.every(gaFilter, (val) => !val)) {
            return;
          }

          const gaDisplay = Object.keys(_.pickBy(gaFilter, v => v)).map(v => Number(v))
          if (!gaDisplay || gaDisplay.length === 0) {
            return;
          }
          
          const { event: { extendedProps: { goals, assists} }} = arg;
          const match = gaDisplay.includes(goals) || gaDisplay.includes(assists)
          if (match) {
            return;
          }
          return displayNoneClass
        }
      });

      calendar.render();
    });
}

function addSocialIcon(el, match) {
  if (match.tweets || match.videos) {
    const $el = $(el).find('.fc-event-title');
    // $el.addClass('event-prefix').removeClass('fc-daygrid-event-dot');
    // const $el = $(el)
    if (match.videos) {
      $el.append(`<i class="bi bi-youtube"></i>`)
    }
    if (match.tweets) {
      $el.append(`<i class="bi bi-twitter"></i>`)
    }
  }
}

function addCompetitionIcon(el, match) {
  const { competition } = match;
  const logo = competitionLogoMap[competition]
  logo && $(el).find('.fc-event-title').prepend(`<span class="comp-container"><img class="comp-icon" title="${competition}" src="./img/${logo}"/></span>`)
}