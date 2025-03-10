import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-header]"></ng-content>
    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="rowTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem()">
      Add
    </button>
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  addNewItemEvent = output();
  // We avoid using a magic string by usng a Directive (antipattern)
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });

  addNewItem() {
    this.addNewItemEvent.emit();
  }
}
