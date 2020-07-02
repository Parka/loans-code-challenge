import Head from 'next/head'
import LoanForm from 'components/loan-form';

export default function Home() {
  const initialValues = {
    name: '',
    last: '',
    gender: '',
    email: '',
    id: ''
  };
  const onSubmit = async values => {
    return fetch('/api/scores', { method: 'POST', body: JSON.stringify(values) })
  }

  return (
    <div className="container">
      <Head>
        <title>Pedir un prestamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoanForm initialValues={initialValues} onSubmit={onSubmit}></LoanForm>
    </div>
  )
}
