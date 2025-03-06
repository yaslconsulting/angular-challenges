import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardDisplay } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-header]"></ng-content>
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.name"
            [id]="item.id"
            (deleteEvent)="delete($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly list = input<CardDisplay[] | null>(null);
  readonly customClass = input('');
  addNewItemEvent = output();
  deleteEvent = output<number>();

  addNewItem() {
    this.addNewItemEvent.emit();
  }

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
