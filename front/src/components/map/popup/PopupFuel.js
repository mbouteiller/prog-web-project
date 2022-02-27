import '../Map.css';
export default function PopupFuel({price, rupture}) {

    return (
        <div className="popup-fuel-container">
            {price.length === 0 ? <div /> :
                <div>
                    <span style={{fontWeight: "bold", fontSize: "1.2em"}}>Disponible :</span>
                    {price.map((e, index) => {
                        return (
                            <div key={index}>
                                <span> {e.nom} => {e.valeur} €</span>
                            </div>)
                    })}
                </div>
            }
            {rupture.length === 0 ? <div /> :
                <div>
                    <span style={{fontWeight: "bold", fontSize: "1.2em"}}>Rupture :</span>
                    {rupture.map((e, index) => {
                        return <div key={index}>{e.nom}</div>
                    })}
                </div>
            }
        </div>
    )
}
