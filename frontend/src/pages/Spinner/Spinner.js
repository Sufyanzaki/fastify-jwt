import React from 'react'
import "./Spinner.css"

const Spinner = ({ cover, bg, center }) => {

    const style = {
        cover: { position: "absolute", width: "100%", height: "100vh", zIndex: 1, top:"0", left:"0"},
        center: { display: "flex", justifyContent: "center", alignItems: "center" },
        bg: { background: bg }
    }

    const appliedStyle = {
        ...(cover ? style.cover : {}),
        ...(center ? style.center : {}),
        ...style.bg
      }

    return (
        <div className="lds-roller" style={appliedStyle}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Spinner
