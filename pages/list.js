import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import styles from './list.module.scss';
import {FaTrash, FaPen, FaCheck, FaTimes} from 'react-icons/fa'

const Row = ({ name, value, onDelete }) => (
  <>
    <div>{name}</div>
    <div>
      {value.name} {value.last}
    </div>
    <div>
      {value.id}
    </div>
    <div>
      {value.status === 'accepted'?<FaCheck className={styles.accepted} />: <FaTimes className={styles.rejected} /> }
    </div>
    <Link href={`/${name}`}>
      <FaPen className={styles.action}/>
    </Link>
    <div onClick={onDelete}><FaTrash className={styles.action}/></div>
  </>
);

const Header = () => (
  <>
    <div className={styles.header}>ID</div>
    <div className={styles.header}>
      Nombre
    </div>
    <div className={styles.header}>
      DNI
    </div>
    <div className={styles.header} style={{justifySelf: 'center'}}>
      Aceptado
    </div>
    <div className={styles.header} style={{gridColumnEnd: 'span 2'}}/>
  </>
);

const List = () => {
  const [loanQueries, setLoanQueries] = useState({})
  const getList = () => {
    fetch('api/scores').then(async response => {
      setLoanQueries(await response.json());
    });
  }
  const onDelete = key => () => {
    fetch(`api/scores/${key}`, { method: 'DELETE' }).then(getList)
  }
  useEffect(getList, [])

  return (
    <div className="container">
      <Head>
        <title>Ver pedidos de préstamo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Header/>
        {Object.keys(loanQueries).map(key => (
          <Row key={key} name={key} value={loanQueries[key]} onDelete={onDelete(key)} />
        ))
        }
      </div>
    </div >
  )
};

export default List;