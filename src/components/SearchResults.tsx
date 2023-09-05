// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import { onUpdate, storageSelector } from "../states/features/storageSlice";
import { useDispatch, useSelector } from "react-redux";

interface UserStorage {
  document_number: string
  document_type: string
}

export const SearchResults = () => { // {userId}: {userId: string}
  const [queryUsers, setQueryUsers] = useState<UserStorage[]>([])
  const [lastIndex, setLastIndex] = useState(0)
  // const [focusBackground, setFocusBackground] = useState(false)
  const dispatch = useDispatch();
  const updatedStorage = useSelector(storageSelector);

  useEffect(() => {
    const usersList = JSON.parse(sessionStorage.getItem('users') || '');
    // usersList && setQueryUsers(usersList)
    if (usersList) {
      setQueryUsers(usersList);
      setLastIndex(usersList.length - 1)
    }
    // console.log(usersList, usersList.length);
    dispatch(onUpdate(false));
  }, [updatedStorage])

  const handleSelectSearch = (id: string) => {
    // TODO: Generar un hash único por cada búsqueda para no mezclar resultado por tipo_doc y numero_doc
    console.log(id);
    // setFocusBackground(true); // TODO: AGREGAR CUANDO SE SELECCIONA UNA BÚSQUEDA,
    // DEBERÍA QUEDAR SOLO UNO MARCADO.
  }


  // const handleRemoveResult = (id: string) => {
  //   console.log('Delete userId:', id);
  //   // TODO: Debe cerrarse la sesión después de 5min a menos que el promotor la cierre antes
  // }
  
  return (
    <div className="search__results">
        <p>Resultados: {queryUsers.length}</p>
        <div className="results__container">
            <div className="result">
              Ricardo Bedoya Urday
              <span 
                className="close-icon"
                title="Cerrar"
                // onClick={() => handleRemoveResult(userId)}
              >
                &times;
              </span>
            </div>
            {
              queryUsers.map((user, i) => (
                <div key={i} className={`result ${i === lastIndex ? 'focus' : ''}`} onClick={() => handleSelectSearch(user.document_number)}>
                  {user.document_type} : {user.document_number}
                  <span 
                    className="close-icon"
                    title="Cerrar"
                    // onClick={() => handleRemoveResult(userId)}
                  >
                    &times;
                  </span>
                </div>
              ))
            }
            {/* {
              user.dont && ( */}
                {/* <>
                  <div className="result">
                      Ricardo Bedoya Urday
                      <span className="close-icon" title="Cerrar">&times;</span>
                  </div>
                  <div className="result">
                      Ana Paula Orejuela Arce
                      <span className="close-icon" title="Cerrar">&times;</span>
                  </div>
                  {
                    <div className="result focus">
                      N° DOC: 12345678  {userId}
                      <span 
                        className="close-icon"
                        title="Cerrar"
                        onClick={() => handleRemoveResult(userId)}
                      >
                        &times;
                      </span>
                    </div>
                  }
                </> */}
              {/* ) 
            } */}
        </div>
        <hr />
    </div>
  );
};
