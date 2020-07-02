import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const LoanForm = props => (
  <Formik initialValues={props.initialValues} validationSchema={yup.object().shape({
    name: yup.string().required('Debe agregar un nombre'),
    last: yup.string().required('Debe agregar un apellido'),
    gender: yup.string().oneOf(['male', 'female']).required('Debe agregar un género'),
    email: yup.string().email('Debe agregar un email válido').required('Debe agregar un email'),
    id: yup.number().required('Debe agregar un DNI')
  })} onSubmit={props.onSubmit}>
    <Form>
      <div>
        <label htmlFor="name">Nombre</label>
        <div>
          <Field name="name" />
          <ErrorMessage name="name" />
        </div>
      </div>
      <div>
        <label htmlFor="last">Apellido</label>
        <div>
          <Field name="last" />
          <ErrorMessage name="last" />
        </div>
      </div>
      <div>
        <label htmlFor="gender">Género</label>
        <div>
          <Field name="gender" as="select">
            <option value=''></option>
            <option value='female'>Mujer</option>
            <option value='male'>Hombre</option>
          </Field>
        </div>
        <ErrorMessage name="gender" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <div>
          <Field name="email" />
          <ErrorMessage name="email" />
        </div>
      </div>
      <div>
        <label htmlFor="id">DNI</label>
        <div>
          <Field name="id" />
          <ErrorMessage name="id" />
        </div>
      </div>
      <button type="submit">Pedir prestamo</button>
    </Form>
  </Formik>
);

export default LoanForm
