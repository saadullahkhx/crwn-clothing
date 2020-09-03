import React from 'react';
import Homepage from './Pages/homepage/homepage.component'
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'
import ShopPage from './Pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './Pages/checkout/checkout.component'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
          });        
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route
         path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp/>)} />
        <Route exact path='/checkout' component={CheckoutPage} />
      </Switch>
    </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
