import {useState, useEffect} from 'react'
import {db} from './firebase'

function App() {

  const [books, setBooks] = useState([])
  const [book, setBook] = useState([])
  const [title, setTitle] = useState([])
  const [classy, setClassy] = useState([])
  const [pubHouse, setPubHouse] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')

  const getBooks = async () => {
    const data = await db.collection('books').get()
    const resi = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setBooks(resi)
    console.log(resi)
  }

  useEffect(()=> {
    getBooks()
  },[])


  const agregarBook = async(e) =>{
    e.preventDefault()

    if(!book.trim()){
      console.log("El campo está vacío.")
      return
    }
    if(!title.trim()){
      console.log("El campo está vacío.")
      return
    }
    if(!classy.trim()){
      console.log("El campo está vacío.")
      return
    }
    if(!pubHouse.trim()){
      console.log("El campo está vacío.")
      return
    }

    const firebaseBook = await db.collection('books').add({
      autor: book,
      titulo: title,
      clasificacion: classy,
      editorial: pubHouse
    }) 

    const newBookObject = {
      autor: book,
      titulo: title,
      clasificacion: classy,
      editorial: pubHouse
    }

    setBooks([...books, {id: firebaseBook.id, ...newBookObject}])
    setBook('')
  }

  const aEdicion = (item)=>{
    setModoEdicion(true)
    setBook(item.autor)
    setTitle(item.titulo)
    setClassy(item.clasificacion)
    setPubHouse(item.editorial)
    setId(item.id)

  }

  const editarBook = async (e) =>{
    e.preventDefault();
    await db.collection('books').doc(id).update({
      autor: book,
      titulo: title,
      clasificacion: classy,
      editorial: pubHouse
    })
    const editArray = books.map(item => (
      item.id === id ? {id: item.id, autor: book, titulo: title} : item
    ))
    setBooks(editArray)
    setModoEdicion(false)
    setId('')
    setBook('')
    setTitle('')
    setClassy('')
    setPubHouse('')
  }

  const eBook = async (id) => {
    await db.collection('books').doc(id).delete()
    const fBook = books.filter(item => item.id !== id)
    setBooks(fBook)
  }

  return (
    <div className="container">
      <h1>Listado de libros</h1>
      <h2>
        {modoEdicion ? 'Editar' :'Agregar'}
      </h2>
      <form onSubmit={modoEdicion ? editarBook : agregarBook}>
        <div className="form-group">

          <label>Titulo</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej. El cuervo" required />
          <label>Autor</label>
          <input type="text" className="form-control" value={book} onChange={e => setBook(e.target.value)} placeholder="Ej. Edgar Allan Poe" required />
          <label>Clasificación</label>
          <input type="text" className="form-control" value={classy} onChange={e => setClassy(e.target.value)} placeholder="Ej. Lectura para adolescentes" required />
          <label>Editorial</label>
          <input type="text" className="form-control" value={pubHouse} onChange={e => setPubHouse(e.target.value)} placeholder="Ej. Editorial mundo" required />
        </div>
        <button type="submit" className="btn btn-success">Aceptar</button>
        <hr></hr>

      </form>
      <ul className="list-group">
        {
          books.map(item => (
            <li className="list-group-item" key={item.id}>
              <span>Autor: {item.autor} | Clasificación: {item.clasificacion} |</span>
              <span>Editorial: {item.editorial} | Titulo: {item.titulo} | </span>
              <span>ID: {item.id}</span>
              <hr></hr>
              <button className="btn btn-danger btn-sm float-left" onClick={()=>eBook(item.id)}>Eliminar</button>
              <button className="btn btn-dark btn-sm float-left mr-2" onClick={()=>aEdicion(item)}>Editar</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
