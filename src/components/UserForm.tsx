import { useEffect, useState } from "react"
import searchSvg from '../assets/search.svg'
import saveSvg from '../assets/save.svg'
import { useSelector } from "react-redux"
import { useGetListCountriesQuery } from "../states/features/apiSlice"
import { userQuerySelector } from "../states/features/userSlice"

interface UserFormData {
    id?: string
    registered: boolean
    document: string
    type: string
}
interface UserRootState {
    user: UserFormData
    userApi: any // TODO: Agregar tipado
    storage: any // TODO: Agregar tipado
}

const initialFormData: UserFormData = {
    id: '',
    registered: false,
    document: '',
    type: '',
}

export const UserForm = () => {
    const { data: countries } = useGetListCountriesQuery({}); // , isError, error
    const [country, setCountry] = useState("PER");
    const [userFormData, setUserFormData] = useState(initialFormData)
    // const userData = useSelector(userQuerySelector);
    const userQueried = useSelector((rs: UserRootState) => userQuerySelector(rs));
    const { type, document, registered } = userFormData;

    useEffect(() => {
        if (userQueried) {
            console.log('userQueried', userQueried);
            setUserFormData({
                ...userFormData,
                type: userQueried.type,
                document: userQueried.document,
                registered: userQueried.registered
            })
        }
    }, [userQueried])

    const handleChangeDocType = (e: any) => {
        // console.log(e.target.value);
        setUserFormData({
            ...userFormData,
            type: e.target.value
        })
    }

    const handleChangeCountry = (e: any) => {
        // console.log(e.target.value);
        setCountry(e.target.value);
    }
    
    return (
        <div className="user__form">
            <h3>CLIENTE</h3>
            <form action="">
                <div className="user__input-box with-combo">
                    <label htmlFor="tipo_documento">Tipo Documento</label>
                    <select name="" id="tipo_documento" onChange={handleChangeDocType} disabled={registered} value={type}>
                        <option value="CEX">CEX</option>
                        <option value="DNI">DNI</option>
                        <option value="PAS">PASAPORTE</option>
                    </select>
                    <i></i>
                </div>
                <div className="user__input-box with-button">
                    <label htmlFor="num_documento">Núm. Documento</label>
                    <input type="text" name="" id="num_documento" disabled={registered} value={document} />
                    <button type="button" className="button-search">
                        <img src={searchSvg} alt="Icono de búsqueda" />
                    </button>
                </div>
                <div className="user__input-box with-combo">
                    <label htmlFor="nacionalidad">
                        <span>(*)</span>
                        Nacionalidad
                    </label>
                    <select name="nacionalidad" id="nacionalidad" value={country} onChange={handleChangeCountry}>
                        {
                            countries ?
                                countries.map((c) => (
                                    <option key={c.value} value={c.value}>
                                        {c.name}
                                    </option>
                                )) :
                                <option value="">Cargando...</option>
                        }
                    </select>
                    <i></i>
                </div>
                <div className="user__input-box">
                    <label htmlFor="fecha_nac">
                        <span>(*)</span>
                        Fecha Nacimiento
                    </label>
                    <input type="date" name="" id="fecha_nac" value="" disabled={false} />
                </div>
                <div className="user__input-box">
                    <label htmlFor="nombre">
                        <span>(*)</span>
                        Nombres
                    </label>
                    <input type="text" name="" id="nombre" value={''} disabled={false} />
                </div>
                <div className="user__input-box">
                    <label htmlFor="primer_apellido">
                        <span>(*)</span>
                        Apellido Paterno
                    </label>
                    <input type="text" name="" id="primer_apellido" value={''} disabled={false} />
                </div>
                <div className="user__input-box">
                    <label htmlFor="segundo_apellido">
                        <span>(*)</span>
                        Apellido Materno
                    </label>
                    <input type="text" name="" id="segundo_apellido" value={''} disabled={false} />
                </div>
                <div className="user__input-box">
                    <label htmlFor="celular">
                        Celular
                        <span> (Opcional)</span>
                    </label>
                    <input type="text" name="" id="celular" value="" disabled={false} />
                </div>
                <div className="user__input-box">
                    <label htmlFor="correo">
                        Correo electrónico
                        <span> (Opcional)</span>
                    </label>
                    <input type="text" name="" id="correo" value="" disabled={false} />
                </div>

                {/* {
                    !registered && (
                        <> */}
                            <div className="user__input-box with-checkbox">
                                <input type="text" name="" id="voucher_sms" placeholder="VOUCHER SMS (Opcional)" />
                                <input type="checkbox" name="" id="voucher-checkbox" />
                            </div>
                            <button type="button" className="form__button-save">
                                <img src={saveSvg} alt="Icono guardar" />
                                Guardar
                            </button>
                        {/* </>
                    )
                } */}
            </form>
        </div>
    )
}
