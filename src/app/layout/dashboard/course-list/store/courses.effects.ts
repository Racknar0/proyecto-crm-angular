import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { CoursesService } from '../../../../core/services/courses.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Injectable()
export class CoursesEffects {
  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() => {
          this.loadingService.setIsLoading(true);
          return this.coursesService.getCourseFromService().pipe(
            map((courses) => {
              this.loadingService.setIsLoading(false);
              return CoursesActions.loadCoursesSuccess({ data: courses });
            }),
            catchError((error) =>
              of(CoursesActions.loadCoursesFailure({ error }))
            )
          );
        }
      )
    );
  });

  deleteCoursess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap((action) => {
        this.loadingService.setIsLoading(true);
        return this.coursesService.deleteCourse(action.data).pipe(
          map(() => {
            this.loadingService.setIsLoading(false);
            return CoursesActions.deleteCourseSuccess();
          }),
          catchError((error) =>
            of(CoursesActions.deleteCourseFailure({ error }))
          )
        );
      }),
      concatMap(() => of(CoursesActions.loadCourses()))
    );
  });

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private loadingService: LoaderService
  ) {}
}
