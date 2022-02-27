export default function PopupSchedule({schedule}) {

    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

    return (
        <div className="popup-schedule-container">
            <span style={{fontWeight: "bold", fontSize: "1.2em"}}>Horaires :</span>
            {schedule.automate === false ? null : <div><span>automate : 24/24 </span></div>}
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {schedule.jour.map((value, index) => {
                    return (
                        <div style={{marginLeft: '0.5em', marginRight: '0.5em', display: "flex", flexDirection: "column"}} key={index}>
                            <span>{days[value.id - 1]}</span>
                            <span>Ouvert</span>
                            {value.horaire === undefined ? null :
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <span>{value.horaire.ouverture}</span>
                                    <span>{value.horaire.fermeture}</span>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
