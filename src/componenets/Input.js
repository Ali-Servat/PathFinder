import { useState } from "react";
import "./Input.css";

const items = {
    cola: { name: "cola", endPoint: [29, 6] },
    bread: { name: "bread", endPoint: [25, 3] },
    cheese: { name: "cheese", endPoint: [20, 1] },
};

const Input = ({ handleItemChange }) => {
    const [item, setItem] = useState("cola");

    const handleChange = (e) => {
        setItem(e.target.value);

        const item = items[e.target.value];
        handleItemChange(item);
    };
    return (
        <form className="form">
            <fieldset>
                <label>
                    کالای مورد نظر خود را انتخاب کنید:
                    <select value={item} onChange={handleChange}>
                        <option value="cola">نوشابه</option>
                        <option value="bread">نان</option>
                        <option value="cheese">پنیر</option>
                    </select>
                </label>
            </fieldset>
        </form>
    );
};

export default Input;
