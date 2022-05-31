import { Formik } from 'formik';
import React from 'react';
import InstapaperClient from '../../lib/instapaper/config';

function Instapaper() {
  return (
    <div>
      <h1 className="text-xl font-sans mb-8 font-medium">
        Login to Instapaper
      </h1>
      {/* <form
        onSubmit={() => {
          InstapaperClient.setCredentials(USERNAME, PASSWORD);
        }}
        method="post"
        className="flex flex-col space-y-4 font-sans text-sm"
      >
        <div className="flex space-x-4">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className="flex-grow" />
        </div>
        <div className="flex space-x-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="flex-grow"
          />
        </div>
        <input
          type="submit"
          value="submit"
          className="bg-moss/10 border border-moss/40 rounded-md text-moss h-8 uppercase"
        />
      </form> */}

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          InstapaperClient.setCredentials(values.email, values.password);
          const test = InstapaperClient.authorize();
          console.log(test);

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
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Instapaper;
