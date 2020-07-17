import React from 'react'
import "./App.css"

export default function DisplayJson(props) {



    function handleClick(){
        navigator.clipboard.writeText(props.submittedJson)
    }

    return (
        <>
        <section>
            <h4>Your JSON</h4>
            <button onClick={handleClick}>Copy JSON to clipboard</button>
            <button onClick={props.clearClipboard}>Clear Clipboard</button>
            <div className="json-container">
            <p className="displayJsonWrapper">{props.submittedJson}</p>
            </div>
        </section>
        </>
    )
}