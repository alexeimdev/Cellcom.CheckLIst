import React from 'react';

const DropDown = (props) => {

    const { list, value, id, classes = "", onChange } = props;

    if (!list) return null; 

    return (
        <select className={`custom-select ${classes}`} value={value || "0"} onChange={onChange} id={id}>
            <option disabled value="0">בחר</option>
            {list.map(item =>
                <option key={item.id} value={item.id}>{item.name}</option>
            )}
        </select>
    )
}

export default DropDown;