import React from 'react';
import { useStateValue } from './store';

function Notification() {    

    const [{error, city}] = useStateValue();  

    return (
        <div className="notification">
            {error && <p>{error.message}, <b><i>"{city}"</i></b> is not a valid city</p>}
        </div>
    )
}

export default Notification
