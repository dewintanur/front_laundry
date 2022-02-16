import React from "react";

class Trial extends React.Component{
    render(){
        // fungsi utk tampilan element
        return(
            <div className={`alert alert-${this.props.bgColor}`}>
                <h3 className={`text-${this.props.titleColor}`}>{this.props.title}</h3>
                <small className={`text-${this.props.smallColor}`}>{this.props.subtitle}</small>
            </div>
        )
    }
}
export default Trial