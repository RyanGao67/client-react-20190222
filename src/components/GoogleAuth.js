import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions"

class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:
                "407764537263-r32vo361cr46o46n3vk4mcgub918j284.apps.googleusercontent.com",
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    // onAuthChange = ()=>{
    //     this.setState({isSignedIn:this.auth.isSignedIn.get()});  
    // };
    // or 
    onAuthChange = (isSignedIn)=>{
      if(isSignedIn)  {
          this.props.signIn(this.auth.currentUser.get().getId());
      }else{
          this.props.signOut();
      }
    };
    signInHandler = (event)=>{
        this.auth.signIn();
    }
    signOutHandler = (event)=>{
        this.auth.signOut();
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.signOutHandler}>
                    <i className="google icon"/>
                    Sign Out
                </button>    
            );
        }else{
            return (
                <button className="ui green google button" onClick={this.signInHandler}>
                    <i className="google icon"/>
                    Sign In 
                </button>   
            );
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);