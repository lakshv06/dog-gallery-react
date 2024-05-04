import { ReactElement } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// Define the data structure for the form
interface SignInFormData {
  username: string;
  password: string;
}

function SignIn(): ReactElement {
  const navigate = useNavigate();
  // Initialize React Hook Form with default validation mode
  const methods = useForm<SignInFormData>({
    mode: "all",
  });

  // Define the form submission handler
  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log("Form submitted with data:", data);
    navigate("/home-page"); // Navigate to the homepage on successful submission
    toast.success("Sign In successful.", {containerId: "toast-container-message"}); // Show success toast on form submission
  };

  // Define the onClick handler for the submit button
  const handleButtonClick = () => {
    toast.info("Submit button clicked.", {containerId: "toast-container-message"}); // Toast message upon button click
    console.log("Button clicked on");
    
  };

  return (
    <div>
      <h2>SignIn Route</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <div>
            {/* Username input with validation */}
            <div>
              <label htmlFor="username-input">Enter Username:</label>
              <input
                id="username-input"
                {...methods.register("username", {
                  required: "Username is required",
                })}
                type="text"
              />
              {/* Display error if validation fails */}
              {methods.formState.errors.username && (
                <p style={{ color: "red" }}>
                  {methods.formState.errors.username?.message}
                </p>
              )}
            </div>

            {/* Password input with validation */}
            <div>
              <label htmlFor="password-input">Enter Password:</label>
              <input
                id="password-input"
                {...methods.register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password" // Ensures the input is treated as a password
              />
              {/* Display error if validation fails */}
              {methods.formState.errors.password && (
                <p style={{ color: "red" }}>
                  {methods.formState.errors.password?.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                id="submit-button"
                onClick={handleButtonClick} // Click handler for the button
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default SignIn;
