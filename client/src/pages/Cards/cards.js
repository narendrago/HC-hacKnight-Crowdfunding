import Card from 'react-bootstrap/Card'
import json from "./data.json";
import React from "react";

const list = [];
for (const key in json) {
    if (json.hasOwnProperty(key)) {
        list.push(key);
    }
}

function cards() {
    return (
        <div className="card-area">
            {list.map(i => {
                return <Card title={i.title}
                             description={i.description}
                             borderColor={"red"}/>
            })}
        </div>
    );
}

export default cards;