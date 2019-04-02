import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      emailId: "",
      mobNumber: "",
      password: "",
      confpassword: "",
      Address: "",
      location0: "",
      location1: "",
      errors: {}
    };
    this.getMyLocation = this.getMyLocation.bind(this);
  }

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if(location) {
      location.getCurrentPosition((position) => {
        this.setState({
          location0: position.coords.latitude,
          location1: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ location0: 'err-latitude', location1: 'err-longitude'})
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
        name: this.state.name,
        emailId: this.state.emailId,
        mobNumber: this.state.mobNumber,
        password: this.state.password,
        confpassword: this.state.confpassword,
        Address: this.state.Address,
        location0: this.state.location0,
        location1: this.state.location1
      };
      this.props.registerUser(newUser, this.props.history); 
      console.log(newUser);
  };
  

  render() {
    const { location0, location1 } = this.state
    const { errors } = this.state;

return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.emailId}
                  error={errors.emailId}
                  id="emailId"
                  type="email"
                  className={classnames("", {
                    invalid: errors.emailId
                  })}
                />
                <label htmlFor="emailId">Email</label>
                <span className="red-text">{errors.emailId}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mobNumber}
                  error={errors.mobNumber}
                  id="mobNumber"
                  type="text"
                />
                <label htmlFor="mobNumber">Mobile Number</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.confpassword}
                  error={errors.confpassword}
                  id="confpassword"
                  type="password"
                  className={classnames("", {
                    invalid: errors.confpassword
                  })}
                />
                <label htmlFor="confpassword">Confirm Password</label>
                <span className="red-text">{errors.confpassword}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Address}
                  error={errors.Address}
                  id="Address"
                  type="text"
                />
                <label htmlFor="Address">Address</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.location0}
                  error={errors.location}
                  id="location0"
                  type="text"
                />
                <label htmlFor="location0">Latitude</label>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.location1}
                  error={errors.location}
                  id="location1"
                  type="text"
                />
                <label htmlFor="location1">Longitude</label>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

