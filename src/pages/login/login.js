/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

export default function Login() {
  const [customError, setCustomError] = useState(undefined);
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid e-mail provided').required('E-mail is a required field'),
    password: Yup.string().min(8, 'At least 8 characters').required('Password is a required field'),
  });

  async function login({ email, password }, actions) {
    const payload = {
      email,
      password,
    };

    try {
      const { status, data: jwtToken } = await Axios.post('http://localhost:8000/auth/login', payload);
      if (status === 200) {
        sessionStorage.setItem('auth_token', jwtToken);
        history.push('/');
      }
    } catch (error) {
      setCustomError(error?.response?.data);
      actions.resetForm();
    }
  }

  return (
    <div className="page__body">
      <main className="form__container">
        <h1 className="form__title">
          Login
        </h1>
        {customError ? (
          <small className="form__error">
            {customError}
          </small>
        ) : null}

        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            dirty,
            isValid,
            isSubmitting,
          }) => {
            const { email, password } = values;

            return (
              <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form__label">
                  <span className="label__title">
                    E-mail
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form__input"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <small className="form__error">
                      {errors.email}
                    </small>
                  ) : null}
                </label>
                <label htmlFor="password" className="form__label">
                  <span className="label__title">
                    Password
                  </span>
                  <input
                    type="text"
                    id="password"
                    className="form__input"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <small className="form__error">
                      {errors.password}
                    </small>
                  ) : null}
                </label>
                <button
                  type="submit"
                  className="form__submit-button"
                  disabled={!(dirty && isValid) || isSubmitting}
                >
                  Login
                </button>
              </form>
            );
          }}
        </Formik>
        <p className="form__link">
          Don&apos;t have an account yet?
          {' '}
          <Link to="/create">
            Create one!
          </Link>
        </p>
      </main>
    </div>
  );
}
