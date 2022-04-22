/******w*************
    
    Project 2 Javascript
    Name: Patricia Montemayor
    Date: April 8, 2022
    Description: Project 2 Form Validation

********************/

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

/*
 * Handles the load event of the document.
 */
function load()
{
    hideErrors();

    document.getElementById("contactform").addEventListener("submit", validate);
    document.getElementById("contactform").addEventListener("reset", resetForm);
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
    // Confirm that the user wants to reset the form.
    if ( confirm('Clear form?') )
    {
        // Ensure all error fields are hidden
        hideErrors();
                
        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();
    
    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;   
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
    hideErrors();

    if(formHasErrors())
    {
        e.preventDefault();

        return false;
    }

    return true;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement)
{
    // Check if the text field has a value
    if ( fieldElement.value == null || (fieldElement.value) == "" )
    {
        // Invalid entry
        return false;
    }
    
    // Valid entry
    return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
    // Input check.
    let errorFlag = false;
    let requiredFields = ["fullname", "phonenumber", "email", "comments"];

    for(let i = 0; i < requiredFields.length; i++)
    {
        let textField = document.getElementById(requiredFields[i]);
        let textFieldValue = textField.value;

        if(!formFieldHasInput(textField))
        {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if(!errorFlag)
            {
                textField.focus();
                textField.select();
            }

           errorFlag = true;
        }
    }

    let phoneregex = new RegExp(/^\d{10}$/);
    let phonenumber = document.getElementById("phonenumber").value;

    if(!phoneregex.test(phonenumber))
    {
        document.getElementById("invalidNumber_error").style.visibility = "visible";
        document.getElementById("invalidNumber_error").style.display = "block";
        document.getElementById("phonenumber").focus();
        document.getElementById("phonenumber").select();
    
        errorFlag = true;
    }

    let regexEmail = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/);
    let email = document.getElementById("email").value;

    if(!regexEmail.test(email) && email != "")
    {
        document.getElementById("emailformat_error").style.display = "block";

        if(!errorFlag)
        {
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }

        errorFlag = true;
    }

    return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
    // Get an array of error elements
    let error = document.getElementsByClassName("error");

    // Loop through each element in the error array
    for ( let i = 0; i < error.length; i++ )
    {
        // Hide the error element by setting it's display style to "none"
        error[i].style.display = "none";
    }
}

