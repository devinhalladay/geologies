import React, { useState } from 'react';
import { useBooks } from '../../lib/readwise';

function Readwise() {
  const { books, loading } = useBooks();

  const [boooooks, setBoooks] = useState(books);

  return loading ? (
    <div>'Loading…'</div>
  ) : (
    <div className="flex flex-col gap-y-4">
      {books.map((book) => (
        <a
          key={book.id}
          className="flex gap-4 border-b border-moss/40 pb-4"
          href={`/a/${book.id}`}
        >
          <div className="flex flex-col space-2 grow">
            <p>{book.title}</p>
            <small className="text-moss/70">
              {book.source} • by {book.author}
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
      ))}
    </div>
  );
}

export default Readwise;
