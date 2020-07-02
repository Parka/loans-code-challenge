import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head';


const Row = ({name, value, onDelete}) => (
  <div>
    <div>{name}</div>
    <div>
      {value.name} {value.last}
    </div>
    <div>
      {value.id}
    </div>
    <div>
      {value.status}
    </div>
    <Link href={`/${name}`}>
      <div>Editar</div>
    </Link>
    <div onClick={onDelete}>Borrar</div>
  </div>
);


const List = () => {
  const [loanQueries, setLoanQueries] = useState({})
  const getList = () => {
    fetch('api/scores').then(async response => {
      setLoanQueries(await response.json());
    });
  }
  const onDelete = key => () => {
    fetch(`api/scores/${key}`, {method: 'DELETE'}).then(getList)
  }
  useEffect(getList, [])

  return (
    <div className="container">
      <Head>
        <title>Ver pedidos de prestamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {Object.keys(loanQueries).map(key => (
        <Row key={key} name={key} value={loanQueries[key]} onDelete={onDelete(key)}/>
  ))
}
    </div >
  )
};

export default List;