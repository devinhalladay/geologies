import { Formik } from 'formik';
import { useLocalstorageState } from 'rooks';

import BooksList from '../../components/BooksList';
import Button from '../../components/Button';
import { Callout } from '../../components/Callout';
import TextInput from '../../components/TextInput';
import language from '../../constants/language';
import { READWISE_TOKEN_LOCALSTORAGE_KEY } from '../../constants/values';

function Readwise() {
  const [token, setToken] = useLocalstorageState<string>(
    READWISE_TOKEN_LOCALSTORAGE_KEY,
    null
  );

  return token == null ? (
    <div suppressHydrationWarning>
      <Callout title={language.library.callout.title}>
        {language.library.callout.description}
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
              label={language.library.tokenForm.input.label}
              placeholder={language.library.tokenForm.input.placeholder}
            />

            {errors.token}

            <Button type="submit" disabled={isSubmitting}>
              {language.library.tokenForm.submit.label}
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
