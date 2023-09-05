import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ResponseGetUser, useGetUserByDocumentMutation } from '../states/features/apiSlice';
import useWindowSize from '../hooks/useWindowSize';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setUserQuery } from '../states/features/userSlice';
import { onUpdate } from '../states/features/storageSlice';

const MySwal = withReactContent(Swal)

interface Props {
    // onSearch: (type: string, document: string, status: boolean) => void
    onSearch: (status: boolean, id?: string) => void
}
interface ResponseValidateUser {
    data?: ResponseGetUser
    error?: FetchBaseQueryError | SerializedError 
}
const nationality = 'PER';

export const SearchUser = ({ onSearch }: Props) => {
    const [refBackground, setRefBackground] = useState<HTMLDivElement | null>(null)
    const [refButton1, setRefButton1] = useState<HTMLButtonElement | null>(null);
    const [refButton2, setRefButton2] = useState<HTMLButtonElement | null>(null);
    const { width } = useWindowSize()
    const [documentType, setDocumentType] = useState<string>('DNI');
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const [disableSearch, setDisableSearch] = useState(true)
    const [getUserByDocument] = useGetUserByDocumentMutation();
    // const [findClientByDocument] = useFindClientByDocumentMutation();
    const dispatch = useDispatch();
    // TODO: Cambiar donde se guarda los documentos buscados
    const [searchList, setSearchList] = useState<{ document_number: string, document_type: string }[]>([])

    const handleAnimatedBackground = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget } = event;
        if (refBackground) {
            refBackground.style.width = `${currentTarget.getBoundingClientRect().width}px`
            refBackground.style.transform = `translateX(${currentTarget.offsetLeft}px)`
            document.getElementById('id_document')?.focus();
            [refButton1, refButton2].forEach((button) => {
                if (button && button !== currentTarget) {
                    button.style.fontWeight = 'normal';
                    button.style.color = 'initial';
                }
            });
            (currentTarget as any).style.fontWeight = '600';
            (currentTarget as any).style.color = '#FFF';
            const typeSelected = (currentTarget as any).textContent.replace(/\s/g,'');
            // TODO: CAMBIAR CE/PTP
            setDocumentType(typeSelected !== 'DNI' ? 'CEX' : 'DNI');
        }
	}

    useEffect(() => {
        if (refBackground && refButton1 && refButton2) {
            if (documentType === 'DNI') {
                refBackground.style.width = `${refButton1?.getBoundingClientRect().width}px`;
                refBackground.style.transform = `translateX(${refButton1.offsetLeft}px)`
            } else {
                refBackground.style.width = `${refButton2?.getBoundingClientRect().width}px`;
                refBackground.style.transform = `translateX(${refButton2.offsetLeft}px)`
            }
        }
    }, [width]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentNumber(event.target.value);
        setDisableSearch(!Boolean(event.target.value));
    };
    
    const handleSubmitSearch = async () => {
        const document_number = documentNumber;
        const document_type = documentType;
        const { data }: ResponseValidateUser = await getUserByDocument({ document_number, document_type, nationality });
        // console.log('getUserByDocument',data, data?.status.toLowerCase().includes('error'));

        if (data?.status.toLowerCase().includes('error')) {
            MySwal.fire({
                title: 'Error',
                html: <p>{data.result}</p>,
                confirmButtonText: 'Ok',
                icon: "error"
            })
            return
        } 

        if (data?.status === 'true' || data?.status_code === 1) {
            onSearch(true, data?.hash_id);
            MySwal.fire({
                title: 'Aviso',
                html: <p>El usuario está registrado puede continuar.</p>,
                confirmButtonText: 'Ok',
                icon: "success"
            })
        } else {
            onSearch(false);
            MySwal.fire({
                title: 'Aviso',
                html: <p>El usuario no existe. Debe registrarlo manualmente.</p>,
                confirmButtonText: 'Ok',
                icon: "info"
            })
        }
        
        // setSearchList([])
        dispatch(setUserQuery({
            id: data?.hash_id,
            registered: data?.status === 'true' || false,
            document: documentNumber,
            type: documentType
        }))

        
        // TODO: Prueba para feedback
        const newSearch = { document_number, document_type };
        const updatedList = [...searchList, newSearch];
        // setSearchList(updatedList);
        
        const ids = updatedList.map(({ document_number }) => document_number);
        const filtered = updatedList.filter(({ document_number }, index) => !ids.includes(document_number, index + 1));
        setSearchList(filtered);
        sessionStorage.setItem('users', JSON.stringify(filtered));
        dispatch(onUpdate(true));
    }
    
    // const storeSearchList = () => {}

    return (
        <div className="form__user-search">
            <div className="form__user-select-document">
                <button ref={(rc) => setRefButton1(rc)} onClick={(e) => { handleAnimatedBackground(e) }} type="button">
                    <span>DNI</span>
                </button>
                <button ref={(rc) => setRefButton2(rc)} onClick={(e) => { handleAnimatedBackground(e) }} type="button">
                    <span>CE / PTP</span>
                </button>
                {/* <select name="" id="" ref={(rc) => setRefButton2(rc)} onClick={(e) => { handleAnimatedBackground(e) }}>
                    <option value="CEX">CE</option>
                    <option value="PAS">PTP</option>
                    <option value="NID">NID</option>
                </select> */}
                <div className='active-background' ref={(rc) => setRefBackground(rc)} />
            </div>
            <input 
                type="text" 
                name="" 
                id="id_document" 
                className="form__user-document"
                placeholder='INGRESE NRO.'
                value={documentNumber}
                onChange={handleInputChange}
                autoFocus
            />
            <button 
                type="button" 
                className="form__button-search"
                onClick={handleSubmitSearch}
                disabled={disableSearch}
            >
                Consultar
            </button>
        </div>
    )
};