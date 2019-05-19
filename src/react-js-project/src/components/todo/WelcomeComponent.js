import React from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends React.Component {  
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}
                    <br />
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
            </>
        );
    }
}

export default WelcomeComponent;