import React, {useState} from 'react';
import './App.css';

function Container(props){

    const [jsonEntry, setJsonEntry] = useState("");
    const [jsonObject, setJsonObject] = useState({});
    const [hotelBooking, setHotelBooking] = useState("hotel-booking-page");

    function handleClick(){
        const obj = JSON.parse(jsonEntry);
        setJsonObject(obj);
    }

    function getformattedEnding(string){
        const splitString = string.split(" ");
        console.log("split string", splitString);
        const filteredString = splitString.map((word) => {
            return removeUnecessaryCharacters(word);
        })
        const formattedSplitString = splitString.map((word) => {
            return word.toLowerCase();
        });
        console.log("filteredString", filteredString);
        const rejoinedString = formattedSplitString.join("-");
        return rejoinedString;
    }

    function removeUnecessaryCharacters(word){
        const splitWord = word.split("");
        const unecessaryCharacters = [",", ".", ":", ";", "?", "!"];
        if (unecessaryCharacters.includes(splitWord[0])) {
            splitWord.shift();
        }
        if (unecessaryCharacters.includes(splitWord[splitWord.length-1])){
            splitWord.pop();
        }
        const rejoinedWord = splitWord.join("");
        return rejoinedWord;
    }

    function getSimpleFormattedString(string, ending, extraInfo){
        const firstBlock = "?utm_source=criton&utm_medium=mobile-apps&utm_campaign=";
        let endOfString = "";
        if (ending !== hotelBooking){
        const formattedEnding = getformattedEnding(ending);
        if(extraInfo === undefined){
         endOfString = firstBlock + formattedEnding;
        } else {
            const formattedExtraInfo = getformattedEnding(extraInfo);
            endOfString = firstBlock + formattedEnding + "-" + formattedExtraInfo;
        }
        } else {
            if(extraInfo === undefined){
             endOfString = firstBlock + ending;
            }
        }
        
        return (string.charAt(string.length-1) === "/") ?
         string + endOfString
        : 
        string + "/" + endOfString;
    }

    function checkForLinkInComponent(component, parentComponent){
        if (component.type === "BUTTON_COMPONENT"){
            if((component.buttonType === "LINK") || (component.buttonType === "DOWNLOAD")) {
                if(parentComponent.type === "ACCORDION_COMPONENT"){
                component['value'] = getSimpleFormattedString(component['value'], component.line1, parentComponent.title);
                }
                if(parentComponent.type === "CONTENT_PAGE"){
                    component['value'] = getSimpleFormattedString(component['value'], component.line1, parentComponent.line1);
                    }
                }
        }
        if (component.type === "ACCORDION COMPONENT"){
            checkAccordionComponents(component);
        }
    }

    function checkAccordionComponents(comp){
        comp.components.forEach((com) => {
            checkForLinkInComponent(com, comp);
            if(com.type === "ACCORDION_COMPONENT"){
                com.components.forEach((banana) => {
                    checkForLinkInComponent(banana, com);
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
                        checkForLinkInComponent(component, page);
                    }
                    if(component.type === "CARD_COMPONENT"){
                        component.components.forEach((comp) => {
                            checkForLinkInComponent(comp, page);
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