import { inject } from '@angular/core';
import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { setFulfilled, setPending, withRequestStatus } from './with-request-status';
import { BooksService } from './books-service';
import type { Book } from './book';

export const BooksStore = signalStore(
  withEntities<Book>(),
  withRequestStatus(),
  withMethods((store, booksService = inject(BooksService)) => ({
    async loadAll() {
      patchState(store, setPending());

      const books = await booksService.getAll();
      patchState(store, setAllEntities(books), setFulfilled());
    },
  })),
);
