import React from 'react'


export const FlushMessageDanger = ({message})=>{
    return <div className="container">
  
    <div className="alert alert-danger alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>{message}
    </div>
   
  </div>
}

export const FlushMessageSuccess = ({message})=>{
    return <div className="container">
  
    <div className="alert alert-success alert-dismissible">
      <button type="button" class="close" data-dismiss="alert">&times;</button>{message}
    </div>
   
  </div>
}



