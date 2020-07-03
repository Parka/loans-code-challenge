import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import LoanForm from 'components/loan-form';

export default function Home() {
  const [loanResult, setLoanResult] = useState();

  const initialValues = {
    name: '',
    last: '',
    gender: '',
    email: '',
    id: ''
  };
  const onSubmit = async values => {
    const response = await fetch('/api/scores', { method: 'POST', body: JSON.stringify(values) })
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
        <title>Pedir un préstamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pedir préstamo</h1>
      {loanResult
        ?
        <h1>{loanResult==='accepted'?'¡Su pedido fué aceptado!':'Su pedido ha sido rechazado'}</h1>
        :
        <LoanForm initialValues={initialValues} onSubmit={onSubmit}></LoanForm>
      }
    </div>
  )
}
