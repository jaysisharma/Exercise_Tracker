import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // To provide feedback to the user

  /**
   * Handles changes to the username input field.
   * Clears any existing feedback messages when the user starts typing.
   */
  function onChangeUsername(e) {
    setUsername(e.target.value);
    if (message) {
      setMessage('');
    }
  }

  /**
   * Handles the form submission.
   * Sends a POST request to the backend to create a new user.
   * Provides feedback on success or failure.
   */
  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages on new submission

    const user = {
      username: username
    };

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        setMessage(`Success! User "${username}" has been created.`);
        setUsername(''); // Clear the input field on success
      })
      .catch(err => {
        console.error(err);
        // Attempt to show a more specific error from the server response
        const errorMsg = err.response?.data || 'An unexpected error occurred. Please try again.';
        setMessage(`Error: ${errorMsg}`);
      })
      .finally(() => {
        setLoading(false); // Re-enable the button
      });
  }

  // Dynamically set the alert class based on whether it's a success or error message
  const messageClass = message.startsWith('Error:') ? 'alert alert-danger' : 'alert alert-success';

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <h3 className="card-title text-center mb-4">Join Us</h3>
              <p className="text-center text-muted mb-4">Create an account to start tracking exercises.</p>
              <form onSubmit={onSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="usernameInput" className="form-label">Username</label>
                  <input
                    id="usernameInput"
                    type="text"
                    required
                    className="form-control form-control-lg"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="e.g., strong_dev"
                  />
                </div>
                
                {/* Conditionally render feedback message */}
                {message && (
                  <div className={`mt-3 ${messageClass}`} role="alert">
                    {message}
                  </div>
                )}

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="ms-2">Creating Account...</span>
                      </>
                    ) : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser;
