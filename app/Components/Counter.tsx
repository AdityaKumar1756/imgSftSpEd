import React from 'react'

import { useState } from 'react';

export default function Counter() {

    const [num, setNum] = useState(0);

    const incNum = () => {
        setNum(num + 1);
    }
    
    return (
        <div>
            <button type="button" onClick={incNum} className="btn btn-primary btn-lg">Click Me: {num}</button>
        </div>
    )
}
