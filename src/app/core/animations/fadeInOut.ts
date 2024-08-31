import {trigger, state, style, transition, animate} from '@angular/animations';

export const fadeSlideInOut = trigger('fadeSlideInOut', [
  state('in', style({opacity: 1})),
  transition(':enter', [style({opacity: 0}), animate('0.5s ease-in-out')]),
  transition(':leave', [animate('0.5s ease-in-out', style({opacity: 0}))])
]);
