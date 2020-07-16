import React, {useState} from 'react';
import './App.css';

function Container(){

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

    function getLinks(){
        return null;
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
                <button onClick={getLinks}>Show The Name</button>
            </div>
        </div>
        </>
    )
}

export default Container;