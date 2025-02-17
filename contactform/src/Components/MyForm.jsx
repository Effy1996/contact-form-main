import React, { useState, useEffect } from 'react';
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

   useEffect(() => {
        let queryBtns = document.querySelectorAll(".queryBtn");
        let queryInput = document.querySelector(".query-input");
        queryBtns.forEach(queryBtn => {
            queryBtn.addEventListener("click", () => {
                // Remove "active" class from all buttons
                queryBtns.forEach(btn => btn.classList.remove("active"));

                // Add "active" class to the clicked one
                queryBtn.classList.add("active");
                
            });
        });

        // Cleanup event listeners when component unmounts
    return () => {
        queryBtns.forEach(queryBtn => {
            queryBtn.removeEventListener("click", () => {});
        });
    };
    }, [])

    const handleChange = (e) => {
        const {name, value, type, checked } = e.target;

        setInputs(prev => ({...prev, [name]: type === 'checkbox' ? checked : value,}))
    }

    const handleQuerySelect = (queryType) => {
        console.log("Clicked:", queryType);
        setInputs((values) => ({ ...values, query: queryType })); 
    };

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
                    <label htmlFor='general' className="queryBtn" onClick={() => handleQuerySelect("General Enquiry")}>
                        <input type='radio' name='query' className='query-input' value="General Enquiry"  
                        checked={inputs.query === "General Enquiry"} onChange={handleChange} />
                        General Enquiry</label>
                    <label htmlFor='support' className="queryBtn" onClick={() => handleQuerySelect("Support Request")}>
                        <input type='radio' name='query' className='query-input' value="Support Request"  
                        checked={inputs.query === "Support Request"} onChange={handleChange}/>
                    Support Request</label>
            </div>
                {errors.query && <div className='error'>{errors.query}</div>}
            </label>
            <br />
            <label>Message * <br/>
                <textarea name='message' value={inputs.message || ""} onChange={handleChange} className={errors.message ? "inputError" : ""}/>
                {errors.message && <div className='error'>{errors.message}</div>}
            </label>
            <div className='checkConsent' onClick={() => setInputs(prev => ({ ...prev, consent: !prev.consent }))}>
                
                <input type='checkbox' name='consent' onChange={handleChange} checked={inputs.consent}/>
                
                <label htmlFor="consent">I consent to being contacted by the team *</label>
            </div>
                {errors.consent && <div className='error'>{errors.consent}</div>}
                <br />
            
            <input type='submit' value={"Submit"}/>
        </form>
        </>
    )
}

export default MyForm;
