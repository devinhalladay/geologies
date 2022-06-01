import { Field, Form, FormikProvider, useFormik } from 'formik';
import Fuse from 'fuse.js';
import { useEffect, useRef, useState } from 'react';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { useBooks } from '../lib/readwise';
import { BookLink } from './BookLink';

function BooksList({ token, setToken }) {
  const { books, loading, error } = useBooks(token);

  let fuse = useRef(new Fuse([]));

  useEffect(() => {
    fuse.current = new Fuse(books, {
      keys: ['title'],
      threshold: 0.3,
    });
  }, [books]);

  const [filteredBooks, setFilteredBooks] = useState(null);

  const formik = useFormik({
    initialValues: {
      query: '',
    },
    onSubmit: async (values) => {
      const search = fuse.current.search(values.query);
      setFilteredBooks(values.query.length ? search : null);
    },
  });

  if (error)
    return (
      <div>
        Error authenticating with Readwise. Please clear your localstorage and
        try again.
      </div>
    );

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

      <div className="flex flex-col">
        {(filteredBooks == null ? books : filteredBooks).map((book, i) => {
          const b = filteredBooks !== null ? book.item : book;
          return <BookLink book={b} key={b.id} />;
        })}
      </div>
    </div>
  );
}

export default BooksList;
