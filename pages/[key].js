import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Error from 'next/error'
import LoanForm from 'components/loan-form';
import { useRouter } from 'next/router'



const Edit = () => {
  const router = useRouter();
  const { key } = router.query;

  const [loanQuery, setLoanQuery] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if(key)
      fetch(`api/scores/${key}`)
        .then(async response => {
          setLoanQuery(await response.json());
        })
        .catch(() =>{
          setError(true)
        })
  }, [key]);

  if(error){return (<Error statusCode={404}/>);}

  const onSubmit = async values => {
    return fetch(`api/scores/${key}`, { method: 'PUT', body: JSON.stringify(values) })
  }

  return (
    <div className="container">
      <Head>
        <title>Pedir un prestamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loanQuery && <LoanForm initialValues={loanQuery} onSubmit={onSubmit} />}
    </div>
  )
}

export default Edit;