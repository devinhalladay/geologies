import { Formik } from 'formik';
import { useLocalstorageState } from 'rooks';
import BooksList from '../components/BooksList';

function Readwise() {
  const [token, setToken] = useLocalstorageState('g:readwise_token', null);

  return token == null ? (
    <div>
      <p className="mb-4">
        Enter your Readwise access token, which you can access{' '}
        <a
          href="https://readwise.io/access_token"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        when logged into Readwise. This token will be saved locally in your
        browser.
      </p>
      <Formik
        initialValues={{ token: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setToken(values.token);

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 font-sans text-sm"
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="token">Readwise Token</label>
              <input
                type="text"
                name="token"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.token}
                className="h-10 border-moss border rounded-md text-sm px-2 outline-none focus:outline-moss"
                placeholder="Your token…"
              />
            </div>

            {errors.token}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 bg-moss text-white border rounded-md text-sm px-2 "
            >
              Save Readwise token locally
            </button>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <BooksList token={token} setToken={setToken} />
  );
}

export default Readwise;
