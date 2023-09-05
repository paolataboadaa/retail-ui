import { useState } from "react";
import { SearchUser } from "./SearchUser";
import { SearchResults } from "./SearchResults";
import { UserForm } from "./UserForm";
import { UserPanel } from "./UserPanel";
// import boxSvg from '../assets/box.svg'
import useHeightHeader from "../hooks/useHeightHeader";

const boxSvg = import.meta.env.BASE_URL + 'box.svg';
console.log(import.meta.env.BASE_URL);


export const Main = () => {
    const { heightHeader } = useHeightHeader();    
    const [showResults, setShowResults] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSearch = (status: boolean, id?: string | undefined) => {
        console.log('handleSearch', status, id);
        setShowResults(true);
        setIsRegistered(status);
    };
    
    return (
        <main className="main__wrapper">
            <div id="main__header" className="wrapper__header">
                <img src={boxSvg} alt="Icono de caja" />
                <h1>
                    CAJA: {' '}
                    <span className="title">
                        Red Omega AT
                    </span>
                </h1>
            </div>
            <div className="wrapper__content" style={{height: showResults ? 'auto' : `calc(100vh - ${heightHeader}px - 2rem)`}}>
                <SearchUser onSearch={handleSearch} />
                { showResults && (
                    <>
                        <SearchResults />
                        <div className="panel__content">
                            <UserForm />
                            { isRegistered ? <UserPanel /> : <div></div> }
                        </div>
                    </>
                )}
            </div>
        </main>
    )
};
