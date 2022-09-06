import React, { useState } from 'react'
import "./Select.css"

const PLATFORM = [
    { name: "Design", color: "var(--Purple)" },
    { name: "Web", color: "var(--orange)" },
    { name: "Android", color: "var(--green)" },
    { name: "Server", color: "var(--blue)" },
    { name: "iOS", color: "var(--black)" },
]


const Select = () => {
    const [select, setSelect] = useState('Design')

    return (
        <div>
            <div className='SelectBox'>
                <div>
                    {PLATFORM.map((item) =>
                        <button
                            style={{ border: `1px solid ${item.color}`, backgroundColor: select === item.name && item.color, color: select !== item.name ? item.color : "white" }}
                            className="DesignBt"
                            onClick={() => setSelect(item.name)}
                        >
                            {item.name}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Select