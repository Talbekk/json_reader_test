import React, {useState} from 'react';
import './App.css';

function Container(props){

    const [jsonEntry, setJsonEntry] = useState("");
    const [jsonObject, setJsonObject] = useState({});
    const [hotelName, setHotelName] = useState(null);

    function handleClick(){
        const obj = JSON.parse(jsonEntry);
        setJsonObject(obj);
    }

    function getHotelName(){

      if (jsonObject.hotels.length === 1){
        setHotelName(jsonObject.hotels[0].title);
      } else {
        const hotelNames = [];
        jsonObject.hotels.forEach((hotel) => {
             hotelNames.push(hotel.title);
        });
        setHotelName(hotelNames);
      }
    }

    function sendName(){
        console.log("hotel name", hotelName);
    }

    function changeLinks(){
        jsonObject['hotelBookingPage'] = "batman";
        jsonObject['hotels'][0]['hotelBookingPage'] = "batman";
        jsonObject['pages'].forEach((page) => {
            if (page['type'] === "LINK_PAGE"){
                page['url'] = "batman";
            }
        })
        jsonObject['pages'].forEach((page) => {
            if(page.components){
                page.components.forEach((component) => {
                    if(component.type === "BUTTON_COMPONENT"){
                        if(component.buttonType === "LINK") {
                        component['value'] = "batman";
                        }
                    }
                    if(component.type === "CARD_COMPONENT"){
                        component.components.forEach((comp) => {
                            if (comp.type === "BUTTON_COMPONENT"){
                                if(comp.buttonType === "LINK") {
                                    comp['value'] = "batman";
                                    }
                            }
                            if(component.type === "ACCORDION_COMPONENT"){
                                component.components.forEach((comp) => {
                                    if (comp.type === "BUTTON_COMPONENT"){
                                        if(comp.buttonType === "LINK") {
                                            comp['value'] = "batman";
                                            }
                                    }
                                })
                            }
                        })
                    }
                    if(component.type === "ACCORDION_COMPONENT"){
                        component.components.forEach((comp) => {
                            if (comp.type === "BUTTON_COMPONENT"){
                                if(comp.buttonType === "LINK") {
                                    comp['value'] = "batman";
                                    }
                            }
                            if(comp.type === "ACCORDION_COMPONENT"){
                                comp.components.forEach((banana) => {
                                    if (banana.type === "BUTTON_COMPONENT"){
                                        if(banana.buttonType === "LINK") {
                                            banana['value'] = "batman";
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
            <h2>Super Fantastic JSON Parsing Link Attaching Manical Machine</h2>
            <div>
				<textarea rows="30" cols="70" value={jsonEntry} onChange={(e) => setJsonEntry(e.target.value)}></textarea>
			</div>
            <div>
                <button onClick={handleClick}>Parse The Beast!</button>
                <button onClick={getHotelName}>Get That Hotel Name!</button>
                <button onClick={sendName}>Show The Name</button>
                <button onClick={changeLinks}>Change Links</button>
                <button onClick={getJson}>Get Json</button>
            </div>
        </div>
        </>
    )
}

export default Container;