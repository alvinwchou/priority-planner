function FormError({ errorMessage }) {
    return (
        <div className="formError">
            {errorMessage === "Firebase: Error (auth/invalid-email)." && (
                <p>This is not a valid email address.</p>
            )}
            {errorMessage ===
                "Firebase: Error (auth/email-already-in-use)." && (
                <p>This email is already in use.</p>
            )}
            {errorMessage === "Firebase: Error (auth/internal-error)." && (
                <p>Please enter a password.</p>
            )}
            {errorMessage === "Passwords do not match" && (
                <p>Passwords do not match.</p>
            )}
            {errorMessage === "Firebase: Error (auth/wrong-password)." && (
                <p>Passwords do not match.</p>
            )}
            {errorMessage === "Firebase: Error (auth/user-not-found)." && (
                <p>User not found.</p>
            )}
            {errorMessage ===
                "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)." && (
                <p>
                    Access to this account has been temporarily disabled due to
                    many failed login attempts. Try again later.
                </p>
            )}
        </div>
    );
}

export default FormError;
