import React, {useState} from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({googleSignInStart, emailSignInStart}) => {

    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
    const {email, password} = userCredentials;
    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password)
    }

    const handleChange = e => {
        const {value, name} = e.target;

        setUserCredentials({...userCredentials, [name]: value })
    }
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput
                    name='email'
                    type='email'
                    value={email}
                    label='Email'
                    required
                    handleChange={handleChange} 
                    />

                    <FormInput 
                    name='password'
                    type='password'
                    value={password}
                    label='Password'
                    required
                    onChange={handleChange}
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>
                            Sign In
                        </CustomButton>
                        <CustomButton
                        onClick={googleSignInStart}
                        isGoogleSignIn
                        type='button'
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })) 
})


export default connect(null, mapDispatchToProps)(SignIn)