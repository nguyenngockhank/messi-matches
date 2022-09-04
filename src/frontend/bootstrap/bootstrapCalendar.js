import _ from '../lodash';
import { matchesToEvents } from '../transformers/matchesToEvents'
import { goalContributrionBgColor } from '../transformers/goalContributrionBgColor'
import { goalContributionTitle } from '../transformers/goalContributionTitle'
import { matchDetailModalTitle } from '../transformers/match-modal/matchDetailModalTitle'
import { matchDetailModalBody } from '../transformers/match-modal/matchDetailModalBody'

export function bootstrapCalendar() {
    const $matchModal = new bootstrap.Modal(document.getElementById('matchDetail'))

    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');
  
      var events = matchesToEvents();
  
  
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
          const {event: { extendedProps, _def }, el} = arg;
          $(el).css('background', goalContributrionBgColor(extendedProps))
          $(el).prop('title', goalContributionTitle(extendedProps))
  
          if (extendedProps.tweets || extendedProps.videos) {
            const $el = $(el).find('.fc-daygrid-event-dot');
            $el.addClass('event-prefix').removeClass('fc-daygrid-event-dot');
  
            if (extendedProps.videos) {
              $el.append(`<i class="bi bi-youtube"></i>`)
            }
            if (extendedProps.tweets) {
              $el.append(`<i class="bi bi-twitter"></i>`)
            }
          }
  
          $(el).click(() => {
            const currentShownMatchId  = $('#matchDetail').data('match-id');
            if (currentShownMatchId !== extendedProps.id) {
              $('#matchDetail').data('match-id', extendedProps.id);
              // change title
              $('#matchDetail .modal-title').html( matchDetailModalTitle(extendedProps))
              // change body 
              $('#matchDetail .modal-body').html(matchDetailModalBody(extendedProps));
            }
  
            $matchModal.show();
          })
        },
      });
      calendar.render();
    });
}