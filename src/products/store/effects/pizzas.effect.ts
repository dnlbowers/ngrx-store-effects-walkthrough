import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import {map, switchMap, catchError } from "rxjs/operators";
import {of} from "rxjs/observable/of";

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services'


@Injectable()
export class PizzasEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
        ) {}

    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
        .pipe(
            switchMap(() => {
                return this.pizzaService
                    .getPizzas()
                    .pipe(
                        map(
                            pizzas => {
                                return new pizzaActions.LoadPizzasSuccess(pizzas);
                            }
                        ),
                        catchError(error => {
                                return of(new pizzaActions.LoadPizzasFail(error));
                            }
                        )
                    )
            })
        )
}