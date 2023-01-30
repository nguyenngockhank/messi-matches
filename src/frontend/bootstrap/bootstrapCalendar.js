import _ from '../lodash';
import { goalContributrionBgColor } from '../transformers/goalContributrionBgColor'
import { goalContributionTitle } from '../transformers/goalContributionTitle'
import { matchDetailModalTitle } from '../transformers/match-modal/matchDetailModalTitle'
import { matchDetailModalBody } from '../transformers/match-modal/matchDetailModalBody'
import { shouldDisplayMatch } from '../transformers/shouldDisplayMatch'
import { createMatchFilter, getMatchFilter } from './matchFilter'
import { youtubeIcon, twitterIcon } from '../templates/icons';
import { competitionLogo } from '../templates/competitionLogo';
import { isFinal } from '../transformers/isFinal';

const displayNoneClass = 'd-none';


export function bootstrapCalendar(events) {
    const $matchModal = new bootstrap.Modal(document.getElementById('matchDetail'))

    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
  
      
      const gaFilter = createMatchFilter((filter) => {
        calendar && calendar.render();
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
        // initialDate: _.first(events).start,
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
            if (currentShownMatchId !== match.slug) {
              $('#matchDetail').data('match-id', match.slug);
              // change title
              $('#matchDetail .modal-title').html( matchDetailModalTitle(match))
              // change body 
              $('#matchDetail .modal-body').html(matchDetailModalBody(match));
            }
  
            $matchModal.show();
          })
        },
        eventClassNames: function(arg) {
          const { event: { extendedProps: match }} = arg;
          if (!shouldDisplayMatch(match, gaFilter)) {
            return displayNoneClass
          }
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