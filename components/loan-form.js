import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styles from './loan-form.module.scss';


const Row = ({ children }) => <div className={styles.row}>{children}</div>

const FieldStyled = ({ children }) => <div className={styles.field}>{children}</div>

const ErrorMessageStyled = ({name}) => (
  <p className={styles.error}>
    <ErrorMessage name={name} />
  </p>
);


const LoanForm = ({initialValues, onSubmit, buttonCaption}) => (
  <Formik initialValues={initialValues} validationSchema={yup.object().shape({
    name: yup.string().required('Debe agregar un nombre'),
    last: yup.string().required('Debe agregar un apellido'),
    gender: yup.string().oneOf(['male', 'female']).required('Debe agregar un género'),
    email: yup.string().email('Debe agregar un email válido').required('Debe agregar un email'),
    id: yup.number().required('Debe agregar un DNI')
  })} onSubmit={onSubmit}>
    <Form className={styles.form}>
      <Row>
        <label htmlFor="name">Nombre:</label>
        <FieldStyled>
          <Field name="name" />
          <ErrorMessageStyled name="name" />
        </FieldStyled>
      </Row>
      <Row>
        <label htmlFor="last">Apellido:</label>
        <FieldStyled>
          <Field name="last" />
          <ErrorMessageStyled name="last" />
        </FieldStyled>
      </Row>
      <Row>
        <label htmlFor="gender">Género:</label>
        <FieldStyled>
          <Field name="gender" as="select">
            <option value=''></option>
            <option value='female'>Mujer</option>
            <option value='male'>Hombre</option>
          </Field>
          <ErrorMessageStyled name="gender" />
        </FieldStyled>
      </Row>
      <Row>
        <label htmlFor="email">Email:</label>
        <FieldStyled>
          <Field name="email" />
          <ErrorMessageStyled name="email" />
        </FieldStyled>
      </Row>
      <Row>
        <label htmlFor="id">DNI:</label>
        <FieldStyled>
          <Field name="id" />
          <ErrorMessageStyled name="id" />
        </FieldStyled>
      </Row>
      <div className={styles.button}>
        <button type="submit">{buttonCaption || 'Pedir prestamo'}</button>
      </div>
    </Form>
  </Formik>
);

export default LoanForm
