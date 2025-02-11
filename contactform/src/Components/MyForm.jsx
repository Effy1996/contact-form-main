import React, { useState } from 'react';
import SuccessMsg from './SuccessMsg';

function MyForm() {
    const [inputs, setInputs] = useState({
        firstname:'',
        lastname:'',
        email:'',
        query: '',
        message:'',
        consent:false,
    });

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value, type, checked } = e.target;

        setInputs(prev => ({...prev, [name]: type === 'checkbox' ? checked : value,}))
        console.log(`${checked}: ${value}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!inputs.firstname) newErrors.firstname = "This field is required" ;
        if (!inputs.lastname) newErrors.lastname = "This field is required";
        if (!inputs.email || !emailRegex.test(inputs.email)) newErrors.email = "Please enter a valid email address";
        if (!inputs.query) newErrors.query = "Please select a query type";
        if (!inputs.message) newErrors.message = "This field is required";
        if (!inputs.consent) newErrors.consent = "To submit this form, please consent to being contacted";
        setErrors(newErrors);
        console.log(inputs.query);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitted(true);
            setInputs({
                firstname: '',
                lastname: '',
                email: '',
                query: '',
                message: '',
                consent: false,
              });
              setErrors({});
        }
    }
    return (
        <>
        {isSubmitted && <SuccessMsg />}
        <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <div className='names'>
                <label>First Name * <br/>
                    <input type='text' tabIndex={0} name='firstname' value={inputs.firstname || ""} onChange={handleChange} className={errors.firstname ? "inputError" : ""}/>
                    {errors.firstname && <div className="error">{errors.firstname}</div>}
                </label>
                <label> Last Name * <br/>
                    <input type='text' tabIndex={0} name='lastname' value={inputs.lastname || ""} onChange={handleChange} className={errors.lastname ? "inputError" : ""}/>
                    {errors.lastname && <div className='error'>{errors.lastname}</div>}
                </label>
            </div>
            <br/>
            <label> Email * <br/>
                <input type='email' name='email' value={inputs.email || ""} onChange={handleChange} className={errors.email ? "inputError" : ""}/>
                {errors.email && <div className='error'>{errors.email}</div>}
            </label>
            <br/>
            <label>Query Type * 
          
            <div className='qtypes'>
                    <div className="query" tabIndex={0}>
                        <input type='radio' name='query' id='general' value="General Enquiry"  
                        checked={inputs.query === "General Enquiry"} onChange={handleChange}/>
                        <label htmlFor='general'>General Enquiry</label>
                    </div>
                    <div className="query" tabIndex={0}>
                        <input type='radio' name='query' id='support' value="Support Request"  
                        checked={inputs.query === "Support Request"} onChange={handleChange}/>
                        <label htmlFor='support'>Support Request</label>
                    </div>
            </div>
                {errors.query && <div className='error'>{errors.query}</div>}
            </label>
            <br />
            <label>Message * <br/>
                <textarea name='message' value={inputs.message || ""} onChange={handleChange} className={errors.message ? "inputError" : ""}/>
                {errors.message && <div className='error'>{errors.message}</div>}
            </label>
            <div className='checkConsent'>
                
                    <input type='checkbox' name='consent' value="consent" onChange={handleChange} checked={inputs.consent}/>
                
                <p>I consent to being contacted by the team *</p>
            </div>
                {errors.consent && <div className='error'>{errors.consent}</div>}
                <br />
            
            <input type='submit' value={"Submit"}/>
        </form>
        </>
    )
}

export default MyForm;