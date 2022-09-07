import _ from '../lodash';
import { matchesToEvents } from '../transformers/matchesToEvents'
import { goalContributrionBgColor } from '../transformers/goalContributrionBgColor'
import { goalContributionTitle } from '../transformers/goalContributionTitle'
import { matchDetailModalTitle } from '../transformers/match-modal/matchDetailModalTitle'
import { matchDetailModalBody } from '../transformers/match-modal/matchDetailModalBody'
import { createGaFilter } from './gaFilter'
import { youtubeIcon, twitterIcon } from '../templates/icons';
import { competitionLogo } from '../templates/competitionLogo';
import { isFinal } from '../transformers/isFinal';

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
          right: 'dayGridMonth,matchesOnMonth,matchesOnYear',
          // right: 'dayGridMonth,matchesOnYear,matchesOnMonth'
        },
        views: {
          dayGridMonth: {
            buttonText: "Calendar",
          },
          matchesOnYear: {
            type: 'listYear',
            buttonText: 'Year'
          },
          matchesOnMonth: {
            type: 'listMonth',
            buttonText: 'Month'
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

          if (isFinal(match)) {
            $(el).addClass('border-start border-info border-3 match-final');
          }

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
    if (match.videos) {
      $(el).find('.fc-event-title').append(youtubeIcon)
      $(el).find('.fc-list-event-title').append(youtubeIcon)
    }
    if (match.tweets) {
      $(el).find('.fc-event-title').append(twitterIcon)
      $(el).find('.fc-list-event-title').append(twitterIcon)
    }
  }
}

function addCompetitionIcon(el, match) {
  const { competition } = match;
  $(el).find('.fc-event-title').prepend(competitionLogo(competition))
  $(el).find('.fc-list-event-title').prepend(competitionLogo(competition))
}