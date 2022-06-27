import { useState, useEffect } from "react";
import PathFinder from "./componenets/PathFinder";
import Input from "./componenets/Input";
import "./App.css";

function App() {
    const [endPoint, setEndPoint] = useState([29, 6]);

    const handleItemChange = (item) => {
        setEndPoint(item.endPoint);
    };

    return (
        <div className="App">
            <Input handleItemChange={handleItemChange} />
            <PathFinder endPoint={endPoint} />
        </div>
    );
}

export default App;
