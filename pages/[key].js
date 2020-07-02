import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Error from 'next/error'
import LoanForm from 'components/loan-form';
import { useRouter } from 'next/router'

const Edit = () => {
  const router = useRouter();
  const { key } = router.query;

  const [loanQuery, setLoanQuery] = useState();
  const [loanResult, setLoanResult] = useState();
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
    const response = await fetch(`api/scores/${key}`, { method: 'PUT', body: JSON.stringify(values) });
    if(response.ok) {
      const result = await response.json();
      setLoanResult(result.status);
    }else{
      console.log("Something went wrong...")
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Pedir un prestamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loanQuery && !loanResult &&
      <>
        <h1>Editar pedido</h1>
        <LoanForm initialValues={loanQuery} onSubmit={onSubmit} buttonCaption="Modificar pedido"/>
      </>
      }
      {loanResult &&
        <h1>{loanResult==='accepted'?'¡Su pedido fué aceptado!':'Su pedido ha sido rechazado'}</h1>
      }
    </div>
  )
}

export default Edit;