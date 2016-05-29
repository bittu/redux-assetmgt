import React from 'react';

export default class DeskCard extends React.Component {

	render() {
		const data = this.props.data;
		return (
				<div className="card">
          <div className="card-content">
            <span class="card-title">Desk</span>
            <p>
              {data.length ?
                `Your Desk is at ${data.Wing.Wing} Wing ${data.Desk} cubicle`
              :
                'Please assign a desk for you'
              }
            </p>
          </div>
          <div class="card-action">
            <a href="#">{data.length ? 'Change Desk' : 'Add Desk'}</a>
          </div>
        </div>
			)
	}
}