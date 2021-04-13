/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import * as Yup from 'yup';

const INITIAL_FORM_VALUES = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

export default function Login() {
  const [customError, setCustomError] = useState(undefined);
  const history = useHistory();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid e-mail provided').required('E-mail is a required field'),
    username: Yup.string().min(6, 'Too short').required('Username is a required field'),
    password: Yup.string().min(8, 'At least 8 characters').required('Password is a required field'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Password is a required field'),
  });

  async function submitNewUser({ email, username, password }, actions) {
    try {
      const { status } = await Axios.post('http://localhost:8000/user/create', { email, username, password });
      if (status === 201) {
        toast.success('Successfully created! Redirecting to login...', {
          autoClose: 5000,
          onClose: () => history.push('/login'),
        });
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
          Create an account
        </h1>
        {customError ? (
          <small className="form__error">
            {customError}
          </small>
        ) : null}

        <Formik
          initialValues={INITIAL_FORM_VALUES}
          validationSchema={validationSchema}
          onSubmit={submitNewUser}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            dirty,
            isValid,
          }) => {
            const {
              email,
              username,
              password,
              confirmPassword,
            } = values;

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
                <label htmlFor="username" className="form__label">
                  <span className="label__title">
                    Username
                  </span>
                  <input
                    type="text"
                    id="username"
                    className="form__input"
                    value={username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? (
                    <small className="form__error">
                      {errors.username}
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
                <label htmlFor="confirmPassword" className="form__label">
                  <span className="label__title">
                    Confirm password
                  </span>
                  <input
                    type="text"
                    id="confirmPassword"
                    className="form__input"
                    value={confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <small className="form__error">
                      {errors.confirmPassword}
                    </small>
                  ) : null}
                </label>
                <button
                  type="submit"
                  className="form__submit-button"
                  disabled={!(dirty && isValid) || isSubmitting}
                >
                  Create
                </button>
              </form>
            );
          }}
        </Formik>
        <p className="form__link">
          Have an account?
          {' '}
          <Link to="/login">
            Login now!
          </Link>
        </p>
      </main>
    </div>
  );
}
