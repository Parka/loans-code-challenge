const yup = require('yup');

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
        await handlePUT(req, res)
      break;
    case "GET":
        await handleGET(req, res)
      break;
    case "DELETE":
        await handleDELETE(req, res)
      break;
    default:
      res.status(404).end();
      break;
  }
}
const handleGET = async (req, res) => {
  const response = await fetch(`${process.env.STORE_API}/${req.query.key}.json`);
  const body = await response.json();
  if(!response.ok)
    return res.status(response.status).json({error: "Ha habido un error inesperado"});

  // ***** ALL OK *****
  return res.json(body);
}

const handleDELETE = async (req, res) => {
  const response = await fetch(`${process.env.STORE_API}/${req.query.key}.json`, {method:'DELETE'});
  const body = await response.json();
  if(!response.ok)
    return res.status(response.status).json({error: "Ha habido un error inesperado"});

  // ***** ALL OK *****
  return res.json(body);
}

const handlePUT = async (req, res) => {
  // ***** VALIDATE DATA *****
  const schema = yup.object().shape({
    name: yup.string().required('Debe agregar un nombre'),
    last: yup.string().required('Debe agregar un apellido'),
    gender: yup.string().oneOf(['male', 'female']).required('Debe agregar un género'),
    email: yup.string().email('Debe agregar un email válido').required('Debe agregar un email'),
    id: yup.number().required('Debe agregar un DNI'),
  })

  let data;
  try{
    data = await schema.validate(req.body,{stripUnknown: true});
  }catch(e){
    return res.status(400).json({error: e.message})
  }

  // ***** GET SCORE *****
  const {id} = data;
  var myHeaders = new Headers();
  myHeaders.append("credential", process.env.KEY);

  const scoreResponse = await fetch(`${process.env.SCORE_API}${id}`, {
    method: 'GET',
    headers: myHeaders,
  });

  const scoreBody = await scoreResponse.json();
  if(!scoreResponse.ok || scoreBody.has_error)
    return res.status(scoreBody.has_error ? 400 : scoreResponse.status).json({error: "No se ha podido obtener procesar su pedido"})

  // ***** STORE *****
  const storeResponse = await fetch(`${process.env.STORE_API}/${req.query.key}.json`, {
    method: 'PUT',
    body: JSON.stringify({...data, status: scoreBody.status})
  });
  const storeBody = await storeResponse.json();
  if(!storeResponse.ok)
    return res.status(scoreResponse.status).json({error: "Ha habido un error inesperado"});

  // ***** ALL OK *****
  return res.status(200).end();
}