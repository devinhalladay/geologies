import React, { FC } from 'react';
import { Book } from '../lib/readwise/types';

interface Props {
  book: Book;
}

export const BookLink: FC<Props> = ({ book }) => {
  return (
    <a
      key={book.id}
      className={`flex gap-4 border-t border-moss/20 py-4 hover:bg-moss/5 transition-all duration-150 ease-in hover:px-2`}
      href={`/library/${book.id}`}
    >
      <div className="flex flex-col space-2 grow">
        <p>{book.title}</p>
        <small className="text-moss/70">
          <span className="capitalize">{book.source}</span> •{' '}
          <a href={book.source_url} target="_blank" rel="noopener noreferrer">
            {book.author}
          </a>
        </small>
      </div>
      <div className="w-14 h-14 shrink-0">
        <img
          src={book.cover_image_url}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
    </a>
  );
};
