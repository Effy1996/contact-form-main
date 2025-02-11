import React from 'react';

function SuccessMsg() {
    return(
    <div className='successmsg'> 
        <div className='head'>
            <img src='/images/icon-success-check.svg'/>
            <h5>Message Sent!</h5>
        </div>
        
        <p>Thanks for completing the form. We'll be in touch soon.</p>
    </div>
    )
}

export default SuccessMsg;