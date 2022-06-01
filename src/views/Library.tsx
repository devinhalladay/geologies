import { Formik } from 'formik';
import { useLocalstorageState } from 'rooks';

import BooksList from '../components/BooksList';
import Button from '../components/Button';
import { Callout } from '../components/Callout';
import TextInput from '../components/TextInput';

function Readwise() {
  const [token, setToken] = useLocalstorageState<string>(
    'g:readwise_token',
    null
  );

  return !token ? (
    <div>
      <Callout title="Readwise Library">
        Enter your Readwise access token, which you can access{' '}
        <a
          href="https://readwise.io/access_token"
          target="_blank"
          rel="noopener noreferrer"
          className="text-moss underline"
        >
          here
        </a>{' '}
        when logged into Readwise. This token will be saved locally in your
        browser.
      </Callout>
      <p className="mb-4"></p>
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
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 font-sans text-sm"
          >
            <TextInput
              onBlur={handleBlur}
              type="text"
              name="token"
              required
              minLength={1}
              onChange={handleChange}
              value={values.token}
              label="Readwise Access Token"
              placeholder="Your token…"
            />

            {errors.token}

            <Button type="submit" disabled={isSubmitting}>
              Save Readwise token locally
            </Button>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <BooksList token={token} setToken={setToken} />
  );
}

export default Readwise;
