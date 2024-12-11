const loginFields=[
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Hospital email address"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    }
]

const signupFields=[
    {
        labelText:"HospitalName",
        labelFor:"hospitalname",
        id:"hospitalname",
        name:"hospitalname",
        type:"text",
        autoComplete:"hospitalname",
        isRequired:true,
        placeholder:"Hospital Name"   
    },
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Hospital email address"   
    },
    {
        labelText: "Address",
        labelFor:"address",
        id:"address",
        name:"address",
        type:"text",
        autoComplete:"location",
        isRequired: true,
        placeholder:"Hospital Address",
    },
    {
        labelText:"Phone",
        labelFor:"phone",
        id:"phone",
        name:"phone",
        type:"text",
        autoComplete:"phone",
        isRequired:true,
        placeholder:"Phone No."   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
    
]

export {loginFields,signupFields}