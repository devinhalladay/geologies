import {
  Field,
  Form,
  Formik,
  FormikProvider,
  useFormik,
  useFormikContext,
} from 'formik';
import Fuse from 'fuse.js';
import React, { useState } from 'react';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { useBooks } from '../lib/readwise';

function BooksList({ token, setToken }) {
  const { books, loading } = useBooks();

  const fuse = new Fuse(books, {
    keys: ['title'],
    threshold: 0.3,
  });

  const [filteredBooks, setFilteredBooks] = useState(null);

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: async (values) => {
      const search = fuse.search(values.query);
      setFilteredBooks(values.query.length ? search : null);
    },
  });

  return loading ? (
    <div>Loading your Readwise library…</div>
  ) : (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col md:flex-row items-center pb-4 gap-x-4 font-sans">
        <div className="flex flex-col gap-2 grow items-center md:items-start">
          <h1 className="text-xl font-medium">Readwise Library</h1>
          <button
            type="submit"
            onClick={() => setToken(null)}
            className="bg-red-600/10 text-red-800 border rounded-md text-xs font-sans w-fit px-1"
          >
            Disconnect service
          </button>
        </div>
        <FormikProvider value={formik}>
          <Form className="flex gap-2 grow max-w-[300px] mt-4 md:mt-0">
            <Field
              id="query"
              name="query"
              placeholder="Search articles…"
              className="h-10 border-moss border rounded-md text-sm px-2 outline-none focus:outline-moss grow"
            />

            <button
              type="submit"
              className="h-10 w-10 flex items-center justify-center bg-moss text-white border rounded-md text-sm px-2"
              aria-label="Search"
            >
              <GiMagnifyingGlass size="1.2em" />
            </button>
          </Form>
        </FormikProvider>
      </div>

      <div className="border-t border-moss/20 flex flex-col gap-4">
        {(filteredBooks == null ? books : filteredBooks).map((book, i) => {
          const b = filteredBooks !== null ? book.item : book;
          return (
            <a
              key={b.id}
              className={`flex gap-4 border-b border-moss/20 ${
                i === 0 ? 'py-4' : 'pb-4'
              }`}
              href={`/library/${b.id}`}
            >
              <div className="flex flex-col space-2 grow">
                <p>{b.title}</p>
                <small className="text-moss/70">
                  {b.source} • by {b.author}
                </small>
              </div>
              <div className="w-14 h-14 shrink-0">
                <img
                  src={b.cover_image_url}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default BooksList;