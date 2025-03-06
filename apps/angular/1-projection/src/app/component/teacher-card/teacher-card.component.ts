import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardDisplay } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="cardDisplays()"
      (addNewItemEvent)="addOne()"
      (deleteEvent)="delete($event)"
      customClass="bg-light-red">
      <div card-header>
        <img ngSrc="assets/img/teacher.png" width="200" height="200" />
      </div>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardDisplays = computed(() => this.adaptTeachers(this.teachers()));

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addOne(): void {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  adaptTeachers(teachers: Teacher[]): CardDisplay[] {
    return teachers.map((teacher) => {
      return {
        id: teacher.id,
        name: teacher.firstName,
      };
    });
  }
}
