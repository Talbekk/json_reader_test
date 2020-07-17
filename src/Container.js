import React, {useState} from 'react';
import './App.css';

function Container(props){

    const [jsonEntry, setJsonEntry] = useState("");
    const [jsonObject, setJsonObject] = useState({});
    const [firstBlock, setFirstBlock] = useState("?utm_source=criton&utm_medium=mobile-apps&utm_campaign=");
    const hotelBooking = useState("hotel-booking-page");

    function handleClick(){
        const obj = JSON.parse(jsonEntry);
        setJsonObject(obj);
    }

    function getformattedEnding(string){
        const splitString = string.split(" ");
        const formattedSplitString = splitString.map((word) => {
            return word.toLowerCase();
        });
        const rejoinedString = formattedSplitString.join("-");
        return rejoinedString;
    }

    function getSimpleFormattedString(string, ending, extra){
        let endOfString = "";
        if (ending !== hotelBooking){
        const formattedEnding = getformattedEnding(ending);
         endOfString = firstBlock + formattedEnding;
        } else {
             endOfString = firstBlock + ending;
        }
        
        return (string.charAt(string.length-1) === "/") ?
         string + endOfString
        : 
        string + "/" + endOfString;
    }

    function checkForLinkInComponent(component){
        if (component.type === "BUTTON_COMPONENT"){
        if((component.buttonType === "LINK") || (component.buttonType === "DOWNLOAD")) {
            component['value'] = getSimpleFormattedString(component['value'], component.line1);
            }
        }
    }

    function checkAccordionComponents(comp){
        comp.components.forEach((com) => {
            checkForLinkInComponent(com);
            if(com.type === "ACCORDION_COMPONENT"){
                com.components.forEach((banana) => {
                    checkForLinkInComponent(banana);
                })
            }
            
        })
    }

    function changeLinks(){
        jsonObject['hotelBookingPage'] = getSimpleFormattedString(jsonObject['hotelBookingPage'], hotelBooking);
        jsonObject['hotels'][0]['hotelBookingPage'] = getSimpleFormattedString(jsonObject['hotels'][0]['hotelBookingPage'], hotelBooking);
        jsonObject['pages'].forEach((page) => {
            if (page['type'] === "LINK_PAGE"){
                page['url'] = getSimpleFormattedString(page['url'], page.line1);
            }
        })
        jsonObject['pages'].forEach((page) => {
            if(page.components){
                page.components.forEach((component) => {
                    if(component.type === "BUTTON_COMPONENT"){
                        checkForLinkInComponent(component);
                    }
                    if(component.type === "CARD_COMPONENT"){
                        component.components.forEach((comp) => {
                            checkForLinkInComponent(comp);
                            if(comp.type === "ACCORDION_COMPONENT"){
                                checkAccordionComponents(comp);
                            }
                        })
                    }
                    if(component.type === "ACCORDION_COMPONENT"){
                        checkAccordionComponents(component)
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