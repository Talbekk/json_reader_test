import React, {useState} from 'react';
import './App.css';

function Container(props){

    const [jsonEntry, setJsonEntry] = useState("");
    const [jsonObject, setJsonObject] = useState({});
    const [hotelCode, setHotelCode] = useState("");
    const [firstBlock, setFirstBlock] = useState("")

    function handleClick(){
        const obj = JSON.parse(jsonEntry);
        setJsonObject(obj);
    }

    function handleSubmit(e){
        e.preventDefault();
        setFirstBlock("?utm_source=criton&utm_medium+mobile-apps&utm_campaign+" + hotelCode);
    }

    function checkEndOfString(string){
        return (string.charAt(string.length-1) === "/") ? true : false;
    }

    function changeLinks(){
        (checkEndOfString(jsonObject['hotelBookingPage']))? console.log("true"): console.log("false");
        jsonObject['hotelBookingPage'] = jsonObject['hotelBookingPage'] + firstBlock + "-hotelBookingPage";
        jsonObject['hotels'][0]['hotelBookingPage'] = jsonObject['hotels'][0]['hotelBookingPage'] + firstBlock + "-hotelBookingPage";
        jsonObject['pages'].forEach((page) => {
            if (page['type'] === "LINK_PAGE"){
                page['url'] = page['url'] + firstBlock + page.line1;
            }
        })
        jsonObject['pages'].forEach((page) => {
            if(page.components){
                page.components.forEach((component) => {
                    if(component.type === "BUTTON_COMPONENT"){
                        if((component.buttonType === "LINK") || (component.buttonType === "DOWNLOAD")) {
                        component['value'] = component['value'] + firstBlock + component.line1;
                        }
                    }
                    if(component.type === "CARD_COMPONENT"){
                        component.components.forEach((comp) => {
                            if (comp.type === "BUTTON_COMPONENT"){
                                if((comp.buttonType === "LINK") || (comp.buttonType === "DOWNLOAD")) {
                                    comp['value'] = comp['value'] + firstBlock + comp.line1;
                                    }
                            }
                            if(comp.type === "ACCORDION_COMPONENT"){
                                comp.components.forEach((com) => {
                                    if (com.type === "BUTTON_COMPONENT"){
                                        if((com.buttonType === "LINK") || (com.buttonType === "DOWNLOAD")) {
                                            com['value'] = com['value'] + firstBlock + com.line1;
                                            }
                                    }
                                    if(com.type === "ACCORDION_COMPONENT"){
                                        com.components.forEach((banana) => {
                                            if (banana.type === "BUTTON_COMPONENT"){
                                                if((banana.buttonType === "LINK") || (banana.buttonType === "DOWNLOAD")) {
                                                    banana['value'] = banana['value'] + firstBlock + banana.line1;
                                                    }
                                            }
                                        })
                                    }
                                    
                                })
                            }
                        })
                    }
                    if(component.type === "ACCORDION_COMPONENT"){
                        component.components.forEach((comp) => {
                            if (comp.type === "BUTTON_COMPONENT"){
                                if((comp.buttonType === "LINK") || (comp.buttonType === "DOWNLOAD")) {
                                    comp['value'] = comp['value'] + firstBlock + comp.line1;
                                    }
                            }
                            if(comp.type === "ACCORDION_COMPONENT"){
                                comp.components.forEach((banana) => {
                                    if (banana.type === "BUTTON_COMPONENT"){
                                        if((banana.buttonType === "LINK") || (banana.buttonType === "DOWNLOAD")) {
                                            banana['value'] = banana['value'] + firstBlock + banana.line1;
                                            }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    function getJson(){
       props.addJsonToScreen(JSON.stringify(jsonObject));
    }

    return (
        <>
        <div>
            <div>
                <form className="hotel-code-input" onSubmit={handleSubmit}>
                <label>Enter Your Hotel Code</label>
                <input type="text" value={hotelCode} onChange={(e) => setHotelCode(e.target.value)}/>
                <button type="submit">Save It Now!</button>
                </form>
            </div>
            <div>
				<textarea rows="30" cols="70" value={jsonEntry} onChange={(e) => setJsonEntry(e.target.value)}></textarea>
			</div>
            <div>
                <button onClick={handleClick}>Parse The Beast!</button>
                <button onClick={changeLinks}>Change Those Links</button>
                <button onClick={getJson}>Get Yourself Some Json</button>
            </div>
        </div>
        </>
    )
}

export default Container;