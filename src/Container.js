import React, {useState} from 'react';
import './App.css';

function Container(props){

    const [jsonEntry, setJsonEntry] = useState("");
    const [jsonObject, setJsonObject] = useState({});
    const [hotelBooking, setHotelBooking] = useState("hotel-booking-page");
    // const [hotelCode, setHotelCode] = useState(null);
    // const [hotelCount, setHotelCount] = useState(1);

    // turns the input into a js object
    function handleClick(){
        const obj = JSON.parse(jsonEntry);
        setJsonObject(obj);
        // setHotelCount(obj['hotels'].length);
    }

    // this filters out unwanted characters like commas and makes everything lowercase
    function getformattedEnding(string){
        const splitString = string.split(" ");
        const filteredString = splitString.map((word) => {
            return removeUnecessaryCharacters(word);
        })
        const formattedSplitString = filteredString.map((word) => {
            return word.toLowerCase();
        });
        const rejoinedString = formattedSplitString.join("-");
        return rejoinedString;
    }

    // filters out any unwanted characters
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

    function getFormattedString(string, ending, extraInfo){
        const hotelCount = jsonObject['hotels'].length;
        const hotelCode = getHotelCode(extraInfo, ending);
        const firstBlock = "?utm_source=criton&utm_medium=mobile-apps&utm_campaign=";
        if (ending !== "hotel-booking-page"){
            ending = getformattedEnding(ending);
        }
        let endOfString = "";
            console.log("hotelbooking");
            (hotelCount > 1) ? 
         endOfString = firstBlock + hotelCode + ending
         :
         endOfString = firstBlock + "-" + ending;

         return (string.charAt(string.length-1) === "/") ?
         string + endOfString
        : 
        string + "/" + endOfString;
    }

    // creates the utm tags for the end of the link
    function getSimpleFormattedString(component, extraInfo, pageComponent){
        const string = component['value'];
        const ending = component.line1;
        const hotelCount = jsonObject['hotels'].length;
        const firstBlock = "?utm_source=criton&utm_medium=mobile-apps&utm_campaign=";
        const hotelCode = (pageComponent === undefined) ? 
        getHotelCode(extraInfo)
        :
        getHotelCode(pageComponent)
        let endOfString = "";
        if (ending !== hotelBooking){
        const formattedEnding = getformattedEnding(ending);
        if(extraInfo === undefined){
            console.log("first", hotelCode);
         (hotelCount > 1) ? 
         endOfString = firstBlock + hotelCode + formattedEnding
         : 
         endOfString = firstBlock + formattedEnding;
        } else {
            console.log("accordion type", extraInfo.type);
            const formattedExtraInfo = (extraInfo.type === "ACCORDION_COMPONENT") ? 
            getformattedEnding(extraInfo.title)
            :
            getformattedEnding(extraInfo.line1);
            (hotelCount > 1) ? 
            endOfString = firstBlock + hotelCode + formattedExtraInfo + "-" + formattedEnding
            :
            endOfString = firstBlock + formattedExtraInfo + "-" + formattedEnding
        }
        } else {
            console.log("third", hotelCode);
            if(extraInfo === undefined){
                console.log("hotelbooking");
                (hotelCount > 1) ? 
             endOfString = firstBlock + hotelCode + ending
             :
             endOfString = firstBlock + "-" + ending
            }
        }
        
        return (string.charAt(string.length-1) === "/") ?
         string + endOfString
        : 
        string + "/" + endOfString;
    }
    // if there are more than one hotel, this function will set the hotelname for each page.
    function getHotelCode(extraInfo, ending){
        const hotelCount = jsonObject['hotels'].length;
        if(hotelCount > 1) {
            console.log("extraInfo", extraInfo);
            if ((extraInfo !== undefined) && ((extraInfo.type === "CONTENT_PAGE" || "LIST_PAGE") || (ending === "hotel-booking-page"))){
        const splitID = (ending === "hotel-booking-page") ?
        extraInfo.split(" ")
        :
        extraInfo.id.split("_");
        const hotelCodeName = splitID[0] + "-";
        console.log("hotel code name", hotelCodeName);
        return hotelCodeName.toLowerCase();
        } else { return ""; }
    }
    }

    // checks if the component is a button link component and then creates the newly formatted one
    function checkForLinkInComponent(component, parentComponent, pageComponent){
        if (component.type === "BUTTON_COMPONENT"){
            if((component.buttonType === "LINK") || (component.buttonType === "DOWNLOAD")) {
                if(parentComponent.type === "ACCORDION_COMPONENT"){
                component['value'] = getSimpleFormattedString(component, parentComponent, pageComponent);
                }
                if(parentComponent.type === "CONTENT_PAGE"){
                    component['value'] = getSimpleFormattedString(component, parentComponent);
                    }
                }
        }
        if (component.type === "ACCORDION COMPONENT"){
            checkAccordionComponents(component, pageComponent);
        }
    }
    // checks accordions within accordions.
    function checkAccordionComponents(comp, page){
        comp.components.forEach((com) => {
            checkForLinkInComponent(com, comp, page);
            if(com.type === "ACCORDION_COMPONENT"){
                com.components.forEach((banana) => {
                    checkForLinkInComponent(banana, com, page);
                })
            }
            
        })
    }

    // changes the links 
    function changeLinks(){
        if (jsonObject['hotelBookingPage'] !== null) { getFormattedString(jsonObject['hotelBookingPage'], hotelBooking) };
        jsonObject['hotels'].forEach((hotel) => {
            hotel['hotelBookingPage'] = getFormattedString(hotel['hotelBookingPage'], hotelBooking, hotel['title']);
        })
        jsonObject['hotels'][0]['hotelBookingPage'] = getFormattedString(jsonObject['hotels'][0]['hotelBookingPage'], hotelBooking, jsonObject['hotels'][0]['title']);
        jsonObject['pages'].forEach((page) => {
            if (page['type'] === "LINK_PAGE"){
                page['url'] = getFormattedString(page['url'], page.line1, page);
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
                                checkAccordionComponents(comp, page);
                            }
                        })
                    }
                    if(component.type === "ACCORDION_COMPONENT"){
                        checkAccordionComponents(component, page)
                    }
                })
            }
        })
    }
    // gets the json for the display.
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