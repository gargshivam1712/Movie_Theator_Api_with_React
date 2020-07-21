import React,{Component} from "react";
import PropTypes from 'prop-types'


class Message extends Component
{

    render()
    {
        return(
        <p style={{color:'red'}}>{this.props.message}</p>
        );
    }
}
Message.propTypes = {
    message : PropTypes.string
}

export default Message