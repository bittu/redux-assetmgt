import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

import DeskCard from '../components/DeskCard';

class UserDashboard extends React.Component {

  componentWillMount () {
    this.fetchData();
  }

  fetchData () {
    let token = this.props.authData.token;
    this.props.actions.userData(token, this.props.authData.employee._id);
  }

  render () {
    let desk, location, asset;
    const data = this.props.data;

    if(data) {

      if(data.location) {
        location = '';
      }

      if(data.desk) {
        desk = <DeskCard data={data.desk}/>
      }

      if(data.asset) {
        asset = data.asset.AssetID;
      }
    }

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
                  <div class="col s12 cards-container">
                    {location} {desk} {asset}
                  </div>
                </div>

              : ''
            }
          </div>
        }
      </div>
    );
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