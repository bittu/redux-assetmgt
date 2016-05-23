import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

class UserDashboard extends React.Component {

  componentWillMount () {
    this.fetchData();
  }

  fetchData () {
    let token = this.props.authData.token;
    this.props.actions.userData(token, this.props.authData.employee._id);
  }

  render () {
    return (
      <div>
        {this.props.isFetching === true
          ? <h1>Loading data...</h1>
          : <div>
            <h1>Welcome back,
              {this.props.authData.employee.FirstName + this.props.authData.employee.LastName }!</h1>
            {this.props.data 
              ? 
                <div className="row">
                  <div className="col m4 s6">
                    <div className="card">
                      <div className="card-content">
                        <form ref={(ref) => this.myTextInput = ref} className="nl-form">
                          I feel like eating
                          <select>
                            <option value="1" selected>any food</option>
                            <option value="2">Indian</option>
                            <option value="3">French</option>
                            <option value="4">Japanese</option>
                            <option value="2">Italian</option>
                          </select>
                          <br />in a
                          <select>
                            <option value="1" selected>standard</option>
                            <option value="2">fancy</option>
                            <option value="3">hip</option>
                            <option value="4">traditional</option>
                            <option value="2">romantic</option>
                          </select>
                          restaurant
                          <br /> 
                          <select>
                            <option value="1" selected>anytime</option>
                            <option value="1">at 7 p.m.</option>
                            <option value="2">at 8 p.m.</option>
                            <option value="3">at 9 p.m.</option>
                          </select>
                          in <input type="text" value="" placeholder="any city" data-subline="For example: <em>Los Angeles</em> or <em>New York</em>"/>
                          <div class="nl-submit-wrap">
                            <button class="nl-submit" type="submit">Find a restaurant</button>
                          </div>
                          <div class="nl-overlay"></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

              : ''}
          </div>
        }
      </div>
    );
  }

  componentDidMount() {
    if(this.myTextInput) {
      var nlform = new NLForm( this.myTextInput );
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);